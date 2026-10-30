import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { createCloudServer } from "./server.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicRoot = path.join(root, "site");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml" };

export async function createLocalApp({ env = process.env, port = Number(env.LOCAL_PORT || 4174), storageDir = path.resolve(env.COLLECTION_DATA_DIR || path.join(root, ".local-collection")), service } = {}) {
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("LOCAL_PORT 无效");
  await fs.mkdir(storageDir, { recursive: true, mode: 0o700 });
  const keyFile = path.join(storageDir, ".storage-key");
  let key = env.STORAGE_ENCRYPTION_KEY;
  if (!key) {
    try { key = (await fs.readFile(keyFile, "utf8")).trim(); }
    catch (error) {
      if (error.code !== "ENOENT") throw error;
      try { await fs.writeFile(keyFile, randomBytes(32).toString("base64"), { flag: "wx", mode: 0o600 }); }
      catch (error) { if (error.code !== "EEXIST") throw error; }
      key = (await fs.readFile(keyFile, "utf8")).trim();
    }
  }
  const origin = `http://127.0.0.1:${port}`;
  const serveLocalPage = async (req, res, url) => {
    const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "X-Frame-Options": "DENY", "Referrer-Policy": "no-referrer" };
    if (url.pathname === "/deployment-config.js") {
      res.writeHead(200, { ...headers, "Content-Type": types[".js"] });
      res.end(req.method === "HEAD" ? "" : `window.SiteConfig = ${JSON.stringify({ repository: "auuv/academic-navigation", collectionApiBase: origin, collectionLocal: true })};\n`); return;
    }
    try {
      const file = await fs.realpath(path.resolve(publicRoot, "." + decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname)));
      if (!file.startsWith(publicRoot + path.sep)) throw new Error("Not public");
      const body = await fs.readFile(file);
      res.writeHead(200, { ...headers, "Content-Type": types[path.extname(file)] || "application/octet-stream" });
      res.end(req.method === "HEAD" ? "" : body);
    } catch { res.writeHead(404, { ...headers, "Content-Type": "text/plain; charset=utf-8" }); res.end(req.method === "HEAD" ? "" : "Not found"); }
  };
  const app = createCloudServer({ env: { ...env, COLLECTION_ADMIN_PASSWORD: randomBytes(32).toString("base64url"), STORAGE_ENCRYPTION_KEY: key, COLLECTION_DATA_DIR: storageDir, ALLOWED_ORIGINS: origin, ALLOW_INSECURE_DEVELOPMENT: "1" }, localOrigin: origin, serveLocalPage, service });
  return { ...app, origin, storageDir };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const app = await createLocalApp();
  await app.service.ready;
  app.server.on("error", (error) => { console.error(error.code === "EADDRINUSE" ? "本地端口已被使用，请打开已运行的黄页，或设置 LOCAL_PORT 后重试。" : "本地服务启动失败：" + error.message); process.exitCode = 1; });
  app.server.listen(new URL(app.origin).port, "127.0.0.1", () => {
    console.log(`本地黄页：${app.origin}\n采集记录保存在 ${app.storageDir}\n关闭此终端或按 Ctrl+C 将停止采集服务。`);
    if (process.argv.includes("--open")) {
      const command = process.platform === "darwin" ? "open" : process.platform === "win32" ? "explorer.exe" : "xdg-open";
      const child = spawn(command, [app.origin], { stdio: "ignore" });
      child.on("error", () => console.log("请在浏览器打开上方本地黄页地址。")); child.unref();
    }
  });
  let stopping = false;
  const stop = () => {
    if (stopping) return; stopping = true;
    for (const job of app.service.list()) if (["queued", "running"].includes(job.state)) app.service.cancel(job.id);
    app.server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5000).unref();
  };
  process.on("SIGINT", stop); process.on("SIGTERM", stop);
}
