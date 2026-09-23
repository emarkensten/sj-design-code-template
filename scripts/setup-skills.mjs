#!/usr/bin/env node
// Installerar designskillen impeccable för kodagenten (Claude Code och GitHub Copilot).
// Hämtas färska varje gång och checkas inte in (se .gitignore).
// `sj-design-system` ligger redan incheckad i .claude/skills/.
//
//   npm run skills

import { spawnSync } from "node:child_process";

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
];

const { GH_HOST: _host, GH_ENTERPRISE_TOKEN: _token, ...withoutGhHost } = process.env;

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
} else {
  console.log("\nSkills klara. Starta om Claude Code eller Copilot-chatten så att de laddas.");
}
