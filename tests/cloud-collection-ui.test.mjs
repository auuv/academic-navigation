import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { JSDOM } from "jsdom";

const html = await fs.readFile(new URL("../site/index.html", import.meta.url), "utf8");
const cloud = await fs.readFile(new URL("../site/collection-cloud.js", import.meta.url), "utf8");
const collection = await fs.readFile(new URL("../site/collection.js", import.meta.url), "utf8");
async function settle(check) {
  for (let i = 0; i < 50; i++) { if (check()) return; await new Promise((resolve) => setTimeout(resolve, 5)); }
  assert.fail("UI did not settle");
}
test("online dialog logs in before requesting records and clears private data on logout", async (t) => {
  const dom = new JSDOM(html, { url: "https://auuv.github.io/academic-navigation/", runScripts: "outside-only" }); t.after(() => dom.window.close());
  const { window } = dom, $ = (id) => window.document.getElementById(id), calls = [], token = "t".repeat(43);
  window.SiteConfig = { collectionApiBase: "https://collection.example.org" };
  $("collectionDialog").showModal = function () { this.open = true; };
  window.fetch = async (url, options) => {
    calls.push({ url, options }); const route = new URL(url).pathname;
    const value = route.endsWith("/login") ? { token } : route.endsWith("/settings") ? { apiBase: "https://api.example.org", model: "", hasKey: false, configured: false } : route.endsWith("/sources") ? [{ id: "news:example", title: "Example", mode: "news", modeLabel: "新闻", category: "新闻", url: "https://example.org/" }] : [];
    return { ok: true, status: 200, json: async () => value, text: async () => "# fixture result" };
  };
  window.eval(cloud); window.eval(collection); $("collectionOpen").click();
  assert.equal($("collectionLoginView").hidden, false); assert.equal(calls.length, 0);
  $("collectionAdminPassword").value = "fixture-admin-password";
  $("collectionLogin").dispatchEvent(new window.Event("submit", { cancelable: true }));
  await settle(() => $("collectionSources").querySelector("input"));
  assert.equal($("collectionAuthenticated").hidden, false);
  assert.equal(calls[0].options.headers.Authorization, undefined);
  assert.ok(calls.slice(1).every((call) => call.options.headers.Authorization === "Bearer " + token));
  assert.ok(![...Array(window.sessionStorage.length)].map((_, i) => window.sessionStorage.getItem(window.sessionStorage.key(i))).join().includes("fixture-admin-password"));
  await window.CollectionCloud.download("/jobs/fixture/export");
  assert.equal(calls.at(-1).options.headers.Authorization, "Bearer " + token);
  $("collectionKey").value = "fixture-model-secret";
  $("collectionResults").textContent = "Private collection result";
  $("collectionLogout").click(); await settle(() => !$("collectionLoginView").hidden);
  assert.equal($("collectionResults").textContent, ""); assert.equal($("collectionKey").value, "");
  assert.equal(window.sessionStorage.length, 0);
});
test("no backend configuration shows an honest unavailable state and sends no requests", (t) => {
  const dom = new JSDOM(html, { url: "https://auuv.github.io/academic-navigation/", runScripts: "outside-only" }); t.after(() => dom.window.close());
  const { window } = dom;
  window.fetch = () => assert.fail("must not send credentials without a configured backend");
  window.document.getElementById("collectionDialog").showModal = function () { this.open = true; };
  window.eval(cloud); window.eval(collection); window.document.getElementById("collectionOpen").click();
  assert.ok(window.document.getElementById("collectionLoginStatus").textContent.includes("尚未配置"));
});
test("local page connects automatically without asking for a cloud administrator password", async (t) => {
  const dom = new JSDOM(html, { url: "http://127.0.0.1:4174/", runScripts: "outside-only" }); t.after(() => dom.window.close());
  const { window } = dom, calls = [];
  window.SiteConfig = { collectionApiBase: window.location.origin, collectionLocal: true };
  window.document.getElementById("collectionDialog").showModal = function () { this.open = true; };
  window.fetch = async (url, options) => {
    calls.push({ url, options }); const route = new URL(url).pathname;
    const value = route.endsWith("/local-session") ? { token: "t".repeat(43) } : route.endsWith("/settings") ? { apiBase: "https://api.example.org", hasKey: false, configured: false } : route.endsWith("/sources") ? [{ id: "news:example", title: "Example", mode: "news", modeLabel: "新闻", category: "新闻", url: "https://example.org/" }] : [];
    return { ok: true, status: 200, json: async () => value };
  };
  window.eval(cloud); window.eval(collection); window.document.getElementById("collectionOpen").click();
  await settle(() => window.document.getElementById("collectionSources").querySelector("input"));
  assert.equal(new URL(calls[0].url).pathname, "/api/auth/local-session");
  assert.equal(calls[0].options.body, "{}");
  assert.equal(window.document.getElementById("collectionAdminPassword").closest("label").hidden, true);
  assert.equal(window.document.getElementById("collectionAuthenticated").hidden, false);
});
