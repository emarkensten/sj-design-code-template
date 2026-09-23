#!/usr/bin/env node
// Håller alla @sj-ab-paket på senaste versionen från Bit.
//
//   npm run sj:check   visar vad som är inaktuellt, ändrar inget
//   npm run sj:update  installerar senaste versionen av alla @sj-ab-paket
//
// Tål att vara offline: då skrivs en varning och skriptet avslutas utan fel,
// så att det inte blockerar `npm run setup` eller agentens start.

import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const checkOnly = process.argv.includes("--check");
const npm = "npm";
const shell = process.platform === "win32";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const sjPackages = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter((name) =>
  name.startsWith("@sj-ab/"),
);

if (sjPackages.length === 0) {
  console.log("Inga @sj-ab-paket i package.json.");
  process.exit(0);
}

// `npm outdated` avslutar med kod 1 när något är inaktuellt, så läs stdout ändå.
let outdated = {};
try {
  const out = execFileSync(npm, ["outdated", "--json", ...sjPackages], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    shell,
    timeout: 60_000,
  });
  outdated = JSON.parse(out || "{}");
} catch (error) {
  try {
    outdated = JSON.parse(error.stdout || "{}");
  } catch {
    console.warn("Kunde inte nå Bit-registret. Är du offline? Hoppar över SJ-uppdateringen.");
    process.exit(0);
  }
}

// `wanted` räknas inte: vi vill alltid ha `latest`, även nya major-versioner.
const stale = Object.entries(outdated).filter(
  ([name, info]) => name.startsWith("@sj-ab/") && info.latest && info.current !== info.latest,
);

if (stale.length === 0) {
  console.log(`Alla ${sjPackages.length} SJ-paket är på senaste versionen.`);
  process.exit(0);
}

console.log(`${stale.length} av ${sjPackages.length} SJ-paket har en nyare version:`);
for (const [name, info] of stale) {
  const short = name.replace("@sj-ab/component-library.", "");
  const major =
    info.current && info.current.split(".")[0] !== info.latest.split(".")[0] ? "  (ny major, kolla ändringar)" : "";
  console.log(`  ${short.padEnd(32)} ${String(info.current ?? "saknas").padEnd(10)} -> ${info.latest}${major}`);
}

if (checkOnly) {
  console.log("\nKör `npm run sj:update` för att uppdatera.");
  process.exit(0);
}

console.log("\nUppdaterar...");
const result = spawnSync(
  npm,
  ["install", "--no-fund", "--no-audit", ...stale.map(([name]) => `${name}@latest`)],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
