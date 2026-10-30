import fs from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { createWeeklyCollector } from "../lib/weekly-collector.mjs";
import { openStore } from "../lib/local-store.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
async function json(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return fallback; throw error; }
}
async function atomicJson(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temp, JSON.stringify(data) + "\n");
  await fs.rename(temp, file);
}
export async function collectWeekly({ directory = root, fetcher = fetch, clock = () => Date.now(), sourceList } = {}) {
  const snapshotFile = path.join(directory, "site/data/weekly.json");
  const scheduleFile = path.join(directory, "data/crawl-schedule.json");
  const fallback = JSON.parse(await fs.readFile(new URL("../lib/data/weekly-seed.json", import.meta.url), "utf8"));
  const previous = await json(snapshotFile, fallback);
  if (previous.schemaVersion !== 1 || !Array.isArray(previous.items) || !Array.isArray(previous.sources)) throw new Error("已保存的周报格式无效，停止写入");
  const db = await openStore();
  try {
    await db.prepare("INSERT INTO weekly_state (key, value, updated_at) VALUES (?, ?, ?)").bind("snapshot", JSON.stringify(previous), clock()).run();
    for (const row of await json(scheduleFile, [])) {
      if (typeof row.origin !== "string" || !Number.isFinite(row.next_at)) throw new Error("来源访问间隔格式无效");
      await db.prepare("INSERT INTO weekly_crawl_schedule (origin, next_at) VALUES (?, ?)").bind(row.origin, row.next_at).run();
    }
    const result = await createWeeklyCollector({ db, initial: previous, fetcher, clock, ...(sourceList ? { sourceList } : {}) }).refresh();
    const data = { schemaVersion: 1, updatedAt: result.updatedAt, lastAttemptAt: result.lastAttemptAt, sources: result.sources, items: result.items };
    // Persist slots even on a failed source, so another run cannot violate delays.
    await atomicJson(scheduleFile, db.crawlSchedule());
    await atomicJson(snapshotFile, data);
    const completed = data.sources.filter((row) => row.state === "completed").length;
    const summary = { updatedAt: data.updatedAt, lastAttemptAt: data.lastAttemptAt, items: data.items.length, readable: completed, sources: data.sources.length };
    return { data, summary };
  } finally { db.close(); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const { data, summary } = await collectWeekly();
  console.log(JSON.stringify(summary));
  if (process.env.GITHUB_STEP_SUMMARY) {
    const lines = ["## 周报来源检查", `条目：${summary.items}；可读取来源：${summary.readable}/${summary.sources}。`, "", ...data.sources.map((row) => `- ${row.title}：${row.state === "completed" ? `读取 ${row.received} 条` : row.error || row.state}`)];
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, lines.join("\n") + "\n");
  }
  // The workflow still saves preserved content and publishes it before reporting
  // a complete upstream outage as a failed run.
  if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `readable=${summary.readable}\n`);
  else if (!summary.readable) process.exitCode = 2;
}
