import { existsSync, readFileSync } from "node:fs";
import { Readable } from "node:stream";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Alla installerade SJ-paket. Vite förbereder dem när dev-servern startar, i stället
// för mitt i en session första gången ett nytt paket importeras. Det senare laddar
// om sidan och ger tillfälliga "Invalid hook call"-fel i konsolen.
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const sjPackages = Object.keys(pkg.dependencies ?? {}).filter((name) =>
  name.startsWith("@sj-ab/component-library."),
);

/**
 * Kör serverfunktioner i `api/` under `npm run dev`, så som Vercel kör dem efter publicering.
 * `api/state.ts` svarar på `/api/state`. Skriv funktionerna med webbstandarden:
 *
 *   export async function GET(request: Request) { return Response.json({ ok: true }); }
 *
 * Gör ingenting om mappen `api/` saknas. Mer i docs/backend.md.
 */
function apiRoutes(): Plugin {
  return {
    name: "sj-api-routes",
    apply: "serve",
    configureServer(server) {
      let envReported = false;
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? "/", "http://localhost");
        const name = url.pathname.match(/^\/api\/([\w-]+)\/?$/)?.[1];
        // Kollas vid varje anrop, så att en api/-mapp som skapas medan dev-servern kör fungerar direkt.
        if (!url.pathname.startsWith("/api/") || !existsSync("api")) return next();
        if (!envReported) {
          envReported = true;
          reportEnv(server.config.mode);
        }
        if (!name || !existsSync(`api/${name}.ts`)) {
          res.statusCode = 404;
          return res.end(`Ingen serverfunktion för ${url.pathname} (lägg den i api/<namn>.ts)`);
        }
        try {
          const mod = await server.ssrLoadModule(`/api/${name}.ts`);
          const method = (req.method ?? "GET").toUpperCase();
          const handler = mod[method] ?? mod.default?.fetch ?? mod.default;
          if (typeof handler !== "function") {
            res.statusCode = 405;
            return res.end(`api/${name}.ts saknar ${method}`);
          }
          const hasBody = !["GET", "HEAD"].includes(method);
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value !== undefined) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
          }
          // Node kräver `duplex` när body är en ström.
          const init = {
            method,
            headers,
            body: hasBody ? (Readable.toWeb(req) as ReadableStream) : undefined,
            duplex: hasBody ? "half" : undefined,
          } as RequestInit;
          const request = new Request(new URL(req.url ?? "/", `http://${req.headers.host}`), init);
          const response: Response = await handler(request);
          res.statusCode = response.status;
          // Kroppen läses avkodad nedan, så längd och komprimering från en vidarebefordrad
          // fetch() stämmer inte längre.
          response.headers.forEach((value, key) => {
            if (!["content-encoding", "content-length", "transfer-encoding"].includes(key)) res.setHeader(key, value);
          });
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          server.config.logger.error(`api/${name}.ts: ${(error as Error).stack ?? error}`);
          res.statusCode = 500;
          res.end(`Fel i api/${name}.ts (se terminalen)`);
        }
      });
    },
  };
}

/**
 * Läser `.env.local` till serverfunktionerna. En variabel som redan finns i miljön (till exempel
 * DATABASE_URL i Claudes molnmiljö) går före filen. Det har fått tester att gå mot den riktiga
 * databasen, så skriv tydligt ut vilken databas som används och varna när de skiljer sig åt.
 */
function reportEnv(mode: string) {
  const file = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(file)) process.env[key] ??= value;
  const local = existsSync(".env.local") ? readFileSync(".env.local", "utf8") : "";
  for (const key of ["DATABASE_URL", "POSTGRES_URL"]) {
    const fromFile = local.match(new RegExp(`^${key}=["']?([^"'\\n]+)`, "m"))?.[1];
    const used = process.env[key];
    if (!used) continue;
    console.log(`\n  api/: ${key} pekar på ${host(used)}`);
    if (fromFile && fromFile !== used) {
      console.warn(`  VARNING: ${key} kommer från miljön, inte från .env.local (${host(fromFile)}).`);
      console.warn(`  Miljön går före filen. Starta med ${key}='...' npm run dev för att välja databas.\n`);
    }
  }
}

const host = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return "(okänd adress)";
  }
};

export default defineConfig({
  plugins: [react(), apiRoutes()],
  build: {
    // SJ:s tågillustrationer gör paketet stort. Väntat för en prototyp.
    chunkSizeWarningLimit: 3000,
    rolldownOptions: {
      output: {
        // Vite 8 kan annars köra bitarna av bygget i fel ordning när ett paket i CommonJS
        // är med. Det ger en vit sida på Vercel ("i is not a function" i Box-*.js),
        // fast `npm run dev` och typkontrollen fungerar. `npm run smoke` hittar det.
        strictExecutionOrder: true,
      },
    },
  },
  resolve: {
    // SJ:s paket har egna beroenden på React, MUI och Emotion. En enda kopia av
    // varje undviker "Invalid hook call" och dubbla Emotion-instanser.
    dedupe: ["react", "react-dom", "@emotion/react", "@emotion/styled", "@mui/material", "@mui/system"],
  },
  optimizeDeps: {
    include: sjPackages,
  },
});
