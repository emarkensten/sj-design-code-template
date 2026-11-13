# Mallen: så installeras den

Den här texten låg i mallens README. I en prototyp har README bytts ut mot en beskrivning av prototypen (se "README och dokument" i AGENTS.md), och instruktionerna finns kvar här.

**Står du redan i en prototyp** (mappen har `node_modules/`, eller `src/pages/` har fler sidor än `StartPage.tsx`): installera ingenting. Läs `AGENTS.md` och jobba vidare med prototypen.

## Installera mallen: instruktioner till kodagenten

Designern har gett dig länken till en **mall**. Läs inte bara om den, och skriv inga specifikationer eller planer ännu. Gör så här, i den här ordningen:

0. **Kör du i GitHub Codespaces** (miljövariabeln `CODESPACES` är `true`), eller är mallens mapp redan öppen? Då finns allt redan. Hoppa direkt till steg 5.
1. **Kolla att git och Node finns** (`git --version`, `node --version`). Saknas något **på Mac** och är mappen tom: kör `curl -fsSL https://raw.githubusercontent.com/emarkensten/sj-design-code-template/main/scripts/bootstrap.sh | bash -s -- --here --no-vercel` i bakgrunden och läs utskriften medan det går. Skriptet installerar git (designern klickar *Installera* i en ruta), Node och GitHub CLI utan administratörslösenord, loggar in på GitHub (ge designern engångskoden som skrivs ut), skapar ett privat repo från mallen i mappen och kör `npm run setup`. Homebrew kräver lösenord och hoppas över när du kör skriptet. Vill designern ha det: be hen köra samma rad utan `-s -- --here --no-vercel` i Terminal. Gå sedan direkt till steg 4. På Windows: hjälp designern enligt [docs/kom-igang.md](https://github.com/emarkensten/sj-design-code-template/blob/main/docs/kom-igang.md), steg 1–2.
2. **Hämta mallen till mappen du redan står i, om det går.** Då räcker det att designern startar en ny chatt i samma mapp efteråt. Med en undermapp måste hen också byta mapp, och det är lätt att tappa bort sig där.
   - **Är mappen tom** (`ls -A` visar inget, eller bara `.DS_Store` eller `.claude`): hämta in i den med `.` som mål: `git clone https://github.com/emarkensten/sj-design-code-template.git .`. Mallen är publik, så ingen inloggning behövs. En egen kopia på GitHub kan kopplas senare, när designern vill dela.
   - **Är mappen inte tom** (till exempel hemmappen): hämta inte in där. Föreslå att designern skapar en tom mapp, till exempel `Dokument/min-prototyp`, öppnar den i Claude-appen eller VS Code och klistrar in länken igen. Vill hen hellre fortsätta här: klona till en undermapp och säg tydligt att nästa chatt ska startas i just den mappen.
   - Vill designern ha en egen kopia på GitHub direkt och är inloggad (`gh auth status --hostname github.com`): `GH_HOST=github.com gh repo create <namn> --template emarkensten/sj-design-code-template --private`, och klona sedan den nya adressen på samma sätt som ovan.
   - Använd full github.com-adress. Din inbyggda GitHub-koppling och `gh` kan vara inställda på SJ:s GitHub Enterprise, och då hittar de inte mallen.
   - Kopiera inte filerna till en mapp utan git.
3. **Kör `npm run setup`** i mappen.
4. **Stanna och be designern starta en ny chatt i mallens mapp** (samma mapp om du hämtade in i den). Först då laddas SJ:s MCP-servrar och designskillen. Ge designern exakta steg och ett färdigt meddelande att klistra in efter omstarten (se "Obligatoriskt stopp" i `AGENTS.md`). Bygg ingenting före omstarten.
5. **Läs `AGENTS.md` och följ den** från och med nu. Den går före dina allmänna arbetsflöden och skills (till exempel brainstorming eller writing-plans).
