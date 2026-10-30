const synonyms = [
  ["东南亚", "southeast asia", "southeast asian", "东盟", "asean"],
  ["天然气", "natural gas"], ["液化天然气", "lng", "liquefied natural gas"],
  ["能源", "energy"], ["安全", "security"], ["运输", "transport", "transportation", "shipping", "carrier", "carriers", "vessel", "vessels", "tanker", "tankers", "freight", "charter", "船舶", "船运", "海运"],
  ["管道", "pipeline", "pipelines"], ["航运", "shipping", "maritime transport"],
  ["供应链", "supply chain", "supply chains"], ["贸易", "trade"], ["经济", "economy", "economic"],
  ["金融", "finance", "financial"], ["货币", "monetary", "currency"], ["通胀", "inflation"],
  ["政策", "policy", "policies"], ["外交", "diplomacy", "diplomatic", "foreign policy"],
  ["地缘政治", "geopolitics", "geopolitical"], ["气候", "climate"], ["碳排放", "carbon emissions"],
  ["人工智能", "ai", "artificial intelligence"], ["大模型", "large language model", "llm", "llms"],
  ["机器学习", "machine learning"], ["开源", "open source", "open-source"],
  ["模型推理", "model inference", "inference"], ["模型训练", "model training"],
  ["模型", "model", "models"], ["推理", "inference", "reasoning"],
  ["就业", "employment", "jobs"], ["失业", "unemployment"], ["人口", "population", "demographic"],
  ["中国", "china", "chinese"], ["美国", "united states", "u.s.", "american"],
  ["新加坡", "singapore"], ["泰国", "thailand", "thai"], ["越南", "vietnam", "vietnamese"],
  ["马来西亚", "malaysia", "malaysian"], ["印尼", "印度尼西亚", "indonesia", "indonesian"],
  ["缅甸", "myanmar", "burma"], ["柬埔寨", "cambodia"], ["老挝", "laos", "lao"],
  ["菲律宾", "philippines", "philippine"], ["冲突", "conflict", "conflicts"], ["武装", "armed"],
  ["投资", "investment"], ["发展", "development"], ["海洋", "maritime", "ocean"],
];
const stop = new Set("的 与 和 及 对 在 关于 有关 相关 研究 分析 探讨 影响 文章 资料 最新 动态 新闻 the a an of in on and or for to with about research study recent latest news".split(" "));
const clean = (value) => String(value || "").normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();
export function containsTerm(text, term) {
  text = clean(text); term = clean(term);
  if (!term) return false;
  if (/\p{Script=Han}/u.test(term)) return text.includes(term);
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`, "i").test(text);
}

export function createTopicPlan(topic) {
  const original = clean(topic);
  if (!original) return { concepts: [], method: "none" };
  let remaining = original;
  const concepts = [];
  // Prefer phrases before shorter aliases, so LNG does not become an extra gas requirement.
  const phrases = synonyms.flatMap((terms, group) => terms.map((term) => ({ term, group }))).sort((a, b) => b.term.length - a.term.length);
  const groups = new Set();
  for (const { term, group } of phrases) {
    if (!containsTerm(remaining, term)) continue;
    if (!groups.has(group)) { concepts.push({ name: term, terms: synonyms[group] }); groups.add(group); }
    if (/\p{Script=Han}/u.test(term)) remaining = remaining.split(term).join(" ");
    else remaining = remaining.replace(new RegExp(`(^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=$|[^a-z0-9])`, "gi"), "$1 ");
  }
  for (const word of new Intl.Segmenter("zh", { granularity: "word" }).segment(remaining)) {
    if (word.isWordLike && word.segment.length > 1 && !stop.has(word.segment)) concepts.push({ name: word.segment, terms: [word.segment] });
  }
  if (!concepts.length) concepts.push({ name: original, terms: [original] });
  return { concepts: concepts.slice(0, 8), method: "dictionary" };
}

export function parseTopicPlan(raw, topic) {
  const value = JSON.parse(raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""));
  if (!Array.isArray(value.concepts) || !value.concepts.length || value.concepts.length > 8) throw new Error("主题关键词扩展格式无效");
  const concepts = value.concepts.map((entry) => {
    const name = clean(entry.name);
    if (name.length < 2 || name.length > 100 || !clean(topic).includes(name) || !Array.isArray(entry.terms)) throw new Error("主题关键词偏离原主题");
    const terms = [...new Set([name, ...entry.terms.filter((term) => typeof term === "string").map(clean).filter((term) => term.length >= 2 && term.length <= 100 && !stop.has(term))])].slice(0, 10);
    return { name, terms };
  });
  return { concepts, method: "ai" };
}

export function matchTopic({ title = "", text = "" }, plan, minimumCoverage = 0.75) {
  if (!plan.concepts.length) return { accepted: true, coverage: 1, score: 0, matched: [] };
  const matched = [], titles = [];
  for (const concept of plan.concepts) {
    if (concept.terms.some((term) => containsTerm(text, term))) matched.push(concept.name);
    if (concept.terms.some((term) => containsTerm(title, term))) titles.push(concept.name);
  }
  const coverage = matched.length / plan.concepts.length;
  return { accepted: coverage >= minimumCoverage, coverage, matched, score: matched.length * 10 + titles.length * 20 };
}

export function rankCandidate(entry, plan) {
  let pathname = "";
  try { pathname = decodeURIComponent(new URL(entry.url).pathname).replace(/[-_/]/g, " "); } catch { /* Titles still provide ranking evidence. */ }
  const content = `${entry.title || ""} ${entry.description || ""} ${pathname}`;
  return plan.concepts.filter((concept) => concept.terms.some((term) => containsTerm(content, term))).length * 100 + (entry.score || 0);
}

export function rankArticle(item, plan) {
  const match = matchTopic(item, plan, 0);
  let pathname = "";
  try { pathname = new URL(item.url).pathname; } catch { /* Content still provides ranking evidence. */ }
  return match.score + (item.articleLike ? 12 : 0) + (item.publishedAt ? 8 : 0) + (/\/(news|blog|article|publications?)\//i.test(pathname) ? 6 : 0)
    - (/\/(about|products?|services?)(\/|$)/i.test(pathname) || pathname === "/" ? 12 : 0);
}

export function validateRelevance(raw, text) {
  const value = JSON.parse(raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""));
  if (!["high", "medium", "low"].includes(value.relevance) || typeof value.reason !== "string") throw new Error("相关性核验格式无效");
  const normalized = clean(text);
  const evidence = (Array.isArray(value.evidence) ? value.evidence : []).filter((quote) => typeof quote === "string" && quote.trim().length >= 8 && quote.length <= 300 && normalized.includes(clean(quote))).slice(0, 3);
  return { relevance: evidence.length ? value.relevance : "unknown", reason: value.reason.slice(0, 400), evidence };
}
