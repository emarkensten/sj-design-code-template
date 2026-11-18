#!/usr/bin/env node
// Installerar beroenden för `npm run setup`.
//
// Finns package-lock.json körs `npm ci`: exakt de versioner som är sparade, och
// lockfilen skrivs inte om. Annars (eller om `npm ci` fallerar för att lockfilen
// inte stämmer med package.json) körs `npm install`.

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const shell = process.platform === "win32";
const run = (args) => spawnSync("npm", [...args, "--no-fund", "--no-audit"], { stdio: "inherit", shell }).status;

if (existsSync("package-lock.json")) {
  if (run(["ci"]) === 0) process.exit(0);
  console.warn("\n`npm ci` gick inte (lockfilen stämmer inte med package.json). Kör `npm install` i stället.\n");
}
process.exit(run(["install"]) ?? 1);
