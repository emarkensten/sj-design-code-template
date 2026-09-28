# CLAUDE.md

@AGENTS.md

## Bara för Claude Code

- **Sessionsstart:** hooken i `.claude/settings.json` kör `scripts/session-start.mjs`. Dess `[SJ-mall]`-rader säger om beroenden, SJ-uppdateringar eller skills saknas. Agera på dem enligt checklistan ovan innan du börjar.
- **Förhandsvisning:** använd webbläsarverktyget med `preview_start` och `{ name: "dev" }` (läser `.claude/launch.json`). Kolla mobil 375×812 och desktop 1440×900. Ladda om efter responsiva ändringar. Klicka via `ref` från `find` eller `read_page` hellre än på koordinater, och sätt fönsterstorleken i början av varje omgång (den kan hoppa tillbaka till panelens storlek). Skärmdumpar som designern ska få som filer: `npm run screenshots`.
- **Skills:** `sj-design-system` finns alltid. `impeccable` installeras med `npm run skills`. Installerades den i den här sessionen laddas den först efter en omstart (skriptet säger till). Den styrs av `DESIGN.md` och `PRODUCT.md`.
- **Plugins:** installera med `claude plugin install <namn>@claude-plugins-official`. Nya plugins och MCP-servrar laddas först i nästa session, så säg det till designern.
- **MCP:** `sj-storybook` och `sj-design-system` godkänns för projektet med namn (`enabledMcpjsonServers`), så att en server som läggs till senare inte godkänns automatiskt. Kör designern i Claude-appen eller i terminalen gäller samma sak.
- **Modell:** `.claude/settings.json` väljer `opus`, alltid den senaste Opus, på sin vanliga effort-nivå (`medium`). I ett test där samma lilla prototyp byggdes flera gånger (september 2026) gav Opus 5.5 tydligt bättre UX och UI än Sonnet 5.5, för ungefär dubbelt så stor förbrukning av abonnemangets kvot. Använd Opus för nya vyer och flöden. För små, väl avgränsade ändringar (en text, en knapp, en rad i en lista) räcker Sonnet och drar ungefär hälften så mycket. Höj inte effort-nivån (`high`, `xhigh`) för att få bättre design: det gav fler steg och blev dyrare än Opus. Kör du på en annan modell än Opus: nämn det i en mening i ditt första svar och bygg sedan som vanligt, utan att vänta på svar.
