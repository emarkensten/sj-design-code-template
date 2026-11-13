#!/usr/bin/env node
// Visar vilka variabler som finns i .env.local och i miljön, utan att visa värdena.
// Agenten får ofta inte läsa .env.local. Det här räcker för att se vad som saknas
// och om en variabel i miljön går före filen (till exempel DATABASE_URL i molnet).
//
//   npm run env:check
//   npm run env:check -- --ping     testar också att databasen svarar (kräver @neondatabase/serverless)

import { existsSync, readFileSync } from "node:fs";

const file = existsSync(".env.local") ? readFileSync(".env.local", "utf8") : null;
if (file === null) console.log("Ingen .env.local. Skapa den när prototypen behöver nycklar (den checkas aldrig in).");

const fromFile = {};
for (const line of (file ?? "").split("\n")) {
  const m = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)$/i);
  if (m) fromFile[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}

const describe = (value) => {
  if (!value) return "tom";
  try {
    const url = new URL(value);
    if (url.protocol.startsWith("postgres")) return `databas på ${url.host}`;
  } catch {}
  return `satt (${value.length} tecken)`;
};

const keys = Object.keys(fromFile);
if (keys.length) {
  console.log("\n.env.local:");
  for (const key of keys) {
    const env = process.env[key];
    let note = describe(fromFile[key]);
    if (env !== undefined && env !== fromFile[key]) {
      note += `  VARNING: miljön har ett annat värde (${describe(env)}) och det går före filen`;
    }
    console.log(`  ${key.padEnd(28)} ${note}`);
  }
}

// Variabler som bara finns i miljön men som prototypen kan tänkas läsa.
const interesting = /^(DATABASE_URL|POSTGRES_URL|PG\w+|NEON_\w+|PROTO_\w+|\w+_API_KEY)$/;
const onlyEnv = Object.keys(process.env).filter((k) => interesting.test(k) && !(k in fromFile));
if (onlyEnv.length) {
  console.log("\nBara i miljön (inte i .env.local):");
  for (const key of onlyEnv) console.log(`  ${key.padEnd(28)} ${describe(process.env[key])}`);
}
if (process.env.ANTHROPIC_API_KEY !== undefined && !("PROTO_ANTHROPIC_API_KEY" in fromFile)) {
  console.log("\nTips: ANTHROPIC_API_KEY används av Claude själv i molnet. Ge prototypens nyckel ett eget namn, till exempel PROTO_ANTHROPIC_API_KEY.");
}

if (process.argv.includes("--ping")) {
  const url = process.env.DATABASE_URL ?? fromFile.DATABASE_URL;
  if (!url) {
    console.log("\nIngen DATABASE_URL att testa.");
    process.exit(1);
  }
  try {
    const { neon } = await import("@neondatabase/serverless");
    await neon(url)`select 1`;
    console.log(`\nDatabasen svarar (${describe(url)}).`);
  } catch (error) {
    console.log(`\nDatabasen svarar inte: ${error.message}`);
    process.exit(1);
  }
}
