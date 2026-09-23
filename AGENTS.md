# AGENTS.md: SJ-prototypmallen

Instruktioner för kodagenten (GitHub Copilot, Claude Code eller annan agent som läser `AGENTS.md`). `CLAUDE.md` importerar den här filen och lägger bara till det som är specifikt för Claude.

**Den här filen går före dina allmänna arbetsflöden och process-skills** (till exempel brainstorming, writing-plans eller spec-driven development). Designern vill se något snabbt och iterera visuellt. Ställ högst tre korta frågor, bygg och visa. Skriv specifikationer, planer eller designdokument bara om designern ber om det.

## Vem du jobbar med

Du jobbar med en **designer på SJ** som bygger klickbara prototyper i kod med SJ:s designsystem. Designern kan vara ny på terminal, git, npm och kodagenter. Det betyder att du ska:

- **Leda, inte vänta.** Föreslå nästa steg och fråga om du ska köra det. Förklara vad ett kommando gör med en mening innan du kör det. Använd ingen jargong utan förklaring.
- **Göra det tekniska själv.** Kör kommandon, installera paket och fixa fel. Be bara designern göra saker som kräver hen: logga in i en webbläsare, godkänna en behörighet eller skriva ett lösenord.
- **Prata design.** Motivera designval med SJ:s principer (nedan), inte med kod. Visa resultatet i webbläsaren så ofta det går.
- **Skriva svenska** till designern om inget annat sägs. Kod, variabelnamn och commit-meddelanden skrivs på engelska. Texter i gränssnittet skrivs på svenska.
- **Tipsa om det designern inte vet finns**, men högst ett tips i taget och bara när det passar (se "Plugins och skills att föreslå").

## Checklista i början av varje session

Gör det här innan du börjar på designerns uppgift. Tar det mer än ett par sekunder, säg vad du gör.

1. **Finns `node_modules/`?** Om inte: kör `npm run doctor`. Rapporterar den `SAKNAS`, gå till "Första gången på en ny dator" nedan. Annars kör du `npm run setup`.
2. **Är SJ-komponenterna på senaste versionen?** Kör `npm run sj:check`. Kör `npm run sj:update` om något är inaktuellt och berätta kort vad som uppdaterades. Vid en ny major-version (skriptet flaggar det): kör `npm run typecheck` efteråt och fixa det som gått sönder. (I Claude Code körs kollen automatiskt vid start och resultatet syns som `[SJ-mall]`-rader. Du behöver bara agera på dem.)
3. **Finns designskillen?** Saknas `.claude/skills/impeccable`: kör `npm run skills`.
4. **Svarar MCP-servrarna?** Du ska ha tillgång till `sj-storybook` och `sj-design-system` (se nedan). Saknas de efter att du klonat mallen i den här sessionen: se "Obligatoriskt stopp" nedan. Verktygen kan visas under ett annat namn, till exempel `storybook` med `docs-list`, om designern redan har Storybook-MCP:n installerad globalt. Det är samma källa. I VS Code ska hen godkänna servrarna i `.vscode/mcp.json` när frågan dyker upp.

**Obligatoriskt stopp efter kloning och setup i samma session.** MCP-servrarna (`sj-storybook`, `sj-design-system`) och skillen impeccable laddas bara när agenten startar i mallens mapp. Har du klonat mallen i den här sessionen, eller saknas de verktygen i din verktygslista: **bygg ingenting än.** Stanna och skriv till designern, ungefär så här:

> Nu är mallen på plats. För att jag ska kunna fråga SJ:s designsystem om komponenter och riktlinjer behöver jag startas om i den nya mappen. Det tar en halv minut:
>
> - **VS Code:** *File → Open Folder* och välj mappen `<sökväg>`. Godkänn MCP-servrarna om VS Code frågar. Öppna sedan Copilot-chatten igen.
> - **Claude:** starta en ny session i mappen `<sökväg>`.
>
> Klistra sedan in det här, så fortsätter jag där vi var:
> *"<designerns ursprungliga beställning, i en mening>. Mallen är installerad och jag har startat om."*

Fyll i sökvägen och beställningen själv, så att designern bara behöver kopiera. Fortsätt utan omstart bara om designern uttryckligen ber om det, och säg då att du bygger utan SJ:s dokumentation och bara har typfilerna att gå på.

## Om du kör i GitHub Codespaces

Är miljövariabeln `CODESPACES` satt till `true` finns git, Node och GitHub CLI redan, och designern är inloggad. `.devcontainer/devcontainer.json` har också redan kört installation, SJ-uppdatering och skills. Hoppa över installationsstegen nedan.

- Prototypen nås via en vidarebefordrad port (5173). Säg åt designern att öppna den från fliken *Ports* om förhandsvisningen inte öppnas av sig själv.
- En codespace som skapats från mallen är **inte kopplad till något repo** förrän den publiceras. Föreslå tidigt att spara via *Source Control → Commit → Publish Branch → Publish to GitHub private repository*. Annars finns arbetet bara i codespacen.
- Påminn om att stänga codespacen när designern är klar för dagen. Gratistimmarna är begränsade.

## Första gången på en ny dator

Följ [docs/kom-igang.md](docs/kom-igang.md) och ta ett steg i taget tillsammans med designern. Kör `npm run doctor` efter varje steg så att ni ser att det gick igenom. Kortversionen:

1. Git (på Mac via Homebrew eller Xcode Command Line Tools)
2. Node.js LTS
3. GitHub CLI (`gh`) och ett **privat, gratis konto på github.com**: `gh auth login --hostname github.com --git-protocol https --web`, sedan `gh auth setup-git`. Kontot behövs först när designern vill spara sin prototyp på GitHub och dela den via Vercel.
4. Hämta mallen som ett eget repo, `npm run setup`, `npm run dev`

**Inget i mallen kräver SJ:s GitHub Enterprise, VPN eller SJ-konto.** Komponenter, MCP-servrar och typsnitt hämtas publikt. De flesta designers har inget GHE-konto, så nämn det inte om designern inte tar upp det själv. Har designern ett och vill läsa teamets repon: se "SJ:s GitHub Enterprise" längre ned.

**Om `gh` säger att inloggningen misslyckats** fast designern loggat in: en ogiltig `GH_TOKEN` eller `GITHUB_TOKEN` i miljön går före den sparade inloggningen. Kör `env -u GH_TOKEN -u GITHUB_TOKEN gh auth status` för att se den riktiga inloggningen, och använd samma prefix på `gh`-kommandon. För att klona mallen behövs ingen inloggning alls.

**Använd alltid full github.com-adress.** Copilots inbyggda GitHub-koppling och `gh` kan vara inställda på SJ:s GitHub Enterprise (till exempel via miljövariabeln `GH_HOST`). Då leder kortformer som `ägare/repo` fel och ger 404 eller inloggningsfel. Skriv `https://github.com/ägare/repo`, eller sätt `GH_HOST=github.com` framför `gh`-kommandon.

## Innan du designar något: fråga efter Figma

Fråga alltid, första gången en ny vy eller ett nytt flöde ska byggas: **"Finns det Figma-skisser för det här?"**

- **Ja, det finns Figma:** be om länken (högerklick på framen i Figma, välj *Copy link to selection*). Använd Figma-MCP:n (`get_design_context`, `get_screenshot`, `get_variable_defs`) för att läsa designen. Bygg den med SJ-komponenter, översätt Figma-lager till rätt komponent och inte till handgjorda divar. `find_figma_token_mapping` i `sj-design-system`-MCP:n översätter Figma-variabler till SJ-tokens. Saknar agenten Figma-MCP: föreslå att installera den (se nedan).
- **Nej, ingen Figma:** berätta att du tänker använda designskillen **impeccable** och varför. Skriv till exempel: "Det finns ingen skiss, så jag planerar vyn med impeccable först och granskar den när den är byggd. Allt inom SJ:s designsystem." Gör sedan så här:
  1. Kolla att `PRODUCT.md` har *Users* och *Product Purpose* ifyllda för prototypen. Ställ annars högst tre korta frågor till designern (vem, i vilken situation, vad ska hen få gjort) och fyll i dem.
  2. **Före bygget:** arbetsflödet `shape`, för att planera flöde och hierarki.
  3. Bygg med SJ-komponenter enligt reglerna nedan.
  4. **Efter bygget:** arbetsflödena `critique` (UX-granskning) och `audit` (tillgänglighet och responsivitet). Åtgärda det som hittas i en omgång.
  5. Vid behov: `layout` (avstånd och rytm), `distill` (skala bort), `harden` (fel-, tom- och laddlägen) eller `onboard` (första gången, tomma lägen).

**Så används impeccable här:** skillen läser `DESIGN.md` och `PRODUCT.md` i roten. `DESIGN.md` säger att SJ:s visuella värld är given, så allt är *refinement*, aldrig *redesign*.

- **Arbetsflödena är instruktioner, inte terminalkommandon.** `shape`, `critique`, `audit` och de andra finns som filer: läs `.agents/skills/impeccable/reference/<namn>.md` och följ den. Launchern `.agents/skills/impeccable/scripts/impeccable` har bara verktygskommandon. Den användbara här är `detect <fil eller URL>`, som skannar efter vanliga designfel. Kör den gärna efter `critique`.
- **Har skillen precis installerats i den här sessionen** laddas den inte förrän agenten startats om. Det hanteras av det obligatoriska stoppet ovan. Har designern valt att fortsätta utan omstart: läs `.agents/skills/impeccable/SKILL.md` och relevant `reference/`-fil direkt. Kör aldrig `impeccable document` eller `bolder` eller `colorize` (de skriver om eller byter den visuella världen) och byt aldrig typsnitt, färger, skuggor eller radier på skillens inrådan. **SJ:s designsystem går alltid före skillens smak.**

## SJ:s designsystem

Komponentbiblioteket `@sj-ab/component-library` bygger på React och MUI 7. Varje komponent är ett **eget npm-paket på Bit Cloud**, inte på npmjs.com. `.npmrc` pekar `@sj-ab` mot `https://node-registry.bit.cloud`. Ingen inloggning eller VPN behövs.

### Var du hittar svaren (i den här ordningen)

1. **`sj-storybook`-MCP:n** (SJ:s publicerade Storybook). Kör `docs-list` en gång per session och sedan `docs-show` per komponent innan du använder den. `docs-show-story` ger fler varianter. Här finns riktiga kodexempel och props. Riktlinjer som `guidelines-forms`, `guidelines-layout-examples`, `guidelines-spacing` och `guidelines-elevation` finns också här. **Gissa aldrig props.**
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
| Layout | `avstand`, `grid`, `layoutregioner`, `brytpunkter`, `informationstathet`, `knapphierarki`, `sakert-omrade`, `angransande-ytor` |
| Mönster | `tomma-tillstand`, `navigering`, `hjalp`, `destruktiva-val`, `installningar`, `onboarding`, `startskarm`, `textinmatning`, `offline`, `morkt-lage`, `interaktionstillstand` |
| Text och ton | `tonlage`, `ux-writing`, `vardeord`, `designfilosofi` |
| Identitet | `farger`, `typografi`, `ikonografi`, `bildmaner`, `logotyp` |
| Produkttyper | `chattbot-och-chatt`, `desktop-web-apps-for-professionella-anvandare`, `digitala-skarmar`, `mejl` |

Listan kan ha vuxit. `find_sanity_content` med `documentType: "sjDesignGuidelinePage"` hittar fler. Komponentsidor hämtas med `get_component_page_content` (till exempel `departure-card`).

### Installera komponenter

Varje komponent installeras för sig. Använd hjälpskriptet, det kollar att namnet finns på Bit och tar alltid senaste versionen:

```bash
npm run sj:add -- departure-card date-picker     # ui.* med kort namn
npm run sj:add -- styles.utils hooks.use-breakpoints
npm run sj:list                                  # vad som redan är installerat
```

Namnet är kebab-case och finns i Storybook eller via `find_bit_component`. Paketnamnet blir `@sj-ab/component-library.ui.<namn>`. Ikoner finns i **ett** paket: `import { Search, ChevronRight } from "@sj-ab/component-library.ui.icons"`, med `Small`-suffix för små varianter.

Håll paketen på senaste versionen med caret-intervall (`^`). Lås aldrig en version. Undantaget är design-system-MCP:n, som är låst till en granskad version i `.mcp.json` och `.vscode/mcp.json` eftersom npx kör den automatiskt. Finns en nyare version (`get_component_changelog` eller `npm view @sj-ab/component-library.internal.design-system-mcp version`): berätta det för designern i stället för att bumpa den själv.

Installera paket med `npm run sj:add` och kör aldrig `npm install <paket>` på eget initiativ. Paket utanför `@sj-ab` behöver designerns uttryckliga ok.

### Hårda regler för kod

- **Bara SJ-komponenter.** Kolla alltid om det finns ett `@sj-ab/component-library.ui.*`-paket innan du bygger något själv. Inga andra UI-bibliotek: inte Tailwind, shadcn, Chakra, Bootstrap eller egna CSS-ramverk.
- **Rå MUI bara för det SJ inte har:** `Box`, `Container`, `Grid`, `Fade`, `useMediaQuery`, `useTheme`. Ser du `import { Button } from "@mui/material"`: byt till SJ:s paket.
- **Handrulla så lite som möjligt.** Finns ingen komponent för behovet: berätta det för designern och föreslå den närmaste SJ-komponenten innan du bygger en egen. Bygger du ändå: komponera av SJ-komponenter och kommentera varför.
- **Styling med `sx`**, spacing med temat (`p: 2` = 16px, 1 enhet = 8px), färger via paletten (`color: "text.primary"`, `bgcolor: "background.default"`, `borderColor: "divider"`). **Aldrig hårdkodade hex-värden, px-storlekar på typsnitt eller egna skuggor.**
- **Typografi via `Typography` med nuvarande varianter:** `largeTitleEmphasized`, `title1Emphasized`, `title2Emphasized`, `title3Emphasized`, `bodyRegular`, `subheadlineRegular`, `caption1Regular` och så vidare. `h1`–`h4` fungerar. **Använd inte** `body1`, `caption`, `heading1md`–`heading4`, `link`, `overline` eller `subtitle1`. De är utfasade och varnar i konsolen. Hela listan finns i `DEPRECATED_TYPOGRAPHY_VARIANT_REPLACEMENTS` i `node_modules/@sj-ab/component-library.ui.typography/dist/typography.d.ts`.
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

**Detaljvy för en resa**, till exempel i ett `Sheet`: börja med `journey-summary` överst och sedan `route-description` för tidslinjen. Lägg bara det som inte täcks av komponenterna i en vanlig `List` med `ListItemText`, till exempel bokningsnummer eller vagn och plats. Handlingar (visa biljett, boka om) läggs sist.

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
- SJ:s `Container` och `Grid` använder CSS-variabler (`--sjse-spacing-*`, `--sjse-width-*`) i Storybook-exemplen. Kolla i webbläsaren att variablerna faktiskt finns innan du förlitar dig på dem. Annars fungerar MUI:s `Box` med `sx` och temats spacing.
- **Länk med React Router i en listrad:** `ListItemButton` med `component={RouterLink} to="/sida"`. Prop:en `LinkComponent` fungerar inte med en komponenttyp som `RouterLink`.
- **AppBar-knappen Tillbaka:** `navigationButtons={[{ label, variant: "back", action: () => navigate(...) }]}`. `PageLayout` gör det här åt dig via `back`.
- **`EmptyState` `primaryAction`:** använd `onClick`, inte `action`. `action` krockar med MUI:s typ och går inte igenom typecheck.
- **`DepartureCard`:** `producer` och `productName` skrivs ut bredvid varandra, så `productName` ska vara `"Snabbtåg"` och inte `"SJ Snabbtåg"`. `active` ändrar bara ramen. Lägg till `CardActionAreaProps={{ "aria-pressed": vald }}` för skärmläsare. Det finns ingen markering för ankomst nästa dag.
- **`JourneyCard` med handlingar:** i version 6.2.x når `onClick` inte fram till kortet. Använd SJ:s eget mönster från Storybooks störningsexempel: `clickable={false}` och en `List` som barn med `ListItemButton`-rader, till exempel "Visa resa" och "Boka om eller avboka", med `Divider` mellan raderna.
- **En prop som typas men inte fungerar:** gör ett klick eller en ändring ingenting, läs komponentens `dist/*.js` och kolla att prop:en faktiskt plockas ut eller skickas vidare. TypeScript märker inte det här.
- **`AppBar` `navigationButtons` är en tuple**, till exempel en enda Stäng-knapp: `[{ label, variant: "close", action }]`. En array som byggs i en variabel breddas av TypeScript till en vanlig lista och avvisas. Skriv den direkt i JSX, eller typa variabeln som `AppBarProps["navigationButtons"]`.
- **SJ:s `Switch` har rollen `switch`**, inte `checkbox`, i tillgänglighetsträdet. Det är viktigt att veta vid tester.
- **`npm run build` varnar för stora filer** eftersom SJ:s tågillustrationer följer med. Det är väntat för en prototyp. Lägg inte till koddelning för att få bort varningen.
- **`BottomBarContainer`** har `position: fixed`. Ge `main` luft nedtill (`PageLayout` gör det när du skickar med `bottomBar`).
- **`List`** tar inte `disablePadding`. För att linjera en ensam rad: `disableGutters` på `ListItemButton`.
- **"Invalid hook call" eller dubbla Emotion-varningar direkt efter att du installerat ett paket** beror på att Vite bygger om sina beroenden. Ladda om sidan. Hjälper inte det: starta om `npm run dev`.
- **Installationen verkar trasig** (moduler hittas inte trots att de står i `package.json`): kör `npm run doctor`. Rapporterar den trasiga beroenden, kör `npm ci`.

## Ny sida: receptet

1. Skapa `src/pages/<Namn>Page.tsx` och bygg sidan med `PageLayout` (`src/components/PageLayout.tsx`). Den ger AppBar med rubrik via `headingRef`, Tillbaka-knapp (`back`), sidomarginal, maxbredd (`maxWidth`, SJ:s värden 400–1600) och plats för en fast bottenyta (`bottomBar`).
2. Lägg till en `<Route>` i `src/App.tsx`.
3. Lägg texterna under en egen nyckel i `src/i18n/sv.ts`.
4. Lägg exempeldata i `src/data/<område>.ts`, enligt `src/data/README.md`: påhittad, relativ till idag och med minst ett undantagsfall.
5. Länka till sidan, till exempel från startsidan med en `List` och `ListItemButton component={RouterLink}`.
6. Kör `npm run typecheck` och titta på sidan i mobil och desktop, i ljust och mörkt läge.

## Titta på resultatet

**Klicka dig igenom varje interaktion** (knappar, kort, lager som öppnas och stängs, formulär) i webbläsaren innan du säger att något är klart. Kan du inte styra en webbläsare i sessionen: säg det rakt ut, och be designern klicka igenom de konkreta sakerna du listar.

**Om du saknar ett webbläsarverktyg:** ta skärmdumpar med Playwright via npx. Installera inga Python-paket.

```bash
npx -y playwright@latest install chromium
npx -y playwright@latest screenshot --viewport-size=375,812 --full-page http://localhost:5173/ mobil.png
npx -y playwright@latest screenshot --viewport-size=1440,900 --full-page http://localhost:5173/ desktop.png
```

Titta på bilderna. Interaktioner (klick, lager, formulär) kan du inte testa så. Be designern klicka igenom dem.

- `npm run dev` startar prototypen, normalt på http://localhost:5173. **Läs porten som Vite skriver ut.** Är 5173 upptagen (till exempel av en annan prototyp) väljer Vite nästa lediga, som 5174. Byter du port i webbläsarverktyget: kontrollera att sidans adress verkligen ändrats, eller öppna en ny flik direkt på rätt port.
- Visa ändringar i webbläsaren och kolla både mobil (375×812) och desktop (1440×900).
- `npm run typecheck` ska gå igenom innan något committas eller delas. Det är mallens enda kvalitetsgrind. Tester behövs inte för prototyper.

## Spara, publicera och dela

Förklara git för designern med vardagsord: en *commit* är en sparpunkt och en *push* laddar upp till GitHub. Föreslå en commit när något fungerar. Kör aldrig `git push --force` och radera aldrig brancher utan att designern uttryckligen bett om det.

### Dela en prototyp via Vercel (privat GitHub)

1. Repot ligger på designerns **privata github.com-konto** (skapat från mallen, helst som *private*).
2. Designern loggar in på [vercel.com](https://vercel.com) med sitt GitHub-konto, väljer *Add New → Project*, importerar repot och klickar *Deploy*. Vercel känner igen Vite automatiskt. Inga inställningar behövs, `vercel.json` finns redan.
3. Varje push till `main` uppdaterar länken. Varje annan branch får en egen förhandsvisningslänk, vilket är bra för att visa varianter.
4. **Deployment Protection** (Settings → Deployment Protection) styr vem som ser länken.

Varför Vite och inte Next.js: prototyperna är rena klientappar och alla SJ-komponenter körs i klienten. Vite är enklare och funkar lika bra på Vercel. Behövs en serverfunktion (till exempel för att dölja en API-nyckel), lägg en fil i `api/` så blir den en Vercel Function.

### SJ:s GitHub Enterprise

- Läs och klona teamens repon med `GH_HOST=<SJ:s GHE-adress> gh repo clone <org>/<repo>` eller `git clone https://<SJ:s GHE-adress>/<org>/<repo>.git`.
- Prototyper som ska leva hos SJ kan pushas dit i stället för till ett privat konto. Fråga designern vad som gäller för teamet.

### Konfidentialitet: viktigt

Ett privat github.com-konto och Vercel ligger **utanför SJ:s infrastruktur**. **Stanna och fråga designern** innan något av det här hamnar i ett repo på github.com eller i en Vercel-deploy:

- innehåll hämtat från SJ:s GitHub Enterprise, Confluence eller Jira
- riktiga kund- eller persondata, riktiga biljett-, boknings- eller ärendenummer
- interna system, API-adresser, scheman, nycklar och lösenord
- skisser eller underlag märkta som interna eller konfidentiella

Föreslå alltid alternativet: påhittad exempeldata, en generell beskrivning, eller att lägga repot på SJ:s GitHub Enterprise. Lösenord och API-nycklar hör hemma i `.env.local` (gitignorerad), aldrig i koden. Tumregel: *är du osäker, är det inte ok än. Fråga.*

## Plugins och skills att föreslå

Designern vet ofta inte att det här finns. Föreslå det när det passar, kort och med en mening om vad det ger. Installera när designern säger ja.

| Vad | När du föreslår det | Claude Code | GitHub Copilot (VS Code) |
|---|---|---|---|
| **Figma** (MCP) | Så fort Figma nämns eller en figma.com-länk dyker upp | `claude plugin install figma@claude-plugins-official` | Lägg till Figmas MCP-server via *MCP: Add Server* (https://mcp.figma.com/mcp) |
| **impeccable** (skill) | Ny vy utan Figma (`shape`), eller en klar vy som ska granskas (`critique`, `audit`) | Installeras av `npm run skills` | Samma |
| **Atlassian** (Jira + Confluence) | Designern nämner ett Jira-ärende, en story eller en Confluence-sida | `claude plugin install atlassian@claude-plugins-official` | Atlassians MCP-server via *MCP: Add Server* |
| **Vercel** | Designern vill dela en länk eller undrar varför en deploy failar | `claude plugin install vercel@claude-plugins-official` | Vercel-appen på github.com räcker |

Plugins som kräver inloggning (Figma, Atlassian, Vercel) öppnar en webbläsare första gången. Designern loggar in själv. Be aldrig om lösenord eller tokens i chatten.

## Kommandon

| Kommando | Gör |
|---|---|
| `npm run doctor` | Kollar datorn: git, Node, GitHub-inloggningar, Bit-registret |
| `npm run setup` | Allt på en gång: doctor, install, uppdatera SJ-paket, skills |
| `npm run dev` | Startar prototypen lokalt |
| `npm run sj:check` / `sj:update` | Visar eller installerar senaste SJ-versionerna |
| `npm run sj:add -- <namn>` | Installerar en SJ-komponent från Bit |
| `npm run skills` | Installerar eller uppdaterar designskillen impeccable |
| `npm run typecheck` | Kollar att koden hänger ihop |
| `npm run build` | Bygger för publicering (Vercel gör det automatiskt) |

## Projektstruktur

```
src/
  main.tsx                  startpunkt: ThemeProvider + router
  App.tsx                   alla routes, en per sida
  pages/StartPage.tsx       exempelsida (bygg vidare eller ersätt)
  components/PageLayout.tsx sidskal: AppBar + innehåll direkt på sidan
  data/                     påhittad exempeldata
  theme/ThemeProvider.tsx   SJ-temat, ljust/mörkt/högkontrast
  i18n/sv.ts                alla texter i gränssnittet
DESIGN.md                SJ:s visuella regler (läses av impeccable och av dig)
PRODUCT.md               vem prototypen är för och varför (fylls i per prototyp)
scripts/                 hjälpskript (doctor, sj-add, sj-update, skills)
.claude/skills/sj-design-system/  SJ-skillen (incheckad)
.mcp.json                MCP-servrar för Claude Code
.vscode/mcp.json         samma MCP-servrar för Copilot i VS Code
docs/kom-igang.md        steg-för-steg för en ny dator
```

Nya sidor läggs i `src/pages/` (se "Ny sida"), delade bitar i `src/components/` och exempeldata i `src/data/`.
