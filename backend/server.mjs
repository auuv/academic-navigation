import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createCollectionService, collectionMarkdown } from "./collection/ai-collection.mjs";
import { createAdminAuth, createSecretBox } from "./security.mjs";

const failure = (message, status) => Object.assign(new Error(message), { status });
export function createCloudServer({ env = process.env, service, now } = {}) {
  const auth = createAdminAuth({ password: env.COLLECTION_ADMIN_PASSWORD, ...(now ? { now } : {}) });
  const box = createSecretBox(env.STORAGE_ENCRYPTION_KEY);
  const origins = new Set((env.ALLOWED_ORIGINS || "https://auuv.github.io").split(",").map((value) => value.trim()).filter(Boolean));
  for (const origin of origins) {
    const url = new URL(origin);
    if (url.origin !== origin || url.username || url.password || (url.protocol !== "https:" && env.ALLOW_INSECURE_DEVELOPMENT !== "1")) throw new Error("ALLOWED_ORIGINS 必须是完整 HTTPS 来源，不含路径");
  }
  service ||= createCollectionService({ storageDir: path.resolve(env.COLLECTION_DATA_DIR || "/data/collection"), env, protectSecret: box.seal, revealSecret: box.open });
  const server = http.createServer(async (req, res) => {
    const send = (code, body, headers = {}) => {
      res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer", ...headers });
      res.end(typeof body === "string" ? body : JSON.stringify(body));
    };
    try {
      const url = new URL(req.url, "https://collection.invalid"), origin = req.headers.origin;
      if (origin && !origins.has(origin)) throw failure("此网页未获准连接采集服务", 403);
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
      }
      if (req.method === "OPTIONS") {
        if (!origin) throw failure("缺少网页来源", 403);
        send(204, "", { "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Authorization, Content-Type", "Access-Control-Max-Age": "600" }); return;
      }
      if (url.pathname === "/healthz" && req.method === "GET") { send(200, { ok: true, service: "academic-navigation-collection", authRequired: true }); return; }
      const header = req.headers.authorization;
      if (url.pathname !== "/api/auth/login" && !auth.authorize(header)) throw failure("请先登录采集管理", 401);
      let body;
      if (req.method === "POST") {
        if (!/^application\/json(?:;|$)/i.test(req.headers["content-type"] || "")) throw failure("仅接受 JSON 请求", 415);
        const chunks = []; let length = 0;
        for await (const chunk of req) { length += chunk.length; if (length > 256000) throw failure("请求内容过大", 413); chunks.push(chunk); }
        const raw = Buffer.concat(chunks).toString("utf8");
        try { body = JSON.parse(raw || "{}"); } catch { throw failure("请求 JSON 无效", 400); }
        if (!body || typeof body !== "object" || Array.isArray(body)) throw failure("请求 JSON 无效", 400);
      }
      if (url.pathname === "/api/auth/login" && req.method === "POST") {
        send(200, auth.login(body.password, req.socket.remoteAddress)); return;
      }
      if (url.pathname === "/api/auth/logout" && req.method === "POST") { auth.logout(header); send(200, { ok: true }); return; }
      await service.ready;
      const route = url.pathname.replace(/^\/api\/collection/, "");
      if (!url.pathname.startsWith("/api/collection/")) throw failure("接口不存在", 404);
      if (req.method === "GET") {
        if (route === "/settings") send(200, service.publicSettings());
        else if (route === "/github/settings") send(200, service.publicGithubSettings());
        else if (route === "/sources") send(200, service.sources);
        else if (route === "/jobs") send(200, service.list());
        else {
          const match = /^\/jobs\/([0-9a-f-]{36})(\/export)?$/.exec(route);
          if (!match) throw failure("接口不存在", 404);
          const job = service.getJob(match[1]);
          if (match[2]) send(200, collectionMarkdown(job), { "Content-Type": "text/markdown; charset=utf-8", "Content-Disposition": `attachment; filename="ai-collection-${job.id}.md"` });
          else send(200, job);
        }
      } else if (req.method === "POST") {
        if (route === "/settings") send(200, await service.saveSettings(body));
        else if (route === "/github/settings") send(200, await service.saveGithubSettings(body));
        else if (route === "/github/test") send(200, await service.testGithub());
        else if (route === "/test") send(200, await service.testSettings());
        else if (route === "/jobs") send(202, await service.start(body));
        else {
          const match = /^\/jobs\/([0-9a-f-]{36})\/cancel$/.exec(route);
          if (!match) throw failure("接口不存在", 404);
          send(200, service.cancel(match[1]));
        }
      } else send(405, { error: "仅支持 GET / POST" }, { Allow: "GET, POST, OPTIONS" });
    } catch (error) { send(error.status || 500, { error: error.status ? error.message : "操作失败，请检查配置或网络后重试。", ...(error.jobId ? { jobId: error.jobId } : {}) }); }
  });
  server.requestTimeout = 120000;
  server.headersTimeout = 15000;
  return { server, service, auth };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const { server, service } = createCloudServer();
  await service.ready;
  const port = Number(process.env.PORT || 8080);
  server.listen(port, "0.0.0.0", () => console.log(`AI collection listening on port ${port}`));
  process.on("SIGTERM", () => {
    for (const job of service.list()) if (["queued", "running"].includes(job.state)) service.cancel(job.id);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5000).unref();
  });
}
