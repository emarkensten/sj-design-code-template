# Underlag: Figma, impeccable, Mobbin och varianter

Till kodagenten. AGENTS.md ("Innan du designar") säger när du läser den här filen. Allt här gällde tidigare direkt i AGENTS.md och är flyttat utan ändringar.

Fråga alltid, första gången en ny vy eller ett nytt flöde ska byggas: **"Finns det Figma-skisser för det här?"**

- **Ja, det finns Figma:** det finns två vägar till filen. Använd den som svarar:
  - **Figmas app på datorn** (`figma-desktop`-MCP:n, `http://127.0.0.1:3845/mcp`). Snabbast i en live-session: designern markerar en frame i Figma-appen och skriver "bygg det jag markerat". Verktygen (`get_design_context`, `get_screenshot`, `get_variable_defs`, `get_metadata`) läser då markeringen utan länk. Servern finns bara när Figma-appen är öppen och *Dev Mode MCP server* är påslagen (Figma-menyn → *Preferences* → *Enable Dev Mode MCP Server*). Svarar den inte: be designern slå på det, eller använd länken.
  - **Figma-pluginen** (Figmas server på nätet). Be om länken (högerklick på framen, *Copy link to selection*) och använd samma verktyg med länkens `fileKey` och `nodeId`.

  Bygg sedan med SJ-komponenter. Översätt Figma-lager till rätt komponent och inte till handgjorda divar:
  - `get_figma_component_conversions` i `sj-design-system`-MCP:n ger granskade översättningar från Figma-komponenter till SJ:s Bit-paket, med props som heter olika i Figma och React. Kör den innan du väljer komponenter.
  - `find_figma_token_mapping` översätter Figma-variabler till SJ-tokens. Hårdkoda aldrig värden från Figma-kod.
  - Koden Figma-MCP:n ger tillbaka är en *referens* (ofta React med Tailwind). Använd den för struktur och innehåll, aldrig rakt av: SJ-mallen har inte Tailwind.

  Kräver Figma-pluginen inloggning (servern "requires authentication"): du kan inte logga in åt designern. Be hen logga in via kopplingarna i Claude-appen, eller med `/mcp` i en terminal med `claude`, och starta sedan en ny session. Be om en skärmdump av framen så länge.
- **Nej, ingen Figma:** berätta att du tänker använda designskillen **impeccable** och varför. Skriv till exempel: "Det finns ingen skiss, så jag planerar vyn med impeccable först och granskar den när den är byggd. Allt inom SJ:s designsystem." Gör sedan så här:
  1. Kolla att `PRODUCT.md` har *Problem*, *Users* och *Product Purpose* ifyllda för prototypen. Ställ annars högst tre korta frågor till designern (vilket är det jobbigaste ögonblicket i dag, vem, i vilken situation, vad ska hen få gjort) och fyll i dem. Kommer beställningen som en lösning ("visa alla byten i en karta"): fråga efter problemet bakom innan konceptet formas.
  2. **Före bygget:** arbetsflödet `shape`, för att planera flöde och hierarki.
  3. Bygg med SJ-komponenter enligt reglerna i AGENTS.md ("SJ:s designsystem").
  4. **Efter bygget:** arbetsflödena `critique` (UX-granskning) och `audit` (tillgänglighet och responsivitet). Åtgärda det som hittas i en omgång.
  5. Vid behov: `layout` (avstånd och rytm), `distill` (skala bort), `harden` (fel-, tom- och laddlägen) eller `onboard` (första gången, tomma lägen).
- **Valfritt: referenser från Mobbin i konceptfasen.** Innan du formar ett nytt flöde eller en ny vy utan Figma: erbjud i en mening att hämta hur andra appar löst samma sak. Gör det bara om designern vill, annars går du vidare till `shape`. Mobbin-MCP:n söker i skärmar och flöden från riktiga appar: `search_flows` för flöden i flera steg (bokning, ombokning, betalning, onboarding), `search_screens` för en enskild vy (inställningar, profil, tomt läge) och `search_sections` för delar av webbsidor. Välj `platform` efter hur prototypen används: `ios` för mobil, `web` för desktop. Titta på bilderna, inte bara metadatan. Visa designern 3–5 exempel som länkar (`mobbin_url`) med en mening om vad varje exempel gör bra och vilka mönster du tänker använda. Ta mönster och struktur, aldrig någon annans varumärke, bilder eller texter. Bygget görs alltid med SJ-komponenter. Svarar Mobbin att inloggning krävs: säg det i en mening och fortsätt utan. Vid autonomt bygge: sök själv om flödet är vanligt, en sökning per flöde, och nämn kort vilka exempel du utgick från. **SJ:s riktlinjer i Sanity går före Mobbin.**
- **Vill designern se varianter först:** tipsa om `/prototype` (Emil Kowalskis skill), som bygger 3–5 tydligt olika varianter av en enskild del (ett kort, ett steg i flödet) med en väljare att bläddra mellan. Alla varianter byggs med SJ-komponenter. För fria visuella skisser innan bygget finns `/design` (Claude Design). Får du en länk till en design därifrån: läs den med Artifact-verktyget och bygg den med SJ-komponenter. Designern måste skriva kommandona själv.

**Så används impeccable här:** skillen läser `DESIGN.md` och `PRODUCT.md` i roten. `DESIGN.md` säger att SJ:s visuella värld är given, så allt är *refinement*, aldrig *redesign*.

- **Arbetsflödena är instruktioner, inte terminalkommandon.** `shape`, `critique`, `audit` och de andra finns som filer: läs `.agents/skills/impeccable/reference/<namn>.md` och följ den. Launchern `.agents/skills/impeccable/scripts/impeccable` har bara verktygskommandon. Den användbara här är `detect <fil eller URL>`, som skannar efter vanliga designfel. Kör den gärna efter `critique`.
- **Vid ett autonomt bygge** (designern har bett dig bygga, granska och åtgärda utan att vänta på hen) får arbetsflödena kortas. AGENTS.md går före skillen:
  - `shape`: en plan på högst fem punkter och högst en fråga. Bygg sedan direkt, utan att vänta på att planen bekräftas.
  - `critique`: kör gärna de två granskarna, men avsluta utan de riktade frågorna. Skriv i stället "Frågor hoppades över: designern bad att allt skulle åtgärdas" och åtgärda. Snapshot i `.impeccable/critique/` behövs inte.
  - Säger skillen att du alltid ska fråga en gång: fråga bara om designern är med i sessionen. Annars välj det rimligaste och berätta vad du valde.
- **Kända falsklarm** från SJ:s egna komponenter står i `.impeccable/critique/ignore.md`. Lägg till nya där när du hittar dem.
- `.claude/skills/impeccable` är en länk till `.agents/skills/impeccable`. Det finns bara en kopia, och `npm run skills` uppdaterar den.
- **Har skillen precis installerats i den här sessionen** laddas den inte förrän agenten startats om. Det hanteras av det obligatoriska stoppet i AGENTS.md ("Checklista i början av varje session"). Har designern valt att fortsätta utan omstart: läs `.agents/skills/impeccable/SKILL.md` och relevant `reference/`-fil direkt. Kör aldrig `impeccable document` eller `bolder` eller `colorize` (de skriver om eller byter den visuella världen) och byt aldrig typsnitt, färger, skuggor eller radier på skillens inrådan. **SJ:s designsystem går alltid före skillens smak.**
