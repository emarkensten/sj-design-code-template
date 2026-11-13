#!/usr/bin/env node
// Bygger prototypen och öppnar den byggda sidan i en osynlig webbläsare (headless).
// Stoppar om sidan är tom eller om det blir JavaScript-fel i konsolen.
//
//   npm run smoke
//   npm run smoke -- / /mina-resor     fler adresser att öppna
//
// Typkontrollen och `npm run dev` märker inte alla fel. Ett fel i hur bygget delar upp
// koden ger en vit sida bara på Vercel. Den här kontrollen hittar det före publicering.
// `npm run ship` kör den automatiskt.

import { spawn, spawnSync } from "node:child_process";
import { isWin } from "./lib/util.mjs";

const paths = process.argv.slice(2).filter((a) => a.startsWith("/"));
if (paths.length === 0) paths.push("/");
const port = 4317;
const base = `http://localhost:${port}`;

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
  const { chromium } = await import("playwright");
  const browser = await chromium.launch().catch(async () => {
    console.log("Laddar ner Chromium (bara första gången)...");
    spawnSync("npx", ["playwright", "install", "chromium"], { stdio: "inherit", shell: isWin });
    return chromium.launch();
  });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  // Resurser som inte laddas (404 från /api/ som inte körs i förhandsvisningen, kartbilder,
  // externa tjänster) räknas inte. Det som stoppar är JavaScript-fel och en tom sida.
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
