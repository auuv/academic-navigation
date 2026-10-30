import { parseHTML } from "linkedom";

const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
const adapters = {
  csis: { cards: "article.article-search-listing", title: "h3 a", date: ".contributors .inline-block", summary: ".search-listing--summary", path: /^\/analysis\// },
  cfr: { cards: "article[aria-labelledby]", title: "h3 a, h2 a", date: "time[datetime]", summary: ".summary, [data-summary]", path: /^\/articles\// },
  brookings: { cards: "article.article", title: ".article-title", link: "a.overlay-link", date: "p.date", summary: ".article-summary", path: /^\/articles\// },
  bruegel: { cards: "article.c-card", title: ".c-card__title a", date: "time[datetime]", summary: ".c-card__description, .c-card__teaser", path: /^\/(?:analysis|policy-brief|working-paper|report)\// }
};

// Text dates come only from a configured publication-date element, never the page body,
// URL year, copyright, dateModified, or the time at which this collector ran.
export function publicationDate(value) {
  const text = clean(value).replace(/^—\s*/, "");
  const iso = /^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}:\d{2}:\d{2}(?:\.\d+)?)(Z|[+-]\d{2}:?\d{2})?)?$/.exec(text);
  if (iso) {
    const time = iso[2] ? `${iso[1]}T${iso[2]}${iso[3] || "+08:00"}` : iso[1];
    return Number.isFinite(Date.parse(time)) ? time : "";
  }
  const months = "january february march april may june july august september october november december".split(" ");
  const match = /^(?:([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})|(\d{1,2})\s+([A-Za-z]+)\s+(\d{4}))$/.exec(text);
  if (!match) return "";
  const month = months.indexOf((match[1] || match[5]).toLowerCase()), day = Number(match[2] || match[4]), year = Number(match[3] || match[6]);
  if (month < 0 || day < 1 || day > new Date(Date.UTC(year, month + 1, 0)).getUTCDate()) return "";
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseWeeklyListing(response, source) {
  const dom = ({ window: { document: parseHTML(response.text).document, close() {} } });
  try {
    const d = dom.window.document, rows = [], seen = new Set();
    const add = (title, link, date, description, path) => {
      let url;
      try { url = new URL(link, response.url); } catch { return; }
      if (url.protocol !== "https:" || url.username || url.password || !path.test(url.pathname) || seen.has(url.href)) return;
      const publishedAt = publicationDate(date);
      if (!clean(title) || !publishedAt) return;
      seen.add(url.href); rows.push({ title: clean(title).slice(0, 500), url: url.href, publishedAt,
        description: clean(description).slice(0, 1000), dateEvidence: "official-listing" });
    };
    if (source.listingAdapter === "iseas") {
      for (const panel of d.querySelectorAll(".featured-one")) {
        if (clean(panel.querySelector(".featured-one-header")?.textContent) !== "ISEAS PERSPECTIVE") continue;
        const content = panel.querySelector(".featured-one-content");
        if (!content) continue;
        const dates = [...content.children].filter((node) => node.tagName === "DIV" && /^\d{4}-\d{2}-\d{2} /.test(clean(node.textContent)));
        const links = [...content.querySelectorAll("a[href]")].filter((node) => /\/articles-commentaries\/iseas-perspective\/\d{4}-/.test(node.href));
        // This publisher emits parallel date and link arrays. A mismatch must not guess dates.
        if (dates.length !== links.length) continue;
        links.forEach((link, index) => add(link.textContent, link.href, dates[index].textContent, "", /^\/articles-commentaries\/iseas-perspective\/\d{4}-/));
      }
    } else {
      const adapter = adapters[source.listingAdapter];
      if (!adapter) throw new Error("来源未配置可验证日期的列表适配器");
      for (const card of [...d.querySelectorAll(adapter.cards)].slice(0, 100)) {
        if (card.querySelector(adapter.cards)) continue;
        const title = card.querySelector(adapter.title), link = adapter.link ? card.querySelector(adapter.link) : title;
        const date = card.querySelector(adapter.date);
        add(title?.textContent, link?.href, date?.getAttribute("datetime") || date?.textContent, card.querySelector(adapter.summary)?.textContent, adapter.path);
      }
    }
    return rows;
  } finally { dom.window.close(); }
}
