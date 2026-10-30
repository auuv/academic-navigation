(function (root, factory) {
  const core = factory();
  if (typeof module === "object" && module.exports) module.exports = core;
  else root.WeeklyCore = core;
})(typeof globalThis === "object" ? globalThis : this, function () {
  const DAY = 86400000, OFFSET = 8 * 3600000;
  const regions = [
    ["全球议题", /\bglobal\b|worldwide|united nations|\bg20\b|\bg7\b|world bank|multilateral|全球|联合国|多边/i],
    ["东亚", /\bchina\b|chinese|beijing|taiwan|japan|tokyo|korea|seoul|mongolia|中国|台湾|日本|韩国|朝鲜|蒙古/i],
    ["东南亚", /\basean\b|southeast asia|south-east asia|south china sea|mekong|indonesia|jakarta|malaysia|melaka|sarawak|sabah|singapore|\bthai\b|thailand|bangkok|vietnam|viet nam|hanoi|philippine|manila|myanmar|burma|cambodia|\blaos\b|laotian|lao pdr|vientiane|brunei|timor-leste|东南亚|东盟|南海|湄公河|印尼|印度尼西亚|马来西亚|新加坡|泰国|越南|菲律宾|缅甸|柬埔寨|老挝|文莱|东帝汶/i],
    ["南亚", /\bindia\b|\bindian\b|new delhi|pakistan|bangladesh|sri lanka|nepal|bhutan|afghanistan|maldives|印度|巴基斯坦|孟加拉|斯里兰卡|尼泊尔|不丹|阿富汗|马尔代夫/i],
    ["中东", /middle east|israel|palestin|\bgaza\b|\biran\b|lebanon|syria|yemen|saudi|qatar|\buae\b|emirates|\boman\b|jordan|turkey|türkiye|中东|以色列|巴勒斯坦|加沙|伊朗|黎巴嫩|叙利亚|也门|沙特|卡塔尔|阿联酋|阿曼|土耳其/i],
    ["欧洲", /europe|\beu\b|britain|british|united kingdom|\buk\b|london|france|french|german|spain|spanish|italy|italian|ukraine|poland|netherlands|sweden|norway|eurozone|欧洲|欧盟|英国|法国|德国|西班牙|意大利|乌克兰|波兰|荷兰|瑞典|挪威/i],
    ["俄罗斯与中亚", /russia|moscow|central asia|kazakhstan|uzbekistan|kyrgyz|tajik|turkmen|俄罗斯|莫斯科|中亚|哈萨克斯坦|乌兹别克|吉尔吉斯|塔吉克|土库曼/i],
    ["北美", /united states|american|washington|canada|canadian|美国|华盛顿|加拿大|北美/i],
    ["拉美与加勒比", /latin america|caribbean|mexic|brazil|argentin|colombia|chile|venezuela|\bperu\b|ecuador|\bcuba\b|haiti|拉美|拉丁美洲|加勒比|墨西哥|巴西|阿根廷|哥伦比亚|智利|委内瑞拉|秘鲁|厄瓜多尔|古巴|海地/i],
    ["非洲", /africa|sudan|sahel|nigeria|kenya|ethiopia|somalia|congo|rwanda|uganda|zimbabwe|ghana|\bmali\b|egypt|libya|tunisia|morocco|algeria|非洲|苏丹|萨赫勒|尼日利亚|肯尼亚|埃塞俄比亚|索马里|刚果|卢旺达|乌干达|埃及|利比亚|突尼斯|摩洛哥|阿尔及利亚/i],
    ["大洋洲", /oceania|australia|new zealand|pacific island|fiji|solomon islands|papua new guinea|大洋洲|澳大利亚|新西兰|太平洋岛国|斐济|所罗门|巴布亚新几内亚/i]
  ];
  const subjects = [
    ["外交与国际秩序", /summit|diploma|bilateral|treaty|strategic partnership|foreign policy|relations|middle power|multilateral|\basean\b|峰会|外交|双边|协定|国际秩序|东盟/i],
    ["安全与冲突", /militar|defen[cs]e|security|conflict|ceasefire|border|navy|maritime|\bwar\b|missile|战争|军事|安全|冲突|停火|边境|海上/i],
    ["政治与治理", /election|\bpolls\b|parliament|coalition|political|government|governance|constitution|选举|国会|议会|政治|政府|治理/i],
    ["经济与贸易", /econom|trade|tariff|budget|fiscal|\bgdp\b|export|investment|supply chain|sanction|经济|贸易|关税|预算|财政|投资|供应链|制裁/i],
    ["能源与基础设施", /energy|\blng\b|electricity|infrastructure|railway|seaport|能源|天然气|电力|基础设施|铁路|港口/i],
    ["气候与灾害", /climate|flood|earthquake|typhoon|disaster|emergency|气候|洪灾|地震|台风|灾害/i],
    ["科技与数字治理", /\bai\b|artificial intelligence|digital|cyber|disinformation|人工智能|数字|网络安全|虚假信息/i],
    ["发展与人道事务", /scam|trafficking|refugee|human rights|forced labour|humanitarian|\baid\b|诈骗|难民|人权|强迫劳动|人道|援助/i]
  ];
  const routine = /giveaway|sponsored|media outreach|press release|celebrity|lottery|football|tennis|horoscope|recipe|drowning|5-star resort|crew supervisor|branded content|报名|抽奖|促销|明星|食谱/i;
  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const decisionSignals = [
    ["policy", "政策措施信号", 24, /\b(?:imposes?|imposed|enacts?|enacted|approves?|approved|adopts?|adopted|ratif(?:y|ies|ied)|bans?|banned)\b.{0,70}\b(?:sanctions?|tariffs?|law|bill|budget|treaty|exports?|rules?|policy)\b|\b(?:lifts?|lifted)\b.{0,30}\bsanctions?\b|\bsanctions\b.{0,40}\b(?:ministry|military|leaders?|banks?)\b|通过.{0,15}(?:法案|预算|协议)|(?:出台|实施|取消|宣布).{0,15}(?:制裁|关税|禁令|新规)/i],
    ["politics", "政治结果信号", 24, /election (?:results?|loss|victory|deadlock)|votes? count(?:ed)?|wins? (?:election|majority)|(?:government|president|prime minister).{0,25}(?:resigns?|ousted|sworn in)|选举结果|计票|组阁|当选|(?:政府|总理|总统).{0,8}(?:辞职|就职|倒台)/i],
    ["security", "冲突进展信号", 26, /ceasefire.{0,30}(?:agreed|agreement|signed|begins|ends|collapse)|(?:launch|launched|launches).{0,30}(?:invasion|offensive|strikes)|drone strikes|missile attack|declares? war|停火协议|(?:发动|升级|停止).{0,12}(?:战争|攻势|袭击)|无人机袭击|导弹袭击/i],
    ["macro", "宏观政策或数据变化", 22, /(?:central bank|fed|ecb).{0,35}(?:cuts?|raises?|holds?)|(?:growth|inflation|gdp).{0,20}(?:forecast|rises?|falls?|slows?|recession)|(?:央行|美联储).{0,12}(?:降息|加息|利率)|(?:经济增长|通胀|GDP).{0,12}(?:预测|下降|上升|萎缩)/i],
    ["diplomacy", "外交进展信号", 18, /(?:signs?|signed|establish(?:es)?|agree[sd]?).{0,35}(?:treaty|agreement|partnership|deal)|(?:summit|peace talks|negotiations)|签署.{0,15}(?:协议|条约)|建立.{0,10}伙伴关系|峰会|和谈/i],
    ["crisis", "重大危机规模信号", 24, /mass (?:power cuts|displacement|casualties)|state of emergency|(?:thousands|millions|\d{3}[,\d]*) (?:killed|displaced|evacuated|people)|紧急状态|大规模(?:停电|流离失所|伤亡)|(?:数千|数万|数百万).{0,8}(?:死亡|撤离|受灾|流离失所)/i]
  ];
  const publicPolicy = /foreign policy|security policy|national security|strategic|geopolitic|diploma|summit|bilateral|treaty|militar|defen[cs]e|\bwar\b|conflict|ceasefire|election|\bpolls\b|parliament|government|governance|constitution|fiscal|budget|trade policy|energy policy|sanction|tariff|supply chain|climate policy|\bgdp\b|regulat|\blaw\b|\brules\b|humanitarian|refugee|forced labour|human rights|国家政策|外交|战略|军事|战争|冲突|停火|选举|政府|治理|财政|预算|贸易政策|能源政策|制裁|关税|供应链|气候政策|监管|法规|人权|难民/i;
  const systemic = /\bglobal\b|worldwide|multilateral|cross-border|supply chain|international trade|strait|shipping route|strategic partnership|united nations|\bg20\b|\bg7\b|跨境|全球|多边|国际贸易|供应链|海峡|航道|战略伙伴|联合国/i;
  function assessImportance(item) {
    const title = clean(item.title), excerpt = clean(item.excerpt || item.description).slice(0, 1000), text = `${title} ${excerpt}`;
    const topics = subjects.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
    const factors = [];
    const add = (key, label, points, pattern) => {
      const titleHit = title.match(pattern), hit = titleHit || excerpt.match(pattern);
      if (hit) factors.push({ key, label, points: titleHit ? points : Math.round(points / 2), evidence: hit[0].slice(0, 100), field: titleHit ? "title" : "excerpt" });
    };
    // Each dimension is bounded: repeating or stacking topic keywords cannot inflate importance.
    add("context", "公共政策议题", 8, publicPolicy);
    const changes = [];
    for (const [key, label, points, pattern] of decisionSignals) {
      const before = factors.length; add(key, label, points, pattern);
      if (factors.length > before) changes.push(factors.pop());
    }
    if (changes.length) factors.push(changes.sort((a, b) => b.points - a.points)[0]);
    add("scope", "跨境或系统影响信号", 10, systemic);
    if (item.kind === "report" && topics.length) {
      const report = /\breport\b|\bworking paper\b|\bstudy\b|\bsurvey\b|\bdataset\b|研究报告|工作论文|调查报告/.test(title.toLowerCase());
      factors.push({ key: "research", label: report ? "研究报告线索" : "智库议题分析", points: report ? 8 : 4, evidence: topics.slice(0, 2).join("、"), field: "title-and-excerpt" });
    }
    if (item.kind === "news") add("uncertainty", "含预测或主张措辞", -8, /\b(?:could|might|may|would|should|rumou?r)\b|可能|或将|据传|呼吁|应当/i);
    const excluded = routine.test(text) || /webinar|upcoming event|register now|book (?:launch|event)|defen[cs]e expo|simulated (?:fire|attack)|报名|演练|招聘|抽奖/i.test(title);
    const score = (topics.length ? 8 : 0) + factors.reduce((sum, factor) => sum + factor.points, 0);
    const publicRelevance = item.kind === "report" || changes.length > 0 || factors.some((factor) => factor.key === "context");
    return { version: 2, score, topics, factors, excluded, eligible: !excluded && publicRelevance && topics.length > 0 && score >= (item.kind === "report" ? 12 : 16) };
  }
  const headlineKey = (title) => clean(title).toLowerCase().replace(/[\p{P}\p{S}\s]/gu, "");
  const stopWords = new Set("a an the to of in on at for from by with and or as is are was were be been being has have had it its their this that after before over into amid out up new says said say shows show more less main all no overall short fall complete latest live updates happened news world how what why here could may would should about between through both but not than will can against seeks seek wants want".split(" "));
  const genericEventWords = new Set("china chinese israel iran eu us uk russia russian india indian japan korea australia australian canada canadian sudan brazil malaysia vietnam asean election policy security trade economic government political military global international result sanction summit climate energy africa europe asia vote count majority".split(" "));
  const countryWords = new Set("china israel iran russia india japan korea australia canada sudan brazil malaysia vietnam uk us eu indonesia thailand pakistan france germany mexico kenya nigeria".split(" "));
  function eventTokens(title) {
    const normalized = clean(title).normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase()
      .replace(/israeli\b/g, "israel").replace(/elections\b/g, "election").replace(/sanctions\b/g, "sanction")
      .replace(/results\b/g, "result").replace(/votes\b/g, "vote").replace(/counted\b/g, "count").replace(/cease-fire/g, "ceasefire");
    const words = (normalized.match(/[a-z0-9]+/g) || []).filter((word) => word.length > 1 && !stopWords.has(word));
    // Chinese headline similarity is deliberately conservative; cross-language matching is not claimed.
    for (const phrase of normalized.match(/[\u3400-\u9fff]+/g) || []) for (let i = 0; i < phrase.length - 1; i++) words.push(phrase.slice(i, i + 2));
    return new Set(words);
  }
  function sameEvent(a, b) {
    if (a.kind !== b.kind) return false;
    if (a.url === b.url || headlineKey(a.title) === headlineKey(b.title)) return true;
    if (a.kind === "report" || Math.abs(Date.parse(a.publishedAt) - Date.parse(b.publishedAt)) > 3 * DAY) return false;
    if (!a.regions.some((region) => region !== "全球议题" && b.regions.includes(region))) return false;
    const figures = (title) => title.match(/\b\d+(?:[.,]\d+)*(?:%|\b)/g) || [];
    const na = figures(a.title), nb = figures(b.title);
    if (na.length && nb.length && na.join("|") !== nb.join("|")) return false;
    const proposed = /\bproposal\b|\bproposes?\b|\bdraft\b|提案|草案|拟议/i, decided = /\bapproves?\b|\badopted\b|\benacted\b|\bsigned\b|正式通过|签署|生效/i;
    if (proposed.test(a.title) && decided.test(b.title) || proposed.test(b.title) && decided.test(a.title)) return false;
    const ta = eventTokens(a.title), tb = eventTokens(b.title), common = [...ta].filter((token) => tb.has(token));
    const distinctive = common.filter((token) => !genericEventWords.has(token));
    const outcome = /election (?:result|results)|votes? count|计票|选举结果/i;
    const electionResult = outcome.test(a.title) && outcome.test(b.title) && ["vote", "count", "majority"].every((token) => common.includes(token)) && common.some((token) => countryWords.has(token));
    const locatedSummit = common.includes("summit") && common.filter((token) => countryWords.has(token)).length >= 2 && distinctive.length >= 1;
    // Match all members against a fixed representative, never transitively chain broad topics.
    return common.length >= 4 && (distinctive.length >= 2 || electionResult || locatedSummit) && common.length / Math.min(ta.size, tb.size) >= (locatedSummit ? 0.5 : 0.65) && common.length / (ta.size + tb.size - common.length) >= (locatedSummit ? 0.3 : 0.38);
  }
  function classifyRegions(title, excerpt = "", fallback = ["全球议题"]) {
    const matched = (input) => regions.filter(([name, pattern]) => pattern.test(input) || name === "北美" && /\bUS\b|\bU\.S\./.test(input)).map(([name]) => name);
    const inTitle = matched(title), inExcerpt = matched(excerpt);
    return inTitle.length ? inTitle : inExcerpt.length ? inExcerpt : fallback;
  }
  function publisher(item) {
    if (["iseas", "fulcrum"].includes(item.sourceId)) return "iseas";
    if (item.publisherId) return item.publisherId;
    try { return new URL(item.sourceUrl || item.url).hostname.replace(/^www\./, ""); } catch { return item.sourceId; }
  }
  function groupEvents(items) {
    const groups = [];
    for (const item of items) {
      const group = groups.find((rows) => sameEvent(rows[0], item));
      if (group) { if (!group.some((row) => row.url === item.url)) group.push(item); }
      else groups.push([item]);
    }
    return groups;
  }
  function dateKey(input = new Date()) {
    const value = new Date(input).getTime();
    if (!Number.isFinite(value)) throw new Error("日期无效");
    return new Date(value + OFFSET).toISOString().slice(0, 10);
  }
  function weekStart(input = new Date()) {
    const day = new Date(`${dateKey(input)}T00:00:00Z`);
    day.setUTCDate(day.getUTCDate() - (day.getUTCDay() + 6) % 7);
    return day.toISOString().slice(0, 10);
  }
  function weekEnd(week) { return new Date(Date.parse(`${week}T00:00:00Z`) + 6 * DAY).toISOString().slice(0, 10); }
  function weekLabel(week) { return `${week.replaceAll("-", ".")} – ${weekEnd(week).replaceAll("-", ".")}`; }
  function canonicalUrl(input) {
    try {
      const url = new URL(input);
      if (url.protocol !== "https:" || url.username || url.password || url.port) return "";
      url.hash = "";
      for (const key of [...url.searchParams.keys()]) if (/^utm_|^(fbclid|gclid)$/i.test(key)) url.searchParams.delete(key);
      return url.href;
    } catch { return ""; }
  }
  function normalizeEntry(row, source, now = new Date()) {
    const title = clean(row.title).slice(0, 500), url = canonicalUrl(row.url);
    const dateParts = /^(\d{4})-(\d{2})-(\d{2})(?:T|$)/.exec(row.publishedAt || "");
    if (dateParts && new Date(Date.UTC(Number(dateParts[1]), Number(dateParts[2]) - 1, Number(dateParts[3]))).toISOString().slice(0, 10) !== dateParts[0].slice(0, 10)) return { reason: "undated" };
    const rawDate = /^\d{4}-\d{2}-\d{2}$/.test(row.publishedAt || "") ? `${row.publishedAt}T00:00:00+08:00` : row.publishedAt;
    const time = rawDate ? Date.parse(rawDate) : NaN;
    if (!Number.isFinite(time)) return { reason: "undated" };
    if (time > new Date(now).getTime()) return { reason: "future" };
    if (time < Date.parse(`${weekStart(now)}T00:00:00+08:00`) - 7 * 7 * DAY) return { reason: "outsideWindow" };
    if (!title || !url) return { reason: "invalid" };
    const excerpt = clean(row.excerpt || row.description).slice(0, 1000);
    const matchedRegions = classifyRegions(title, excerpt, [source.defaultRegion || "全球议题"]);
    const importance = assessImportance({ title, excerpt, kind: source.kind });
    if (!importance.eligible) return { reason: importance.excluded || !importance.topics.length ? "routine" : "lowImportance" };
    const score = importance.score;
    return { item: { id: url, title, url, publishedAt: new Date(time).toISOString(), week: weekStart(time), kind: source.kind,
      sourceId: source.id, sourceTitle: source.title, sourceUrl: source.siteUrl, publisherId: source.publisherId || publisher({ sourceUrl: source.siteUrl }),
      excerpt, regions: matchedRegions, score, selectionVersion: 2, selectedBy: "policy-impact-and-event-diversity" } };
  }
  function selectIssue(items, week, { region = "all", query = "" } = {}) {
    const terms = clean(query).toLowerCase().split(/\s+/).filter(Boolean);
    const compare = (a, b) => b.score - a.score || b.publishedAt.localeCompare(a.publishedAt) || a.url.localeCompare(b.url);
    const candidates = items.filter((item) => item.week === week && canonicalUrl(item.url));
    const ranked = candidates.map((item) => ({ ...item, regions: classifyRegions(item.title, item.excerpt, item.regions), importance: assessImportance(item) }))
      .filter((item) => item.importance.eligible).map((item) => ({ ...item, score: item.importance.score })).sort(compare);
    const groups = groupEvents(ranked);
    const coverage = regions.map(([name]) => {
      const rows = groups.filter((members) => members.some((item) => item.regions.includes(name)));
      return { region: name, news: rows.filter((members) => members[0].kind === "news").length,
        reports: rows.filter((members) => members[0].kind === "report").length,
        publishers: new Set(rows.flat().map(publisher)).size };
    });
    const unique = [];
    for (const members of groups) {
      const areas = [...new Set(members.flatMap((item) => item.regions))];
      if (region !== "all" && !areas.includes(region)) continue;
      const matching = members.filter((item) => terms.every((term) => `${item.title} ${item.sourceTitle} ${areas.join(" ")}`.toLowerCase().includes(term)));
      if (!matching.length) continue;
      const representative = matching[0], sourceCount = new Set(members.map(publisher)).size;
      const attention = representative.kind === "news" ? Math.min(12, (sourceCount - 1) * 6) : 0;
      const reasons = representative.importance.factors.filter((factor) => factor.points > 0).sort((a, b) => b.points - a.points)
        .slice(0, 3).map((factor) => `${factor.label}${factor.field === "excerpt" ? "（摘要）" : ""}`);
      if (attention) reasons.unshift(`${sourceCount} 家发布方关注同一事件`);
      unique.push({ ...representative, regions: areas, score: representative.score + attention, sourceCount, selectionReasons: reasons,
        related: members.filter((item) => item.url !== representative.url).map(({ title, url, sourceTitle, publishedAt }) => ({ title, url, sourceTitle, publishedAt })) });
    }
    unique.sort(compare);
    const pick = (kind, limit) => {
      const rows = unique.filter((item) => item.kind === kind), selected = [], counts = new Map(), areas = new Map();
      for (const row of rows) {
        const area = row.regions.slice().sort((a, b) => (areas.get(a) || 0) - (areas.get(b) || 0))[0];
        if ((counts.get(publisher(row)) || 0) < 3 && (region !== "all" || (areas.get(area) || 0) < 2) && selected.length < limit) {
          selected.push(row); counts.set(publisher(row), (counts.get(publisher(row)) || 0) + 1); areas.set(area, (areas.get(area) || 0) + 1);
        }
      }
      for (const row of rows) if (selected.length < limit && !selected.includes(row)) selected.push(row);
      return selected.sort(compare);
    };
    return { news: pick("news", 12), reports: pick("report", 8), available: unique.length, coverage,
      screened: candidates.length, eligible: ranked.length, grouped: ranked.length - groups.length, selectionVersion: 2 };
  }
  function markdown(snapshot, week, options = {}) {
    const issue = selectIssue(snapshot.items || [], week, options);
    const escape = (s) => clean(s).replace(/[\\`*_{}[\]<>#]/g, "\\$&");
    const lines = ["# 全球与地区形势周报", "", `周次：${weekLabel(week)}（中国时区）`, `地区：${options.region && options.region !== "all" ? options.region : "全球总览"}`, `更新时间：${snapshot.updatedAt || "尚未更新"}`,
      "筛选：依据公开标题与订阅摘要中的政策变化、公共影响及多来源关注信号；不等同于事实核验。", ""];
    for (const [label, rows] of [["重要新闻", issue.news], ["智库报告与分析", issue.reports]]) {
      if (options.kind === "news" && label !== "重要新闻" || options.kind === "report" && label === "重要新闻") continue;
      lines.push(`## ${label}`, "");
      for (const row of rows) {
        lines.push(`- ${dateKey(row.publishedAt)} · ${escape(row.sourceTitle)} · [${escape(row.title)}](<${row.url}>)`, `  入选依据：${escape(row.selectionReasons.join("；"))}`);
        for (const related of row.related) lines.push(`  - 同一事件：${escape(related.sourceTitle)} · [${escape(related.title)}](<${related.url}>)`);
        lines.push("");
      }
      if (!rows.length) lines.push("本周暂无已收录条目。", "");
    }
    return lines.join("\n");
  }
  return { regions: regions.map(([name]) => name), dateKey, weekStart, weekEnd, weekLabel, canonicalUrl, normalizeEntry, assessImportance, selectIssue, markdown };
});
