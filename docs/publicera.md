# Publicera och dela: detaljer

Till kodagenten. Grunderna står i AGENTS.md ("Spara, publicera och dela"). Här står resten.

## `npm run ship`

- **Krockar ändringarna** med något en kollega, Claude på webben eller `@claude` laddat upp, stannar skriptet utan att något går förlorat. Lös konflikten, kör `npm run typecheck` och kör `ship` igen.
- **Första publiceringen:** fyll i namn och beskrivning i `index.html` (`<title>`, `description`, `og:*`, `apple-mobile-web-app-title`) och i `public/manifest.webmanifest`, och sätt `og:image` till den fulla adressen (`https://<länken>/og.png`), annars visar Teams och Slack ingen bild. Byt gärna `public/og.png` mot en skärmdump av prototypen (1200×630). Ersätt också README (se "README och dokument" i AGENTS.md).
- **Lägga på hemskärmen:** be användarna öppna länken i Safari (iPhone) eller Chrome (Android). I appars inbyggda webbläsare, till exempel Messenger och Teams, går det inte att installera.
- **Ny version:** den som har prototypen på hemskärmen kan se den gamla versionen tills appen stängts helt. Säg det när du delar en uppdatering med en grupp som redan använder prototypen.
- **Första gången** skapas ett privat repo på designerns github.com-konto och ett projekt på Vercel. En prototyp som klonats direkt från mallen pekar på mallens repo. Skriptet publicerar aldrig dit, utan skapar ett eget.
- **Är designern inte inloggad på Vercel** stannar skriptet. Be hen köra `npx vercel login` i Terminal och godkänna i webbläsaren (logga in med GitHub).
- **Varianter:** skapa en branch (`git switch -c variant-b`) och kör `npm run ship`. Den får en egen förhandsvisningslänk och huvudlänken påverkas inte.
- **När prototypen används på riktigt** (länken är delad och folk använder den): testa ändringar på en `preview-`-branch (`git switch -c preview-ny-betalning`) och dela förhandsvisningslänken innan något hamnar på `main`. Testa aldrig med den riktiga datan. Har prototypen en databas: läs [backend.md](backend.md).
- **Deployment Protection** (Settings → Deployment Protection på vercel.com) styr vem som ser länken. Vercel känner igen Vite automatiskt och `vercel.json` finns redan.
- Vill designern hellre göra det själv: logga in på [vercel.com](https://vercel.com) med GitHub, *Add New → Project*, importera repot och *Deploy*.

## Claude i GitHub

Med Claudes GitHub-app kan designern (och kollegor) skriva `@claude` i ett ärende eller en pull request på github.com, till exempel *"@claude byt rubriken på startsidan"*. Claude gör ändringen i en pull request och Vercel ger den en förhandsvisningslänk. Uppsättning en gång per repo: `npm run github:claude` visar vad som saknas. Token skriver designern själv i Terminal, aldrig i chatten. Gäller bara repon på github.com, inte SJ:s GitHub Enterprise.

Varför Vite och inte Next.js: prototyperna är rena klientappar och alla SJ-komponenter körs i klienten. Vite är enklare och funkar lika bra på Vercel. Behövs en serverfunktion (till exempel för att dölja en API-nyckel) eller delat tillstånd mellan telefoner (röster, incheckningar): läs [backend.md](backend.md) först. Där står hur `api/` körs lokalt, vilken databas som passar och hur du undviker att testa mot den riktiga datan.

