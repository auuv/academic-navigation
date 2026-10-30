import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs/promises";
import { createWeeklyCollector, parseFeed, publisherUrl } from "../lib/weekly-collector.mjs";

const now = Date.parse("2026-10-30T02:00:00Z");
const source = { id: "example", title: "Example", kind: "report", feedUrl: "https://example.org/feed", siteUrl: "https://example.org/", defaultRegion: "欧洲" };
const initial = { schemaVersion: 1, items: [], sources: [], updatedAt: null, lastAttemptAt: null };
const feed = '<rss><channel><item><title>EU parliament approves new trade law</title><link>https://example.org/analysis/law</link><pubDate>Thu, 29 Oct 2026 08:00:00 GMT</pubDate><description>New EU trade policy</description></item></channel></rss>';
async function database(t) {
  const sqlite = new DatabaseSync(":memory:"); t.after(() => sqlite.close());
  sqlite.exec(await fs.readFile(new URL("../lib/schema.sql", import.meta.url), "utf8"));
  return { prepare(sql) { let args = []; const statement = sqlite.prepare(sql); return { bind(...values) { args = values; return this; }, async first() { return statement.get(...args) || null; }, async run() { return statement.run(...args); } }; } };
}
async function fixture(t, { robots = "User-agent: *\nAllow: /", transport, sourceList = [source], clock = () => now } = {}) {
  const db = await database(t), calls = [];
  const fetcher = async (url, options) => {
    calls.push({ url, headers: options.headers });
    if (url.endsWith("/robots.txt")) return new Response(robots);
    return transport ? transport(url, options) : new Response(feed);
  };
  const options = { db, fetcher, sourceList, clock, initial };
  return { db, calls, options, service: createWeeklyCollector(options) };
}
test("cloud cache reads need no model or upstream request and use the China weekly calendar", async (t) => {
  const f = await fixture(t); const result = await f.service.read();
  assert.equal(result.currentWeek, "2026-10-26"); assert.equal(result.runtime, "github-actions"); assert.equal(f.calls.length, 0);
});
test("RSS/Atom parsing preserves publication dates, rejects entity declarations and external URLs", () => {
  assert.equal(parseFeed(feed, source.feedUrl)[0].publishedAt, "Thu, 29 Oct 2026 08:00:00 GMT");
  const atom = '<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>EU trade policy</title><link href="https://example.org/analysis/law"/><published>2026-10-29T08:00:00Z</published></entry></feed>';
  assert.equal(parseFeed(atom, source.feedUrl)[0].url, "https://example.org/analysis/law");
  assert.throws(() => parseFeed('<!DOCTYPE rss [<!ENTITY x SYSTEM "file:///etc/passwd">]><rss/>', source.feedUrl));
  assert.throws(() => publisherUrl("https://127.0.0.1/", source)); assert.throws(() => publisherUrl("https://evil.example/", source));
});
test("refresh persists a shared snapshot and another service instance reads it without refetching", async (t) => {
  const f = await fixture(t), result = await f.service.refresh();
  assert.equal(result.items.length, 1); assert.equal(result.sources[0].state, "completed"); assert.equal(result.refreshing, false);
  const restored = createWeeklyCollector({ ...f.options, fetcher: () => assert.fail("reads must not fetch") });
  assert.equal((await restored.read()).items[0].title, result.items[0].title);
  assert.ok(f.calls.every((call) => !Object.keys(call.headers).some((key) => /authorization|cookie/i.test(key))));
});
test("database leases prevent simultaneous cloud tasks and manual updates from collecting twice", async (t) => {
  let release; const gate = new Promise((resolve) => { release = resolve; });
  const f = await fixture(t, { transport: async () => { await gate; return new Response(feed); } });
  const first = f.service.refresh(); await new Promise((resolve) => setTimeout(resolve, 10));
  const second = await createWeeklyCollector(f.options).refresh(); assert.equal(second.refreshing, true);
  release(); await first;
  assert.equal(f.calls.filter((call) => !call.url.endsWith("robots.txt")).length, 1);
});
test("official lists recover stale feeds while dates remain attached to their own cards", async (t) => {
  const listing = '<article class="c-card"><h3 class="c-card__title"><a href="/analysis/policy">EU trade policy report</a></h3><time datetime="2026-10-29"></time></article>';
  const f = await fixture(t, { sourceList: [{ ...source, listingAdapter: "bruegel", entries: [{ url: source.feedUrl, type: "feed" }, { url: "https://example.org/publications", type: "listing" }] }],
    transport: (url) => new Response(url.endsWith("feed") ? feed.replace("Thu, 29 Oct 2026 08:00:00 GMT", "2025-01-01") : listing) });
  const result = await f.service.refresh(); assert.equal(result.items.length, 1); assert.equal(result.sources[0].method, "官方文章列表");
});
test("robots denials do not fetch content and failures retain the last successful cloud snapshot", async (t) => {
  const f = await fixture(t); const first = await f.service.refresh();
  const failed = createWeeklyCollector({ ...f.options, fetcher: async () => new Response("Denied", { status: 403 }) });
  const result = await failed.refresh(); assert.equal(result.items.length, 1); assert.equal(result.updatedAt, first.updatedAt);
  assert.equal(result.sources[0].state, "failed");
  const blocked = await fixture(t, { robots: "User-agent: *\nDisallow: /" });
  await blocked.service.refresh(); assert.equal(blocked.calls.filter((call) => !call.url.endsWith("robots.txt")).length, 0);
});
test("long crawl intervals persist in the database across Worker instances", async (t) => {
  let clock = now;
  const f = await fixture(t, { robots: "User-agent: *\nAllow: /\nCrawl-delay: 600", clock: () => clock });
  await f.service.refresh(); const calls = f.calls.length;
  const second = await createWeeklyCollector(f.options).refresh(); assert.equal(second.sources[0].state, "deferred");
  assert.equal(f.calls.length, calls + 1, "only robots may be rechecked before the next content slot");
  clock += 600001; assert.equal((await createWeeklyCollector(f.options).refresh()).sources[0].state, "completed");
});
test("online assets contain no local documents, file paths, localhost requests or credential forms", async () => {
  for (const file of ["index.html", "app.js", "weekly-reports.js", "weekly-data.js"]) {
    const text = await fs.readFile(new URL(`../site/${file}`, import.meta.url), "utf8");
    assert.ok(!/\/Users\/|file:\/\/|127\.0\.0\.1|api\/local-documents|collectionKey|collectionDialog/.test(text), file);
  }
});
