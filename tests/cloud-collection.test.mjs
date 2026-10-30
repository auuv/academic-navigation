import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { once } from "node:events";
import { randomBytes } from "node:crypto";
import { createCloudServer } from "../backend/server.mjs";
import { createAdminAuth, createSecretBox } from "../backend/security.mjs";
import { createCollectionService } from "../backend/collection/ai-collection.mjs";
import { publicUrl } from "../backend/collection/collection-http.mjs";

const password = "fixture-only-admin-password";
const source = { id: "news:https://example.org/", title: "Research", url: "https://example.org/", mode: "news", modeLabel: "新闻导航", category: "研究" };
const paragraph = "LNG shipping routes connect energy suppliers and import terminals. Researchers compare regional shipping capacity and port infrastructure, separating supported conclusions from open questions. ";
const article = `<html><head><title>LNG shipping research</title></head><body><article><h1>LNG shipping research</h1>${Array.from({ length: 5 }, () => `<p>${paragraph}</p>`).join("")}</article></body></html>`;
const response = (url, text) => ({ url, text, status: 200, headers: { "content-type": "text/html" } });
async function fixture(t, request) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "cloud-collection-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const key = randomBytes(32).toString("base64"), box = createSecretBox(key), calls = [];
  request ||= async (url, options = {}) => {
    if (options.beforeRequest) await options.beforeRequest(url);
    options.signal?.throwIfAborted(); calls.push(url);
    return response(url, url.endsWith("robots.txt") ? "User-agent: *\nAllow: /" : article);
  };
  const args = { storageDir: directory, env: {}, sources: [source], request, protectSecret: box.seal, revealSecret: box.open };
  const service = createCollectionService(args);
  const env = { COLLECTION_ADMIN_PASSWORD: password, STORAGE_ENCRYPTION_KEY: key, ALLOWED_ORIGINS: "https://auuv.github.io" };
  const app = createCloudServer({ env, service });
  app.server.listen(0, "127.0.0.1"); await once(app.server, "listening");
  t.after(() => { app.server.closeAllConnections(); return new Promise((resolve) => app.server.close(resolve)); });
  const base = `http://127.0.0.1:${app.server.address().port}`;
  const call = (route, { token, body, origin = "https://auuv.github.io", method } = {}) => fetch(base + route, { method: method || (body === undefined ? "GET" : "POST"),
    headers: { Origin: origin, ...(token ? { Authorization: "Bearer " + token } : {}), ...(body === undefined ? {} : { "Content-Type": "application/json" }) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  const login = async () => (await (await call("/api/auth/login", { body: { password } })).json()).token;
  return { ...app, directory, args, calls, call, login, key };
}

test("all settings, jobs and exports require login and foreign origins cannot connect", async (t) => {
  const f = await fixture(t);
  for (const route of ["settings", "github/settings", "sources", "jobs", "jobs/00000000-0000-4000-8000-000000000000/export"]) {
    assert.equal((await f.call("/api/collection/" + route)).status, 401);
  }
  assert.equal((await f.call("/api/collection/jobs", { body: { sourceIds: [source.id] } })).status, 401);
  assert.equal((await f.call("/healthz")).status, 200);
  const denied = await f.call("/api/auth/login", { origin: "https://other.example.org", body: { password } });
  assert.equal(denied.status, 403); assert.equal(denied.headers.get("Access-Control-Allow-Origin"), null);
  assert.equal(f.calls.length, 0);
  const preflight = await f.call("/api/collection/settings", { method: "OPTIONS" });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get("Access-Control-Allow-Origin"), "https://auuv.github.io");
});

test("model credentials are encrypted on disk, excluded from responses and restored after restart", async (t) => {
  const f = await fixture(t), token = await f.login(), secret = "fixture-model-secret";
  const result = await f.call("/api/collection/settings", { token, body: { apiBase: "https://api.example.org/v1", model: "fixture-model", apiKey: secret } });
  assert.equal(result.status, 200);
  const settings = await result.json(); assert.equal(settings.hasKey, true); assert.ok(!JSON.stringify(settings).includes(secret));
  const raw = await fs.readFile(path.join(f.directory, "settings.json"), "utf8");
  assert.ok(!raw.includes(secret)); assert.ok(JSON.parse(raw).apiKey.startsWith("enc:v1:"));
  const restored = createCollectionService(f.args); await restored.ready;
  assert.equal(restored.publicSettings().hasKey, true); assert.equal(restored.publicSettings().model, "fixture-model");
  await f.call("/api/collection/settings", { token, body: { apiBase: "https://new.example.org/v1", model: "fixture-model", apiKey: "" } });
  assert.equal(f.service.publicSettings().hasKey, false, "old keys never follow an API origin change");
});

test("login can create a real job, export results and restore private history", async (t) => {
  const f = await fixture(t), token = await f.login();
  const started = await f.call("/api/collection/jobs", { token, body: { sourceIds: [source.id], articleUrl: "https://example.org/news/one", maxArticles: 1, topic: "LNG", analyze: false } });
  assert.equal(started.status, 202); const { id } = await started.json();
  const job = await f.service.wait(id); assert.equal(job.state, "completed"); assert.equal(job.items.length, 1);
  const exported = await f.call(`/api/collection/jobs/${id}/export`, { token });
  assert.equal(exported.status, 200); assert.ok((await exported.text()).includes("LNG shipping"));
  const restored = createCollectionService(f.args); await restored.ready;
  assert.equal(restored.getJob(id).items[0].url, "https://example.org/news/one");
  assert.equal(restored.list()[0].state, "completed");
  await f.call("/api/auth/logout", { token, body: {} });
  assert.equal((await f.call("/api/collection/jobs", { token })).status, 401);
});

test("an active cloud job can be cancelled without a model request", async (t) => {
  let opened; const running = new Promise((resolve) => { opened = resolve; });
  const f = await fixture(t, async (url, options = {}) => {
    if (url.endsWith("robots.txt")) return response(url, "User-agent: *\nAllow: /");
    if (options.beforeRequest) await options.beforeRequest(url);
    opened();
    await new Promise((_, reject) => { options.signal.addEventListener("abort", () => reject(options.signal.reason), { once: true }); });
  });
  const token = await f.login();
  const { id } = await (await f.call("/api/collection/jobs", { token, body: { sourceIds: [source.id], analyze: false } })).json();
  await running;
  assert.equal((await f.call(`/api/collection/jobs/${id}/cancel`, { token, body: {} })).status, 200);
  assert.equal((await f.service.wait(id)).state, "cancelled");
});

test("sessions expire and login attempts are bounded", () => {
  let now = 0; const auth = createAdminAuth({ password, now: () => now, ttl: 1000 });
  for (let i = 0; i < 8; i++) assert.throws(() => auth.login("wrong", "address"), { status: 401 });
  assert.throws(() => auth.login(password, "address"), { status: 429 });
  now += 60001;
  const { token } = auth.login(password, "address"); assert.equal(auth.authorize("Bearer " + token), true);
  now += 1001; assert.equal(auth.authorize("Bearer " + token), false);
});

test("encrypted secrets reject tampering, and collection keeps blocking private addresses", () => {
  const box = createSecretBox(randomBytes(32).toString("base64")), sealed = box.seal("fixture-secret");
  assert.equal(box.open(sealed), "fixture-secret");
  const fields = sealed.split(":"); fields[3] = Buffer.alloc(16).toString("base64"); assert.throws(() => box.open(fields.join(":")));
  for (const url of ["http://127.0.0.1/", "http://169.254.169.254/", "http://10.0.0.1/", "https://secret@example.org/"]) assert.throws(() => publicUrl(url));
});
