# Ny dator, Codespaces och GitHub

Till kodagenten. AGENTS.md pekar hit när mallen ska installeras på en ny dator, när du kör i GitHub Codespaces eller när GitHub krånglar. Allt här gällde tidigare direkt i AGENTS.md och är flyttat utan ändringar.

## Om du kör i GitHub Codespaces

Är miljövariabeln `CODESPACES` satt till `true` finns git, Node och GitHub CLI redan, och designern är inloggad. `.devcontainer/devcontainer.json` har också redan kört installation, SJ-uppdatering och skills. Hoppa över installationsstegen nedan.

- Prototypen nås via en vidarebefordrad port (5173). Säg åt designern att öppna den från fliken *Ports* om förhandsvisningen inte öppnas av sig själv.
- En codespace som skapats från mallen är **inte kopplad till något repo** förrän den publiceras. Föreslå tidigt att spara via *Source Control → Commit → Publish Branch → Publish to GitHub private repository*. Annars finns arbetet bara i codespacen.
- Påminn om att stänga codespacen när designern är klar för dagen. Gratistimmarna är begränsade.

## Första gången på en ny dator

**På Mac: använd `scripts/bootstrap.sh`.** Det tar datorn från tom till körbar prototyp. Är designern administratör och kör i Terminal erbjuder det Homebrew först (lösenordet behövs en gång, sedan kan du själv köra `brew install` för till exempel ffmpeg eller en databas i senare projekt). Annars hamnar Node och GitHub CLI i `~/.local` utan lösenord. PATH och `brew shellenv` skrivs till `~/.zprofile`, och skriptet loggar in på GitHub, sätter git-namn och mejl (GitHubs noreply-adress), skapar ett privat repo från mallen, kör `npm run setup` och kopplar valfritt till Vercel. Det kan köras om, klara steg hoppas över. Designern gör bara tre saker: skriver lösenordet för Homebrew eller klickar *Installera* i rutan för utvecklarverktygen, godkänner GitHub i webbläsaren och, om hen vill dela, godkänner Vercel. Verktygen och inloggningen (Homebrew, git, Node, GitHub CLI, GitHub-inloggning) sköts av det gemensamma skriptet [antrop-setup](https://github.com/antrop-ab/antrop-setup), som bootstrap hämtar och kör först. Fel där rättas i antrop-setup, inte här.

- **Enklast för designern:** be hen öppna appen *Terminal* (Cmd+Mellanslag, skriv "Terminal") och klistra in raden nedan. Då fungerar alla frågor och båda inloggningarna.

  ```bash
  curl -fsSL https://raw.githubusercontent.com/emarkensten/sj-design-code-template/main/scripts/bootstrap.sh | bash
  ```

- **Kör du det själv** (designern har öppnat en tom mapp i Claude-appen): `curl -fsSL <adressen ovan> | bash -s -- --here --no-vercel`. Kör det i bakgrunden och läs utskriften medan det går. Utan terminal frågar skriptet ingenting. Vid GitHub-inloggningen öppnar det webbläsaren och skriver ut en engångskod (den kopieras också till urklipp). Ge designern koden direkt. Saknas git ber du hen klicka *Installera* i rutan som dyker upp. Homebrew och Vercel kräver ett Terminal-fönster och hoppas över. Vill designern ha dem: be hen köra raden ovan i Terminal (klara steg hoppas över).
- **Behöver du Homebrew senare och det saknas:** du kan inte installera det själv (sudo). Be designern köra `bash scripts/bootstrap.sh --no-project` i Terminal, eller raden ovan.
- **Finns mallen redan lokalt:** `bash scripts/bootstrap.sh --no-project` fixar bara verktygen och inloggningen.
- **Stoppar skriptet:** läs raden efter `Stopp:`. Vanligast är att Xcode finns men licensen inte är godkänd, eller att designern saknar administratörsbehörighet för utvecklarverktygen. Då behövs Self Service eller IT.

Kör `npm run doctor` efteråt. Skriptet går efter `npm run setup`, så det obligatoriska stoppet för omstart i AGENTS.md ("Checklista i början av varje session") gäller också här.

**På Windows, eller om skriptet inte går att använda:** följ [kom-igang.md](kom-igang.md) steg för steg tillsammans med designern: git, Node.js LTS, GitHub CLI (`gh auth login --hostname github.com --git-protocol https --web`, sedan `gh auth setup-git`), och sist mallen och `npm run setup`. Kör `npm run doctor` efter varje steg.

**Inget i mallen kräver SJ:s GitHub Enterprise, VPN eller SJ-konto.** Komponenter, MCP-servrar och typsnitt hämtas publikt. De flesta designers har inget GHE-konto, så nämn det inte om designern inte tar upp det själv. Har designern ett och vill läsa teamets repon: se "SJ:s GitHub Enterprise" nedan.

**Om `gh` säger att inloggningen misslyckats** fast designern loggat in: en ogiltig `GH_TOKEN` eller `GITHUB_TOKEN` i miljön går före den sparade inloggningen. Kör `env -u GH_TOKEN -u GITHUB_TOKEN gh auth status` för att se den riktiga inloggningen, och använd samma prefix på `gh`-kommandon. För att klona mallen behövs ingen inloggning alls.

**Använd alltid full github.com-adress.** Copilots inbyggda GitHub-koppling och `gh` kan vara inställda på SJ:s GitHub Enterprise (till exempel via miljövariabeln `GH_HOST`). Då leder kortformer som `ägare/repo` fel och ger 404 eller inloggningsfel. Skriv `https://github.com/ägare/repo`, eller sätt `GH_HOST=github.com` framför `gh`-kommandon.

## SJ:s GitHub Enterprise

- Läs och klona teamens repon med `GH_HOST=<SJ:s GHE-adress> gh repo clone <org>/<repo>` eller `git clone https://<SJ:s GHE-adress>/<org>/<repo>.git`.
- Prototyper som ska leva hos SJ kan pushas dit i stället för till ett privat konto. Fråga designern vad som gäller för teamet.

