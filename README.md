# SJ-prototypmall

> ## Till kodagenten (Copilot, Claude och andra): börja här
>
> Designern har gett dig länken till en **mall**. Läs inte bara om den, och skriv inga specifikationer eller planer ännu. Gör så här, i den här ordningen:
>
> 0. **Kör du i GitHub Codespaces** (miljövariabeln `CODESPACES` är `true`), eller är mallens mapp redan öppen? Då finns allt redan. Hoppa direkt till steg 5.
> 1. **Kolla att git och Node finns** (`git --version`, `node --version`). Saknas något **på Mac** och är mappen tom: kör `curl -fsSL https://raw.githubusercontent.com/emarkensten/sj-design-code-template/main/scripts/bootstrap.sh | bash -s -- --here --no-vercel` i bakgrunden och läs utskriften medan det går. Skriptet installerar git (designern klickar *Installera* i en ruta), Node och GitHub CLI utan administratörslösenord, loggar in på GitHub (ge designern engångskoden som skrivs ut), skapar ett privat repo från mallen i mappen och kör `npm run setup`. Homebrew kräver lösenord och hoppas över när du kör skriptet. Vill designern ha det: be hen köra samma rad utan `-s -- --here --no-vercel` i Terminal. Gå sedan direkt till steg 4. På Windows: hjälp designern enligt [docs/kom-igang.md](https://github.com/emarkensten/sj-design-code-template/blob/main/docs/kom-igang.md), steg 1–2.
> 2. **Hämta mallen till mappen du redan står i, om det går.** Då räcker det att designern startar en ny chatt i samma mapp efteråt. Med en undermapp måste hen också byta mapp, och det är lätt att tappa bort sig där.
>    - **Är mappen tom** (`ls -A` visar inget, eller bara `.DS_Store` eller `.claude`): hämta in i den med `.` som mål: `git clone https://github.com/emarkensten/sj-design-code-template.git .`. Mallen är publik, så ingen inloggning behövs. En egen kopia på GitHub kan kopplas senare, när designern vill dela.
>    - **Är mappen inte tom** (till exempel hemmappen): hämta inte in där. Föreslå att designern skapar en tom mapp, till exempel `Dokument/min-prototyp`, öppnar den i Claude-appen eller VS Code och klistrar in länken igen. Vill hen hellre fortsätta här: klona till en undermapp och säg tydligt att nästa chatt ska startas i just den mappen.
>    - Vill designern ha en egen kopia på GitHub direkt och är inloggad (`gh auth status --hostname github.com`): `GH_HOST=github.com gh repo create <namn> --template emarkensten/sj-design-code-template --private`, och klona sedan den nya adressen på samma sätt som ovan.
>    - Använd full github.com-adress. Din inbyggda GitHub-koppling och `gh` kan vara inställda på SJ:s GitHub Enterprise, och då hittar de inte mallen.
>    - Kopiera inte filerna till en mapp utan git.
> 3. **Kör `npm run setup`** i mappen.
> 4. **Stanna och be designern starta en ny chatt i mallens mapp** (samma mapp om du hämtade in i den). Först då laddas SJ:s MCP-servrar och designskillen. Ge designern exakta steg och ett färdigt meddelande att klistra in efter omstarten (se "Obligatoriskt stopp" i `AGENTS.md`). Bygg ingenting före omstarten.
> 5. **Läs `AGENTS.md` och följ den** från och med nu. Den går före dina allmänna arbetsflöden och skills (till exempel brainstorming eller writing-plans).

En mall för designers som vill bygga klickbara prototyper i kod med **SJ:s designsystem**, tillsammans med en kodagent (Claude Code eller GitHub Copilot).

- **SJ:s riktiga komponenter** från Bit, alltid på senaste versionen
- **Agenten känner till designsystemet.** Den kan fråga SJ:s Storybook och designwebb via MCP om props, tillgänglighet och riktlinjer.
- **Designskillen impeccable** planerar och granskar vyer när det inte finns Figma-skisser. `DESIGN.md` håller den inom SJ:s designsystem.
- **Guidad start** även om du aldrig kodat: agenten hjälper dig installera git, Node och GitHub
- **Dela med en länk** via Vercel

## Snabbstart

### Snabbast på Mac: ett kommando

Öppna **Terminal** (Cmd+Mellanslag, skriv "Terminal") och klistra in:

```bash
curl -fsSL https://raw.githubusercontent.com/emarkensten/sj-design-code-template/main/scripts/bootstrap.sh | bash
```

Skriptet installerar Homebrew (om du är administratör), git, Node och GitHub CLI, loggar in dig på GitHub, skapar din prototyp som ett privat repo och installerar SJ:s komponenter. Du skriver ditt datorlösenord en gång och klickar *Authorize* när det behövs. Öppna sedan mappen i Claude-appen. Mer i [docs/kom-igang.md](docs/kom-igang.md).

### Med en kodagent

Alternativt: skapa en **tom mapp** (till exempel `Dokument/min-prototyp`), öppna den i Claude-appen eller i VS Code och klistra in länken till den här sidan. Agenten hämtar mallen till mappen och installerar allt. Sedan startar du en ny chatt i samma mapp.

Har du redan mallen: kör

```bash
npm run setup
```

```bash
npm run dev
```

Är datorn ny eller saknar du git eller Node? Läs [docs/kom-igang.md](docs/kom-igang.md), eller öppna mappen i din kodagent och skriv: *"Hjälp mig komma igång"*. Går det inte att installera något alls finns GitHub Codespaces som reserv (se samma guide).

## Hur det hänger ihop

| Fil | För vem |
|---|---|
| [AGENTS.md](AGENTS.md) | Instruktioner för kodagenten (Copilot, Claude och andra) |
| [CLAUDE.md](CLAUDE.md) | Importerar AGENTS.md plus det som bara gäller Claude Code |
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | Pekar Copilot till AGENTS.md |
| `.mcp.json`, `.vscode/mcp.json` | SJ:s Storybook-MCP och design-system-MCP |
| `.claude/skills/sj-design-system/` | SJ:s konventioner, UX-writing och designprinciper |
| [DESIGN.md](DESIGN.md) / [PRODUCT.md](PRODUCT.md) | SJ:s visuella regler och prototypens syfte (läses av agenten och av impeccable) |
| [scripts/bootstrap.sh](scripts/bootstrap.sh) | Sätter upp en ny Mac med ett kommando: Homebrew, git, Node, GitHub och prototypen |
| [docs/kom-igang.md](docs/kom-igang.md) | Steg för steg från tom dator till delad prototyp |

## Kommandon

| | |
|---|---|
| `bash scripts/bootstrap.sh --no-project` | Installera eller laga verktygen (Homebrew, Node, gh) och GitHub-inloggningen |
| `npm run doctor` | Kolla att datorn har allt |
| `npm run dev` | Starta prototypen på localhost:5173 |
| `npm run sj:add -- departure-card` | Lägg till en SJ-komponent |
| `npm run sj:update` | Uppdatera alla SJ-komponenter |
| `npm run skills` | Installera eller uppdatera designskillen impeccable |
