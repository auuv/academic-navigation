import { normalizeText } from "./collection-extract.mjs";

const API = "https://api.github.com";
const fail = (message, sourceCode = "request_error") => Object.assign(new Error(message), { sourceCode });
const short = (value, length = 500) => typeof value === "string" ? value.slice(0, length) : "";
const validDate = (value) => typeof value === "string" && Number.isFinite(Date.parse(value)) ? value : "";

export function githubTokenError(token) {
  if (token.length > 4096 || /[^\x21-\x7e]/.test(token) || /^Bearer(?:\s|$)/i.test(token) || /^["'`]|["'`]$|\*{3,}/.test(token)) return "GitHub Token 格式无效，请填写完整原始令牌，不含空白、引号或 Bearer 前缀。";
  return "";
}

export function githubRepository(input) {
  if (typeof input !== "string" || input.length > 300) throw fail("仓库应填写 owner/repo 或完整的 GitHub 仓库网址");
  let name = input.trim();
  if (name.includes("://")) {
    let url;
    try { url = new URL(name); } catch { throw fail("GitHub 仓库网址无效"); }
    if (url.origin !== "https://github.com" || url.username || url.password || url.search || url.hash) throw fail("仅支持不含凭据或查询参数的 https://github.com 仓库网址");
    name = url.pathname.replace(/^\/|\/$/g, "");
  }
  name = name.replace(/\.git$/i, "");
  const parts = name.split("/");
  if (parts.length !== 2 || !/^[a-z\d][a-z\d-]{0,38}$/i.test(parts[0]) || !/^[a-z\d_.-]{1,100}$/i.test(parts[1]) || [".", ".."].includes(parts[1])) throw fail("仓库应填写 owner/repo，不支持组织首页、文件页或其他域名");
  return name.toLowerCase();
}

export function validateGithubSettings(value, previous = {}) {
  const raw = value.repositories ?? previous.repositories ?? [];
  const rows = typeof raw === "string" ? raw.split(/\r?\n/).filter((row) => row.trim()) : raw;
  if (!Array.isArray(rows) || rows.length > 30) throw fail("最多配置 30 个 GitHub 公开仓库，每行一个");
  const repositories = [...new Set(rows.map(githubRepository))];
  const content = value.content ?? previous.content ?? "both";
  if (!["both", "readme", "releases"].includes(content)) throw fail("GitHub 采集内容选项无效");
  if (value.token != null && typeof value.token !== "string") throw fail("GitHub Token 格式无效");
  const token = value.clearToken === true ? "" : (value.token || "").trim() || previous.token || "";
  if (githubTokenError(token)) throw fail(githubTokenError(token));
  return { repositories, content, token };
}

export function githubSources(repositories) {
  return repositories.map((repository) => ({ id: `github:https://github.com/${repository}`, title: repository, url: `https://github.com/${repository}`,
    category: "公开仓库", mode: "github", modeLabel: "GitHub", githubRepository: repository }));
}

export function createGithubClient({ request, token = "", signal, beforeCall = () => {}, onRate = () => {} }) {
  if (githubTokenError(token)) throw fail(githubTokenError(token), "access_restricted");
  let tail = Promise.resolve(), blocked;
  async function get(endpoint) {
    if (!/^\/(?:rate_limit|repos\/[a-z\d-]+\/[a-z\d_.-]+(?:\/readme|\/releases\?per_page=20)?)$/i.test(endpoint)) throw fail("GitHub API 路径不受支持");
    const operation = tail.catch(() => {}).then(async () => {
      signal?.throwIfAborted();
      if (blocked) throw blocked;
      beforeCall();
      const response = await request(`${API}${endpoint}`, { method: "GET", headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2026-03-10", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        signal, redirects: 0, timeout: 30000, maxBytes: 2 * 1024 * 1024, virtualDnsHosts: ["api.github.com"] });
      const headers = response.headers || {};
      const numeric = (name) => headers[name] != null && Number.isFinite(Number(headers[name])) ? Number(headers[name]) : null;
      const rate = { limit: numeric("x-ratelimit-limit"), remaining: numeric("x-ratelimit-remaining"), resetAt: null };
      const reset = numeric("x-ratelimit-reset");
      if (reset != null && Number.isFinite(new Date(reset * 1000).getTime())) rate.resetAt = new Date(reset * 1000).toISOString();
      onRate(rate);
      if (response.status === 429 || response.status === 403 && (rate.remaining === 0 || headers["retry-after"])) {
        blocked = fail(`GitHub API 请求额度或频率受限，本任务不再请求 GitHub${rate.resetAt ? `；额度重置时间 ${rate.resetAt}` : ""}`, "github_rate_limit");
        throw blocked;
      }
      if (response.status === 401) { blocked = fail("GitHub Token 鉴权失败，请检查令牌是否有效", "access_restricted"); throw blocked; }
      if (response.status === 403) {
        blocked = fail("GitHub API 拒绝访问，可能是权限或频率限制；本任务停止后续 GitHub 请求", "access_restricted");
        throw blocked;
      }
      if (response.status === 404) throw fail("GitHub 资源不存在或不可访问；仅支持公开仓库", "github_not_found");
      if ([301, 302, 307, 308].includes(response.status)) throw fail("GitHub 仓库已迁移，请更新仓库地址后重试；未转发令牌");
      if (response.status !== 200) throw fail(`GitHub API 返回 HTTP ${response.status}`);
      if (rate.remaining === 0) blocked = fail(`GitHub API 额度已用完，本任务不再请求 GitHub${rate.resetAt ? `；额度重置时间 ${rate.resetAt}` : ""}`, "github_rate_limit");
      try { return JSON.parse(response.text); } catch { throw fail("GitHub API 未返回有效 JSON"); }
    });
    tail = operation;
    return operation;
  }
  async function documents(repository, content = "both") {
    repository = githubRepository(repository);
    const base = `/repos/${repository}`;
    const repo = await get(base);
    if (repo.private !== false || repo.visibility && repo.visibility !== "public") throw fail("仅采集公开仓库，私有或内部仓库不会读取或发送至模型", "github_private");
    if (typeof repo.full_name !== "string" || repo.full_name.toLowerCase() !== repository) throw fail("GitHub 返回的仓库标识与配置不一致");
    const url = `https://github.com/${repository}`;
    const github = { repository, stars: Number.isSafeInteger(repo.stargazers_count) ? repo.stargazers_count : null, forks: Number.isSafeInteger(repo.forks_count) ? repo.forks_count : null,
      language: short(repo.language, 100), license: short(repo.license?.spdx_id, 100), updatedAt: validDate(repo.updated_at) };
    const overview = normalizeText([repo.full_name, short(repo.description, 2000), `Language: ${github.language || "未提供"}`, `License: ${github.license || "未提供"}`,
      `Stars: ${github.stars ?? "未提供"}`, `Forks: ${github.forks ?? "未提供"}`, ...(Array.isArray(repo.topics) ? repo.topics.slice(0, 30).map((topic) => short(topic, 100)) : [])].join("\n"));
    const issues = [], candidates = [];
    const document = (title, href, text, pageType, publishedAt = "") => ({ title, url: href, pageType, publishedAt, extracted: { title, text: normalizeText(text).slice(0, 16000),
      truncated: normalizeText(text).length > 16000, publishedAt, authors: short(repo.owner?.login, 100), articleLike: true, candidates: [], github } });
    const safeLink = (input, prefix) => {
      try {
        const link = new URL(input);
        if (link.origin === "https://github.com" && !link.username && !link.password && !link.search && !link.hash && link.pathname.toLowerCase().startsWith(`/${repository}/${prefix}`)) return link.href;
      } catch { /* API-provided links are not trusted as request targets. */ }
      return "";
    };
    if (content !== "releases") {
      try {
        const file = await get(`${base}/readme`);
        if (file.encoding !== "base64" || typeof file.content !== "string" || !/^[a-z\d+/=\s]*$/i.test(file.content)) throw fail("README 编码不受支持", "unsupported_content");
        const text = Buffer.from(file.content, "base64").toString("utf8");
        if (!text.trim()) throw fail("README 为空", "no_readable_text");
        candidates.push(document(`${repo.full_name} · README`, safeLink(file.html_url, "blob/") || url, `${overview}\n\n${text}`, "GitHub README"));
      } catch (error) {
        signal?.throwIfAborted();
        if (error.code === "COLLECTION_BUDGET") throw error;
        issues.push(error);
        candidates.push(document(`${repo.full_name} · 仓库介绍`, url, overview, "GitHub 仓库介绍"));
      }
    }
    if (content !== "readme") {
      try {
        const releases = await get(`${base}/releases?per_page=20`);
        if (!Array.isArray(releases)) throw fail("GitHub 版本列表格式无效");
        for (const release of releases.slice(0, 20)) {
          if (release.draft !== false || typeof release.body !== "string" || !release.body.trim()) continue;
          const href = safeLink(release.html_url, "releases/tag/");
          if (!href) continue;
          const title = `${repo.full_name} · ${short(release.name || release.tag_name, 250)}`;
          candidates.push(document(title, href, `${repo.full_name}\n${short(release.tag_name, 250)}\n${release.body}`, release.prerelease ? "GitHub 预发布说明" : "GitHub 版本发布", validDate(release.published_at)));
        }
      } catch (error) {
        signal?.throwIfAborted();
        if (error.code === "COLLECTION_BUDGET") throw error;
        issues.push(error);
      }
    }
    return { candidates, issues };
  }
  return { get, documents };
}
