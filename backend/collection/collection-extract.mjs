import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { createTopicPlan, rankCandidate } from "./collection-topic.mjs";

export const normalizeText = (text) => String(text || "").replace(/\s+/g, " ").trim();
const host = (url) => new URL(url).hostname.replace(/^www\./, "");

export function allowedArticle(url, source) {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) && !parsed.username && !parsed.password &&
      [source.url, ...(source.actions || []).map((entry) => entry.url)].some((base) => host(base) === host(url));
  } catch { return false; }
}

export function extractPage(html, url, topic = "", plan = createTopicPlan(topic)) {
  const dom = new JSDOM(html, { url });
  try {
    const doc = dom.window.document;
    const meta = (name) => doc.querySelector(`meta[property="${name}"], meta[name="${name}"]`)?.content || "";
    const originalTitle = normalizeText(meta("og:title") || doc.querySelector("h1")?.textContent || doc.title);
    const date = meta("article:published_time") || meta("datePublished") || doc.querySelector("time[datetime]")?.getAttribute("datetime") || "";
    const publishedAt = date && Number.isFinite(Date.parse(date)) ? date : "";
    const feedLinks = [...doc.querySelectorAll('link[rel="alternate"][href]')].filter((node) => /rss|atom/.test(node.type)).slice(0, 2).map((node) => node.href);
    const links = new Map();
    for (const link of doc.querySelectorAll("main a[href], article a[href], .content a[href], body a[href]")) {
      const title = normalizeText(link.textContent);
      if (title.length < 4 || title.length > 300) continue;
      let parsed;
      try { parsed = new URL(link.href, url); } catch { continue; }
      parsed.hash = "";
      if (!["http:", "https:"].includes(parsed.protocol) || /\.(pdf|zip|xlsx?|csv|png|jpg|svg|mp4)$/i.test(parsed.pathname) || /\/(login|signin|register|privacy|terms|search)(\/|$)/i.test(parsed.pathname) || parsed.href === url) continue;
      const score = rankCandidate({ title, url: parsed.href }, plan) + (/\d{4}|\/news\/|\/blog\/|\/article|\/publication|\/research/i.test(parsed.pathname) ? 3 : 0);
      if (!links.has(parsed.href)) links.set(parsed.href, { url: parsed.href, title, score, publishedAt: "" });
    }
    const articleLike = doc.querySelectorAll("article").length === 1 || /NewsArticle|BlogPosting|ScholarlyArticle/.test([...doc.querySelectorAll('script[type="application/ld+json"]')].map((node) => node.textContent).join(" "));
    const article = new Readability(doc.cloneNode(true)).parse();
    const content = normalizeText(article?.textContent || "");
    const limited = content.slice(0, 16000);
    return { title: normalizeText(article?.title || originalTitle).slice(0, 500), text: limited,
      truncated: content.length > limited.length, authors: normalizeText(article?.byline || "").slice(0, 250), publishedAt, feedLinks,
      articleLike, candidates: [...links.values()].sort((a, b) => b.score - a.score).slice(0, 100) };
  } finally { dom.window.close(); }
}

export function parseCollectionFeed(xml, base) {
  if (/<(?:!doctype\s+html|html)(?:\s|>)/i.test(xml)) throw Object.assign(new Error("订阅地址返回了 HTML 网页，并非 RSS / Atom"), { sourceCode: "feed_html" });
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw Object.assign(new Error("订阅包含不支持的 DTD 或实体声明"), { sourceCode: "unsafe_xml" });
  const dom = new JSDOM(xml, { contentType: "application/xml" });
  try {
    const doc = dom.window.document;
    if (!["rss", "feed", "RDF"].includes(doc.documentElement.localName)) throw Object.assign(new Error("订阅返回的 XML 不是 RSS / Atom"), { sourceCode: "not_a_feed" });
    const rows = [...doc.getElementsByTagNameNS("*", "item"), ...doc.getElementsByTagNameNS("*", "entry")].slice(0, 200);
    return rows.map((row) => {
      const child = (name) => [...row.children].find((node) => node.localName === name);
      const link = [...row.children].find((node) => node.localName === "link" && (!node.getAttribute("rel") || node.getAttribute("rel") === "alternate"));
      const raw = link?.getAttribute("href") || link?.textContent;
      let url;
      try { url = new URL(raw, base); } catch { return null; }
      if (!raw || !["https:", "http:"].includes(url.protocol) || url.username || url.password) return null;
      const date = child("pubDate")?.textContent || child("published")?.textContent || child("date")?.textContent || "";
      return { title: normalizeText(child("title")?.textContent).slice(0, 500), description: normalizeText(child("description")?.textContent || child("summary")?.textContent).slice(0, 1000), url: url.href,
        publishedAt: Number.isFinite(Date.parse(date)) ? date : "" };
    }).filter(Boolean);
  } finally { dom.window.close(); }
}

export function validateAnalysis(raw, sourceText) {
  const value = JSON.parse(raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""));
  if (typeof value.summary !== "string" || !value.summary.trim() || !Array.isArray(value.points)) throw new Error("模型返回的整理结果格式不完整");
  const strings = (rows, max, length) => Array.isArray(rows) ? rows.filter((entry) => typeof entry === "string").slice(0, max).map((entry) => entry.slice(0, length)) : [];
  const evidence = strings(value.evidence, 3, 400).filter((quote) => quote.trim().length >= 8 && normalizeText(sourceText).includes(normalizeText(quote)));
  return { summary: value.summary.slice(0, 1800), points: strings(value.points, 5, 600), keywords: strings(value.keywords, 8, 40), evidence,
    relevance: ["high", "medium", "low"].includes(value.relevance) ? value.relevance : "unknown" };
}
