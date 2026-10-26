#!/usr/bin/env node
// Installerar designskills för kodagenten (Claude Code och GitHub Copilot).
// Hämtas färska varje gång och checkas inte in (se .gitignore).
// `sj-design-system` ligger redan incheckad i .claude/skills/.
//
//   npm run skills

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const npx = "npx";
const shell = process.platform === "win32";
const AGENTS = ["-a", "claude-code", "-a", "github-copilot"];

const SKILLS = [
  {
    // Styrs av DESIGN.md och PRODUCT.md i roten, så att den håller sig till SJ:s visuella värld.
    // frontend-design valdes bort: den handlar om att välja egna typsnitt och färger,
    // vilket krockar med designsystemet.
    label: "impeccable: designgranskning (critique, audit, layout, polish)",
    // Full adress: kortformen "pbakaus/impeccable" följer GH_HOST och hamnar
    // på SJ:s GitHub Enterprise i miljöer där den är satt (t.ex. Copilot).
    args: ["https://github.com/pbakaus/impeccable"],
  },
  {
    // Samma urval som Antrops prototypmall. Rör inte typsnitt och färger, bara omdöme och detaljer.
    label: "Emil Kowalskis skills: rörelse, mobilkänsla, stresstest (break-ui) och varianter (/prototype)",
    args: [
      "https://github.com/emilkowalski/skills",
      ...["emil-design-eng", "review-animations", "find-animation-opportunities", "mobile-native", "break-ui", "prototype"].flatMap(
        (name) => ["--skill", name],
      ),
    ],
  },
  {
    label: "Vercels gränssnittsregler (web-design-guidelines)",
    args: ["https://github.com/vercel-labs/agent-skills", "--skill", "web-design-guidelines"],
  },
];

// Skillen är publik. Ta bort GitHub-inställningar som kan peka fel eller vara ogiltiga.
const { GH_HOST: _host, GH_ENTERPRISE_TOKEN: _entToken, GH_TOKEN: _token, GITHUB_TOKEN: _ghToken, ...withoutGhHost } = process.env;

// Fanns skillen redan är den laddad i en session som startades här, och då behövs ingen omstart.
const hadSkill =
  (existsSync(".claude/skills/impeccable") || existsSync(".agents/skills/impeccable")) &&
  (existsSync(".claude/skills/break-ui") || existsSync(".agents/skills/break-ui"));

let failed = 0;
for (const skill of SKILLS) {
  console.log(`\nInstallerar ${skill.label}`);
  const result = spawnSync(npx, ["-y", "skills@latest", "add", ...skill.args, ...AGENTS, "-y"], {
    stdio: ["ignore", "inherit", "inherit"],
    env: withoutGhHost,
    shell,
  });
  if (result.status !== 0) failed++;
}

if (failed > 0) {
  console.warn(`\n${failed} skill(s) kunde inte installeras. Kör \`npm run skills\` igen när du är online.`);
} else if (hadSkill) {
  console.log("\nSkills klara. Designskillsen fanns redan, så en session som startades i den här mappen kan fortsätta utan omstart.");
} else {
  console.log(
    "\nSkills klara. VIKTIGT: starta om kodagenten i den här mappen (VS Code: File → Open Folder, " +
      "Claude: ny session) så att designskillsen och SJ:s MCP-servrar laddas.",
  );
}
