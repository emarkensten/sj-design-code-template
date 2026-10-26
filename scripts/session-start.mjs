#!/usr/bin/env node
// Körs av Claude Code när en session startar (.claude/settings.json).
// Skriver en kort statusrad som agenten ser i sin kontext, så att den vet
// om något behöver installeras eller uppdateras innan designern börjar.
// Ändrar ingenting själv och misslyckas aldrig.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const notes = [];

if (!existsSync("node_modules/@sj-ab")) {
  notes.push("Beroenden saknas: kör `npm run setup` (eller `npm run doctor` först om det är en ny dator).");
} else {
  try {
    const out = execFileSync("node", ["scripts/sj-update.mjs", "--check"], {
      encoding: "utf8",
      timeout: 75_000,
    });
    notes.push(out.trim());
  } catch {
    notes.push("Kunde inte kolla SJ-paketens versioner (offline?).");
  }
}

if (!existsSync(".claude/skills/impeccable") || !existsSync(".claude/skills/break-ui")) {
  notes.push("Designskills saknas (impeccable eller Emil Kowalskis): kör `npm run skills` och be sedan designern starta en ny chatt i mappen.");
}

if (!existsSync(".vercel/project.json")) {
  notes.push("Inte kopplad till Vercel än. Det görs första gången prototypen publiceras (`npm run ship`).");
}

notes.push("Testperiod: skriv ned allt som krånglar med mallen i feedback-till-mallen.md (se AGENTS.md).");

console.log(`[SJ-mall] ${notes.join("\n[SJ-mall] ")}`);
