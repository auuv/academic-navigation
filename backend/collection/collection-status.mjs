export const stopLabels = {
  recall_exhausted: "候选已检查完毕", candidate_budget: "候选扫描预算已用完", page_budget: "网页访问预算已用完",
  ai_budget: "AI 请求预算已用完", time_limit: "任务时限已到", cancelled: "用户已停止", provider_error: "模型请求失败",
  result_limit: "候选召回已结束，最终结果已达收录上限", recall_time: "候选召回时限已到",
};

export function pageRetryDelay(error, now = Date.now()) {
  if (["robots_disallowed", "robots_unavailable", "tls_error", "unsafe_dns", "crawl_delay"].includes(issueCode(error))) return null;
  const code = error.code || error.cause?.code || "";
  if (![408, 429, 500, 502, 503, 504].includes(error.status) && !/ECONNRESET|EAI_AGAIN|ETIMEDOUT|ABORT_ERR/.test(code) && error.name !== "TimeoutError") return null;
  const raw = error.retryAfter;
  let delay = 1000;
  if (raw != null) {
    if (/^\d+$/.test(String(raw))) delay = Number(raw) * 1000;
    else if (Number.isFinite(Date.parse(raw))) delay = Math.max(0, Date.parse(raw) - now);
  }
  return delay > 5000 ? null : Math.max(500, delay);
}

export function issueCode(error) {
  if (error.sourceCode) return error.sourceCode;
  const code = String(error.code || error.cause?.code || "");
  const message = String(error.message || "");
  if (/CERT|TLS|SSL/.test(code) || /cert|certificate|tls|证书/i.test(message)) return "tls_error";
  if (code === "NON_PUBLIC_DNS" || /非公共地址/.test(message)) return "unsafe_dns";
  if (/ENOTFOUND|EAI_AGAIN/.test(code)) return "dns_error";
  if (/timeout|abort/i.test(error.name || "") || /ETIMEDOUT|ECONNRESET|EHOSTUNREACH|ENETUNREACH/.test(code)) return "network_error";
  if (/robots.txt.*不允许/.test(message)) return "robots_disallowed";
  if (/禁止自动访问|无法确认网站抓取规则|robots.txt.*HTTP/.test(message)) return "robots_unavailable";
  if (/抓取间隔/.test(message)) return "crawl_delay";
  if (/PDF|下载文件|内容类型/.test(message)) return "unsupported_content";
  if (/未提取到足够正文/.test(message)) return "no_readable_text";
  if (/未发现可读取/.test(message)) return "no_candidates";
  if (/HTTP (401|403|412|429)/.test(message)) return "access_restricted";
  return "request_error";
}

export function sourceReport(job) {
  const running = ["queued", "running"].includes(job.state);
  const rows = job.sources.map((source) => {
    const known = Number.isInteger(source.checked);
    const counts = { discovered: known ? source.discovered || 0 : null, checked: known ? source.checked : null, read: known ? source.read || 0 : null,
      eligible: known ? source.eligible || 0 : null, reviewed: known ? source.reviewed || 0 : null, accepted: source.count || 0,
      filtered: source.filtered || 0, readErrors: known ? source.readErrors || 0 : null, remaining: known ? source.remainingCandidates || 0 : null };
    const issues = source.issues || (source.error || source.warning ? [{ code: issueCode({ message: source.error || source.warning }), message: source.error || source.warning }] : []);
    const restricted = issues.some((issue) => ["robots_disallowed", "robots_unavailable", "access_restricted", "tls_error", "unsafe_dns", "crawl_delay", "github_private", "github_rate_limit"].includes(issue.code));
    let outcome, message;
    if (counts.accepted) {
      outcome = "collected"; message = `已收录 ${counts.accepted} 篇`;
    } else if (source.state === "failed" && issues.at(-1)?.code === "no_candidates") {
      outcome = "no_candidates"; message = "来源发现已完成，但未找到可检查的文章候选";
    } else if (source.state === "failed") {
      outcome = restricted ? "restricted" : "failed"; message = source.error || issues.at(-1)?.message || "来源发现失败";
    } else if (!known) {
      outcome = "legacy_unknown";
      message = counts.filtered ? `已排除 ${counts.filtered} 篇；旧任务未记录总扫描次数` : "旧任务未记录逐源扫描次数，不能判断正文是否已检查";
    } else if (!counts.checked) {
      outcome = running ? "waiting" : counts.discovered || !source.discoveryStarted ? "unscanned" : "no_candidates";
      message = counts.discovered ? `发现 ${counts.discovered} 个候选，正文尚未检查` : running ? "等待发现候选" : !source.discoveryStarted ? "任务停止前未进入来源发现阶段" : "未发现可检查的候选";
    } else if (counts.eligible && (source.semanticRejected || 0) < counts.eligible) {
      outcome = "not_selected";
      message = `初筛通过 ${counts.eligible} 篇，未进入最终收录`;
    } else if (counts.filtered) {
      outcome = "filtered"; message = `已排除 ${counts.filtered} 篇`;
    } else if (counts.readErrors) {
      outcome = restricted ? "restricted" : issues.some((issue) => ["unsupported_content", "no_readable_text"].includes(issue.code)) ? "unsupported" : "failed";
      message = `正文读取失败 ${counts.readErrors} 次`;
    } else {
      outcome = running ? "waiting" : "no_articles"; message = running ? "正在检查候选" : "候选仅为栏目或未能形成文章正文";
    }
    if (known && counts.checked) message += `；已检查 ${counts.checked} 个候选、提取 ${counts.read} 篇正文`;
    if (known && counts.reviewed) message += `、AI 核验 ${counts.reviewed} 篇`;
    if (!running && known && counts.remaining) message += `；另有 ${counts.remaining} 个候选未检查`;
    const details = [...new Set(issues.map((issue) => issue.message).filter(Boolean))];
    return { id: source.id, title: source.title, outcome, message, counts, issues, details };
  });
  return { rows, counts: rows.reduce((counts, row) => { counts[row.outcome] = (counts[row.outcome] || 0) + 1; return counts; }, {}),
    checkedSources: rows.filter((row) => row.counts.checked > 0).length, unknownSources: rows.filter((row) => row.counts.checked === null).length,
    totalSources: rows.length, stopReason: job.stopReason || null,
    stopMessage: job.stopReason === "result_limit" && job.recallStopReason && job.recallStopReason !== "recall_exhausted"
      ? `${stopLabels[job.recallStopReason] || job.recallStopReason}；${stopLabels.result_limit}`
      : stopLabels[job.stopReason] || (job.items.length >= job.maxArticles ? "已达到当时的总收录上限" : ""),
    legacy: rows.some((row) => row.counts.checked === null) };
}
