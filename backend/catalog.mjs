import fs from "node:fs";
import vm from "node:vm";

function load(file) {
  const context = { module: { exports: {} } };
  vm.runInNewContext(fs.readFileSync(new URL(`../site/${file}`, import.meta.url), "utf8"), context, { timeout: 1000 });
  return context.module.exports;
}
// Share exactly the same source identities as the public directory.
export const resourceCatalog = load("resource-catalog.js");
export const gasCatalog = load("gas-project-catalog.js");
