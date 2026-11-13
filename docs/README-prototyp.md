# Namnet på prototypen

<!-- Stomme. Kodagenten fyller i den tillsammans med designern första gången
     prototypen publiceras, och håller den aktuell när prototypen växer.
     Det här är en prototyp, inte mallen: installera ingenting, läs AGENTS.md. -->

**Länk:** _fylls i efter första `npm run ship`_

En mening om vad prototypen är och vilken fråga den ska besvara (mer i [PRODUCT.md](PRODUCT.md)).

Byggd med SJ:s designsystem från [SJ-prototypmallen](https://github.com/emarkensten/sj-design-code-template). Kodagenten följer [AGENTS.md](AGENTS.md).

## Vyer

| Vy | Fil | Adress |
|---|---|---|
| Start | `src/pages/StartPage.tsx` | `/` |

## Testa utan att klicka

URL-parametrar som öppnar lägen direkt, bra i iOS-simulatorn och vid skärmdumpar:

| Parameter | Öppnar |
|---|---|
| _inga än_ | |

## Teknik

React, Vite och TypeScript med SJ:s komponenter från Bit. Påhittad exempeldata i `src/data/`. Ingen backend (uppdatera om prototypen får en, se [docs/backend.md](docs/backend.md)).

## Kommandon

| | |
|---|---|
| `npm run dev` | Starta prototypen lokalt |
| `npm run typecheck` | Kolla att koden hänger ihop |
| `npm run ship -- "meddelande"` | Publicera och få länken |

## Beslut och idéer

Beslut som är bra att minnas: `docs/beslut.md`. Idéer för senare: `docs/roadmap.md`.
