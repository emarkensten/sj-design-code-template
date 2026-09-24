# CLAUDE.md

@AGENTS.md

## Bara för Claude Code

- **Sessionsstart:** hooken i `.claude/settings.json` kör `scripts/session-start.mjs`. Dess `[SJ-mall]`-rader säger om beroenden, SJ-uppdateringar eller skills saknas. Agera på dem enligt checklistan ovan innan du börjar.
- **Förhandsvisning:** använd webbläsarverktyget med `preview_start` och `{ name: "dev" }` (läser `.claude/launch.json`). Kolla mobil 375×812 och desktop 1440×900. Ladda om efter responsiva ändringar. Klicka via `ref` från `find` eller `read_page` hellre än på koordinater, och sätt fönsterstorleken i början av varje omgång (den kan hoppa tillbaka till panelens storlek). Skärmdumpar som designern ska få som filer: `npm run screenshots`.
- **Skills:** `sj-design-system` finns alltid. `impeccable` installeras med `npm run skills` och laddas efter en omstart av sessionen. Den styrs av `DESIGN.md` och `PRODUCT.md`.
- **Plugins:** installera med `claude plugin install <namn>@claude-plugins-official`. Nya plugins och MCP-servrar laddas först i nästa session, så säg det till designern.
- **MCP:** `sj-storybook` och `sj-design-system` godkänns för projektet med namn (`enabledMcpjsonServers`), så att en server som läggs till senare inte godkänns automatiskt. Kör designern i Claude-appen eller i terminalen gäller samma sak.
