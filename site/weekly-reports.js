(() => {
    const core = window.WeeklyCore, $ = (id) => document.getElementById(id);
    let snapshot = window.WeeklyData || { items: [], sources: [] };
    let active = false, started = false, refreshing = false, loading = false, connectionFailed = false, query = "", week = "", region = "all", kind = "all", message = "", lastLoaded = 0;
    const fileMode = false;
    const time = (value) => value ? new Date(value).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false, month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }) : "尚未更新";
    const currentWeek = () => core.weekStart();
    const weeks = () => [...new Set([currentWeek(), ...(snapshot.items || []).map((item) => item.week)])].sort().reverse();
    function node(tag, className, text) {
        const el = document.createElement(tag);
        if (className)
            el.className = className;
        if (text != null)
            el.textContent = text;
        return el;
    }
    function link(title, url) {
        const el = node("a", "", title), href = core.canonicalUrl(url);
        if (href)
            el.href = href;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
        return el;
    }
    async function api() {
        const response = await fetch(new URL("data/weekly.json", document.baseURI), { cache: "no-store", signal: AbortSignal.timeout(10000) });
        if (!response.ok) throw new Error("周报文件暂不可用");
        const data = await response.json();
        if (data.schemaVersion !== 1 || !Array.isArray(data.items) || !Array.isArray(data.sources)) throw new Error("周报数据格式无效");
        return data;
    }
    function renderRows(target, rows, label) {
        target.replaceChildren();
        if (!rows.length) {
            target.append(node("p", "weekly-empty", query || region !== "all" ? `本期没有匹配的${label}。` : `本周暂无已收录${label}。`));
            return;
        }
        for (const item of rows) {
            const article = node("article", "weekly-entry");
            const date = node("time", "weekly-date", core.dateKey(item.publishedAt).slice(5).replace("-", "/"));
            date.dateTime = item.publishedAt;
            const content = node("div", "weekly-entry-content"), heading = node("h4");
            heading.append(link(item.title, item.url));
            const meta = node("p", "weekly-entry-meta");
            meta.append(link(item.sourceTitle, item.sourceUrl), node("span", "", ` · ${item.regions.join(" / ")}`));
            const reasons = node("details", "weekly-entry-reasons");
            reasons.append(node("summary", "", `入选依据：${item.selectionReasons.join(" · ")}`));
            const evidence = node("ul");
            for (const factor of item.importance.factors) {
                evidence.append(node("li", "", `${factor.label} · ${factor.field === "excerpt" ? "订阅摘要" : factor.field === "title" ? "标题" : "议题识别"}：“${factor.evidence}”`));
            }
            reasons.append(evidence);
            if (item.importance.factors.some((factor) => factor.field === "excerpt") && item.excerpt)
                reasons.append(node("p", "", `订阅摘要：${item.excerpt}`));
            content.append(heading, meta, reasons);
            if (item.related.length) {
                const details = node("details", "weekly-related"), summary = node("summary", "", `同一事件的其他报道 ${item.related.length} 篇 · ${item.sourceCount} 家发布方`);
                details.append(summary);
                const list = node("ul");
                for (const row of item.related) {
                    const li = node("li");
                    li.append(node("span", "", `${core.dateKey(row.publishedAt).slice(5)} · ${row.sourceTitle} · `), link(row.title, row.url));
                    list.append(li);
                }
                details.append(list);
                content.append(details);
            }
            article.append(date, content);
            target.append(article);
        }
    }
    function render() {
        if (!active)
            return;
        const availableWeeks = weeks();
        if (!availableWeeks.includes(week))
            week = currentWeek();
        const weekSelect = $("weeklyWeek");
        const labels = availableWeeks.map((value) => `${core.weekLabel(value)}${value === currentWeek() ? "（本周）" : ""}`);
        if (weekSelect.options.length !== availableWeeks.length || availableWeeks.some((value, index) => weekSelect.options[index]?.value !== value || weekSelect.options[index]?.textContent !== labels[index])) {
            weekSelect.replaceChildren(...availableWeeks.map((value, index) => new Option(labels[index], value)));
        }
        $("weeklyWeek").value = week;
        const index = availableWeeks.indexOf(week);
        $("weeklyPrevious").disabled = index === availableWeeks.length - 1 || refreshing;
        $("weeklyNext").disabled = index <= 0 || refreshing;
        const refreshButton = $("weeklyRefresh");
        refreshButton.disabled = refreshing || loading && !fileMode;
        refreshButton.setAttribute("aria-busy", String(refreshing || loading && !fileMode));
        $("weeklyRefreshLabel").textContent = refreshing || loading ? "正在读取…" : connectionFailed ? "重试读取" : "刷新周报";
        refreshButton.title = "读取最近发布的周报；后台约每 6 小时检查来源，管理员可通过管理更新提前触发";
        $("weeklyWeek").disabled = loading;
        const issue = core.selectIssue(snapshot.items || [], week, { region, query });
        $("weeklyNewsSection").hidden = kind === "report";
        $("weeklyReportsSection").hidden = kind === "news";
        $("weeklyNewsCount").textContent = issue.news.length;
        $("weeklyReportsCount").textContent = issue.reports.length;
        $("weeklyCount").textContent = (kind === "report" ? 0 : issue.news.length) + (kind === "news" ? 0 : issue.reports.length);
        $("weeklyPeriod").textContent = `${region === "all" ? "全球总览" : region} · ${core.weekLabel(week)} · 中国时区 · ${week === currentWeek() ? "本周更新中" : "往期周报"}`;
        document.querySelectorAll("[data-weekly-kind]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.weeklyKind === kind)));
        renderRows($("weeklyNewsItems"), issue.news, "重要新闻");
        renderRows($("weeklyReportsItems"), issue.reports, "智库报告与分析");
        $("weeklyScreening").textContent = `本期缓存 ${issue.screened} 条候选 · ${issue.eligible} 条达到入选门槛 · ${issue.grouped} 条重复或相近报道已合并。新闻最多 12 个事件，智库最多 8 篇；不足时按实际数量展示。`;
        $("weeklyCoverage").replaceChildren(...issue.coverage.map((area) => node("span", "", `${area.region}：${area.news} 个新闻事件 / ${area.reports} 篇智库文章 · ${area.publishers} 家发布方`)));
        const successful = (snapshot.sources || []).filter((source) => source.state === "completed").length;
        const deferred = (snapshot.sources || []).filter((source) => source.state === "deferred").length;
        const status = $("weeklyStatus");
        status.textContent = refreshing ? "正在读取已发布的周报…" : loading ? "正在读取周报…" : message || `来源检查于 ${time(snapshot.lastAttemptAt || snapshot.updatedAt)} · 约每 6 小时自动检查${snapshot.sources?.length ? ` · ${successful}/${snapshot.sources.length} 个来源可读取` : ""}${deferred ? ` · ${deferred} 个等待站方访问间隔` : ""}${snapshot.storageWarning ? ` · ${snapshot.storageWarning}` : ""}`;
        status.classList.toggle("is-warning", Boolean(message || snapshot.storageWarning || snapshot.sources?.length && !successful));
        $("weeklySourceDetails").hidden = !snapshot.sources?.length;
        $("weeklySourceTitle").textContent = `来源与覆盖 · ${successful}/${snapshot.sources?.length || 0} 可读取${deferred ? ` · ${deferred} 个等待访问间隔` : ""}`;
        const sources = $("weeklySourceItems");
        sources.replaceChildren();
        for (const source of snapshot.sources || []) {
            const row = node("div", "weekly-source-row");
            row.append(link(source.title, source.url));
            const excluded = source.skipped?.lowImportance || 0;
            row.append(node("span", source.state === "completed" ? "" : "weekly-warning", source.state === "completed" ? `${source.method ? `${source.method} · ` : ""}读取 ${source.received} 个条目 · 近八周初筛 ${source.retained} 条${excluded ? ` · ${excluded} 条未达入选门槛` : ""}` : source.state === "deferred" ? `遵守站方访问间隔 · ${time(source.nextAllowedAt)} 后可再次检查` : source.error || "来源暂不可用"));
            if (source.attempts?.some((attempt) => attempt.error || attempt.warning)) {
                const detail = node("details", "weekly-source-attempts");
                detail.append(node("summary", "", "入口检查记录"));
                for (const attempt of source.attempts) {
                    const line = node("p");
                    line.append(link(attempt.type === "listing" ? "官方列表" : "订阅入口", attempt.url), node("span", "", ` · ${attempt.error || attempt.warning || `读取成功 ${attempt.received || 0} 条`}`));
                    detail.append(line);
                }
                row.append(detail);
            }
            sources.append(row);
        }
        $("weeklyExport").disabled = !issue.news.length && !issue.reports.length;
    }
    async function refresh() {
        ;
        if (refreshing || loading)
            return;
        refreshing = true;
        message = "";
        render();
        try {
            snapshot = await api();
            lastLoaded = Date.now();
            connectionFailed = false;
            if (!snapshot.sources.some((source) => source.state === "completed"))
                message = snapshot.sources.some((source) => source.state === "deferred") ? "部分来源仍在站方要求的访问间隔内，保留已保存内容。" : "本次来源均未读取成功，保留上次周报内容。";
        }
        catch {
            connectionFailed = true;
            message = "暂时无法读取新版本，仍显示已保存的周报；可点击“重试读取”。";
        }
        finally {
            refreshing = false;
            render();
        }
    }
    async function load() {
        if (loading)
            return;
        started = true;
        loading = true;
        message = "";
        render();
        ;
        try {
            snapshot = await api();
            lastLoaded = Date.now();
            connectionFailed = false;
        }
        catch {
            connectionFailed = true;
            message = "暂时无法读取周报文件，显示随网页发布的快照；可点击“重试读取”。";
        }
        finally {
            loading = false;
            render();
        }
    }
    const repository = window.SiteConfig?.repository;
    if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository || "")) {
        const admin = $("weeklyAdmin");
        admin.href = "https://github.com/" + repository + "/actions/workflows/weekly-pages.yml";
        admin.hidden = false;
    }
    $("weeklyRegion").replaceChildren(new Option("全球总览", "all"), ...core.regions.map((value) => new Option(value, value)));
    $("weeklyRegion").addEventListener("change", (event) => { region = event.target.value; render(); });
    $("weeklyWeek").addEventListener("change", (event) => { week = event.target.value; render(); });
    $("weeklyPrevious").addEventListener("click", () => { const rows = weeks(); week = rows[Math.min(rows.length - 1, rows.indexOf(week) + 1)]; render(); });
    $("weeklyNext").addEventListener("click", () => { const rows = weeks(); week = rows[Math.max(0, rows.indexOf(week) - 1)]; render(); });
    document.querySelectorAll("[data-weekly-kind]").forEach((button) => button.addEventListener("click", () => { kind = button.dataset.weeklyKind; render(); }));
    $("weeklyRefresh").addEventListener("click", refresh);
    $("weeklyExport").addEventListener("click", () => {
        const url = URL.createObjectURL(new Blob([core.markdown(snapshot, week, { region, query, kind })], { type: "text/markdown;charset=utf-8" }));
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `形势周报-${week}-${region === "all" ? "全球" : region}.md`;
        document.body.append(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    window.WeeklyReports = { setContext(context) {
            const entering = context.active && !active;
            active = context.active;
            query = context.query || "";
            if (active && (!started || entering && Date.now() - lastLoaded > 6 * 3600000))
                load();
            render();
        } };
})();
