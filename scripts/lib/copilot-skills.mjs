// Speglar mallens skills till .github/skills/, där GitHub Copilot i VS Code letar.
//
// Claude Code läser .claude/skills/, Copilot bara .github/skills/. Källan är alltid
// .claude/skills/ (sj-design-system är incheckad där, de andra installeras av
// `npm run skills`). .github/skills/ är genererad och gitignorerad: ändra aldrig där.
// Kopior i stället för symboliska länkar, eftersom länkar ofta går sönder på Windows.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE = ".claude/skills";
const TARGET = ".github/skills";
const MARKER = join(TARGET, ".genererad-av-mallen");

/** Namnen på skills i .claude/skills/ (följer symboliska länkar). */
function sourceSkills() {
  if (!existsSync(SOURCE)) return [];
  return readdirSync(SOURCE).filter((name) => {
    try {
      return statSync(join(SOURCE, name)).isDirectory() && existsSync(join(SOURCE, name, "SKILL.md"));
    } catch {
      return false; // trasig länk
    }
  });
}

/** Skills som saknas eller skiljer sig i .github/skills/. Tom lista = i takt.
 *  Jämför bara SKILL.md: en ändrad referensfil märks först vid nästa sync. */
export function copilotSkillsOutOfSync() {
  return sourceSkills().filter((name) => {
    const target = join(TARGET, name, "SKILL.md");
    if (!existsSync(target)) return true;
    return readFileSync(target, "utf8") !== readFileSync(join(SOURCE, name, "SKILL.md"), "utf8");
  });
}

/** Kopierar alla skills från .claude/skills/ till .github/skills/. Returnerar antalet. */
export function mirrorSkillsForCopilot() {
  const names = sourceSkills();
  // Rensa bara en mapp som mallen själv har skapat, så att egna Copilot-skills får vara kvar.
  if (existsSync(MARKER)) {
    for (const name of readdirSync(TARGET)) {
      if (!name.startsWith(".")) rmSync(join(TARGET, name), { recursive: true, force: true });
    }
  }
  mkdirSync(TARGET, { recursive: true });
  for (const name of names) {
    rmSync(join(TARGET, name), { recursive: true, force: true });
    cpSync(join(SOURCE, name), join(TARGET, name), { recursive: true, dereference: true });
  }
  writeFileSync(MARKER, "Genereras av `npm run skills` från .claude/skills/. Ändra där, inte här.\n");
  return names.length;
}
