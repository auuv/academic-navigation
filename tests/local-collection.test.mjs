import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import http from "node:http";
import { once } from "node:events";
import { createLocalApp } from "../backend/local.mjs";

async function freePort() {
  const server = net.createServer(); server.listen(0, "127.0.0.1"); await once(server, "listening");
  const port = server.address().port; await new Promise((resolve) => server.close(resolve)); return port;
}
async function fixture(t) {
  const storageDir = await fs.mkdtemp(path.join(os.tmpdir(), "local-collection-"));
  t.after(() => fs.rm(storageDir, { recursive: true, force: true }));
  const app = await createLocalApp({ env: {}, port: await freePort(), storageDir });
  await app.service.ready;
  app.server.listen(new URL(app.origin).port, "127.0.0.1"); await once(app.server, "listening");
  t.after(() => { app.server.closeAllConnections(); return new Promise((resolve) => app.server.close(resolve)); });
  const session = async () => (await (await fetch(app.origin + "/api/auth/local-session", { method: "POST", headers: { Origin: app.origin, "Content-Type": "application/json" }, body: "{}" })).json()).token;
  return { ...app, session };
}
test("local startup serves the current yellow pages and only a same-origin page can open a session", async (t) => {
  const app = await fixture(t);
  assert.ok((await (await fetch(app.origin)).text()).includes("学术黄页"));
  const config = await (await fetch(app.origin + "/deployment-config.js")).text();
  assert.ok(config.includes('"collectionLocal":true'));
  assert.ok(config.includes(app.origin)); assert.ok(!config.includes("storage-key"));
  assert.equal((await fetch(app.origin + "/api/collection/jobs")).status, 401);
  for (const origin of [undefined, "null", "https://other.example.org"]) {
    const result = await fetch(app.origin + "/api/auth/local-session", { method: "POST", headers: { ...(origin ? { Origin: origin } : {}), "Content-Type": "application/json" }, body: "{}" });
    assert.equal(result.status, 403);
  }
  const token = await app.session();
  assert.equal((await fetch(app.origin + "/api/collection/jobs", { headers: { Authorization: "Bearer " + token } })).status, 200);
  assert.equal((await fetch(app.origin + "/.local-collection/.storage-key")).status, 404);
  const rebinding = await new Promise((resolve, reject) => {
    http.get(app.origin, { headers: { Host: "attacker.example.org" } }, (res) => { res.resume(); resolve(res.statusCode); }).on("error", reject);
  });
  assert.equal(rebinding, 403);
});
test("local encryption key survives restarts without exposing the saved model key", async (t) => {
  const app = await fixture(t), token = await app.session(), secret = "fixture-local-model-key";
  const saved = await fetch(app.origin + "/api/collection/settings", { method: "POST", headers: { Origin: app.origin, Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: JSON.stringify({ apiBase: "https://api.example.org/v1", model: "fixture-model", apiKey: secret }) });
  assert.equal(saved.status, 200);
  const file = path.join(app.storageDir, ".storage-key"), key = await fs.readFile(file, "utf8");
  assert.equal(Buffer.from(key, "base64").length, 32);
  assert.equal((await fs.stat(file)).mode & 0o777, 0o600);
  assert.ok(!(await fs.readFile(path.join(app.storageDir, "settings.json"), "utf8")).includes(secret));
  const restored = await createLocalApp({ env: {}, port: await freePort(), storageDir: app.storageDir });
  await restored.service.ready;
  assert.equal(await fs.readFile(file, "utf8"), key);
  assert.equal(restored.service.publicSettings().hasKey, true);
  assert.equal(restored.service.publicSettings().model, "fixture-model");
});
