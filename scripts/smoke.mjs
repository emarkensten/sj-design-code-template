#!/usr/bin/env node
// Bygger prototypen och öppnar den byggda sidan i en osynlig webbläsare (headless).
// Stoppar om sidan är tom eller om det blir JavaScript-fel i konsolen. Spelar sedan upp
// kärnflödena i flows.json på den byggda sidan (npm run verify, vardagsnivån).
//
//   npm run smoke
//   npm run smoke -- / /mina-resor     fler adresser att öppna
//
// Typkontrollen och `npm run dev` märker inte alla fel. Ett fel i hur bygget delar upp
// koden ger en vit sida bara på Vercel. Den här kontrollen hittar det före publicering.
// `npm run ship` kör den automatiskt.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { launchBrowser } from "./lib/browser.mjs";
import { isWin } from "./lib/util.mjs";

const paths = process.argv.slice(2).filter((a) => a.startsWith("/"));
if (paths.length === 0) paths.push("/");
const port = 4317;
const base = `http://localhost:${port}`;

// Vercel kör api/*.ts som ESM och hittar inte en relativ import utan filändelse, fast Vite
// (och därmed dev, verify och förhandsvisningen nedan) gör det. Funktionen kraschar då
// först efter publicering, med FUNCTION_INVOCATION_FAILED.
const badImports = apiImportsWithoutExtension("api");
if (badImports.length) {
  console.log("Serverfunktionerna i api/ fungerar inte på Vercel. Skriv relativa importer med .js:");
  for (const { file, spec } of badImports) console.log(`  ${file}: "${spec}"  ->  "${spec}.js"`);
  process.exit(1);
}

console.log("Bygger...");
const build = spawnSync("npx", ["vite", "build", "--logLevel", "warn"], { stdio: "inherit", shell: isWin });
if (build.status !== 0) {
  console.log("\nBygget misslyckades (se ovan).");
  process.exit(1);
}

const server = spawn("npx", ["vite", "preview", "--port", String(port), "--strictPort"], {
  stdio: "ignore",
  shell: isWin,
  detached: !isWin,
});
const stopServer = () => {
  try {
    if (isWin) spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"]);
    else process.kill(-server.pid);
  } catch {}
};

let failed = false;
try {
  await waitFor(base);
  const browser = await launchBrowser("chromium");
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  // Resurser som inte laddas (kartbilder, externa tjänster) räknas inte. Det som stoppar är JavaScript-fel och en tom sida.
  page.on("console", (m) => {
    if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) errors.push(m.text());
  });

  for (const path of paths) {
    errors.length = 0;
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const text = (await page.locator("#root").innerText().catch(() => "")).trim();
    if (!text || errors.length) {
      failed = true;
      console.log(`\n${path}: ${text ? "fel i konsolen" : "sidan är tom"}`);
      for (const e of errors.slice(0, 5)) console.log(`  ${e}`);
    } else {
      console.log(`${path}: ok`);
    }
  }
  await browser.close();

  if (!failed && existsSync("flows.json")) {
    console.log("\nSpelar upp kärnflödena i flows.json...");
    const verify = spawnSync(process.execPath, ["scripts/verify.mjs", "--vardag", "--url", base], { stdio: "inherit" });
    if (verify.status === 1) {
      failed = true;
      console.log("\nEtt kärnflöde fungerar inte på den byggda sidan (se ovan).");
    } else if (verify.status !== 0) {
      console.log("Kärnflödena är INTE kontrollerade (se ovan). Säg det när du delar länken.");
    }
  }
} catch (error) {
  failed = true;
  console.log(`\nKontrollen kunde inte köras: ${error.message}`);
} finally {
  stopServer();
}

if (failed) {
  console.log("\nDen byggda sidan fungerar inte. Testa lokalt med `npm run build && npx vite preview`.");
  process.exit(1);
}
console.log("Den byggda sidan fungerar.");

async function waitFor(url) {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`förhandsvisningen startade inte på ${url}`);
}

/** Relativa importer i api/ (och src/ som api/ importerar) som saknar filändelse. */
function apiImportsWithoutExtension(dir) {
  if (!existsSync(dir)) return [];
  const found = [];
  const seen = new Set();
  const visit = (file) => {
    if (seen.has(file) || !existsSync(file)) return;
    seen.add(file);
    const code = readFileSync(file, "utf8");
    for (const [, spec] of code.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)["'](\.{1,2}\/[^"']+)["']/g)) {
      if (!/\.(m?js|json)$/.test(spec)) found.push({ file, spec });
      // Följ importen så att även filer utanför api/ (till exempel src/shared) kontrolleras.
      const target = join(file, "..", spec.replace(/\.m?js$/, ""));
      for (const ext of [".ts", ".tsx", "/index.ts"]) visit(target + ext);
    }
  };
  const walk = (d) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const path = join(d, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (/\.tsx?$/.test(entry.name)) visit(path);
    }
  };
  walk(dir);
  return found;
}
