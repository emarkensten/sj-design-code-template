# Instruktioner för GitHub Copilot

All vägledning för det här repot står i [AGENTS.md](../AGENTS.md) i roten. Läs den först och följ den, särskilt:

- checklistan i början av varje session (`npm run sj:check`, `npm run skills`), och att läsa `.omstart.md` först om den finns: där står beställningen designern gav innan hen startade om
- `DESIGN.md` (SJ:s visuella regler) och `PRODUCT.md` (prototypens syfte)
- att bara använda SJ:s komponenter från Bit (`@sj-ab/component-library.*`)
- designprinciperna: innehåll direkt på sidan, kort bara via SJ:s färdiga kortkomponenter
- att fråga efter Figma-skisser innan en ny vy byggs
- konfidentialitetsreglerna innan något pushas till github.com eller Vercel

MCP-servrarna `sj-storybook` och `sj-design-system` är konfigurerade i `.mcp.json` i roten (och i `.vscode/mcp.json` för VS Codes äldre agentläge).

Skills ligger i `.github/skills/`. Mappen är en kopia av `.claude/skills/` som `npm run skills` och `npm run skills:sync` gör. Saknas den, eller säger `npm run doctor` att den är inaktuell: kör `npm run skills:sync` och be designern starta om chatten. Ändra aldrig i `.github/skills/`, ändra i `.claude/skills/` och kör sync. Mer i avsnittet "Claude Code och GitHub Copilot" i AGENTS.md.
