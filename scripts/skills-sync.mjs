#!/usr/bin/env node
// Kopierar skills från .claude/skills/ till .github/skills/ (för GitHub Copilot).
// Snabb och utan nät. `npm run skills` gör samma sak efter installationen.
//
//   npm run skills:sync

import { mirrorSkillsForCopilot } from "./lib/copilot-skills.mjs";

const count = mirrorSkillsForCopilot();
console.log(`${count} skills kopierade till .github/skills/ för GitHub Copilot.`);
