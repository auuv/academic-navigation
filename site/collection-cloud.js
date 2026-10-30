(() => {
  const $ = (id) => document.getElementById(id);
  let endpoint = "", token = "", resume, afterLogout = () => {};
  try {
    const value = window.SiteConfig?.collectionApiBase;
    if (value) {
      const url = new URL(value);
      const development = location.protocol === "http:" && url.protocol === "http:" && url.hostname === location.hostname;
      if ((url.protocol === "https:" || development) && !url.username && !url.password && !url.search && !url.hash && url.pathname === "/") endpoint = url.origin;
    }
  } catch { /* An absent deployment configuration is shown in the login view. */ }
  const storageKey = "academic-collection-session:" + endpoint;
  try { token = sessionStorage.getItem(storageKey) || ""; } catch { /* Memory-only sessions remain usable. */ }
  function remember(value) {
    token = value;
    try { if (value) sessionStorage.setItem(storageKey, value); else sessionStorage.removeItem(storageKey); } catch { /* Optional tab-local persistence. */ }
  }
  function showLogin(message = "") {
    $("collectionLoginView").hidden = false;
    $("collectionAuthenticated").hidden = true;
    $("collectionLoginStatus").textContent = message || (!endpoint ? "云端采集服务尚未配置，请先完成后端部署。" : "");
    $("collectionAdminPassword").disabled = !endpoint;
    $("collectionLogin").querySelector('button[type="submit"]').disabled = !endpoint;
  }
  function clearSession(message = "") {
    remember(""); afterLogout();
    for (const id of ["collectionKey", "collectionGithubToken", "collectionAdminPassword"]) $(id).value = "";
    for (const id of ["collectionSourceReportRows", "collectionPlanContent", "collectionExcludedItems"]) $(id).replaceChildren();
    showLogin(message);
  }
  async function request(route, body, { text = false, login = false } = {}) {
    if (!endpoint) throw new Error("云端采集服务尚未配置，请先完成后端部署。");
    let response;
    try {
      response = await fetch(endpoint + route, {
        method: body === undefined ? "GET" : "POST", cache: "no-store", credentials: "omit", signal: AbortSignal.timeout(115000),
        headers: { ...(token && !login ? { Authorization: "Bearer " + token } : {}), ...(body === undefined ? {} : { "Content-Type": "application/json" }) },
        ...(body === undefined ? {} : { body: JSON.stringify(body) })
      });
    } catch (error) {
      throw new Error(/timeout|abort/i.test(error.name) ? "云端服务响应超时，请稍后查看任务记录。" : "无法连接云端采集服务，请稍后重试。");
    }
    if (text && response.ok) return response.text();
    let data;
    try { data = await response.json(); } catch { throw new Error("云端采集服务返回了无效响应。"); }
    if (!response.ok) {
      if (response.status === 401 && !login) clearSession("管理会话已过期，请重新登录；云端任务仍会继续。");
      throw Object.assign(new Error(data.error || "云端服务暂不可用"), { jobId: data.jobId });
    }
    return data;
  }
  $("collectionLogin").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = $("collectionLogin").querySelector('button[type="submit"]');
    button.disabled = true; $("collectionLoginStatus").textContent = "正在登录…";
    try {
      const result = await request("/api/auth/login", { password: $("collectionAdminPassword").value }, { login: true });
      $("collectionAdminPassword").value = "";
      remember(result.token);
      $("collectionLoginView").hidden = true; $("collectionAuthenticated").hidden = false;
      if (resume) await resume();
    } catch (error) { $("collectionLoginStatus").textContent = error.message; }
    finally { button.disabled = !endpoint; }
  });
  $("collectionLogout").addEventListener("click", async () => {
    try { await request("/api/auth/logout", {}); }
    catch { /* A lost connection must still discard this tab's credentials. */ }
    finally { clearSession("已退出采集管理。"); }
  });
  window.CollectionCloud = {
    origin() { return endpoint; },
    api(route, body) { return request("/api/collection" + route, body); },
    download(route) { return request("/api/collection" + route, undefined, { text: true }); },
    ready(callback) {
      resume = callback;
      if (!token || !endpoint) { showLogin(); return false; }
      $("collectionLoginView").hidden = true; $("collectionAuthenticated").hidden = false;
      return true;
    },
    onLogout(callback) { afterLogout = callback; }
  };
})();
