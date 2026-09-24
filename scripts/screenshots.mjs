#!/usr/bin/env node
// Klickar sig igenom ett flöde i prototypen och sparar en skärmdump efter varje steg.
// Bra för att visa lägen som kräver klick, till exempel ett öppet Sheet.
//
//   npm run screenshots -- / "Mina resor" "Visa resa"
//   npm run screenshots -- /boka-om "Välj avgång" --desktop --dark
//
// Ett steg som börjar med / är en adress. Allt annat är namnet på en knapp eller
// länk att klicka på (samma text som skärmläsaren läser upp).
//
//   --url <adress>   dev-serverns adress (standard http://localhost:5173)
//   --desktop        även 1440×900, inte bara mobil 375×812
//   --dark           mörkt läge
//   --full           hela sidan, inte bara det som syns i fönstret
//
// Bilderna hamnar i screenshots/ (checkas inte in). Dev-servern måste vara igång.

import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const urlIndex = argv.indexOf("--url");
const base = (urlIndex >= 0 ? argv[urlIndex + 1] : "http://localhost:5173").replace(/\/$/, "");
const steps = argv.filter((a, i) => !a.startsWith("--") && !(urlIndex >= 0 && i === urlIndex + 1));

if (steps.length === 0) {
  console.log('Användning: npm run screenshots -- / "Knapptext" "Länktext" [--desktop] [--dark] [--full] [--url <adress>]');
  process.exit(0);
}

const { chromium } = await import("playwright");

async function launch() {
  try {
    return await chromium.launch();
  } catch {
    console.log("Laddar ner Chromium för skärmdumpar (bara första gången)...");
    const result = spawnSync("npx", ["playwright", "install", "chromium"], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    if (result.status !== 0) process.exit(1);
    return chromium.launch();
  }
}

const viewports = [{ name: "mobil", width: 375, height: 812 }];
if (flag("desktop")) viewports.push({ name: "desktop", width: 1440, height: 900 });

const slug = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "start";

async function click(page, name) {
  const candidates = [
    page.getByRole("button", { name, exact: true }),
    page.getByRole("link", { name, exact: true }),
    page.getByRole("button", { name }),
    page.getByRole("link", { name }),
    page.getByText(name, { exact: true }),
  ];
  for (const locator of candidates) {
    if ((await locator.count()) > 0) {
      await locator.first().click();
      return;
    }
  }
  throw new Error(`Hittade ingen knapp eller länk som heter "${name}".`);
}

rmSync("screenshots", { recursive: true, force: true });
mkdirSync("screenshots");

const browser = await launch();
let failed = false;
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: flag("dark") ? "dark" : "light",
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    for (const [index, step] of steps.entries()) {
      if (step.startsWith("/")) {
        await page.goto(base + step, { waitUntil: "networkidle" });
      } else {
        await click(page, step);
        await page.waitForLoadState("networkidle");
      }
      // Låt Sheets och andra lager animera klart.
      await page.waitForTimeout(700);
      const file = `screenshots/${viewport.name}-${String(index + 1).padStart(2, "0")}-${slug(step)}.png`;
      await page.screenshot({ path: file, fullPage: flag("full") });
      console.log(`Sparade ${file}`);
    }
    await context.close();
  }
} catch (error) {
  failed = true;
  console.error(error instanceof Error ? error.message : error);
  if (String(error).includes("ERR_CONNECTION_REFUSED")) {
    console.error(`Når inte ${base}. Kör \`npm run dev\` och ange porten Vite skriver ut med --url.`);
  }
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
