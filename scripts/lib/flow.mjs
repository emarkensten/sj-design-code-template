// Gemensamt för skript som klickar sig igenom prototypen (screenshots, verify).
// Ett flöde är en lista med steg, samma språk i båda skripten:
//
//   "/boka-om"            gå till en adress
//   "Välj avgång"         klicka på det som heter så: knapp, länk, radioknapp, flik, menyval …
//   "Namn=Anna Andersson" skriv i fältet vars etikett är Namn
//   "vänta:Text"          vänta tills texten syns (till exempel efter ett anrop), högst en minut
//   "syns:Text"           kontrollera att texten syns nu (inom 5 sekunder), annars fel
//   "inte:Text"           kontrollera att texten inte syns, annars fel

import { devices } from "playwright";

// Val av avgång, klass eller datum är ofta radioknappar, flikar eller chips, inte knappar.
const clickableRoles = ["button", "link", "radio", "tab", "checkbox", "switch", "option", "menuitem"];

/** Format att öppna prototypen i. iPhone-läget används med WebKit (Safaris motor). */
export const viewports = {
  mobil: { viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 },
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  // iPhone 13 mini, 375 px bred. Fönstret är lägre än skärmen eftersom Safaris
  // adressfält och verktygsfält tar plats.
  iphone: (() => {
    const iphone = { ...devices["iPhone 13 Mini"], deviceScaleFactor: 2 };
    delete iphone.defaultBrowserType;
    return iphone;
  })(),
};

export const schemeName = { light: "ljust", dark: "morkt" };

/** Ett nytt webbläsarfönster som en svensk telefon eller dator. */
export async function newContext(browser, { viewport, scheme = "light", motion = false }) {
  return browser.newContext({
    ...viewport,
    colorScheme: scheme,
    // Datum, veckodagar och tider visas på svenska.
    locale: "sv-SE",
    timezoneId: "Europe/Stockholm",
    // Utan rörelse syns allt direkt: lager som glider upp hinner annars inte klart
    // innan bilden tas, och element som tonar in syns inte i helsidesbilder.
    reducedMotion: motion ? "no-preference" : "reduce",
  });
}

async function click(page, name) {
  const candidates = [
    ...clickableRoles.map((role) => page.getByRole(role, { name, exact: true })),
    ...clickableRoles.map((role) => page.getByRole(role, { name })),
    page.getByText(name, { exact: true }),
  ];
  for (const locator of candidates) {
    if ((await locator.count()) > 0) {
      await locator.first().click();
      return;
    }
  }
  throw new Error(`Hittade inget att klicka på som heter "${name}".`);
}

/**
 * Kör ett steg. Kastar ett fel med en mening på svenska om steget inte gick,
 * till exempel om knappen saknas eller texten inte syns.
 */
export async function runStep(page, base, step) {
  if (step.startsWith("/")) {
    const response = await page.goto(base + step, { waitUntil: "networkidle" });
    if (response && response.status() >= 400) throw new Error(`Sidan ${step} svarar med fel ${response.status()}.`);
  } else if (step.startsWith("vänta:")) {
    await page.getByText(step.slice(6).trim()).filter({ visible: true }).first().waitFor({ timeout: 60_000 });
  } else if (step.startsWith("syns:")) {
    const text = step.slice(5).trim();
    try {
      // Bara text som syns räknas. SJ:s AppBar har till exempel sidans rubrik dold tills
      // den stora rubriken scrollats bort, och den ska inte ge ett falskt "syns".
      await page.getByText(text).filter({ visible: true }).first().waitFor({ timeout: 5_000 });
    } catch {
      throw new Error(`Texten "${text}" syns inte.`);
    }
  } else if (step.startsWith("inte:")) {
    const text = step.slice(5).trim();
    if ((await page.getByText(text).filter({ visible: true }).count()) > 0) throw new Error(`Texten "${text}" syns, men ska inte göra det.`);
  } else if (step.includes("=")) {
    const [label, ...rest] = step.split("=");
    const field = page.getByLabel(label.trim(), { exact: true }).first();
    if ((await field.count()) === 0) throw new Error(`Hittade inget fält med etiketten "${label.trim()}".`);
    await field.fill(rest.join("="));
  } else {
    await click(page, step);
    await page.waitForLoadState("networkidle");
  }
  // Låt Sheets och andra lager animera klart.
  await page.waitForTimeout(700);
}
