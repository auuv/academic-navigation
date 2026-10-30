(() => {
  const $ = (id) => document.getElementById(id);
  const dialog = $("collectionDialog");
  const selected = new Set();
  const states = { queued: "准备中", running: "采集中", completed: "已完成", failed: "未完成", cancelled: "已停止", interrupted: "已中断" };
  let sources = [], settings, initialized = false, job, polling, generation = 0, submitting = false;
  let githubConfig, githubInitialized = false, githubSaving = false;
  const cloud = window.CollectionCloud;
  const origin = () => cloud.origin();
  const clock = (value) => value ? new Date(value).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false }) : "来源未提供";
  function node(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text != null) el.textContent = text;
    return el;
  }
  function icon(name) {
    const img = document.createElement("img");
    img.src = `icons/${name}.svg`;
    img.alt = ""; img.width = img.height = 18;
    return img;
  }
  function external(text, href) {
    const link = node("a", "", text);
    try { const url = new URL(href); if (["https:", "http:"].includes(url.protocol)) link.href = url.href; } catch { /* Invalid links remain text. */ }
    link.target = "_blank"; link.rel = "noopener noreferrer";
    return link;
  }
  function status(message, warning = false) {
    $("collectionStatus").textContent = message;
    $("collectionStatus").classList.toggle("is-warning", warning);
  }
  async function api(route, body) { return cloud.api(route, body); }
  function syncProvider() {
    let host = "";
    try { host = new URL($("collectionApiBase").value).hostname; } catch { /* An unfinished URL stays custom. */ }
    $("collectionProvider").value = host === "api.deepseek.com" ? "deepseek" : "custom";
    $("collectionKeyLink").hidden = !["api.deepseek.com", "platform.deepseek.com", "chat.deepseek.com"].includes(host);
  }
  function apiKeyError(key) {
    if (key.length > 4096) return "API Key 过长，请重新复制完整原始密钥。";
    if (/^Bearer(?:\s|$)/i.test(key)) return "只填写 API Key 本身，不要包含 Bearer 前缀或请求头。";
    if (/[^\x21-\x7e]/.test(key)) return "API Key 中含有非英文字符、空白或不可见字符。请从服务商平台重新复制完整原始密钥。";
    if (/^[\"'`]|[\"'`]$|\*{3,}/.test(key)) return "请填写完整原始 API Key，不要包含引号、代码块或星号遮罩。";
    return "";
  }
  function tab(name) {
    document.querySelectorAll("[data-collection-tab]").forEach((button) => {
      const active = button.dataset.collectionTab === name;
      button.setAttribute("aria-selected", String(active)); button.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll("[data-collection-view]").forEach((view) => { view.hidden = view.dataset.collectionView !== name; });
    if (name === "history") loadHistory();
    if (name === "github" && !githubInitialized && !githubSaving) loadGithub();
  }
  const busy = () => Boolean(job && ["queued", "running"].includes(job.state));
  function updateControls() {
    $("collectionPreview").disabled = submitting || busy() || !selected.size;
    $("collectionAnalyze").disabled = submitting || busy() || !selected.size || !settings?.configured;
    $("collectionStop").hidden = !busy();
    $("collectionDownload").disabled = !job || !(job.items.length + (job.pending?.length || 0) + (job.excluded?.length || 0));
    $("collectionSelectedCount").textContent = `${selected.size} / ${sources.length}`;
    $("collectionProviderStatus").textContent = settings?.configured ? `当前模型：${settings.model}` : "AI 整理尚未配置模型";
    $("collectionArticleUrl").disabled = selected.size !== 1 || busy() || sources.some((source) => selected.has(source.id) && source.mode === "github");
    $("collectionGithubSettings").querySelectorAll("button,input,select,textarea").forEach((control) => { control.disabled = busy() || githubSaving; });
    for (const id of ["collectionTopic", "collectionLimit", "collectionRelevance", "collectionCandidateLimit", "collectionAiLimit", "collectionSelectAll", "collectionClearSources"]) $(id).disabled = busy() || submitting;
    const inputs = [...$("collectionSources").querySelectorAll("input")];
    inputs.forEach((input) => { input.checked = selected.has(input.value); input.disabled = busy() || submitting; });
    const count = inputs.filter((input) => input.checked).length;
    $("collectionSelectAll").checked = Boolean(inputs.length && count === inputs.length);
    $("collectionSelectAll").indeterminate = count > 0 && count < inputs.length;
    $("collectionSelectAll").disabled ||= !inputs.length;
    $("collectionClearSources").disabled ||= !selected.size;
  }
  function renderSelection() {
    const list = $("collectionSelection"); list.replaceChildren();
    for (const id of [...selected].slice(0, 12)) {
      const source = sources.find((source) => source.id === id);
      if (!source) continue;
      const item = node("span", "collection-selected-source", source.title);
      const remove = node("button", "collection-icon-button");
      remove.type = "button"; remove.title = `移除 ${source.title}`; remove.setAttribute("aria-label", remove.title);
      remove.append(icon("x")); remove.disabled = busy();
      remove.addEventListener("click", () => { selected.delete(id); renderSources(); });
      item.append(remove); list.append(item);
    }
    if (selected.size > 12) list.append(node("span", "collection-muted", `另 ${selected.size - 12} 个来源`));
  }
  function renderSources() {
    const filter = $("collectionSourceQuery").value.trim().toLowerCase();
    const mode = $("collectionSourceMode").value;
    const list = $("collectionSources"); list.replaceChildren();
    const matches = sources.filter((source) => (mode === "all" || source.mode === mode) && `${source.title} ${source.category} ${source.url}`.toLowerCase().includes(filter));
    for (const source of matches) {
      const label = node("label", "collection-source-choice");
      const input = document.createElement("input");
      input.type = "checkbox"; input.value = source.id; input.checked = selected.has(source.id);
      input.addEventListener("change", () => {
        if (input.checked) selected.add(source.id);
        else { selected.delete(source.id); input.checked = false; }
        renderSelection(); updateControls();
      });
      const text = node("span");
      text.append(node("strong", "", source.title), node("small", "", `${source.modeLabel} · ${source.category}`));
      label.append(input, text); list.append(label);
    }
    if (!matches.length) list.append(node("p", "collection-muted", "没有匹配的网站。"));
    renderSelection(); updateControls();
  }
  function renderJob() {
    const container = $("collectionResults");
    const expanded = new Set([...container.querySelectorAll("details[open][data-key]")].map((entry) => entry.dataset.key));
    container.replaceChildren();
    if (!job) { updateControls(); return; }
    $("collectionTaskTitle").textContent = `${job.topic || "网站内容"} · ${states[job.state] || job.state}`;
    const modeLabel = job.analyze ? "AI 筛选与分析" : "原文抓取（未调用 AI）";
    const coverage = job.sourceReport && !job.sourceReport.legacy ? ` · 已检查 ${job.sourceReport.checkedSources}/${job.sourceReport.totalSources} 个来源的候选` : "";
    status(`${modeLabel} · ${job.message} · 收录 ${job.items.length}/${job.maxArticles} 篇${job.stats ? ` · 候选 ${job.stats.checked}/${job.maxCandidates} · AI 请求 ${job.stats.aiRequests}/${job.maxAiCalls}${job.stats.githubRequests ? ` · GitHub 请求 ${job.stats.githubRequests}` : ""}` : ""}${coverage}${job.warning ? ` · ${job.warning}` : ""}${job.storageWarning ? ` · ${job.storageWarning}` : ""}`, ["failed", "interrupted"].includes(job.state) || Boolean(job.storageWarning || job.warning));
    $("collectionPlan").hidden = !job.topicPlan;
    const plan = $("collectionPlanContent"); plan.replaceChildren();
    if (job.topicPlan) {
      plan.append(node("p", "", job.topicPlan.concepts.length ? `${job.topicPlan.method === "ai" ? "AI 扩展" : "本地中英文词表"}：${job.topicPlan.concepts.map((entry) => entry.terms.join(" / ")).join("；")}` : "未指定主题 · 近期内容"));
      plan.append(node("p", "", `相关性：${job.analyze ? job.relevance === "high" ? "仅高度相关" : "相关及高度相关" : "正文关键词匹配"} · 候选上限 ${job.maxCandidates} · AI 请求上限 ${job.maxAiCalls} · 任务时限 20 分钟`));
      if (job.githubRateLimit?.remaining != null) plan.append(node("p", "", `GitHub API 剩余额度：${job.githubRateLimit.remaining}/${job.githubRateLimit.limit ?? "未知"}${job.githubRateLimit.resetAt ? ` · 重置于 ${clock(job.githubRateLimit.resetAt)}` : ""}`));
    }
    $("collectionExcluded").hidden = !job.excluded?.length;
    $("collectionExcludedTitle").textContent = `排除记录 · ${job.excluded?.length || 0}`;
    const excluded = $("collectionExcludedItems"); excluded.replaceChildren();
    for (const item of job.excluded || []) {
      const row = node("p", "collection-muted"); row.append(external(item.title, item.url), node("br"), node("span", "", `${item.sourceTitle} · ${item.reason}`)); excluded.append(row);
    }
    for (const item of [...job.items, ...(job.pending || [])]) {
      const article = node("article", "collection-result");
      const heading = node("h3"); heading.append(external(item.title, item.url));
      article.append(node("div", "collection-result-meta", `${item.sourceTitle} · ${item.pageType || "网页正文"} · 抓取于 ${clock(item.fetchedAt)}`), heading, node("p", "collection-muted", `发布日期：${item.publishedAt || "来源未提供"}${item.authors ? ` · ${item.authors}` : ""}`));
      if (item.github) article.append(node("p", "collection-muted", `${item.github.language || "语言未提供"} · Stars ${item.github.stars ?? "未知"} · Forks ${item.github.forks ?? "未知"} · ${item.github.license || "许可证未提供"} · 仓库更新于 ${clock(item.github.updatedAt)}`));
      if (job.pending?.some((entry) => entry.id === item.id)) article.append(node("p", "collection-warning", "待核验原文 · 尚未计入收录结果"));
      if (item.analysis) {
        const relevance = { high: "与主题高度相关", medium: "与主题部分相关", low: "与主题相关性较低", unknown: "相关性未判断" };
        article.append(node("p", "collection-relevance", relevance[item.analysis.relevance]), node("p", "collection-summary", item.analysis.summary));
        const points = node("ul", "collection-points");
        for (const point of item.analysis.points) points.append(node("li", "", point));
        article.append(points);
        if (item.analysis.keywords.length) article.append(node("p", "collection-muted", item.analysis.keywords.join(" · ")));
        if (item.analysis.evidence.length) {
          const evidence = node("details", "collection-evidence");
          evidence.dataset.key = `evidence:${item.id}`; evidence.open = expanded.has(evidence.dataset.key);
          evidence.append(node("summary", "", `原文依据 · ${item.analysis.evidence.length}`));
          for (const quote of item.analysis.evidence) evidence.append(node("blockquote", "", quote));
          article.append(evidence);
        }
      }
      if (item.state === "analyzing") article.append(node("p", "collection-muted", "正在进行 AI 整理…"));
      if (item.relevanceCheck) article.append(node("p", "collection-muted", `相关性依据：${item.relevanceCheck.reason}`));
      if (!item.analysis && item.topicMatch?.matched.length) article.append(node("p", "collection-muted", `正文命中：${item.topicMatch.matched.join(" · ")}`));
      if (item.error) article.append(node("p", "collection-warning", item.error));
      const raw = node("details", "collection-raw");
      raw.dataset.key = `raw:${item.id}`; raw.open = expanded.has(raw.dataset.key);
      raw.append(node("summary", "", `抓取原文${item.truncated ? " · 节选" : ""}`), node("p", "", item.text));
      article.append(raw); container.append(article);
    }
    const report = job.sourceReport;
    $("collectionSourceReport").hidden = !report;
    if (report) {
      const labels = { collected: "已收录", filtered: "相关性或重复排除", not_selected: "初筛通过但未入选", unscanned: "未检查", no_candidates: "无候选", unsupported: "提取器不支持", no_articles: "非文章候选", restricted: "访问检查受限", failed: "读取失败", waiting: "等待处理", legacy_unknown: "历史统计缺失" };
      $("collectionSourceReportTitle").textContent = `来源覆盖与诊断 · ${Object.entries(report.counts).map(([key, value]) => `${labels[key] || key} ${value}`).join(" · ")}`;
      $("collectionSourceReportStop").textContent = `${report.stopMessage || (busy() ? "任务处理中" : "任务已结束")}${report.legacy ? " · 旧任务未保存逐源扫描次数，不推断为抓取失败或未扫描。" : ""}`;
      const rows = $("collectionSourceReportRows"); rows.replaceChildren();
      for (const source of report.rows) {
        const row = node("div", `collection-source-report-row is-${source.outcome}`);
        row.append(node("strong", "", `${source.title} · ${labels[source.outcome] || source.outcome}`), node("p", "collection-muted", source.message));
        for (const detail of source.details) if (detail !== source.message) row.append(node("p", "collection-muted", detail));
        rows.append(row);
      }
    }
    updateControls(); renderSelection();
  }
  async function poll(id, restoreForm = false) {
    clearTimeout(polling); const current = ++generation;
    try {
      const result = await api(`/jobs/${id}`);
      if (current !== generation) return;
      job = result;
      if (busy() || restoreForm) { selected.clear(); for (const source of job.sources) selected.add(source.id); }
      if (restoreForm) {
        $("collectionTopic").value = job.topic;
        $("collectionLimit").value = job.maxArticles;
        $("collectionCandidateLimit").value = job.maxCandidates || 200;
        $("collectionCandidateLimit").min = job.maxArticles;
        $("collectionAiLimit").value = job.maxAiCalls || 60;
        $("collectionRelevance").value = job.relevance || "related";
        $("collectionArticleUrl").value = "";
        $("collectionSourceMode").value = new Set(job.sources.map((source) => source.mode)).size === 1 ? job.sources[0].mode : "all";
        renderSources();
      }
      renderJob();
      if (dialog.open && busy()) polling = setTimeout(() => poll(id), 1800);
    } catch (error) { status(error.message || "连接失败，请稍后重新打开记录。", true); }
  }
  async function loadHistory() {
    const list = $("collectionHistory"); list.replaceChildren(node("p", "collection-muted", "正在读取记录…"));
    try {
      const jobs = await api("/jobs"); list.replaceChildren();
      for (const saved of jobs) {
        const row = node("button", "collection-history-row"); row.type = "button";
        const title = node("span");
        title.append(node("strong", "", saved.topic || "网站内容"), node("small", "", `${clock(saved.createdAt)} · ${saved.analyze ? "AI 整理" : "原文预览"}`));
        row.append(title, node("span", "", `${states[saved.state] || saved.state} · ${saved.count} 篇${saved.pendingCount ? ` · 待完成 ${saved.pendingCount} 篇` : ""}`));
        row.addEventListener("click", () => { tab("capture"); poll(saved.id, true); }); list.append(row);
      }
      if (!jobs.length) list.append(node("p", "collection-muted", "尚无采集记录。"));
    } catch (error) { list.replaceChildren(node("p", "collection-warning", error.message)); }
  }
  function sourceOptions() {
    const select = $("collectionSourceMode"), mode = select.value;
    select.replaceChildren(new Option("全部板块", "all"));
    for (const [key, label] of new Map(sources.map((source) => [source.mode, source.modeLabel]))) select.add(new Option(label, key));
    select.value = [...select.options].some((option) => option.value === mode) ? mode : "all";
  }
  async function initialize() {
    const [config, entries] = await Promise.all([api("/settings"), api("/sources")]);
    settings = config; sources = entries;
    $("collectionApiBase").value = settings.apiBase; $("collectionModel").value = settings.model;
    syncProvider();
    $("collectionKey").placeholder = settings.keyError ? "已保存密钥格式无效，请重新输入" : settings.hasKey ? "已保存，留空保留" : "输入 API Key";
    $("collectionSettingsStatus").textContent = settings.keyError || "";
    sourceOptions();
    initialized = true; renderSources(); status(settings.keyError || settings.storageWarning || "选择来源后开始采集。", Boolean(settings.keyError || settings.storageWarning));
  }
  async function open(source, view = "capture") {
    if (!dialog.open) dialog.showModal();
    if (!cloud.ready(() => open(source, view))) return;
    tab(view);
    try {
      if (!initialized) { status("正在读取云端采集配置…"); await initialize(); }
      if (source) {
        const id = typeof source === "string" ? source : `${source.mode}:${source.url}`;
        const entry = sources.find((entry) => entry.id === id);
        if (entry) {
          if (!busy()) { selected.clear(); selected.add(id); }
          $("collectionSourceMode").value = entry.mode; $("collectionSourceQuery").value = ""; $("collectionArticleUrl").value = "";
          renderSources();
        }
      }
      const jobs = await api("/jobs"); const active = jobs.find((entry) => ["queued", "running"].includes(entry.state));
      if (active) poll(active.id, true); else if (job) poll(job.id);
    } catch (error) { status(error.message, true); }
  }
  async function start(analyze) {
    if (submitting) return;
    if (["collectionTopic", "collectionLimit", "collectionCandidateLimit", "collectionAiLimit", "collectionArticleUrl"].some((id) => !$(id).reportValidity())) return;
    submitting = true; updateControls();
    try {
      const result = await api("/jobs", { sourceIds: [...selected], topic: $("collectionTopic").value, maxArticles: Number($("collectionLimit").value), maxCandidates: Number($("collectionCandidateLimit").value), maxAiCalls: Number($("collectionAiLimit").value), relevance: $("collectionRelevance").value, analyze, articleUrl: !$("collectionArticleUrl").disabled ? $("collectionArticleUrl").value : "" });
      await poll(result.id);
    } catch (error) { status(error.message, true); if (error.jobId) await poll(error.jobId); }
    finally { submitting = false; updateControls(); }
  }
  async function saveModel(test = false) {
    const form = $("collectionSettings"), base = $("collectionApiBase");
    let host = "";
    try { host = new URL(base.value).hostname; } catch { /* Native URL validation reports incomplete input. */ }
    const invalid = ["platform.deepseek.com", "chat.deepseek.com"].includes(host) ? "这是 DeepSeek 网页，不是 API 地址。请使用 https://api.deepseek.com，密钥填写在 API Key 中。" : "";
    base.setCustomValidity(invalid);
    if (invalid) $("collectionSettingsStatus").textContent = invalid;
    const key = $("collectionKey"), incoming = key.value.trim();
    let sameOrigin = false;
    try { sameOrigin = settings?.apiBase && new URL(base.value).origin === new URL(settings.apiBase).origin; } catch { /* Native validation handles incomplete URLs. */ }
    const keyError = $("collectionClearKey").checked ? "" : incoming ? apiKeyError(incoming) : sameOrigin ? settings.keyError || "" : "";
    key.setCustomValidity(keyError);
    if (!invalid && keyError) $("collectionSettingsStatus").textContent = keyError;
    if (!form.reportValidity()) return;
    const controls = [...form.querySelectorAll("button,input,select")]; controls.forEach((control) => { control.disabled = true; });
    $("collectionSettingsStatus").textContent = test ? "正在保存并测试连接…" : "正在保存…";
    let saved = false;
    try {
      settings = await api("/settings", { apiBase: $("collectionApiBase").value, model: $("collectionModel").value, apiKey: $("collectionKey").value, clearKey: $("collectionClearKey").checked });
      saved = true;
      $("collectionKey").value = ""; $("collectionClearKey").checked = false;
      $("collectionKey").placeholder = settings.hasKey ? "已保存，留空保留" : "输入 API Key";
      $("collectionApiBase").value = settings.apiBase; syncProvider(); updateControls();
      $("collectionSettingsStatus").textContent = test ? `配置已保存。${(await api("/test", {})).message}` : "配置已保存。";
    } catch (error) { $("collectionSettingsStatus").textContent = `${saved ? "配置已保存，但连接测试失败：" : ""}${error.message}`; }
    finally { controls.forEach((control) => { control.disabled = false; }); }
  }
  function githubFields() {
    $("collectionGithubRepositories").value = githubConfig.repositories.join("\n");
    $("collectionGithubContent").value = githubConfig.content;
    $("collectionGithubToken").value = "";
    $("collectionGithubToken").placeholder = githubConfig.tokenError ? "已保存令牌无效，请重新输入" : githubConfig.hasToken ? "已保存，留空保留" : "不填则匿名访问公开仓库";
    $("collectionGithubClearToken").checked = false;
  }
  async function loadGithub() {
    githubSaving = true; updateControls();
    $("collectionGithubStatus").textContent = "正在读取 GitHub 配置…";
    try {
      githubConfig = await api("/github/settings"); githubInitialized = true;
      githubFields();
      $("collectionGithubStatus").textContent = githubConfig.tokenError || githubConfig.warning || "";
    } catch (error) { $("collectionGithubStatus").textContent = error.message; }
    finally { githubSaving = false; updateControls(); }
  }
  async function saveGithub(test = false) {
    if (githubSaving || busy() || !$("collectionGithubSettings").reportValidity()) return;
    const key = $("collectionGithubToken"), incoming = key.value.trim();
    const error = $("collectionGithubClearToken").checked ? "" : incoming ? apiKeyError(incoming).replaceAll("API Key", "GitHub Token") : githubConfig?.tokenError || "";
    key.setCustomValidity(error);
    if (error) { $("collectionGithubStatus").textContent = error; key.reportValidity(); return; }
    githubSaving = true; updateControls();
    $("collectionGithubStatus").textContent = "正在保存 GitHub 配置…";
    let saved = false;
    try {
      githubConfig = await api("/github/settings", { repositories: $("collectionGithubRepositories").value, content: $("collectionGithubContent").value, token: key.value, clearToken: $("collectionGithubClearToken").checked });
      saved = true; githubInitialized = true; githubFields();
      sources = await api("/sources"); sourceOptions();
      for (const id of selected) if (!sources.some((source) => source.id === id)) selected.delete(id);
      renderSources();
      if (test) $("collectionGithubStatus").textContent = `GitHub 配置已保存。${(await api("/github/test", {})).message}`;
      else {
        selected.clear(); sources.filter((source) => source.mode === "github").forEach((source) => selected.add(source.id));
        $("collectionSourceMode").value = selected.size ? "github" : "all";
        $("collectionSourceQuery").value = ""; $("collectionArticleUrl").value = "";
        tab("capture"); renderSources(); status(`GitHub 配置已保存，已选择 ${selected.size} 个公开仓库。`);
      }
    } catch (error) { $("collectionGithubStatus").textContent = `${saved ? "GitHub 配置已保存，但后续操作失败：" : ""}${error.message}`; }
    finally { githubSaving = false; updateControls(); }
  }
  $("collectionOpen").addEventListener("click", () => open());
  $("collectionClose").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => { clearTimeout(polling); generation++; });
  document.querySelectorAll("[data-collection-tab]").forEach((button) => {
    button.addEventListener("click", () => tab(button.dataset.collectionTab));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      const buttons = [...document.querySelectorAll("[data-collection-tab]")];
      const next = buttons[(buttons.indexOf(button) + (event.key === "ArrowRight" ? 1 : buttons.length - 1)) % buttons.length];
      event.preventDefault(); next.focus(); tab(next.dataset.collectionTab);
    });
  });
  $("collectionSourceMode").addEventListener("change", renderSources);
  $("collectionSourceQuery").addEventListener("input", renderSources);
  $("collectionSelectAll").addEventListener("change", () => {
    for (const input of $("collectionSources").querySelectorAll("input")) {
      if ($("collectionSelectAll").checked) selected.add(input.value); else selected.delete(input.value);
    }
    renderSelection(); updateControls();
  });
  $("collectionClearSources").addEventListener("click", () => { selected.clear(); renderSelection(); updateControls(); });
  $("collectionLimit").addEventListener("input", () => {
    const limit = Number($("collectionLimit").value) || 1;
    $("collectionCandidateLimit").min = limit;
    if (Number($("collectionCandidateLimit").value) < limit) $("collectionCandidateLimit").value = limit;
  });
  $("collectionPreview").addEventListener("click", () => start(false));
  $("collectionAnalyze").addEventListener("click", () => start(true));
  $("collectionStop").addEventListener("click", async () => { try { await api(`/jobs/${job.id}/cancel`, {}); poll(job.id); } catch (error) { status(error.message, true); } });
  $("collectionDownload").addEventListener("click", async () => {
    if (!job) return;
    try {
      const text = await cloud.download("/jobs/" + job.id + "/export");
      const url = URL.createObjectURL(new Blob([text], {type:"text/markdown;charset=utf-8"}));
      const anchor = node("a"); anchor.href = url; anchor.download = "AI采集-" + job.id + ".md";
      document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch(error) { status(error.message, true); }
  });
  $("collectionSettings").addEventListener("submit", (event) => { event.preventDefault(); saveModel(); });
  $("collectionTestModel").addEventListener("click", () => saveModel(true));
  $("collectionKey").addEventListener("input", () => $("collectionKey").setCustomValidity(""));
  $("collectionClearKey").addEventListener("change", () => $("collectionKey").setCustomValidity(""));
  $("collectionGithubSettings").addEventListener("submit", (event) => { event.preventDefault(); saveGithub(); });
  $("collectionGithubTest").addEventListener("click", () => saveGithub(true));
  $("collectionGithubToken").addEventListener("input", () => $("collectionGithubToken").setCustomValidity(""));
  $("collectionGithubClearToken").addEventListener("change", () => $("collectionGithubToken").setCustomValidity(""));
  $("collectionApiBase").addEventListener("input", () => { $("collectionApiBase").setCustomValidity(""); syncProvider(); });
  $("collectionProvider").addEventListener("change", () => {
    if ($("collectionProvider").value === "deepseek") {
      $("collectionApiBase").value = "https://api.deepseek.com";
      $("collectionApiBase").setCustomValidity("");
      $("collectionModel").value = "";
      $("collectionModel").placeholder = "填写 DeepSeek 当前提供的模型名称";
      $("collectionKey").value = ""; $("collectionClearKey").checked = false;
      $("collectionKey").setCustomValidity("");
      $("collectionKey").placeholder = settings?.hasKey && new URL(settings.apiBase).hostname === "api.deepseek.com" ? "已保存，留空保留" : "输入 DeepSeek API Key";
      $("collectionSettingsStatus").textContent = "DeepSeek 配置待保存。";
      $("collectionKeyLink").hidden = false;
    }
  });
  cloud.onLogout(() => { clearTimeout(polling); generation++; initialized = false; githubInitialized = false; sources = []; selected.clear(); settings = null; githubConfig = null; job = null; $("collectionResults").replaceChildren(); $("collectionHistory").replaceChildren(); renderSelection(); updateControls(); });
  window.AICollection = { createButton(source) {
    const button = node("button", "collection-card-button"); button.type = "button";
    button.title = `AI 采集：${source.title}`; button.setAttribute("aria-label", button.title); button.append(icon("scan-text"));
    button.addEventListener("click", () => open(source)); return button;
  } };
  const url = new URL(location.href);
  const view = url.searchParams.get("collection");
  if (["capture", "settings", "history", "github"].includes(view)) {
    open(url.searchParams.get("source"), view);
    if (location.protocol !== "file:") {
      url.searchParams.delete("collection"); url.searchParams.delete("source");
      history.replaceState(history.state, "", url.href);
    }
  }
})();
