# Kom igång: från tom dator till första prototypen

Den här guiden är skriven för designers som inte har kodat så mycket. Du behöver inte förstå allt. **Tips:** så fort du har en kodagent igång (steg 0) kan du be den: *"Hjälp mig igenom docs/kom-igang.md"*. Då tar den dig igenom resten och kör kommandona åt dig.

Du skriver kommandon i **Terminal** (Mac: Cmd+Mellanslag, skriv "Terminal") eller i terminalen i VS Code (menyn *Terminal → New Terminal*). Klistra in en rad i taget och tryck Enter.

---

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

```bash
# Ditt privata GitHub-konto (för egna prototyper och Vercel)
gh auth login --hostname github.com --git-protocol https --web

# SJ:s GitHub Enterprise, om du har ett SJ-konto där.
# Byt <SJ:s GHE-adress> mot värdnamnet du ser i adressfältet när du loggar in på SJ:s GitHub.
gh auth login --hostname <SJ:s GHE-adress> --git-protocol https --web

# Låt git använda inloggningen
gh auth setup-git
```

**Vilket konto ska jag använda?**

- **Privat github.com:** för dina egna prototyper som du vill dela via Vercel. Skapa ett konto gratis på [github.com/signup](https://github.com/signup) om du inte har ett.
- **SJ:s GitHub Enterprise:** för att hämta kod och information från ditt teams repon på SJ, eller om prototypen ska ligga hos SJ.

Du kan vara inloggad på båda samtidigt.

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

## När något krånglar

- Kör `npm run doctor` och visa resultatet för agenten.
- *"command not found"* direkt efter en installation: stäng Terminal och öppna igen.
- Paket från `@sj-ab` hittas inte: kolla att filen `.npmrc` finns i projektmappen.
- Agenten verkar inte känna till SJ:s komponenter: starta om den och be den köra checklistan i `AGENTS.md`.
