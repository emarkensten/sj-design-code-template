#!/usr/bin/env node
// Klickar sig igenom ett flöde i prototypen och sparar en skärmdump efter varje steg.
// Bra för att visa lägen som kräver klick, till exempel ett öppet Sheet.
//
//   npm run screenshots -- / "Mina resor" "Visa resa"
//   npm run screenshots -- /boka-om "Välj avgång" --desktop --dark
//   npm run screenshots -- /boka-om "Välj avgång" --safari
//
// Stegen är samma som i flows.json (se scripts/lib/flow.mjs): ett steg som börjar med /
// är en adress, "Etikett=text" skriver i ett fält, "syns:Text" kontrollerar att texten
// syns, och allt annat är namnet på något att klicka på: en knapp, länk, radioknapp,
// kryssruta eller flik (samma text som skärmläsaren läser upp).
//
//   --url <adress>   dev-serverns adress (standard: Vite-servern som körs från den här mappen)
//   --desktop        även 1440×900, inte bara mobil 375×812
//   --dark           mörkt läge
//   --both           både ljust och mörkt läge
//   --safari         WebKit (Safaris motor) som en iPhone, i stället för Chromium
//   --full           hela sidan, inte bara det som syns i fönstret
//   --motion         med rörelse (standard är reducerad rörelse, så att lager hinner klart)
//
// Bilderna hamnar i screenshots/ (checkas inte in). Dev-servern måste vara igång.

import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { findOwnDevServer, launchBrowser, slug } from "./lib/browser.mjs";
import { newContext, runStep, schemeName, viewports } from "./lib/flow.mjs";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const urlIndex = argv.indexOf("--url");
const base = (urlIndex >= 0 ? argv[urlIndex + 1] : findOwnDevServer()).replace(/\/$/, "");
const steps = argv.filter((a, i) => !a.startsWith("--") && !(urlIndex >= 0 && i === urlIndex + 1));

if (steps.length === 0) {
  console.log('Användning: npm run screenshots -- / "Knapptext" "Länktext" [--desktop] [--dark|--both] [--safari] [--full] [--url <adress>]');
  process.exit(0);
}

const safari = flag("safari");
const formats = safari ? ["iphone"] : ["mobil", ...(flag("desktop") ? ["desktop"] : [])];
const schemes = flag("both") ? ["light", "dark"] : [flag("dark") ? "dark" : "light"];

// Ta bort förra omgångens bilder, men inte undermapparna från verify och ios-check.
mkdirSync("screenshots", { recursive: true });
for (const file of readdirSync("screenshots")) if (file.endsWith(".png")) rmSync(`screenshots/${file}`);

const browser = await launchBrowser(safari ? "webkit" : "chromium");
let failed = false;
try {
  for (const format of formats) {
    for (const scheme of schemes) {
      const context = await newContext(browser, { viewport: viewports[format], scheme, motion: flag("motion") });
      const page = await context.newPage();
      const prefix = `${safari ? "safari" : format}${schemes.length > 1 ? `-${schemeName[scheme]}` : ""}`;
      for (const [index, step] of steps.entries()) {
        await runStep(page, base, step);
        const file = `screenshots/${prefix}-${String(index + 1).padStart(2, "0")}-${slug(step)}.png`;
        await page.screenshot({ path: file, fullPage: flag("full") });
        console.log(`Sparade ${file}`);
      }
      await context.close();
    }
  }
} catch (error) {
  failed = true;
  console.error(error instanceof Error ? error.message.split("\n")[0] : error);
  if (String(error).includes("ERR_CONNECTION_REFUSED") || String(error).includes("Could not connect")) {
    console.error(`Når inte ${base}. Kör \`npm run dev\` och ange porten Vite skriver ut med --url.`);
  }
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
