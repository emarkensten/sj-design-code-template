# Kontroller som ändringen utlöser

Till kodagenten. Läs ändringen (`git diff`, och nya filer med `git status`) och gör bara de kontroller vars utlösare finns i den, oftast två till fem. Resten hoppar du över. Listan ersätter inte grundkraven för klart i AGENTS.md ("När något är klart"). Den samlar fällor som annars ligger utspridda.

| Utlösare i ändringen | Kontroll |
|---|---|
| Filer i `api/`, en databas, inloggning eller nycklar | Kör `security-review`. Kolla att exempeldatan är påhittad och att ingen nyckel eller databasadress står i koden. Se `docs/backend.md`. |
| `position: fixed`, `sticky`, `BottomBarContainer`, `NavigationBar`, `100vh`, `backdrop-filter`, en knapp som byter `type` | Gå igenom fällorna i `docs/ios-safari.md` och föreslå `npm run verify -- --full` (Safaris motor). |
| Ett textfält i samma vy som en fast knapp längst ned | Föreslå att prova på en iPhone: tangentbordet kan lägga sig över knappen. |
| Färger, typsnitt eller skuggor i `sx` | Bara paletten och temats varianter. Sök efter `#`, `rgb(`, `px` på `fontSize` och `boxShadow` i ändringen. Kolla mörkt läge. |
| En ny SJ-komponent som inte använts i prototypen förut | Läs dess story i Storybook (`docs-show`) och "Kända fallgropar" i AGENTS.md. Titta på den i webbläsaren: TypeScript märker inte props som ignoreras. |
| `List`, `FormControlLabel`, `TextButton`, `Accordion` eller `InformationCard` | Vänsterkanterna linjerar med rubrikerna (negativa marginaler, se AGENTS.md). |
| En ny lista eller vy som visar data | Tomt, laddar och fel är hanterade, och datan har minst ett undantagsfall (långt stationsnamn, noll, många rader). Föreslå `break-ui`. |
| En ny route i ett flöde med flera steg | En direktlänk till ett steg mitt i flödet skickar till början eller visar ett begripligt läge, inte en trasig sida. |
| Nya eller ändrade texter i gränssnittet | I `src/i18n/sv.ts`, korta och konkreta, du-form, inga tankstreck (Sanity: `ux-writing`). |
| Animationer | Bara `transform` och `opacity`, och vyn fungerar med reducerad rörelse. |
| Namn, adresser, bokningsnummer eller biljettnummer i `src/data/` | Påhittade? Riktiga kund- eller persondata: stanna och fråga (se "Konfidentialitet" i AGENTS.md). |
| Ett nytt eller ändrat kärnflöde | Flödet finns i `flows.json` och `npm run verify` går igenom. |

## Hålla listan användbar

- En ny punkt ska ha en utlösare som går att se i en ändring, och en kontroll som går att göra på några minuter.
- Lägg bara till fel som har hänt i minst två prototyper. Ett fel som hänt en gång skrivs i `feedback-till-mallen.md`.
- Ta bort en punkt som inte längre kan hända, till exempel för att mallen nu förhindrar felet.
