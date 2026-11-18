# Safari på iPhone

Till kodagenten. De flesta som testar en mobilprototyp öppnar den i Safari på en iPhone. Chrome i mobilstorlek är inte samma sak: Safari har en annan motor (WebKit) och ett eget verktygsfält och tangentbord. Flera fel syns bara där: statusfältets färg, tangentbordet som skjuter upp innehållet, hemlinjen och fasta ytor i nederkant.

## Kontrollera

| Kommando | Vad det visar | Vad det inte visar |
|---|---|---|
| `npm run verify -- --full` | Kärnflödena i `flows.json` i WebKit som iPhone, ljust och mörkt, plus adresserna i riktig Safari i iOS-simulatorn om Xcode finns | Klick i simulatorn |
| `npm run ios-check -- / /boka-om` | Riktig Safari i iOS-simulatorn om Xcode finns, annars WebKit som iPhone. Skriver ut vilket som användes | Klick i simulatorn. Utan Xcode: verktygsfältet och tangentbordet |
| `npm run screenshots -- /boka-om "Välj avgång" --safari` | Ett klickflöde i WebKit som en iPhone 13 mini | Verktygsfältet och tangentbordet |
| Safari på datorn via MCP (se nedan) | Riktig Safari med samma motor som på iPhone, där du själv klickar, skriver, läser konsolen och tar skärmbilder i 375 px bredd | iPhones verktygsfält, tangentbord och säkra ytor |
| Designerns egen iPhone | Allt, också tangentbordet | – |

- **Föreslå, kör vid ja.** Innan en mobilprototyp visas utanför teamet eller testas med användare: föreslå i en mening att kontrollera den i Safari, och säg varför (Safari visar fel som Chrome döljer). Kör `npm run verify -- --full` när designern säger ja och lägg bilderna i chatten. Säger hen nej: skriv i rapporten att Safari inte är kontrollerat.
- **Simulatorn kan inte skriva text eller klicka från skripten.** Bygg därför in **URL-parametrar som öppnar lägen direkt** (till exempel `?sheet=resa-2`, `?steg=betala`, `?tom=1`) och lägg in testdata som exempeldata, i stället för att fylla i formulär. Lägg parametrarna i `src/data/` eller i sidans kod och skriv upp dem i README.
- **Xcode** finns bara om designern har installerat det (15 GB från App Store). Be inte om det för en enskild prototyp: WebKit räcker för det mesta, och designerns iPhone tar resten.
- **I molnet** finns ingen simulator. WebKit laddas ner automatiskt. Säg i rapporten att verktygsfältet och tangentbordet inte är kontrollerade.
- **Telefonen:** `npm run dev -- --host` skriver ut en *Network*-adress som telefonen når i samma wifi. Eller publicera och öppna länken.

## Safari på datorn via MCP

Safari 27 och senare har en inbyggd MCP-server (`/usr/bin/safaridriver --mcp`). Med den styr du riktig Safari på designerns Mac: öppna sidor, klicka och skriva, läsa konsolen och nätverket och ta skärmbilder. Motorn är densamma som på iPhone, så fel i layout, formulär och klick syns här. Med `set_viewport_size` till 375 × 812 blir fönstret lika brett som en telefon. Det är det snabbaste sättet att felsöka ett fel som bara syns i Safari. Föreslå det när det händer. Det fungerar bara på en Mac, inte i molnet.

**Finns det redan?** Sök efter `safari` med `ToolSearch`. Finns verktyg som `navigate_to_url` och `page_interactions` är det klart. Annars, med designerns ja:

1. **Safari-versionen:** `defaults read /Applications/Safari.app/Contents/Info.plist CFBundleShortVersionString` ska vara 27 eller högre. Annars: använd `ios-check` och `screenshots --safari`.
2. **Designern slår på det i Safari** (bara första gången): *Safari → Inställningar → Avancerat → Visa funktioner för webbutvecklare*, och sedan under fliken *Utvecklare*: *Tillåt fjärrstyrning* (på engelska *Allow remote automation and external agents*).
3. **Du kopplar det till Claude Code** för alla projekt på datorn: `claude mcp add --scope user safari -- /usr/bin/safaridriver --mcp`. I VS Code: *MCP: Add Server* med samma kommando.
4. **Starta om.** MCP-servrar laddas när agenten startar. Be designern starta en ny chatt i samma mapp och klistra in vad ni höll på med.

Arbeta sedan mot dev-servern: `set_viewport_size` 375 × 812, `navigate_to_url`, läs sidan med `get_page_content`, klicka och skriv med `page_interactions`, kolla `browser_console_messages` och ta en `screenshot`. Säg i rapporten att det är Safari på datorn, inte på en iPhone. Designern loggar själv in på sidor som kräver det. Skriv aldrig in lösenord.

## Fällor

`PageLayout` och SJ:s komponenter tar hand om en del. Det här är det du själv behöver tänka på.

- **Fasta ytor i nederkant** (`NavigationBar`, `BottomBarContainer`) hamnar under hemlinjen när appen ligger på hemskärmen. Lägg till `pb: "env(safe-area-inset-bottom, 0px)"`. `PageLayout` räknar redan in hemlinjen i sidans luft nedtill.
- **Fast knappyta och tangentbordet.** När tangentbordet är uppe kan en fast `BottomBarContainer` hamna mitt i skärmen eller bakom tangentbordet. Prova på en iPhone innan textfält och en fast knapp läggs i samma vy, eller låt knappen ligga i flödet.
- **Statusfältets och verktygsfältets färg.** Safari färgar dem efter sidans bakgrund och fasta ytor. `backdrop-filter` och halvgenomskinliga ytor ger fel färg (grått eller vitt). `PageLayout` stänger av suddet i `AppBar`. Lägg inte till egna glaseffekter.
- **`100vh`** räknar inte med Safaris adressfält. Använd `100dvh`.
- **En knapp som byter typ mitt i ett klick.** En knapp i ett formulär som renderas om från `type="button"` till `type="submit"` (till exempel "Nästa" som blir "Betala" i sista steget) kan skicka formuläret i samma tryck i Safari. Ge knapparna olika `key`, eller låt bara den sista vara `type="submit"`.
- **Datum:** använd SJ:s `DatePicker`, inte `<input type="date">`, som Safari ritar på sitt eget sätt och som kan bli bredare än skärmen.
- **Länkar som öppnas i en annan app** (Teams, Messenger, Mail) öppnas i appens egen webbläsare, utan Safaris sparade data, och där går det inte att lägga prototypen på hemskärmen.

Hittar du en ny fälla: lägg till den här, och skriv den i `feedback-till-mallen.md`.
