#!/usr/bin/env node
// För in mallens senaste rättningar i en prototyp.
//
//   npm run template:update            hämtar mallen och tar över filer som prototypen inte rört
//   npm run template:update -- --dry   visar bara vad som skulle hända
//
// Fungerar både när prototypen är en klon av mallen och när den skapades som en kopia
// ("Use this template" eller `gh repo create --template`), alltså utan gemensam git-historik.
// En fil räknas som orörd om den är exakt lik någon version av samma fil i mallens historik.
// Då byts den mot mallens senaste version. Filer som prototypen ändrat skrivs aldrig över:
// de listas, med ett kommando för att jämföra dem med mallen.
//
// Inget sparas (commit). Granska med `git diff` och spara när det ser rätt ut.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { TEMPLATE_REPO, say } from "./lib/util.mjs";

const dry = process.argv.includes("--dry");
const REF = "refs/sj-mall/main";

// Prototypens egna filer. De byts bara om de är orörda, och listas inte när de är ändrade
// eller borttagna, eftersom de ska skilja sig från mallen.
const OWN = [
  /^README\.md$/,
  /^PRODUCT\.md$/,
  /^DESIGN\.md$/,
  /^flows\.json$/,
  /^index\.html$/,
  /^feedback-till-mallen\.md$/,
  /^public\//,
  /^src\/(pages|data|i18n)\//,
  /^src\/App\.tsx$/,
];
// Hanteras aldrig: lockfilen skapas om av npm efter att package.json slagits ihop.
const SKIP = [/^package-lock\.json$/];

const git = (args, opts = {}) => {
  const r = spawnSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, ...opts });
  if (r.status !== 0 && !opts.allowFail) {
    say(`git ${args.join(" ")} misslyckades:\n${r.stderr}`);
    process.exit(1);
  }
  return r.status === 0 ? r.stdout : null;
};

if (!existsSync(".git")) {
  say("Mappen är inte ett git-repo. Kör skriptet i prototypens rot.");
  process.exit(1);
}

say(`Hämtar mallen från github.com/${TEMPLATE_REPO}...`);
git(["fetch", "--quiet", "--no-tags", `https://github.com/${TEMPLATE_REPO}.git`, `+main:${REF}`]);
const head = git(["rev-parse", "--short", REF]).trim();

// Alla versioner (blob-id) som varje fil haft i mallens historik.
const history = new Map();
const log = git(["log", "--format=", "--raw", "--no-abbrev", "--no-renames", REF]);
for (const line of log.split("\n")) {
  const m = line.match(/^:\d+ \d+ [0-9a-f]+ ([0-9a-f]+) \w\t(.+)$/);
  if (!m || /^0+$/.test(m[1])) continue;
  if (!history.has(m[2])) history.set(m[2], new Set());
  history.get(m[2]).add(m[1]);
}

const files = git(["ls-tree", "-r", "--format=%(objectname) %(path)", REF]).trim().split("\n");
const updated = [];
const changed = [];
const missing = [];

for (const row of files) {
  const space = row.indexOf(" ");
  const blob = row.slice(0, space);
  const path = row.slice(space + 1);
  if (SKIP.some((r) => r.test(path))) continue;
  const own = OWN.some((r) => r.test(path));

  if (!existsSync(path)) {
    if (!own) missing.push(path);
    continue;
  }
  const local = git(["hash-object", path]).trim();
  if (local === blob) continue;
  if (history.get(path)?.has(local)) {
    updated.push(path);
    if (!dry) {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, git(["cat-file", "blob", blob], { encoding: "buffer" }));
    }
  } else if (!own) {
    changed.push(path);
  }
}

say(`\nMallen är på commit ${head}.`);
if (updated.length) {
  say(`\n${dry ? "Skulle uppdateras" : "Uppdaterade"} (prototypen hade inte ändrat dem):`);
  for (const p of updated) say(`  ${p}`);
}
if (changed.length) {
  say("\nÄndrade i både mallen och prototypen. Slå ihop för hand:");
  for (const p of changed) say(`  ${p}    git diff ${REF} -- ${p}`);
}
if (missing.length) {
  say("\nFinns i mallen men inte här (ny i mallen, eller borttagen i prototypen):");
  for (const p of missing) say(`  ${p}    git checkout ${REF} -- ${p}`);
}
if (!updated.length && !changed.length && !missing.length) say("Prototypen har redan mallens senaste version.");

if (!dry && (updated.includes("package.json") || changed.includes("package.json"))) {
  say("\npackage.json skiljer sig från mallen. Kör `npm install` när den är ihopslagen, och sedan `npm run build`.");
}
if (!dry && updated.length) say("\nInget är sparat än. Granska med `git diff`, kör `npm run typecheck` och spara sedan.");
