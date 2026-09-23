# Instruktioner för GitHub Copilot

All vägledning för det här repot står i [AGENTS.md](../AGENTS.md) i roten. Läs den först och följ den, särskilt:

- checklistan i början av varje session (`npm run sj:check`, `npm run skills`)
- `DESIGN.md` (SJ:s visuella regler) och `PRODUCT.md` (prototypens syfte)
- att bara använda SJ:s komponenter från Bit (`@sj-ab/component-library.*`)
- designprinciperna: innehåll direkt på sidan, kort bara via SJ:s färdiga kortkomponenter
- att fråga efter Figma-skisser innan en ny vy byggs
- konfidentialitetsreglerna innan något pushas till github.com eller Vercel

MCP-servrarna `sj-storybook` och `sj-design-system` är konfigurerade i `.vscode/mcp.json`. Skills ligger i `.claude/skills/` och `.agents/skills/`. Copilot i VS Code läser båda.
