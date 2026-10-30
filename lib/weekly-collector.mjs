import { XMLParser, XMLValidator } from "fast-xml-parser";
import { parseHTML } from "linkedom";
import robotsParser from "robots-parser";
import core from "./weekly-core.cjs";
import sources from "./data/weekly-sources.json" with { type: "json" };
import seed from "./data/weekly-seed.json" with { type: "json" };
import { parseWeeklyListing } from "./weekly-extract.mjs";

const DAY = 86400000, UA = "AcademicNavigatorBot";
const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
const hostname = (url) => new URL(url).hostname.replace(/^www\./, "");
export function publisherUrl(input, source) {
  const url = new URL(input);
  const hosts = [source.feedUrl, source.siteUrl].map(hostname).concat((source.articleHosts || []).map((value) => value.replace(/^www\./, "")));
  if (url.protocol !== "https:" || url.username || url.password || url.port || !hosts.includes(hostname(url))) throw new Error("入口离开所选官方来源，已跳过");
  return url.href;
}
const plain = (value) => {
  const { document } = parseHTML(`<html><body>${String(value || "").slice(0, 5000)}</body></html>`);
  for (const node of document.querySelectorAll("script,style")) node.remove();
  return clean(document.body.textContent);
};
const value = (item) => typeof item === "object" && item ? item["#text"] || item["#cdata"] || "" : item || "";
export function parseFeed(text, base) {
  if (/<!DOCTYPE|<!ENTITY/i.test(text)) throw new Error("订阅包含不支持的 DTD 或实体声明");
  if (XMLValidator.validate(text) !== true) throw new Error("订阅 XML 无法解析");
  const parsed = new XMLParser({ ignoreAttributes: false, removeNSPrefix: true, parseTagValue: false, processEntities: false, cdataPropName: "#cdata" }).parse(text);
  const channel = parsed.rss?.channel;
  if (!channel && !parsed.feed && !parsed.RDF) throw new Error("入口不是 RSS / Atom 订阅");
  const entries = channel?.item || parsed.feed?.entry || parsed.RDF?.item || [];
  return (Array.isArray(entries) ? entries : [entries]).slice(0, 200).flatMap((entry) => {
    const links = Array.isArray(entry.link) ? entry.link : [entry.link];
    const link = links.find((row) => row && (typeof row !== "object" || !row["@_rel"] || row["@_rel"] === "alternate"));
    const raw = typeof link === "object" ? link?.["@_href"] || value(link) : link;
    let url;
    try { url = new URL(plain(raw), base).href; } catch { return []; }
    if (!raw) return [];
    return [{ title: plain(value(entry.title)).slice(0, 500), url,
      publishedAt: value(entry.pubDate || entry.published || entry.date), description: plain(value(entry.description || entry.summary)).slice(0, 1000) }];
  });
}
function parseEntry(response, source, type) {
  if (type === "listing") return parseWeeklyListing(response, source);
  if (!/<(?:!doctype\s+html|html)(?:\s|>)/i.test(response.text)) return parseFeed(response.text, response.url);
  const { document } = parseHTML(response.text);
  const date = document.querySelector('meta[property="article:published_time"],meta[name="datePublished"]')?.getAttribute("content");
  const url = new URL(document.querySelector('link[rel="canonical"]')?.getAttribute("href") || response.url, response.url).href;
  if (!date || !document.querySelector("h1")) throw new Error("入口返回网页，未找到文章自己的发布日期");
  publisherUrl(url, source);
  return [{ title: document.querySelector("h1").textContent, url, publishedAt: date, description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "" }];
}
const pause = (ms, signal) => new Promise((resolve, reject) => {
  const timer = setTimeout(done, ms);
  function done() { signal.removeEventListener("abort", abort); resolve(); }
  function abort() { clearTimeout(timer); reject(signal.reason); }
  signal.addEventListener("abort", abort, { once: true });
});

export function createWeeklyCollector({ db, fetcher = fetch, clock = () => Date.now(), sourceList = sources, initial = seed }) {
  async function stored() {
    const row = await db.prepare('SELECT value FROM weekly_state WHERE key = ?').bind("snapshot").first();
    if (!row) return structuredClone(initial);
    try {
      const data = JSON.parse(row.value);
      if (data.schemaVersion !== 1 || !Array.isArray(data.items) || !Array.isArray(data.sources)) throw new Error();
      return data;
    } catch { return { ...structuredClone(initial), storageWarning: "周报缓存暂不可用，显示已保存的公开快照。" }; }
  }
  async function read() {
    const data = await stored(), now = clock();
    const lease = await db.prepare('SELECT expires_at FROM weekly_leases WHERE key = ?').bind("weekly").first();
    const currentWeek = core.weekStart(now);
    return { ...data, currentWeek, weeks: [...new Set([currentWeek, ...data.items.map((item) => item.week)])].sort().reverse(),
      stale: !data.lastAttemptAt || now - Date.parse(data.lastAttemptAt) > 6 * 3600000, refreshing: Boolean(lease && lease.expires_at > now), runtime: "github-actions" };
  }
  async function refresh() {
    const owner = crypto.randomUUID(), now = clock();
    const lock = await db.prepare('INSERT INTO weekly_leases (key, expires_at, owner) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET expires_at=excluded.expires_at, owner=excluded.owner WHERE weekly_leases.expires_at <= ? RETURNING key')
      .bind("weekly", now + 120000, owner, now).first();
    if (!lock) return { ...await read(), refreshing: true };
    try {
      const previous = await stored(), collected = [], policies = new Map(), locks = new Map();
      const signal = AbortSignal.timeout(90000); let requests = 0;
      const raw = async (input, source, before) => {
        let url = publisherUrl(input, source);
        for (let hop = 0; hop <= 4; hop++) {
          signal.throwIfAborted();
          if (before) await before(url);
          if (++requests > 48) throw new Error("本次来源访问预算已用完");
          const combined = AbortSignal.any([signal, AbortSignal.timeout(12000)]);
          const response = await fetcher(url, { redirect: "manual", signal: combined, headers: { "User-Agent": `${UA}/1.0 (personal research; metadata only)`, Accept: "application/rss+xml, application/atom+xml, text/html;q=0.9, */*;q=0.5" } });
          if ([301, 302, 303, 307, 308].includes(response.status) && response.headers.get("location")) {
            await response.body?.cancel();
            if (hop === 4) throw new Error("网站重定向过多");
            url = publisherUrl(new URL(response.headers.get("location"), url).href, source); continue;
          }
          const reader = response.body?.getReader(), chunks = []; let size = 0;
          if (reader) while (true) {
            const { done, value } = await reader.read(); if (done) break;
            size += value.byteLength;
            if (size > 2 * 1024 * 1024) { await reader.cancel(); throw new Error("来源响应超过 2 MiB"); }
            chunks.push(value);
          }
          const buffer = new Uint8Array(size); let offset = 0;
          for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.byteLength; }
          return { status: response.status, text: new TextDecoder().decode(buffer), url };
        }
      };
      const load = (url, source) => raw(url, source, async (target) => {
        const origin = new URL(target).origin;
        const next = (locks.get(origin) || Promise.resolve()).catch(() => {}).then(async () => {
          let policy = policies.get(origin);
          if (!policy) {
            const robots = await raw(`${origin}/robots.txt`, source);
            if (![200, 404, 410].includes(robots.status)) throw new Error(`robots.txt 返回 HTTP ${robots.status}，无法确认抓取许可`);
            if (robots.status === 200 && /<(?:!doctype\s+html|html)(?:\s|>)/i.test(robots.text)) throw new Error("robots.txt 返回浏览器验证页，无法确认抓取许可");
            policy = { parser: robotsParser(`${origin}/robots.txt`, robots.status === 200 ? robots.text : ""), last: 0 }; policies.set(origin, policy);
          }
          if (policy.parser.isAllowed(target, UA) === false) throw new Error("robots.txt 不允许读取此入口");
          const gap = Math.max(500, Number(policy.parser.getCrawlDelay(UA) || 0) * 1000);
          const row = await db.prepare('SELECT next_at FROM weekly_crawl_schedule WHERE origin = ?').bind(origin).first();
          if (row?.next_at > clock()) throw Object.assign(new Error("等待站方访问间隔"), { nextAllowedAt: new Date(row.next_at).toISOString() });
          if (gap > 10000) {
            const reserved = await db.prepare('INSERT INTO weekly_crawl_schedule (origin, next_at) VALUES (?, ?) ON CONFLICT(origin) DO UPDATE SET next_at=excluded.next_at WHERE weekly_crawl_schedule.next_at <= ? RETURNING origin').bind(origin, clock() + gap, clock()).first();
            if (!reserved) throw Object.assign(new Error("另一次更新正在遵守站方访问间隔"), { nextAllowedAt: new Date(clock() + gap).toISOString() });
          }
          const wait = gap > 10000 ? 0 : gap - (Date.now() - policy.last);
          if (wait > 0) await pause(wait, signal);
          signal.throwIfAborted(); policy.last = Date.now();
        });
        locks.set(origin, next); await next;
      });
      const statuses = sourceList.map((source) => ({ id: source.id, title: source.title, url: source.siteUrl, kind: source.kind, state: "unscanned", received: 0, retained: 0, skipped: {}, attempts: [] }));
      const collect = async (source, status) => {
        status.state = "failed"; const seen = new Set();
        for (const entry of (source.entries || [{ url: source.feedUrl, type: "feed" }]).slice(0, 3)) {
          const attempt = { url: entry.url, type: entry.type, state: "failed" }; status.attempts.push(attempt);
          try {
            const response = await load(entry.url, source);
            if (response.status !== 200) throw new Error(`入口返回 HTTP ${response.status}`);
            const rows = parseEntry(response, source, entry.type);
            if (entry.type === "listing" && !rows.length) throw new Error("列表结构已变化，未找到标题与可靠日期");
            attempt.state = "completed"; attempt.received = rows.length; status.received += rows.length;
            let recent = 0;
            for (const row of rows) {
              if (seen.has(row.url)) continue; seen.add(row.url);
              try { publisherUrl(row.url, source); } catch { status.skipped.external = (status.skipped.external || 0) + 1; continue; }
              const result = core.normalizeEntry(row, source, new Date(clock()));
              if (result.item) { collected.push(result.item); status.retained++; }
              else status.skipped[result.reason] = (status.skipped[result.reason] || 0) + 1;
              if (result.item || !["outsideWindow", "undated", "future", "invalid"].includes(result.reason)) recent++;
            }
            status.state = "completed"; status.method = entry.type === "listing" ? "官方文章列表" : "RSS / Atom 订阅"; status.entryUrl = response.url;
            if (recent) break;
            attempt.warning = "该入口没有近八周条目，继续检查备用入口";
          } catch (error) {
            attempt.error = /timeout|abort/i.test(error.name || "") ? "来源读取超时" : String(error.message || "读取失败").slice(0, 250);
            if (error.nextAllowedAt) { status.nextAllowedAt = error.nextAllowedAt; if (status.state !== "completed") status.state = "deferred"; break; }
          }
        }
        if (!["completed", "deferred"].includes(status.state)) status.error = status.attempts.map((item) => item.error).filter(Boolean).join("；").slice(0, 500);
      };
      let cursor = 0;
      await Promise.all(Array.from({ length: Math.min(3, sourceList.length) }, async () => { while (cursor < sourceList.length && !signal.aborted) { const index = cursor++; await collect(sourceList[index], statuses[index]); } }));
      for (const row of statuses) if (row.state === "unscanned") row.error = "已到本次更新时限，稍后可重试";
      const cutoff = Date.parse(`${core.weekStart(clock())}T00:00:00+08:00`) - 49 * DAY;
      const merged = new Map(previous.items.filter((item) => Date.parse(item.publishedAt) >= cutoff).map((item) => [item.url, item]));
      for (const item of collected) {
        const old = merged.get(item.url);
        if (old && Date.parse(old.publishedAt) < Date.parse(item.publishedAt)) { item.publishedAt = old.publishedAt; item.week = old.week; }
        merged.set(item.url, item);
      }
      const data = { schemaVersion: 1, updatedAt: statuses.some((item) => item.state === "completed") ? new Date(clock()).toISOString() : previous.updatedAt,
        lastAttemptAt: new Date(clock()).toISOString(), sources: statuses, items: [...merged.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 1000) };
      while (JSON.stringify(data).length > 1400000 && data.items.length) data.items.pop();
      await db.prepare('INSERT INTO weekly_state (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at').bind("snapshot", JSON.stringify(data), clock()).run();
    } finally { await db.prepare('DELETE FROM weekly_leases WHERE key = ? AND owner = ?').bind("weekly", owner).run(); }
    return read();
  }
  return { read, refresh };
}
