# AGENTS.md: SJ-prototypmallen

Instruktioner för kodagenten (GitHub Copilot, Claude Code eller annan agent som läser `AGENTS.md`). `CLAUDE.md` importerar den här filen och lägger bara till det som är specifikt för Claude.

**Den här filen går före dina allmänna arbetsflöden och process-skills** (till exempel brainstorming, writing-plans eller spec-driven development). Designern vill se något snabbt och iterera visuellt. Ställ högst tre korta frågor, bygg och visa. Skriv specifikationer, planer eller designdokument bara om designern ber om det.

## Vem du jobbar med

Du jobbar med en **designer på SJ** som bygger klickbara prototyper i kod med SJ:s designsystem. Designern kan vara ny på terminal, git, npm och kodagenter. Det betyder att du ska:

- **Leda, inte vänta.** Föreslå nästa steg och fråga om du ska köra det. Förklara vad ett kommando gör med en mening innan du kör det. Använd ingen jargong utan förklaring.
- **Göra det tekniska själv.** Kör kommandon, installera paket och fixa fel. Be bara designern göra saker som kräver hen: logga in i en webbläsare, godkänna en behörighet eller skriva ett lösenord.
- **Prata design.** Motivera designval med SJ:s principer (nedan), inte med kod. Visa resultatet i webbläsaren så ofta det går.
- **Säga emot.** Håll inte med per automatik. Väg varje förslag mot resenärens situation i `PRODUCT.md`: säg vad det löser, vad det kostar användaren och om det finns ett enklare sätt, och bygg sedan det designern väljer. Kommer flera idéer i rad mitt i ett bygge: gör klart det pågående, samla idéerna och föreslå en ordning.
- **Skriva svenska** till designern om inget annat sägs. Kod, variabelnamn och commit-meddelanden skrivs på engelska. Texter i gränssnittet skrivs på svenska.
- **Tipsa om det designern inte vet finns**, men högst ett tips i taget och bara när det passar (se "Plugins och skills att föreslå").

## Modell

Använd den starkaste modellen du har för nya vyer och flöden. Den ger märkbart bättre UX och UI. En mindre modell räcker för små, väl avgränsade ändringar och sparar kvot. Detaljer för Claude Code står i `CLAUDE.md`.

## Checklista i början av varje session

Gör det här innan du börjar på designerns uppgift. Tar det mer än ett par sekunder, säg vad du gör.

0. **Finns `.omstart.md` i roten?** Då har designern startat om efter installationen (se "Obligatoriskt stopp" nedan). Läs filen, gör punkterna nedan och fortsätt sedan med beställningen i den, även om designern bara skrivit "fortsätt". Ta bort filen när du har läst den.
1. **Finns `node_modules/`?** Om inte: kör `node --version` och `git --version` först. Saknas något av dem kan `npm run doctor` inte köras, så följ [docs/ny-dator.md](docs/ny-dator.md) direkt. Finns båda: kör `npm run doctor`. Rapporterar den `SAKNAS`, följ [docs/ny-dator.md](docs/ny-dator.md). Annars kör du `npm run setup`.
2. **Är SJ-komponenterna på senaste versionen?** Kör `npm run sj:check`. Kör `npm run sj:update` om något är inaktuellt och berätta kort vad som uppdaterades. Skriptet uppdaterar alltid alla SJ-paket samtidigt, eftersom de beror på varandra och kraschar i webbläsaren om de hamnar på olika major-versioner. Vid en ny major-version (skriptet flaggar det): kör `npm run typecheck` och titta på sidan i webbläsaren efteråt. Typkontrollen märker inte allt. (I Claude Code körs kollen automatiskt vid start och resultatet syns som `[SJ-mall]`-rader. Du behöver bara agera på dem.)
3. **Finns designskillsen?** Saknas `.claude/skills/impeccable` eller `.claude/skills/break-ui`: kör `npm run skills`.
4. **Svarar MCP-servrarna?** Du ska ha tillgång till `sj-storybook` och `sj-design-system` (se nedan). `figma-desktop` (Figmas app, se "Innan du designar") och `mobbin` är valfria: saknas de, fortsätt utan. Saknas de efter att du klonat mallen i den här sessionen: se "Obligatoriskt stopp" nedan. Verktygen kan visas under ett annat namn, till exempel `storybook` med `docs-list`, om designern redan har Storybook-MCP:n installerad globalt. Det är samma källa. I VS Code ska hen godkänna servrarna i `.vscode/mcp.json` när frågan dyker upp. **I Claude Code** kan servrarna fortfarande ansluta när sessionen startar, och verktygen kan vara *deferred* (de måste laddas med `ToolSearch` innan de kan anropas). Sök därför med `ToolSearch` (till exempel `storybook docs`) innan du drar slutsatsen att de saknas. Sökningen väntar på servrar som ansluter.

**Obligatoriskt stopp efter kloning och setup i samma session.** MCP-servrarna (`sj-storybook`, `sj-design-system`) och designskillsen laddas bara när agenten startar i en mapp där `.mcp.json` och `.claude/skills/` redan finns. **Bygg ingenting än** om något av det här stämmer:

- `.mcp.json`, `AGENTS.md` eller `.claude/skills/` dök upp under den här sessionen, oavsett hur: du klonade mallen, gjorde `git checkout` av en gren, `git pull`, eller körde `npm run setup` eller `npm run skills` (en mapp med bara `.git` räknas som tom),
- SJ:s MCP-verktyg saknas i din verktygslista (sök med `ToolSearch` först, se punkt 4),
- mallens skills (`impeccable`, `break-ui`, `prototype`, `mobile-native` med flera) finns i `.claude/skills/` men inte bland de skills du kan använda.

Att SJ:s MCP-servrar råkar finnas globalt räcker inte: skillsen laddas ändå inte. Spara först designerns beställning i `.omstart.md` i prototypens rot (filen är gitignorerad, och nästa session läser den enligt punkt 0 i checklistan, oavsett agent). Skriv beställningen så fullständigt att nästa chatt kan börja direkt: vad designern bad om, svar på frågor du redan ställt och vad du redan gjort. Stanna sedan och skriv till designern, ungefär så här:

> Nu är mallen på plats. För att jag ska kunna fråga SJ:s designsystem om komponenter och riktlinjer behöver jag startas om i den nya mappen. Det tar en halv minut:
>
> - **VS Code:** *File → Open Folder* och välj mappen `<sökväg>`. Godkänn MCP-servrarna om VS Code frågar. Öppna sedan Copilot-chatten igen.
> - **Claude-appen:** starta en ny chatt och välj mappen `<sökväg>`. (Hämtade jag mallen till mappen vi redan står i är det samma mapp, du behöver inte byta.)
>
> Jag har sparat din beställning i mappen. Skriv bara *"fortsätt"* i den nya chatten, så tar jag vid där vi var.

Fyll i sökvägen själv. Fortsätt utan omstart bara om designern uttryckligen ber om det, och säg då att du bygger utan SJ:s dokumentation och bara har typfilerna att gå på. **I molnet gäller stoppet aldrig** (se nästa avsnitt).

## Molnsessioner och autonomt arbete

Prototyper byggs också av Claude i molnet (claude.ai/code, Claude på webben), med `@claude` i GitHub eller i Codespaces, där designern kan vara borta en stund. I Claude Code är miljövariabeln `CLAUDE_CODE_REMOTE` satt i molnet.

- **Ingen omstart.** Det obligatoriska stoppet ovan gäller aldrig i molnet, eftersom det inte går att starta om i mappen. Kör `npm run setup` och läs skills som filer (`.agents/skills/<namn>/SKILL.md` och dess `reference/`).
- **Fråga bara om det som kräver designern.** Har designern bett dig jobba självständigt: gör det som går att ångra och berätta efteråt vad du gjorde och varför. Skriv designbesluten som antaganden överst i rapporten, så att designern kan säga emot innan mer byggs ovanpå.
- **De här stoppen gäller ändå:** konfidentialitet (se "Konfidentialitet"), att radera data eller projekt, skrivningar till en databas med riktig data och att skicka något utanför teamet.
- **Nätet kan vara begränsat.** Når du inte en tjänst (Vercel, en databas, Mobbin): använd tjänstens MCP om den finns, låt designern göra steget i webbläsaren, eller kör det på designerns dator. Skriv ned i `feedback-till-mallen.md` vad som inte gick.
- **Eget testskript med Playwright:** starta webbläsaren med `launchBrowser()` från `scripts/lib/browser.mjs`, inte med `chromium.launch()`, som kan falla med "Executable doesn't exist" i molnet.
- **Flera trådar i samma prototyp:** jobbar flera sessioner i samma repo samtidigt, ge varje tråd en egen git worktree från färsk `main` (`git worktree add ../<prototyp>-<uppgift> -b <uppgift> origin/main`, sedan `npm ci`), så att ingen bygger vidare på en annan tråds halvfärdiga filer. En sådan branch byggs inte på Vercel (se "Spara, publicera och dela"): testa lokalt.

## Ny dator, Codespaces och GitHub

- **Ny dator eller verktyg som saknas:** följ [docs/ny-dator.md](docs/ny-dator.md). På Mac tar `scripts/bootstrap.sh` datorn från tom till körbar prototyp. Designern klistrar in en rad i Terminal. Kör `npm run doctor` efteråt. Det obligatoriska stoppet för omstart gäller också här.
- **GitHub Codespaces** (`CODESPACES=true`): git, Node och GitHub CLI finns och installationen är redan gjord. Hoppa över installationsstegen. Mer i [docs/ny-dator.md](docs/ny-dator.md).
- **Inget i mallen kräver SJ:s GitHub Enterprise, VPN eller SJ-konto.** Nämn inte GHE om designern inte tar upp det själv.
- **Använd alltid full github.com-adress** (`https://github.com/ägare/repo`) eller `GH_HOST=github.com` framför `gh`. Copilot och `gh` kan vara inställda på SJ:s GitHub Enterprise. Säger `gh` att inloggningen misslyckats fast designern loggat in: se [docs/ny-dator.md](docs/ny-dator.md).

## Innan du designar något: fråga efter Figma

Fråga alltid, första gången en ny vy eller ett nytt flöde ska byggas: **"Finns det Figma-skisser för det här?"** Läs sedan [docs/underlag.md](docs/underlag.md), som säger hur du gör i varje fall:

- **Ja, det finns Figma:** läs framen med `figma-desktop` (designern markerar i Figma-appen) eller Figma-pluginen (länk). Översätt lager till SJ-komponenter med `get_figma_component_conversions` och variabler med `find_figma_token_mapping`. Figmas kod är en referens, aldrig något att klistra in: mallen har inte Tailwind.
- **Nej, ingen Figma:** planera med designskillen **impeccable**. Kolla att `PRODUCT.md` har *Problem*, *Users* och *Product Purpose*, kör `shape` före bygget och `critique` och `audit` efter. Kommer beställningen som en lösning: fråga efter problemet bakom innan konceptet formas. **SJ:s designsystem går alltid före skillens smak.** Kör aldrig `document`, `bolder` eller `colorize`.
- **Referenser från Mobbin** (valfritt): erbjud i en mening att visa hur andra appar löst samma flöde. SJ:s riktlinjer i Sanity går före Mobbin.
- **Varianter:** tipsa om `/prototype` (3–5 varianter av en del) eller `/design` (Claude Design). Designern skriver kommandona själv.
- **Autonomt bygge:** arbetsflödena får kortas, se [docs/underlag.md](docs/underlag.md).

## Visa innan du bygger

Ett **nytt flöde eller ett omtag** visas för designern och får ett ja innan det byggs på riktigt. Små ändringar (en text, en knapp, en rättning) byggs direkt.

- **Skissen är snabb, inte en spec:** en klickbar version med påhittad data och utan backend, eller 2–3 varianter att välja mellan (`/prototype`). Lägg skärmbilderna i chatten.
- **Kärnflödet först.** Bygg flödet med påhittad data och visa det klickbart innan databas, inloggning, externa tjänster eller AI kopplas in.
- **Flera personer i samma flöde** (en som bokar och en som reser, en som delar en resa och andra som tar emot den): föreslå att spela igenom loppet som var och en innan skissen visas, och gör det vid ja. En tabell med en rad per person: varifrån hen kommer (länk i sms, mejl, appen), vad hen vet när sidan öppnas, vad hen gör och ser, och vad som händer sedan. Lägg till minst två sneda fall, till exempel att tåget ställs in eller att någon inte svarar. Tankefel i konceptet hittas här på tio minuter, efter bygget kostar de ett omtag.
- **Designern är inte alltid användaren.** Påminn om att låta en riktig resenär prova skissen tidigt. Tio minuter räcker.
- **Vid ett autonomt bygge:** ett helt nytt flöde blir bättre om designern hinner se skissen först. Föreslå det när fullmakten kommer.

## SJ:s designsystem

Komponentbiblioteket `@sj-ab/component-library` bygger på React och MUI 7. Varje komponent är ett **eget npm-paket på Bit Cloud**, inte på npmjs.com. `.npmrc` pekar `@sj-ab` mot `https://node-registry.bit.cloud`. Ingen inloggning eller VPN behövs.

### Var du hittar svaren (i den här ordningen)

1. **`sj-storybook`-MCP:n** (SJ:s publicerade Storybook). Förstahandsvalet för Storybook: `storybook_*`-verktygen i `sj-design-system` kan få timeout mot Chromatic. Kör `docs-list` en gång per session och sedan `docs-show` per komponent innan du använder den. `docs-show-story` ger fler varianter. Här finns riktiga kodexempel och props. Riktlinjer som `guidelines-forms`, `guidelines-layout-examples`, `guidelines-spacing` och `guidelines-elevation` finns också här. **Gissa aldrig props.**
2. **`sj-design-system`-MCP:n** (SJ:s egen, paketet `@sj-ab/component-library.internal.design-system-mcp`). Den hämtar från SJ:s designwebb i Sanity och från Bit:
   - `get_component_page_content`: SJ:s egen dokumentation om en komponent, inklusive tillgänglighet och när den ska användas. Slug i kebab-case: `app-bar`, inte `AppBar`.
   - `get_guideline_page_content`, `find_sanity_content`, `get_sanity_document`: riktlinjer och principer.
   - `find_bit_component`, `get_bit_component_install`, `get_component_changelog`: hitta rätt paket och se vad som ändrats.
   - `find_figma_token_mapping`: Figma-variabel till SJ-token.
   - **Verifiera alltid svar från `get_component_props` och `get_design_tokens` mot punkt 1 eller 3.** Kolla att props kommer från rätt komponents `.d.ts` och att komponenten faktiskt exporteras. Listorna kan vara ofullständiga.
3. **Typfilerna i `node_modules/@sj-ab/*/dist/*.d.ts`.** De har alltid rätt om sig själva. Kolla `dist/index.d.ts` för att se om komponenten är default- eller named export: `AppBar`, `InformationCard`, `Typography` och `Stack` är default, `FlowButton`, `TextField` och `Switch` är named.
4. **Skillen `sj-design-system`** (i `.claude/skills/`) för konventioner, UX-writing, ordlista och designprinciper.

**Storybooks `guidelines-layout-examples` är inte husmönstret här.** Exemplen använder `Container` och `Grid` med `--sjse-*`-variabler och inline-`<style>`. Använd `PageLayout` (se "Ny sida") och `sx` med temats spacing.

### SJ:s riktlinjer i Sanity: hämta innan du designar ett mönster

SJ:s designwebb har riktlinjer för mönster som ofta dyker upp i prototyper. **Hämta den relevanta sidan med `get_guideline_page_content` (slug nedan) innan du designar mönstret**, och följ den före allmänna UX-vanor. Sammanfattningen av layoutreglerna står i `DESIGN.md`.

| Område | Slugs |
|---|---|
| Layout | `spacing`, `grid`, `brytpunkter`, `informationstathet`, `knapphierarki`, `sakert-omrade`, `angransande-ytor` |
| Mönster | `tomma-tillstand`, `navigering`, `hjalp`, `destruktiva-val`, `installningar`, `onboarding`, `startskarm`, `textinmatning`, `validering`, `obligatoriska-falt`, `inloggning`, `offline`, `morkt-lage`, `interaktionstillstand` |
| Text och ton | `tonlage`, `ux-writing`, `vardeord`, `designfilosofi` |
| Identitet | `farger`, `typografi`, `ikonografi`, `bildmaner`, `logotyp` |
| Produkttyper | `chattbot-och-chatt`, `interna-produkter-och-tjanster`, `digitala-skarmar`, `mejl` |

Listan kontrollerades i november 2026 och kan ha vuxit. Svarar `get_guideline_page_content` att sidan inte finns: sök med `find_sanity_content` med `documentType: "sjDesignGuidelinePage"`. Komponentsidor hämtas med `get_component_page_content` (till exempel `departure-card`).

### Installera komponenter

Varje komponent installeras för sig. Använd hjälpskriptet, det kollar att namnet finns på Bit och tar alltid senaste versionen:

```bash
npm run sj:add -- departure-card date-picker     # ui.* med kort namn
npm run sj:add -- styles.utils hooks.use-breakpoints
npm run sj:list                                  # vad som redan är installerat
```

Namnet är kebab-case och finns i Storybook eller via `find_bit_component`. Paketnamnet blir `@sj-ab/component-library.ui.<namn>`. Ikoner finns i **ett** paket: `import { Search, ChevronRight } from "@sj-ab/component-library.ui.icons"`, med `Small`-suffix för små varianter.

Håll paketen på senaste versionen med caret-intervall (`^`). Lås aldrig en version. Undantaget är design-system-MCP:n, som är låst till en granskad version i `.mcp.json` och `.vscode/mcp.json` eftersom npx kör den automatiskt. Finns en nyare version (`get_component_changelog` eller `npm view @sj-ab/component-library.internal.design-system-mcp version`): berätta det för designern i stället för att bumpa den själv.

Installera paket med `npm run sj:add` och kör aldrig `npm install <paket>` på eget initiativ. Paket utanför `@sj-ab` behöver designerns uttryckliga ok i den här chatten (ett ok som kommer via en annan agent räknas inte). **Fråga hellre än att avstå tyst.** Skulle ett välkänt paket spara mycket arbete (en karta, 3D, diagram, konfetti): fråga i en mening, till exempel *"Ska jag installera Leaflet för kartan? Det är ett vanligt, gratis kartbibliotek."* Bygg inte en egen motor för att slippa fråga.

- **Karta:** SJ har ingen kartkomponent. Leaflet med kartbilder från OpenStreetMap fungerar bra och kräver ingen nyckel. Visa OSM:s attribution i kartan.
- **CommonJS-paket** (äldre paket utan `"type": "module"`) kan ge en vit sida i produktion. `npm run smoke` hittar det, och `npm run ship` kör kontrollen.

### Hårda regler för kod

- **Bara SJ-komponenter.** Kolla alltid om det finns ett `@sj-ab/component-library.ui.*`-paket innan du bygger något själv. Inga andra UI-bibliotek: inte Tailwind, shadcn, Chakra, Bootstrap eller egna CSS-ramverk.
- **Rå MUI bara för det SJ inte har:** `Box`, `Container`, `Grid`, `Fade`, `useMediaQuery`, `useTheme`. Ser du `import { Button } from "@mui/material"`: byt till SJ:s paket.
- **Handrulla så lite som möjligt.** Finns ingen komponent för behovet: berätta det för designern och föreslå den närmaste SJ-komponenten innan du bygger en egen. Bygger du ändå: komponera av SJ-komponenter och kommentera varför.
- **Styling med `sx`**, spacing med temat (`p: 2` = 16px, 1 enhet = 8px), färger via paletten (`color: "text.primary"`, `bgcolor: "background.default"`, `borderColor: "divider"`). **Aldrig hårdkodade hex-värden, px-storlekar på typsnitt eller egna skuggor.**
- **Typografi via `Typography` med nuvarande varianter:** `largeTitleEmphasized`, `title1Emphasized`, `title2Emphasized`, `title3Emphasized`, `bodyRegular`, `subheadlineRegular`, `caption1Regular` och så vidare. Rubriknivån sätts med `component`, inte med varianten: `<Typography variant="largeTitleEmphasized" component="h1">` och `<Typography variant="title2Emphasized" component="h2">`. **`h1`–`h4` finns inte längre som varianter** (borttagna i typography 8.4) och fäller typkontrollen. Byt `h1` mot `largeTitleEmphasized`, `h2` mot `title2Emphasized` och `h3` mot `title3Emphasized`, alla med `component`. **Använd inte heller** `body1`, `caption`, `heading1md`–`heading4`, `link`, `overline` eller `subtitle1`. Vilka varianter som är borttagna står i `ExcludedDesignTokenTypographyVariant` i `node_modules/@sj-ab/component-library.ui.typography/dist/Typography.d.ts`. (`titleVariant="h2"` på kortkomponenter som `InformationCard` är en annan prop och fungerar fortfarande.)
- **Ikoner, inte emojis**, i gränssnittet. Hämta dem från `@sj-ab/component-library.ui.icons`.
- **Texter i `src/i18n/sv.ts`**, lästa med `useTranslation()` och `t("nyckel")`. SJ:s UX-writing: du-form, aktiv röst, kort och konkret, inga tankstreck.
- **Allt ligger inuti `ThemeProvider`** (`src/theme/ThemeProvider.tsx`). Den sköter ljust och mörkt läge och högkontrast.

### Designprinciper: så ser SJ ut

**SJ använder sällan kort.** Många agenter lägger allt i kort, och kort i kort, med ramar i ramar. Gör inte det här.

- **Innehåll ligger direkt på sidan.** Rubriker, text, formulär, listor och knappar står på bakgrunden och separeras med luft (spacing), rubriker och vid behov `Divider`. Ett formulär ligger inte i ett kort, och en sektion ligger inte i en ram.
- **Kort används bara när det finns en färdig kortkomponent för just det ändamålet:** `DepartureCard` (avgång), `JourneyCard` (resa), `TicketCard` (biljett), `InformationCard` (information eller tips), `EditorialCard`, `PhotoCard`, `CampaignCard`, `ProductCard`, `SwitchCard`, `RadioCard`, `CheckboxCard`, `AccordionCard` och `ErrorSummaryCard`. `Card` med `variant` (till exempel `information`, `critical`) är för meddelanden, inte för att rama in innehåll.
- **Djup skapas med lager, inte med ramar:** `Sheet` (bottensheet på mobil), `SideSheet` (sidopanel), `Dialog`, `Menu`, `Popper` och `Tooltip`. Detaljer och val öppnas i ett lager ovanpå sidan i stället för att staplas i kort.
- **Listor** är `List` + `ListItemButton` + `ListItemText` (+ `ListItemIcon` med chevron), med `Divider` mellan raderna. Inte en kolumn med kort.
- **En tydlig huvudhandling per vy.** `FlowButton` för den primära handlingen, `colorVariant="secondary"` eller `TextButton` för det sekundära.
- **Avstånd:** 16px är standard (`spacing={2}`). Öka i steg om 8px (24px mellan sektioner), minska i steg om 4px för finjustering (till exempel rubrik mot brödtext). Sidomarginal 16px. Maxbredd 600 för formulär och flöden, 1200 för bredare sidor. Se `DESIGN.md`.
- **Mobil först.** Bygg för 375px bredd och skala upp. Kolla alltid både mobil och desktop.
- **Ton:** mänskligt och sympatiskt, i ögonhöjd, varmt och lättsamt men inte babbligt (Sanity: `tonlage`, `ux-writing`).
- **`Alert` är en dialog**, inte en banner. För ett meddelande inline: `Card variant="information"` eller `SystemMessage`.
- **Ett tryck ger alltid synlig återkoppling**, även när inget nytt händer. Finns saken redan: säg det ("Finns redan på listan") och öppna den, i stället för att inte göra något alls.
- **Byt inte ut en lista under fingret.** Sökresultat som laddas om medan någon skriver får inte flytta eller ta bort raden hen är på väg att trycka på. Vänta tills skrivandet stannat, eller behåll raderna som redan visas.
- **Delat tillstånd behöver ångra och ta bort**, även för andras poster, så att ett misstag inte måste rättas direkt i databasen. Följ riktlinjen `destruktiva-val` (bekräfta med `Alert`).

Mer finns i skillens `references/design-philosophy.md`, `design-layout.md` och `design-prominence.md`, och i Storybooks `guidelines-*`.

### Reskomponenter: använd dem före egna rader

SJ har färdiga komponenter för nästan allt som rör en resa. **Bygg aldrig egna rader med ikon, etikett och värde** ("Datum", "Tid", "Tåg", "Spår") för resedata. Det räknas som handrullat, och SJ:s komponenter gör det bättre, med rätt format, skärmläsartext och störningslägen. Kolla tabellen och Storybook (`docs-list`, sök på `atoms`, `card` och `progress`) innan du bygger något för resor.

| Innehåll | Komponent (`@sj-ab/component-library.ui.*`) |
|---|---|
| Avgångar att välja bland | `departure-card` |
| En bokad resa i en lista | `journey-card` |
| Resans stopp, tider, spår och ändringar (tidslinje) | `route-description` |
| Sammanfattning av en resa: från–till, tider, restid | `journey-summary`, eller `list-item-journey-summary` i en lista |
| Tågtyp, tågnummer, service ombord | `transport-summary`, `transport-details` |
| Tågbild | `transport-image` |
| Restid och byten | `travel-time` |
| Pris | `price-object` |
| Biljett | `ticket-card` |
| Välja station från–till | `station-picker` |
| Välja datum | `date-picker` |

**Detaljvy för en resa**, till exempel i ett `Sheet`: börja med `journey-summary` överst och sedan `route-description` för tidslinjen. Lägg bara det som inte täcks av komponenterna i en vanlig `List` med `ListItemText`, till exempel bokningsnummer eller vagn och plats. Handlingar (visa biljett, boka om) läggs efter sammanfattningen men **före en lång tidslinje**, så att huvudhandlingen syns utan att man scrollar på mobil.

- **Upprepa inte det komponenterna redan visar.** Står "Inställd" eller tågnumret i `JourneySummary` ska det inte stå igen i en rubrik eller lista.
- **Vid en störning är lösningen huvudhandlingen.** Är resan inställd eller kraftigt försenad: `FlowButton fullWidth` för "Boka om" direkt under meddelandet. Övriga val (visa resa, avboka) blir listrader eller `TextButton`.
- **Ge alltid en utväg.** Passar inget alternativ ska resenären kunna avboka, få pengarna tillbaka eller få hjälp. Hämta `hjalp` och `destruktiva-val` från Sanity innan du designar det.
- **Bekräftelsesidan** ska ha det resenären behöver härnäst: ny avgångstid, spår, vagn och plats, inte bara "Klart".
- **Upprepade listrader** (tre "Visa resa" i en lista) behöver en `aria-label` med sammanhang, till exempel "Visa resa Stockholm–Göteborg 14 okt".

### Vertikalt avstånd: `Stack` med `useFlexGap`

**Skriv alltid `<Stack useFlexGap spacing={…}>`.** Utan `useFlexGap` lägger MUI:s `Stack` avståndet som `margin-top` på varje barn. Många SJ-komponenter sätter sin egen `margin` (till exempel `FormControlLabel`, och `TextButton` med `negativeMargins`), och då skrivs avståndet över tyst. I mallen blev 24px mellan två sektioner till 0px. Med `useFlexGap` blir avståndet CSS-`gap`, som barnens marginaler inte påverkar. Det gäller både SJ:s `Stack` och MUI:s.

### Negativa marginaler: allt ska linjera i vänsterkant

Ett vanligt fel. Komponenter med en inre klickyta hamnar indragna i förhållande till rubriker och brödtext om de saknar negativ marginal. **Princip: allt ska linjera i vänsterkant.** Textens (eller kontrollens) vänsterkant ska ligga exakt under rubrikens vänsterkant, och klickytan får sticka ut i marginalen. Använd negativ marginal **bara till vänster**, så att det vertikala avståndet inte påverkas.

| Komponent | Standard | Så här |
|---|---|---|
| `List`, `Accordion` | på | Låt det vara. Stäng bara av (`negativeMargins={false}`) när de ligger i en behållare som redan har padding, till exempel en `SideSheet`. |
| `FormControlLabel` (switch, checkbox, radio) | av | `negativeMargins={{ left: true }}` |
| `TextButton` | av | `negativeMargins={{ top: false, right: false, bottom: false, left: true }}` (alla fyra nycklar krävs) |

- Sätt inte `negativeMargins={true}` på `FormControlLabel` eller `TextButton`. Det drar in alla fyra sidor och äter upp avståndet uppåt och nedåt.
- Andra komponenter med `negativeMargins`: `InformationCard` (på som standard), `Divider`, `Badge` och `ActionButtons`. Kolla `.d.ts` när du är osäker.
- Sidans behållare behöver sidomarginal (`px: 2`, som i `PageLayout`), annars kan den negativa marginalen ge horisontell scroll.
- **Kontrollera i webbläsaren** att vänsterkanterna linjerar. Referens: Storybook `guidelines-negative-margins-negative-margins`.

### Kända fallgropar

**TypeScript räcker inte som kontroll.** Många SJ-komponenter tar emot `children` utan att rendera dem, och koden kompilerar ändå. Två exempel från mallen: `InformationCard` visar sin text via `secondaryMeta` och ignorerar children. `AppBar` visar sin titel först när sidans `h1` (kopplad via `headingRef`) har scrollats ur bild, och det är avsiktligt. Kolla därför alltid komponentens story i Storybook och titta på resultatet i webbläsaren.

- En komponents `sx` **ersätter** komponentens eget `sx` i stället för att slås ihop med det (till exempel `EmptyState`). Läs komponentens `dist/*.js` om ett `sx` får layouten att ändras oväntat.
- `IconButton` tar `ariaLabel` (camelCase), inte `aria-label`.
- `TextField` kräver `id` och `autoComplete`. `Switch` kräver `name` och ska ha en synlig etikett, helst via `FormControlLabel`.
- `Chip startIcon` tar en komponent (`DoneSmall`), men `Select startIcon` tar JSX (`<Search />`).
- `Sheet` har ingen inre padding (lägg `px: { xs: 2, sm: 4 }` på innehållet). `SideSheet` har padding.
- `ListItemButton` renderar sin egen `<li>`. För en ensam rad utan lista: `disableLiSemantics`.
- Designtokens är lägesberoende: `theme.designTokens.{light,dark}.color.*`. Använd paletten via `sx` i första hand. Tokens behövs sällan.
- SJ:s `Container`, `Spacing`, `Grid` och `Confirmation` läser CSS-variabler (`--sjse-*`). De kommer från paketet `styles.sj-global-styles`, som importeras i `src/main.tsx`. Ta inte bort den importen. `Container` räknar med `100cqi` och behöver en förälder med `container-type: inline-size`.
- **Länk med React Router i en listrad:** `ListItemButton` med `component={RouterLink} to="/sida"`. Prop:en `LinkComponent` fungerar inte med en komponenttyp som `RouterLink`.
- **AppBar-knappen Tillbaka:** `navigationButtons={[{ label, variant: "back", action: () => navigate(...) }]}`. `PageLayout` gör det här åt dig via `back`.
- **`EmptyState` `primaryAction`:** använd `onClick`, inte `action`. `action` krockar med MUI:s typ och går inte igenom typecheck.
- **`DepartureCard`:** `producer` och `productName` skrivs ut bredvid varandra, så `productName` ska vara `"Snabbtåg"` och inte `"SJ Snabbtåg"`. `active` ändrar bara ramen. Lägg till `CardActionAreaProps={{ "aria-pressed": vald }}` för skärmläsare. Det finns ingen markering för ankomst nästa dag.
- **`DepartureCard` `disabled` stoppar inte klick.** Prop:en når inte fram till kortets `CardActionArea`, så `onClick` körs ändå, och `availability="soldOut"` gråar bara ut kortet. En slutsåld avgång går alltså att välja. Stoppa klicket själv i `onClick` och sätt `CardActionAreaProps={{ "aria-disabled": true }}`.
- **`Sheet` med `AppBarProps.headingRef`:** titeln i Sheetets AppBar visas först när rubriken har scrollats ur bild, precis som på en sida. Är rubriken `srOnly` syns ingen titel alls. Lägg alltid en synlig `h2` med `headingRef` först i Sheetets innehåll.
- **`ListItem` i en `List`:** använd inte `disablePadding`. `List` har negativ marginal och `ListItem`s padding är motvikten. Utan den hamnar texten 16px till vänster om rubrikerna.
- **`JourneyCard` med handlingar:** i version 6.2.x når `onClick` inte fram till kortet. Använd SJ:s eget mönster från Storybooks störningsexempel: `clickable={false}` och en `List` som barn med `ListItemButton`-rader, med `Divider` mellan raderna. Men gör inte som exemplet och lägg "Boka om" som en likvärdig listrad vid en störning: det är huvudhandlingen och ska vara en `FlowButton` (se "Reskomponenter").
- **Typer för props-fält** (till exempel en rad i `RouteDescription` eller transporttypen i `JourneySummary`) exporteras ofta inte av komponenten själv. Härled dem i stället för att importera från ett paket som inte står i `package.json`: `type Item = ComponentProps<typeof RouteDescription>["items"][number]` (`ComponentProps` från `react`).
- **En prop som typas men inte fungerar:** gör ett klick eller en ändring ingenting, läs komponentens `dist/*.js` och kolla att prop:en faktiskt plockas ut eller skickas vidare. TypeScript märker inte det här.
- **`AppBar` `navigationButtons` är en tuple**, till exempel en enda Stäng-knapp: `[{ label, variant: "close", action }]`. En array som byggs i en variabel breddas av TypeScript till en vanlig lista och avvisas. Skriv den direkt i JSX, eller typa variabeln som `AppBarProps["navigationButtons"]`.
- **SJ:s `Switch` har rollen `switch`**, inte `checkbox`, i tillgänglighetsträdet. Det är viktigt att veta vid tester.
- **`Checkbox` skickar inte `checked` som andra argument** (till skillnad från `Switch`). `onChange={(_, checked) => ...}` ger `undefined` och rutan avmarkeras direkt. Skriv `onChange={(event) => ... event.target.checked}`.
- **`Sheet` saknar namn för skärmläsare** (axe: `aria-dialog-name`). `aria-labelledby` på `Sheet` når inte fram. Skriv `PaperProps={{ "aria-labelledby": "<id på bladets h2>" }}`.
- **`Chip` är 32 px hög**, under SJ:s minsta tryckyta på 44 px. Sätt `sx={{ minHeight: 44 }}` på varje `Chip` som går att trycka på (filter, betygsskalor).
- **Fasta ytor i nederkant** (`NavigationBar`, `BottomBarContainer`) hamnar under hemlinjen på iPhone när appen ligger på hemskärmen. Lägg till `pb: "env(safe-area-inset-bottom, 0px)"` på ytan. `PageLayout` räknar redan in hemlinjen i sidans luft nedtill.
- **`npm run build` varnar för stora filer** eftersom SJ:s tågillustrationer följer med. Det är väntat för en prototyp. Lägg inte till koddelning för att få bort varningen.
- **`BottomBarContainer`** har `position: fixed`. Ge `main` luft nedtill (`PageLayout` gör det när du skickar med `bottomBar`).
- **`List`** tar inte `disablePadding`. För att linjera en ensam rad: `disableGutters` på `ListItemButton`.
- **"Invalid hook call" eller dubbla Emotion-varningar direkt efter att du installerat ett paket** beror på att Vite bygger om sina beroenden första gången det nya paketet importeras. Ladda om sidan. Hjälper inte det: starta om `npm run dev`. `vite.config.ts` förbereder alla SJ-paket i `package.json` när dev-servern startar, så efter `npm run sj:add` slipper du felet genom att starta om `npm run dev` innan du importerar paketet.

**Kända brister i SJ:s komponenter** som inte går att åtgärda i prototypen. Nämn dem för designern om de syns i en granskning, så kan hen rapportera dem till designsystemteamet:

- `DepartureCard` med `showPrice={false}`: skärmläsaren läser "pris , Ingen extra kostnad".
- `DepartureCard` med `availability="soldOut"`: en hårdkodad `<h4>Slutsåld</h4>` direkt under kortets `h2` ger ett hopp i rubriknivåerna.
- `ButtonGroup` på mobil: den sekundära knappen kommer före den primära, både visuellt och i tabbordningen. Kolla mot riktlinjen `knapphierarki`.
- Den gröna `FlowButton` har kontrasten 3,0:1 (vit text på grönt) i ljust läge, under kravet på 4,5:1.
- `Sheet` lyssnar inte på `aria-labelledby` (se fallgropen ovan), och `Chip` är under 44 px.
- `AppBar` suddar innehållet bakom sig med `backdrop-filter`, och då blir statusfältet grått i Safari på iPhone. `PageLayout` stänger av det.
- **Installationen verkar trasig** (moduler hittas inte trots att de står i `package.json`): kör `npm run doctor`. Rapporterar den trasiga beroenden, kör `npm ci`.

## Ny sida: receptet

1. Skapa `src/pages/<Namn>Page.tsx` och bygg sidan med `PageLayout` (`src/components/PageLayout.tsx`). Den ger AppBar med rubrik via `headingRef`, Tillbaka-knapp (`back`), sidomarginal, maxbredd (`maxWidth`, SJ:s värden 400–1600) och plats för en fast bottenyta (`bottomBar`).
2. Lägg till en `<Route>` i `src/App.tsx`.
3. Lägg texterna under en egen nyckel i `src/i18n/sv.ts`.
4. Lägg exempeldata i `src/data/<område>.ts`, enligt `src/data/README.md`: påhittad, relativ till idag och med minst ett undantagsfall.
5. Länka till sidan, till exempel från startsidan med en `List` och `ListItemButton component={RouterLink}`.
6. Lägg till sidans kärnflöde i `flows.json` (se "Kontroller").
7. Kör `npm run typecheck` och `npm run verify`, och titta på sidan i mobil och desktop, i ljust och mörkt läge.

## Titta på resultatet

**Klicka dig igenom varje interaktion** (knappar, kort, lager som öppnas och stängs, formulär) i webbläsaren innan du säger att något är klart. Kan du inte styra en webbläsare i sessionen: säg det rakt ut, och be designern klicka igenom de konkreta sakerna du listar.

- `npm run dev` startar prototypen, normalt på http://localhost:5173. **Läs porten som Vite skriver ut.** Är 5173 upptagen (till exempel av en annan prototyp) väljer Vite nästa lediga, som 5174. Byter du port i webbläsarverktyget: kontrollera att sidans adress verkligen ändrats, eller öppna en ny flik direkt på rätt port.
- Kolla både mobil (375×812) och desktop (1440×900), i ljust och mörkt läge.
- **Med webbläsarverktyg:** leta upp element med `find` eller `read_page` och klicka med `ref` hellre än på koordinater. Sätt fönsterstorleken i början av varje omgång klick, den kan hoppa tillbaka. En ändring i `src/i18n/sv.ts` laddar om hela sidan: gamla `ref` slutar gälla och öppna Sheets stängs.
- **Skärmdumpar som filer** (att visa designern, eller om du saknar ett webbläsarverktyg): `npm run screenshots -- / "Mina resor" "Visa resa" --desktop --dark` sparar en bild per steg i `screenshots/`. Stegen är samma som i `flows.json` (nedan). `--safari` tar bilderna i Safaris motor som en iPhone, `--full` hela sidan, `--url` en annan port. Installera inga Python-paket. Titta på bilderna.
- **Safari på iPhone:** flera fel syns bara där (statusfältet, tangentbordet, hemlinjen, fasta ytor i nederkant). Kommandon, Safaris inbyggda MCP-server och fällorna står i [docs/ios-safari.md](docs/ios-safari.md). Syns ett fel bara i Safari: föreslå att styra Safari på datorn via MCP, så att du kan klicka och läsa konsolen själv.

### Kontroller: vardag och skarp nivå

Inga enhetstester behövs. `npm run verify` klickar sig igenom prototypen som en användare, med Playwright.

- **Flödeskartan `flows.json`** listar kärnflödena, ett per sak användaren ska få gjort, med steg som `"/boka-om"`, `"Välj avgång"`, `"Namn=Anna"` och `"syns:Bokningen är klar"`. Lägg till flödet när du bygger det och ändra det när flödet ändras. **Ändra aldrig ett flöde bara för att kontrollen ska gå igenom:** säg i så fall till designern vad som ändrats i flödet och varför. Byt ut mallens exempelflöden när startsidan byts ut.
- **Vardag, varje omgång:** `npm run typecheck`, `npm run verify` (kärnflödena i Chromium på mobil, några sekunder per flöde, mot dev-servern), de rader i [docs/kontroller.md](docs/kontroller.md) som ändringen utlöser och klick i webbläsaren på det du ändrat. `verify` räknar också JavaScript-fel, sidor som svarar med fel och sidor som går att skrolla i sidled på mobil.
- **Skarp nivå** när en omgång ska testas med användare, visas utanför teamet eller när designern ber om hårdare tester: `npm run verify -- --full` (mobil och desktop, ljust och mörkt, Safaris motor som iPhone och iOS-simulatorn om Xcode finns, med en skärmdump av varje steg i `screenshots/verify/`). Låt sedan en underagent som inte har byggt vyerna granska skärmdumparna mot `PRODUCT.md` och svara på var en användare skulle fastna. Föreslå skarp nivå i en mening när det finns skäl och kör den när designern säger ja. Vill designern ha den hela tiden: sätt `"level": "skarp"` i `flows.json`.
- **Tre försök, sedan stopp.** Fallerar en kontroll fortfarande efter tre rättningar: sluta, och berätta med vardagsord vad som inte fungerar, vad du har provat och vad du föreslår. Lägg inte in väntetider, kör inte om tills den råkar gå igenom och hoppa inte över kontrollen. Kör om bara flödet som fallerade (`npm run verify -- "Flödets namn"`) medan du rättar, och alla en gång på slutet.

### När något är klart

Skriv **klart** bara när `npm run typecheck` och `npm run verify` går igenom, `code-review` är körd, varje klick är prövat i webbläsaren på mobil och desktop, och skärmbilderna ligger i chatten, inte bara i en mapp.

**Börja rapporten med det som inte är kontrollerat**, inte med det som fungerar. `verify` skriver ut raderna *Kontrollerat i* och *INTE kontrollerat*: använd dem. Skriv till exempel *klickat i Chrome, inte kontrollerat i Safari* först, inte i en bisats längre ned. Det designern läser först ska vara det hen behöver kolla själv.

**Tunga kontroller är valbara.** Den skarpa nivån och rollspel för flöden med flera personer kostar tid och kvot. Föreslå dem i en mening när det finns skäl och kör dem när designern säger ja, inte på eget initiativ.

## Kodgranskning

Designern läser inte koden, så du granskar den. Kör den inbyggda skillen **`code-review`** och åtgärda fynden (`--fix`):

- efter varje större ändring: en ny vy, ett nytt flöde, ett formulär med validering
- alltid före `npm run ship` om koden har ändrats sedan förra granskningen

Före en publicering eller merge granskar du på tre sätt: kod (`code-review`), design (impeccables `critique`) och tillgänglighet (`audit`). Hoppa över en som uppenbart inte berörs (en ändrad text behöver ingen designgranskning) och säg det i en mening.

Rör ändringen `api/`, en databas, inloggning eller nycklar: kör också den inbyggda skillen **`security-review`**. Fråga inte först, inte heller vid ett autonomt bygge. Berätta i en mening med vardagsord vad som hittades och rättades. Fynd som kräver ett beslut av designern tar du upp med hen.


## Spara, publicera och dela

Förklara git för designern med vardagsord: en *commit* är en sparpunkt och en *push* laddar upp till GitHub. Föreslå en commit när något fungerar. Kör aldrig `git push --force` och radera aldrig brancher utan att designern uttryckligen bett om det.

### "Publicera" eller "dela länken": `npm run ship`

När designern säger *publicera*, *dela* eller *skicka länken*: granska koden om den ändrats (se "Kodgranskning") och kör `npm run ship -- "<vad som ändrats>"`. Skriptet kör typkontrollen, bygger och öppnar den byggda sidan headless och spelar upp kärnflödena i `flows.json` (`npm run smoke`), och stoppar om något fallerar. Sedan sparar det (commit), hämtar andras ändringar (`git pull --rebase`), laddar upp till GitHub (push) och väntar in Vercel. Ge designern länken. Krockar, första publiceringen, hemskärmen och Claude i GitHub: [docs/publicera.md](docs/publicera.md).

- **Bara vissa brancher byggs.** Vercel bygger `main` (huvudlänken) och brancher som börjar med `variant-` (en variant att jämföra) eller `preview-` (en förhandslänk innan något hamnar på `main`). Andra brancher laddas upp men byggs inte (`scripts/vercel-ignore-build.sh`, ta inte bort spärren): varje bygge lagras och kostar. Testa lokalt tills en omgång är klar och publicera en gång i slutet, inte efter varje ändring.
- **När prototypen används på riktigt** (länken är delad och folk använder den): ändra på en `preview-`-branch och merga när den är godkänd. Testa aldrig med den riktiga datan. Har prototypen en databas: läs [docs/backend.md](docs/backend.md).
- **Är designern inte inloggad på Vercel** stannar skriptet. Be hen köra `npx vercel login` i Terminal och godkänna i webbläsaren.

### Konfidentialitet: viktigt

Ett privat github.com-konto och Vercel ligger **utanför SJ:s infrastruktur**. **Stanna och fråga designern** innan något av det här hamnar i ett repo på github.com eller i en Vercel-deploy:

- innehåll hämtat från SJ:s GitHub Enterprise, Confluence eller Jira
- riktiga kund- eller persondata, riktiga biljett-, boknings- eller ärendenummer
- interna system, API-adresser, scheman, nycklar och lösenord
- skisser eller underlag märkta som interna eller konfidentiella

Föreslå alltid alternativet: påhittad exempeldata, en generell beskrivning, eller att lägga repot på SJ:s GitHub Enterprise. Lösenord och API-nycklar hör hemma i `.env.local` (gitignorerad), aldrig i koden. Tumregel: *är du osäker, är det inte ok än. Fråga.*

## README och dokument

Mallens README är skriven för att installera mallen. **I en prototyp ska README handla om prototypen**, annars kan nästa agent börja installera i stället för att jobba vidare. `npm run ship` byter ut den automatiskt första gången mot stommen i [docs/README-prototyp.md](docs/README-prototyp.md). Fyll i den med designern: vad prototypen är, länken, vilka vyer som finns (fil per vy), URL-parametrar för testning och kommandon. Mallens instruktioner för kodagenter finns kvar i [docs/mall.md](docs/mall.md).

Håll README och `PRODUCT.md` aktuella när prototypen växer (nya vyer, en backend). Beslut som är bra att minnas (varför en lösning valdes bort) kan läggas i `docs/beslut.md`, och idéer för senare i `docs/roadmap.md`.

## Plugins och skills att föreslå

Designern vet ofta inte att det här finns. Föreslå det när det passar, kort och med en mening om vad det ger. Installera när designern säger ja.

| Vad | När du föreslår det | Claude Code | GitHub Copilot (VS Code) |
|---|---|---|---|
| **Figma** (app + plugin) | Så fort Figma nämns eller en figma.com-länk dyker upp | `figma-desktop` i `.mcp.json` när Figma-appen kör med Dev Mode MCP. Pluginen är förinställd i `.claude/settings.json`. Tackade designern nej: `claude plugin install figma@claude-plugins-official` | `figma-desktop` finns i `.vscode/mcp.json`. Figmas server på nätet via *MCP: Add Server* (https://mcp.figma.com/mcp) |
| **Mobbin** (MCP) | Konceptfasen av ett nytt flöde, eller "hur brukar andra göra?" | I `.mcp.json`. Kräver inloggning första gången | I `.vscode/mcp.json` |
| **impeccable** (skill) | Ny vy utan Figma (`shape`), eller en klar vy som ska granskas (`critique`, `audit`) | Installeras av `npm run skills` | Samma |
| **Emil Kowalskis skills** | `break-ui` ("vad händer med riktig data?"), `/prototype` ("visa några varianter"), `emil-design-eng`, `animate` och `review-animations` ("gör det mer levande", "animera den här"), `mobile-native` ("känns fel på mobilen") | Installeras av `npm run skills` | Samma |
| **/learn-taste** (Emil Kowalskis skill) | Slutet av en session där designern rättat designen flera gånger: rättningarna blir regler i `DESIGN.md`, så att nästa chatt inte upprepar misstaget. Designern skriver kommandot själv | Installeras av `npm run skills` | – |
| **web-design-guidelines** (skill) | Granskning mot gränssnittsregler | Installeras av `npm run skills` | Samma |
| **code-review** (inbyggd skill) | Efter varje större ändring och före publicering | Inbyggd | – |
| **security-review** (inbyggd skill) | Ändringen rör `api/`, en databas, inloggning eller nycklar | Inbyggd | – |
| **Safari via MCP** | Ett fel syns bara i Safari, eller ett flöde ska klickas igenom i Safari (se `docs/ios-safari.md`) | `claude mcp add --scope user safari -- /usr/bin/safaridriver --mcp` | *MCP: Add Server* med samma kommando |
| **/design** (Claude Design) | Designern vill se flera visuella riktningar innan bygget | Inbyggt kommando | – |
| **Vercel** (MCP) | Designern vill dela en länk eller undrar varför en deploy failar | `vercel` i `.mcp.json` (Vercels MCP-server, för loggar och deployer). `npm run ship` publicerar. Vercels plugin används inte: det laddar in mycket text i varje session och har skills som pekar bort från mallen (bland annat shadcn) | `vercel` i `.vscode/mcp.json` |
| **Context7** | Du är osäker på ett API (React Router, i18next, Vite) | Förinställd | – |
| **Atlassian** (Jira + Confluence) | Designern nämner ett Jira-ärende, en story eller en Confluence-sida | `claude plugin install atlassian@claude-plugins-official` | Atlassians MCP-server via *MCP: Add Server* |

Plugins och MCP-servrar som kräver inloggning (Figma, Mobbin, Atlassian, Vercel) öppnar en webbläsare första gången. Designern loggar in själv. Be aldrig om lösenord eller tokens i chatten.

## Testperiod: samla problem med mallen

Mallen testas just nu av designers, och Erik Markensten som gjort den vill veta allt som skaver. **Skriv ned det i `feedback-till-mallen.md` i roten medan du jobbar**, så fort det händer. Vänta inte till slutet av sessionen.

Skriv ned när:

- ett installationssteg, skript eller MCP-server inte fungerar som AGENTS.md eller README säger
- en SJ-komponent beter sig annorlunda än typerna, Storybook eller AGENTS.md antyder
- en instruktion här saknades, var fel eller krockade med en skill, och du fick gissa
- du behövde en omväg eller byggde något som borde finnas i mallen
- designern blev osäker, fastnade eller fick göra något krångligt (till exempel starta om flera gånger)

Följ mallen i filen: datum, vad som hände, hur det löstes och ett förslag. Håll varje punkt kort och konkret, med filnamn och komponentnamn. Inga kunduppgifter, inga interna SJ-uppgifter och inget från designerns egen prototypidé som hen inte vill dela (se "Konfidentialitet").

**Påminn designern i chatten** första gången du skriver i filen under en session, och när ni avslutar eller hen säger att hen är klar för dagen. Ungefär: *"Jag har skrivit ned det som krånglade i `feedback-till-mallen.md`. Skicka gärna filen, eller klistra in innehållet, till Erik Markensten på Teams eller mejl. Det hjälper honom att förbättra mallen."* Påminn högst två gånger per session.

## Kommandon

| Kommando | Gör |
|---|---|
| `bash scripts/bootstrap.sh` | Sätter upp en ny Mac: Homebrew, git, Node, gh, GitHub-inloggning, prototyp (`--no-project` för bara verktygen) |
| `npm run doctor` | Kollar datorn: git, Node, GitHub-inloggningar, Bit-registret |
| `npm run setup` | Allt på en gång: doctor, install (`npm ci`), uppdatera inaktuella SJ-paket, skills och ett bygge som visar om en uppdatering brutit något |
| `npm run dev` | Startar prototypen lokalt |
| `npm run sj:check` / `sj:update` | Visar eller installerar senaste SJ-versionerna |
| `npm run sj:add -- <namn>` | Installerar en SJ-komponent från Bit |
| `npm run skills` | Installerar eller uppdaterar designskills (impeccable, Emil Kowalskis, web-design-guidelines) |
| `npm run typecheck` | Kollar att koden hänger ihop |
| `npm run screenshots -- / "Knapptext"` | Klickar igenom ett flöde och sparar skärmdumpar i `screenshots/` (`--safari` för Safaris motor) |
| `npm run verify` | Spelar upp kärnflödena i `flows.json` mot dev-servern (`--full` för skarp nivå, `"Namn"` för ett flöde) |
| `npm run ios-check -- / /sida` | Öppnar sidorna i riktig Safari i iOS-simulatorn (Xcode), annars WebKit som iPhone |
| `npm run smoke` | Bygger och öppnar den byggda sidan headless och spelar upp `flows.json`. Stoppar vid tom sida, konsolfel eller ett trasigt flöde |
| `npm run env:check` | Visar vilka variabler i `.env.local` och miljön som finns, utan att visa värdena |
| `npm run ship -- "meddelande"` | Kontrollerar koden och den byggda sidan, sparar, hämtar andras ändringar, laddar upp och publicerar på Vercel. Skriver ut länken |
| `npm run vercel:link` | Kopplar prototypen till Vercel (görs av `ship` första gången) |
| `npm run github:claude` | Visar hur Claude i GitHub (`@claude`) sätts upp |
| `npm run build` | Bygger för publicering (Vercel gör det automatiskt) |

## Projektstruktur

```
src/
  main.tsx                  startpunkt: SJ:s globala stilar, ThemeProvider och router
  App.tsx                   alla routes, en per sida
  pages/StartPage.tsx       exempelsida (bygg vidare eller ersätt)
  components/PageLayout.tsx sidskal: AppBar + innehåll direkt på sidan
  components/ScrollToTop.tsx varje ny sida börjar överst
  data/                     påhittad exempeldata (README: delat tillstånd mellan sidor)
  theme/ThemeProvider.tsx   SJ-temat, ljust/mörkt/högkontrast
  i18n/sv.ts                alla texter i gränssnittet
public/                  ikoner, manifest och delningsbild (platshållare, byts per prototyp)
index.html               titel, metadata för delning och hemskärm (platshållare)
DESIGN.md                SJ:s visuella regler (läses av impeccable och av dig)
PRODUCT.md               vem prototypen är för och varför (fylls i per prototyp)
flows.json               prototypens kärnflöden, som npm run verify spelar upp
scripts/                 hjälpskript (bootstrap för ny Mac, doctor, sj-add, sj-update, skills, verify, ship)
scripts/lib/             gemensamt: flow.mjs (stegspråket), browser.mjs (starta webbläsaren lokalt och i molnet)
.claude/skills/sj-design-system/  SJ-skillen (incheckad)
.mcp.json                MCP-servrar för Claude Code (SJ:s två, Figma-appen, Mobbin, Vercel)
.vscode/mcp.json         samma MCP-servrar för Copilot i VS Code
docs/kom-igang.md        steg-för-steg för en ny dator
docs/mall.md             instruktioner till kodagenten för att installera mallen
docs/README-prototyp.md  stomme för prototypens README (ersätter mallens vid första ship)
docs/backend.md          databas, api/ och tester när prototypen används på riktigt
docs/ny-dator.md         ny dator, Codespaces, gh-problem och SJ:s GitHub Enterprise (till kodagenten)
docs/underlag.md         Figma, impeccable, Mobbin och varianter i detalj (till kodagenten)
docs/publicera.md        ship, första publiceringen och Claude i GitHub i detalj (till kodagenten)
docs/ios-safari.md       Safari på iPhone: kommandon, Safaris MCP-server och fällor
docs/kontroller.md       kontroller som en ändring utlöser
vercel.json              Vite-routing och spärren som bara bygger main, variant-* och preview-*
.github/workflows/claude.yml  Claude i GitHub (@claude i ärenden och pull requests)
feedback-till-mallen.md  problem med mallen under testperioden (se ovan)
.impeccable/critique/ignore.md  kända falsklarm från SJ:s komponenter
```

Nya sidor läggs i `src/pages/` (se "Ny sida"), delade bitar i `src/components/` och exempeldata i `src/data/`.
