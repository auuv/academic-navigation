import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml" };
http.createServer(async (req, res) => {
  try {
    // A project Pages URL has a path prefix. Serve this preview under the same
    // prefix to catch accidental root-relative asset and data requests.
    const url = new URL(req.url, "http://preview.invalid");
    if (!url.pathname.startsWith("/academic-navigation/")) { res.writeHead(302, { Location: "/academic-navigation/" }); res.end(); return; }
    const name = decodeURIComponent(url.pathname.slice("/academic-navigation/".length)) || "index.html";
    const file = path.resolve(root, name);
    if (!file.startsWith(root)) throw new Error();
    const body = await fs.readFile(file);
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" }); res.end(body);
  } catch { res.writeHead(404); res.end("Not found"); }
}).listen(4181, "127.0.0.1", () => console.log("http://127.0.0.1:4181/academic-navigation/#weekly"));
