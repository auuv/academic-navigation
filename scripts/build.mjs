import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = path.join(root, "site"), target = path.join(root, "dist");
await fs.rm(target, { recursive: true, force: true });
await fs.cp(source, target, { recursive: true });
const repository = process.env.GITHUB_REPOSITORY || "";
if (repository && !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) throw new Error("Invalid GitHub repository");
await fs.writeFile(path.join(target, "deployment-config.js"), `window.SiteConfig = ${JSON.stringify({ repository })};\n`);
const snapshot = JSON.parse(await fs.readFile(path.join(target, "data/weekly.json"), "utf8"));
if (snapshot.schemaVersion !== 1 || !Array.isArray(snapshot.items) || !Array.isArray(snapshot.sources)) throw new Error("Invalid weekly data");
await fs.writeFile(path.join(target, "weekly-data.js"), `window.WeeklyData = ${JSON.stringify(snapshot).replace(/</g, "\\u003c")};\n`);
await fs.writeFile(path.join(target, ".nojekyll"), "");
const privatePatterns = /\/Users\/|file:\/\/|127\.0\.0\.1|localhost|\/api\/(?:weekly-reports|local-documents|open-local-document)|chatgpt\.site|collectionKey|collectionDialog|gh[pousr]_[A-Za-z0-9]{20}|github_pat_|sk-[A-Za-z0-9]{20}/;
async function scan(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symlink in published files: ${entry.name}`);
    if (entry.isDirectory()) await scan(file);
    else if (/\.(?:html|js|css|json|svg)$/.test(entry.name)) {
      const text = await fs.readFile(file, "utf8");
      if (privatePatterns.test(text)) throw new Error(`Private or unsupported content in ${path.relative(target, file)}`);
      if (entry.name.endsWith(".js")) new vm.Script(text, { filename: file });
    }
  }
}
await scan(target);
console.log(JSON.stringify({ built: "dist", items: snapshot.items.length, sources: snapshot.sources.length, repository: repository || "local preview" }));
