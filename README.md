# SJ-prototypmall

> ## Till kodagenten (Copilot, Claude och andra): börja här
>
> Designern har gett dig länken till en **mall**. Läs inte bara om den, och skriv inga specifikationer eller planer ännu. Gör så här, i den här ordningen:
>
> 0. **Kör du i GitHub Codespaces** (miljövariabeln `CODESPACES` är `true`)? Då finns allt redan och `npm run setup` har körts. Hoppa direkt till steg 4.
> 1. **Kolla att git och Node finns** (`git --version`, `node --version`). Saknas något: hjälp designern installera det enligt [docs/kom-igang.md](https://github.com/emarkensten/sj-design-code-template/blob/main/docs/kom-igang.md), steg 1–2.
> 2. **Skapa designerns egen kopia och hämta den:**
>    - Är designern inloggad på github.com (`gh auth status --hostname github.com`): `GH_HOST=github.com gh repo create <namn> --template emarkensten/sj-design-code-template --private --clone`, och gå in i mappen.
>    - Annars: `git clone https://github.com/emarkensten/sj-design-code-template.git <namn>` och gå in i mappen. Mallen är publik, så ingen inloggning behövs. En egen kopia på GitHub kan kopplas senare, när designern vill dela.
>    - Använd full github.com-adress. Din inbyggda GitHub-koppling och `gh` kan vara inställda på SJ:s GitHub Enterprise, och då hittar de inte mallen.
>    - Kopiera inte filerna till en mapp utan git.
> 3. **Kör `npm run setup`** i mappen.
> 4. **Läs `AGENTS.md` och följ den** från och med nu. Den går före dina allmänna arbetsflöden och skills (till exempel brainstorming eller writing-plans).

En mall för designers som vill bygga klickbara prototyper i kod med **SJ:s designsystem**, tillsammans med en kodagent (Claude Code eller GitHub Copilot).

- **SJ:s riktiga komponenter** från Bit, alltid på senaste versionen
- **Agenten känner till designsystemet.** Den kan fråga SJ:s Storybook och designwebb via MCP om props, tillgänglighet och riktlinjer.
- **Designskillen impeccable** planerar och granskar vyer när det inte finns Figma-skisser. `DESIGN.md` håller den inom SJ:s designsystem.
- **Guidad start** även om du aldrig kodat: agenten hjälper dig installera git, Node och GitHub
- **Dela med en länk** via Vercel

## Snabbstart

### Enklast: i webbläsaren, utan att installera något

1. Klicka **Use this template** uppe till höger på den här sidan och välj **Open in a codespace**.
2. Vänta några minuter medan miljön byggs och allt installeras.
3. Öppna Copilot-chatten (eller Claude Code) och skriv vad du vill bygga.

Codespaces är gratis upp till en viss mängd användning per månad på ett privat GitHub-konto.

### På din egen dator

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
