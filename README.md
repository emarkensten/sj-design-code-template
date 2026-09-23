# SJ-prototypmall

En mall för designers som vill bygga klickbara prototyper i kod med **SJ:s designsystem**, tillsammans med en kodagent (Claude Code eller GitHub Copilot).

- **SJ:s riktiga komponenter** från Bit, alltid på senaste versionen
- **Agenten känner till designsystemet.** Den kan fråga SJ:s Storybook och designwebb via MCP om props, tillgänglighet och riktlinjer.
- **Designskillen impeccable** planerar och granskar vyer när det inte finns Figma-skisser. `DESIGN.md` håller den inom SJ:s designsystem.
- **Guidad start** även om du aldrig kodat: agenten hjälper dig installera git, Node och GitHub
- **Dela med en länk** via Vercel

## Snabbstart

```bash
npm run setup
```

```bash
npm run dev
```

Är datorn ny eller saknar du git eller Node? Läs [docs/kom-igang.md](docs/kom-igang.md), eller öppna mappen i din kodagent och skriv: *"Hjälp mig komma igång"*.

## Hur det hänger ihop

| Fil | För vem |
|---|---|
| [AGENTS.md](AGENTS.md) | Instruktioner för kodagenten (Copilot, Claude och andra) |
| [CLAUDE.md](CLAUDE.md) | Importerar AGENTS.md plus det som bara gäller Claude Code |
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | Pekar Copilot till AGENTS.md |
| `.mcp.json`, `.vscode/mcp.json` | SJ:s Storybook-MCP och design-system-MCP |
| `.claude/skills/sj-design-system/` | SJ:s konventioner, UX-writing och designprinciper |
| [DESIGN.md](DESIGN.md) / [PRODUCT.md](PRODUCT.md) | SJ:s visuella regler och prototypens syfte (läses av agenten och av impeccable) |
| [docs/kom-igang.md](docs/kom-igang.md) | Steg för steg från tom dator till delad prototyp |

## Kommandon

| | |
|---|---|
| `npm run doctor` | Kolla att datorn har allt |
| `npm run dev` | Starta prototypen på localhost:5173 |
| `npm run sj:add -- departure-card` | Lägg till en SJ-komponent |
| `npm run sj:update` | Uppdatera alla SJ-komponenter |
| `npm run skills` | Installera eller uppdatera designskillen impeccable |
