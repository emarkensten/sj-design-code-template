# Backend: databas, serverfunktioner och tester mot riktig data

Läs det här när prototypen behöver mer än påhittad data i webbläsaren: en API-nyckel som inte får synas, eller **delat tillstånd mellan flera telefoner** (röster, incheckningar, en gemensam lista). De flesta prototyper behöver det inte. Data som bara ska följa med mellan sidor löses med en Context (se `src/data/README.md`).

Erfarenheterna här kommer från en prototyp som användes live av en grupp. Det som gick fel där gick fel tyst och drabbade riktiga användare, så följ ordningen.

## Serverfunktioner i `api/`

En fil i `api/` blir en Vercel Function efter publicering, och `npm run dev` kör samma fil lokalt (pluginen `apiRoutes` i `vite.config.ts`). `api/state.ts` svarar på `/api/state`. Skriv dem med webbstandarden:

```ts
// api/state.ts
export async function GET(request: Request) {
  return Response.json({ ok: true });
}
export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ saved: body }, { status: 201 });
}
```

- Nycklar läses från `process.env` och ligger i `.env.local` lokalt och i Vercels inställningar efter publicering. **Lägg dem i Vercel för både Production och Preview**, annars saknar förhandslänkarna för en branch nycklarna.
- Ge prototypens nycklar egna namn, till exempel `PROTO_ANTHROPIC_API_KEY`. `ANTHROPIC_API_KEY` används av Claude själv i molnet och krockar.
- Agenten får ofta inte läsa `.env.local`. `npm run env:check` visar vilka variabler som finns utan att visa värdena (`--ping` testar databasen).
- Kom inget svar fram? Läs Vercels loggar (Vercel-MCP:n: `get_runtime_logs`) för att se om anropet nådde servern.

## Databas

Neon (Postgres) via Vercel Marketplace: *Storage → Create → Neon* i Vercel-projektet. Då läggs `DATABASE_URL` in i Vercel automatiskt. Hämta den till `.env.local` med `npx vercel env pull .env.local`. Paketet `@neondatabase/serverless` kräver designerns ok, precis som andra paket utanför `@sj-ab`.

Lägg en kö i `localStorage` och läs om med jämna mellanrum (till exempel var tionde sekund) om prototypen ska tåla dåligt nät. Det räcker för en prototyp. Realtid behövs sällan.

## Testa aldrig mot den riktiga datan

Lokal utveckling går mot **samma databas som den publicerade länken** om inget annat görs. Ett test som lägger in en låtsasmedlem syns då för alla.

1. **Skapa en testkopia** av databasen: en Neon-branch (Neon-MCP:n `create_branch`, eller Neons webbsida). Den har samma tabeller och data men påverkar inte originalet.
2. **Ange adressen på kommandoraden**, inte bara i `.env.local`:

   ```bash
   DATABASE_URL='<testkopians adress>' npm run dev
   ```

   En variabel som redan finns i miljön går **före** `.env.local`, både i Vite och i `node --env-file`. I Claudes molnmiljö är `DATABASE_URL` ofta redan satt till den riktiga databasen. `npm run dev` skriver ut vilken databas `api/` använder och varnar när miljön och `.env.local` skiljer sig åt. Läs den raden.
3. **Kontrollera att det är testkopian:** lägg in en rad som bara finns där och läs den genom appen innan du testar något som skriver.
4. **Ta bort testkopian** när du är klar, utan att fråga.
5. **Förhandsvisa bygget** innan något publiceras: `npm run smoke`, eller en branch med egen förhandslänk.

## Ändra databasen

- **Bara tillägg:** `create table if not exists`, `alter table ... add column if not exists`, och nya kolumner får vara tomma. Ta aldrig bort eller döp om något som den publicerade versionen läser.
- **Migrera först, merga sedan.** Varken Vercel eller `npm run ship` kör migreringar. Publiceras kod som läser en ny kolumn innan den finns, svarar API:t med fel för alla.
- **Be designern om ok i skrift tidigt.** Claudes säkerhetsfilter stoppar ändringar i produktionsdatabasen utan ett uttryckligt ok i chatten. Be om det när du planerar ändringen, inte när allt annat är klart. Ge designern en färdig mening att svara med, till exempel *"Ok att lägga till kolumnen `rating` i tabellen `places` i prod-databasen och sedan publicera"*.
- Fel i delad data: bygg in ångra och ta bort i appen (se `src/data/README.md`) i stället för att rätta med SQL för hand.

## Jobba från Claude i molnet

- Lägg in samma variabler i molnmiljön som i `.env.local`, och låt helst `DATABASE_URL` där peka på en **testkopia**, inte den riktiga databasen.
- Förhandslänkar på Vercel kräver inloggning. Agenten kan öppna dem med Vercel-MCP:ns `web_fetch_vercel_url`. Kollegor behöver ett Vercel-konto i teamet, eller en delningslänk (*Share* på deploymenten).
