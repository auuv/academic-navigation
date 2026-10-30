import { DatabaseSync } from "node:sqlite";
import { readFile } from "node:fs/promises";

// The collector shares its SQL contract with the original service. On Actions,
// SQLite is temporary; only public metadata and crawl slots are committed.
export async function openStore(file = ":memory:") {
  const sqlite = new DatabaseSync(file);
  sqlite.exec(await readFile(new URL("./schema.sql", import.meta.url), "utf8"));
  return {
    prepare(sql) {
      const statement = sqlite.prepare(sql);
      let args = [];
      return {
        bind(...values) { args = values; return this; },
        async first() { return statement.get(...args) || null; },
        async run() { return statement.run(...args); }
      };
    },
    crawlSchedule() { return sqlite.prepare("SELECT origin, next_at FROM weekly_crawl_schedule ORDER BY origin").all(); },
    close() { sqlite.close(); }
  };
}
