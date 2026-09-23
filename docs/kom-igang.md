# Kom igång: från tom dator till första prototypen

Den här guiden är skriven för designers som inte har kodat så mycket. Du behöver inte förstå allt. **Tips:** så fort du har en kodagent igång (steg 0) kan du be den: *"Hjälp mig igenom docs/kom-igang.md"*. Då tar den dig igenom resten och kör kommandona åt dig.

Du skriver kommandon i **Terminal** (Mac: Cmd+Mellanslag, skriv "Terminal") eller i terminalen i VS Code (menyn *Terminal → New Terminal*). Klistra in en rad i taget och tryck Enter.

---

## Enklast: GitHub Codespaces (ingen installation)

Vill du slippa installera något kan du köra allt i webbläsaren. Du behöver bara ett gratis GitHub-konto ([github.com/signup](https://github.com/signup)).

1. Öppna mallen: [github.com/emarkensten/sj-design-code-template](https://github.com/emarkensten/sj-design-code-template)
2. Klicka **Use this template → Open in a codespace**.
3. Vänta medan miljön byggs. Git, Node, SJ:s komponenter och designskillen installeras automatiskt.
4. Öppna Copilot-chatten och skriv vad du vill bygga, till exempel *"Gör en sida där resenären ser sina kommande resor"*.
5. Prototypen öppnas i en förhandsvisning. Du kan också öppna den i en egen flik via fliken *Ports*.
6. **Spara ditt arbete:** gå till *Source Control* till vänster, skriv ett meddelande, klicka *Commit* och sedan *Publish Branch → Publish to GitHub private repository*. Då får du ett eget repo, som du sedan kan koppla till Vercel (steg 7).

Codespaces ingår gratis upp till en viss mängd timmar per månad. Stäng din codespace när du är klar ([github.com/codespaces](https://github.com/codespaces)), så räcker timmarna längre.

Vill du hellre jobba på din egen dator: följ stegen nedan.

## Steg 0: Välj kodagent

| | Claude Code | GitHub Copilot |
|---|---|---|
| **Vad** | Anthropics kodagent | GitHubs kodagent i VS Code |
| **Kräver** | Claude-konto med Pro, Max, Team eller Enterprise | Copilot-licens (via SJ eller privat) |
| **Enklast att starta** | Claude-appen för Mac/Windows, fliken *Code* | VS Code + tillägget *GitHub Copilot Chat*, välj läget *Agent* |
| **Installera** | Appen: [claude.com/download](https://claude.com/download). Terminal: `curl -fsSL https://claude.ai/install.sh \| bash` | [code.visualstudio.com](https://code.visualstudio.com), sedan Copilot-tillägget |

Mallen fungerar med båda. Instruktionerna står i `AGENTS.md`, som båda läser.

## Steg 1: Git

Git håller koll på versioner av din kod.

**Mac:** skriv `git --version` i Terminal. Får du en ruta som frågar om *Command Line Developer Tools*: klicka *Installera* och vänta. Klart.

Vill du hellre ha **Homebrew** (en "app store" för utvecklarverktyg, bra att ha för steg 2–3):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Följ instruktionerna som skrivs ut på slutet (två rader som börjar med `echo` och `eval`), annars hittar Terminal inte `brew`. Installera sedan git:

```bash
brew install git
```

> **SJ-dator utan administratörsbehörighet?** Homebrew kräver admin. Använd Command Line Developer Tools ovan, installera Node från nodejs.org (steg 2) och hoppa över Homebrew. Blir det stopp: fråga IT eller använd *Self Service* om din dator har det.

**Windows:** installera [Git for Windows](https://git-scm.com/downloads/win) och klicka dig igenom med standardval.

Berätta för git vem du är (en gång per dator):

```bash
git config --global user.name "Förnamn Efternamn"
git config --global user.email "din@mejl.se"
```

## Steg 2: Node.js

Node kör verktygen som bygger prototypen.

- **Med Homebrew:** `brew install node`
- **Utan Homebrew:** ladda ner *LTS* från [nodejs.org](https://nodejs.org) och installera.

Kolla med `node --version`. Den ska visa v20 eller högre.

## Steg 3: GitHub CLI och inloggning

`gh` gör inloggning mot GitHub mycket enklare än att krångla med nycklar.

- **Med Homebrew:** `brew install gh`
- **Utan Homebrew:** ladda ner från [cli.github.com](https://cli.github.com)

Logga in. Det öppnar webbläsaren, där du godkänner:

Du behöver ett **privat GitHub-konto**. Det är gratis: [github.com/signup](https://github.com/signup). Du behöver inget SJ-konto, ingen VPN och ingen behörighet från SJ.

```bash
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git
```

## Steg 4: Skapa din prototyp från mallen

**På webben:** öppna mallens repo på GitHub, klicka *Use this template → Create a new repository*, välj ditt konto, ge det ett namn och välj **Private**.

**Eller i terminalen** (byt ut `min-prototyp` mot vad du vill kalla den):

```bash
cd ~/Documents
gh repo create min-prototyp --template emarkensten/sj-design-code-template --private --clone
cd min-prototyp
```

Om du redan har klonat repot: öppna mappen i Claude-appen eller i VS Code (*File → Open Folder*).

## Steg 5: Installera allt

```bash
npm run setup
```

Det här:
1. kollar datorn (`npm run doctor`) och säger vad som saknas
2. installerar alla paket, inklusive SJ:s komponenter från Bit
3. uppdaterar SJ-komponenterna till senaste versionen
4. installerar designskillen `impeccable` för din kodagent

Starta sedan om kodagenten (stäng och öppna Claude-appen eller Copilot-chatten), så att skills och MCP-servrar laddas. I VS Code: godkänn MCP-servrarna när frågan dyker upp.

## Steg 6: Starta prototypen

```bash
npm run dev
```

Öppna http://localhost:5173. Nu kan du be din kodagent bygga, till exempel:

- *"Jag har en Figma-skiss på avgångslistan, här är länken: …"*
- *"Gör en vy där resenären väljer avgång mellan Stockholm och Göteborg. Ingen Figma finns."*
- *"Granska startsidan med impeccable och föreslå förbättringar."*

## Steg 7: Dela med andra via Vercel

1. Spara och ladda upp: be agenten *"committa och pusha"*.
2. Gå till [vercel.com](https://vercel.com), logga in med GitHub, välj *Add New → Project*, importera repot och klicka *Deploy*.
3. Du får en länk som `min-prototyp.vercel.app`. Den uppdateras varje gång du pushar.
4. Vill du visa en variant utan att ändra huvudlänken: be agenten skapa en ny *branch* och pusha den. Då får varianten en egen länk.

> **Kom ihåg:** privat GitHub och Vercel ligger utanför SJ. Använd påhittad data. Lägg inte interna underlag, riktiga kunduppgifter eller innehåll från SJ:s interna system där. Agenten frågar om den är osäker.

---

## Om du har ett konto på SJ:s GitHub Enterprise

Det här behövs inte för mallen. Men har du ett SJ-konto och vill läsa ditt teams repon kan du logga in på det också. Byt `<SJ:s GHE-adress>` mot värdnamnet du ser i adressfältet när du loggar in på SJ:s GitHub:

```bash
gh auth login --hostname <SJ:s GHE-adress> --git-protocol https --web
```

Du kan vara inloggad på båda samtidigt. Lägg inte innehåll från SJ:s interna repon i en prototyp på ditt privata konto.

## När något krånglar

- Kör `npm run doctor` och visa resultatet för agenten.
- *"command not found"* direkt efter en installation: stäng Terminal och öppna igen.
- Paket från `@sj-ab` hittas inte: kolla att filen `.npmrc` finns i projektmappen.
- Agenten verkar inte känna till SJ:s komponenter: starta om den och be den köra checklistan i `AGENTS.md`.
