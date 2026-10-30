import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { collectWeekly } from "../scripts/collect-weekly.mjs";

const now = Date.parse("2026-10-30T02:00:00Z");
const source = { id: "example", title: "Example", kind: "report", feedUrl: "https://example.org/feed", siteUrl: "https://example.org/", defaultRegion: "欧洲" };
const feed = '<rss><channel><item><title>EU parliament approves new trade law</title><link>https://example.org/analysis/law</link><pubDate>Thu, 29 Oct 2026 08:00:00 GMT</pubDate></item></channel></rss>';

test("scheduled runs save public data, restore long delays and preserve history on outage", async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "academic-github-test-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  let contentCalls = 0;
  const fetcher = async (url) => {
    if (url.endsWith("robots.txt")) return new Response("User-agent: *\nAllow: /\nCrawl-delay: 600");
    contentCalls++; return new Response(feed);
  };
  const args = { directory, fetcher, sourceList: [source], clock: () => now };
  const first = await collectWeekly(args);
  assert.ok(first.data.items.some((row) => row.url === "https://example.org/analysis/law"));
  const second = await collectWeekly(args);
  assert.equal(second.data.sources[0].state, "deferred");
  assert.equal(contentCalls, 1);
  const failed = await collectWeekly({ ...args, fetcher: async () => new Response("Denied", { status: 403 }) });
  assert.equal(failed.summary.readable, 0);
  assert.equal(failed.data.updatedAt, first.data.updatedAt);
  assert.equal(failed.data.items.length, first.data.items.length);
  const saved = JSON.parse(await fs.readFile(path.join(directory, "site/data/weekly.json"), "utf8"));
  assert.equal(saved.items.length, first.data.items.length);
  assert.ok(!("runtime" in saved) && !("refreshing" in saved));
});

test("Pages frontend reads from its project path and never posts to a missing backend", async () => {
  const script = await fs.readFile(new URL("../site/weekly-reports.js", import.meta.url), "utf8");
  const html = await fs.readFile(new URL("../site/index.html", import.meta.url), "utf8");
  new vm.Script(script);
  assert.ok(!/\/api\/|method:\s*["']POST|requestedUpdate/.test(script));
  assert.ok(script.includes('new URL("data/weekly.json", document.baseURI)'));
  assert.ok(html.includes("刷新周报") && html.includes("weeklyAdmin"));
  const url = new URL("data/weekly.json", "https://example.github.io/academic-navigation/#weekly");
  assert.equal(url.pathname, "/academic-navigation/data/weekly.json");
});
