#!/usr/bin/env node
// Kollar att datorn har det som behövs för att koda med mallen.
// Ändrar ingenting, skriver bara ut status och vad som saknas.
//
//   npm run doctor
//
// Kodagenten kör den här först och guidar sedan designern genom det som saknas
// (se docs/kom-igang.md).

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";

const isWin = process.platform === "win32";
// --pre-install: körs av `npm run setup` före `npm install`, så trasiga beroenden stoppar inte.
// --deps-only: körs efter installationen och kollar bara att alla beroenden faktiskt finns.
const preInstall = process.argv.includes("--pre-install");
const depsOnly = process.argv.includes("--deps-only");
const rows = [];
let blocking = 0;

function run(cmd, args) {
  try {
    return execFileSync(cmd, args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 20_000,
      shell: isWin,
    }).trim();
  } catch (error) {
    // gh auth status skriver till stderr även när det går bra.
    const text = `${error.stdout ?? ""}${error.stderr ?? ""}`.trim();
    return error.status === 0 ? text : null;
  }
}

function check(label, ok, detail, { required = true, fix } = {}) {
  const status = ok ? "OK     " : required ? "SAKNAS " : "VALFRI ";
  if (!ok && required) blocking++;
  rows.push(`${status} ${label}${detail ? `  (${detail})` : ""}`);
  if (!ok && fix) rows.push(`        -> ${fix}`);
}

if (depsOnly) {
  checkDependencies();
  finish();
}

// Node
const nodeMajor = Number(process.versions.node.split(".")[0]);
check("Node.js 20 eller senare", nodeMajor >= 20, `v${process.versions.node}`, {
  fix: "Mac: kör scripts/bootstrap.sh. Annars docs/kom-igang.md steg 2",
});

// Git
const gitVersion = run("git", ["--version"]);
check("Git", !!gitVersion, gitVersion ?? undefined, { fix: "Mac: kör scripts/bootstrap.sh. Annars docs/kom-igang.md steg 1" });
if (gitVersion) {
  const name = run("git", ["config", "--global", "user.name"]);
  const email = run("git", ["config", "--global", "user.email"]);
  check("Git vet vem du är", !!name && !!email, name && email ? `${name} <${email}>` : undefined, {
    fix: 'git config --global user.name "Förnamn Efternamn" && git config --global user.email "din@mejl.se"',
  });
}

// GitHub CLI och inloggningar
const ghVersion = run("gh", ["--version"]);
check("GitHub CLI (gh)", !!ghVersion, ghVersion?.split("\n")[0], {
  required: false,
  fix: "Gör inloggning mot GitHub mycket enklare. Mac: bash scripts/bootstrap.sh --no-project",
});
if (ghVersion) {
  const personal = run("gh", ["auth", "status", "--hostname", "github.com"]);
  check("Inloggad på github.com (privat konto)", !!personal && /Logged in/i.test(personal), undefined, {
    required: false,
    fix: "gh auth login --hostname github.com --git-protocol https --web",
  });
  // SJ:s GitHub Enterprise: vilken annan värd än github.com som helst som gh är inloggad på.
  const all = run("gh", ["auth", "status"]) ?? "";
  const enterpriseHosts = [...all.matchAll(/Logged in to ([\w.-]+)/g)]
    .map((m) => m[1])
    .filter((host) => host !== "github.com");
  check("Inloggad på SJ:s GitHub Enterprise", enterpriseHosts.length > 0, enterpriseHosts.join(", ") || undefined, {
    required: false,
    fix: "Bara om du har SJ-konto: gh auth login --hostname <värdnamnet för SJ:s GitHub> --git-protocol https --web",
  });
}

// Projektet
const npmrc = existsSync(".npmrc") ? readFileSync(".npmrc", "utf8") : "";
check(".npmrc pekar @sj-ab mot Bit", npmrc.includes("@sj-ab:registry=https://node-registry.bit.cloud"), undefined, {
  fix: "Återställ .npmrc från mallen",
});

try {
  const res = await fetch("https://node-registry.bit.cloud/@sj-ab%2Fcomponent-library.ui.button", {
    signal: AbortSignal.timeout(10_000),
  });
  check("Bit-registret går att nå", res.ok, `HTTP ${res.status}`, {
    fix: "Kolla internetuppkopplingen. VPN behövs inte.",
  });
} catch {
  check("Bit-registret går att nå", false, "ingen kontakt", { fix: "Kolla internetuppkopplingen" });
}

function checkDependencies() {
  if (!existsSync("node_modules")) {
    check("Beroenden installerade (node_modules)", false, undefined, { required: false, fix: "npm install" });
    return;
  }
  // Varje beroende ska gå att ladda. Fångar halvfärdiga eller kopierade node_modules.
  const require = createRequire(`${process.cwd()}/`);
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const broken = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter((name) => {
    if (name.startsWith("@types/")) return !existsSync(`node_modules/${name}/package.json`);
    try {
      require.resolve(name);
      return false;
    } catch (error) {
      // Paket som bara exporterar för `import` går inte att require.resolve:a men är hela.
      if (error.code === "ERR_PACKAGE_PATH_NOT_EXPORTED") return false;
      return true;
    }
  });
  check("Beroenden installerade och hela", broken.length === 0, broken.length ? `saknas eller trasiga: ${broken.slice(0, 4).join(", ")}${broken.length > 4 ? " …" : ""}` : undefined, {
    required: !preInstall,
    fix: "npm install   (hjälper det inte: npm ci)",
  });
}
checkDependencies();
check("Designskill impeccable installerad", existsSync(".claude/skills/impeccable"), undefined, {
  required: false,
  fix: "npm run skills",
});

// Valfria verktyg
const claude = run("claude", ["--version"]);
check("Claude Code (terminal)", !!claude, claude ?? undefined, {
  required: false,
  fix: "Behövs inte om du kör Claude-appen eller Copilot i VS Code",
});
const vercel = run("vercel", ["--version"]);
check("Vercel CLI", !!vercel, vercel?.split("\n").pop(), {
  required: false,
  fix: "Behövs inte om du kopplar repot till Vercel via webben. Annars räcker npx vercel@latest",
});

// Tokens i miljön går före gh:s sparade inloggning och kan vara gamla.
if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN) {
  check("Ingen GH_TOKEN/GITHUB_TOKEN i miljön", false, "kan dölja din riktiga inloggning", {
    required: false,
    fix: "Får du inloggningsfel: kör gh-kommandon med  env -u GH_TOKEN -u GITHUB_TOKEN gh …",
  });
}

finish();

function finish() {
  console.log(depsOnly ? "\nKontroll efter installation\n" : "\nMiljökoll för SJ-prototypmallen\n");
  console.log(rows.join("\n"));
  console.log(
    blocking === 0
      ? "\nAllt som krävs finns på plats."
      : `\n${blocking} sak(er) måste fixas innan du kan köra igång. Be din kodagent om hjälp, eller läs docs/kom-igang.md.`,
  );
  process.exit(blocking === 0 ? 0 : 1);
}
