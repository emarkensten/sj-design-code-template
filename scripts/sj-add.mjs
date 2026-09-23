#!/usr/bin/env node
// Installerar SJ-komponenter från Bit med korta namn.
//
//   npm run sj:add -- departure-card date-picker
//   npm run sj:add -- styles.utils           (annat än ui.* anges med prefix)
//   npm run sj:list                          visar vilka SJ-paket som redan är installerade
//
// Namnet är komponentens kebab-case-namn, samma som i Storybook-URL:en och i
// design-system-MCP:ns `find_bit_component`.

import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const PREFIX = "@sj-ab/component-library.";
const npm = "npm";
const shell = process.platform === "win32";
const args = process.argv.slice(2).filter((a) => !a.startsWith("-"));

if (process.argv.includes("--list") || args.length === 0) {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const installed = Object.keys(pkg.dependencies ?? {})
    .filter((n) => n.startsWith(PREFIX))
    .map((n) => n.slice(PREFIX.length));
  console.log(`Installerade SJ-paket (${installed.length}):\n  ${installed.join("\n  ")}`);
  if (args.length === 0 && !process.argv.includes("--list")) {
    console.log("\nAnvändning: npm run sj:add -- <komponent> [fler...]   t.ex. departure-card");
  }
  process.exit(0);
}

function toPackageName(input) {
  if (input.startsWith("@sj-ab/")) return input;
  const name = input
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // DepartureCard -> Departure-Card
    .toLowerCase();
  return /^(ui|styles|hooks|translations|assets|props|internal)\./.test(name)
    ? PREFIX + name
    : `${PREFIX}ui.${name}`;
}

const found = [];
const missing = [];
for (const input of args) {
  const name = toPackageName(input);
  try {
    const version = execFileSync(npm, ["view", name, "version"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      shell,
      timeout: 30_000,
    }).trim();
    found.push(name);
    console.log(`Hittade ${name}@${version}`);
  } catch {
    missing.push(input);
  }
}

if (missing.length > 0) {
  console.error(
    `\nFinns inte på Bit: ${missing.join(", ")}\n` +
      "Kolla namnet i Storybook eller fråga design-system-MCP:n (find_bit_component).",
  );
}
if (found.length === 0) process.exit(1);

const result = spawnSync(npm, ["install", "--no-fund", "--no-audit", ...found.map((n) => `${n}@latest`)], {
  stdio: "inherit",
  shell,
});
process.exit(result.status ?? 1);
