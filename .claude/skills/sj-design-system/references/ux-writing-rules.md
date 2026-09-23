# UX Writing — Concrete Rules

## Date & Time

- Spell out weekdays and months when space allows
- When space is limited, abbreviate with three letters (exception: mars, juni, juli are never abbreviated)
- Separate stations, times or dates in an interval with en dash (–, no spaces)
  - Exception in SMS: use hyphen (-) and spaces between stations. E.g. "Stockholm Central - Goteborg Central kl 06:06-09:35"
- Write out the year if it's not the current year
- Duration: "3 tim 29 min" / "3:29 tim" (Swedish), "3 h 29 min" / "3:29 h" (English)

### Date format examples

| Swedish | English |
|---------|---------|
| 19 februari / 19 feb | 19 February / 19 Feb |
| 19 februari kl 06:06 | 19 February, 06:06 |
| 19 februari kl 06:06–09:35 | 19 February, 06:06–09:35 |
| 2018-02-19 kl 06:06 | 2018-02-19, 06:06 |
| Idag 19 februari | Today, 19 February |
| Imorgon 19 feb | Tomorrow, 19 Feb |
| Man 22 feb kl 23:09–tis 23 feb kl 06:02 | Mon, 22 Feb, 23:09–Tue, 23 Feb, 06:02 |

## Dialogs

- Use dialogs to warn about critical or irreversible actions (delete, leave without saving)
- The heading should capture the core message — phrase it as a question the buttons can answer
- The primary button must match the heading
- Buttons should be contextually relevant and clearly distinct
- Body text should clarify or add secondary info — don't repeat the heading
- For purely informational dialogs, use the neutral button text "Stang" (not "Jag forstar")

### Dialog example

| Swedish | English |
|---------|---------|
| **Vill du avbryta bokningen?** | **Do you want to cancel the booking?** |
| Hela bokningen kommer att forsvinna. | The details you entered will not be saved. |
| Avbryt bokning / Fortsatt boka | Cancel booking / Continue booking |

## Error Messages

Every error message should explain:
1. What went wrong
2. The cause (when relevant)
3. How to fix it

Rules:
- Write simply and directly — focus on user goals, not system limitations
- Use imperative form: "Fyll i namn" not "Namnet far inte vara tomt"
- Don't blame the user: "Valj en station" not "Du har inte valt nagon station"
- Save "forlat" for serious errors (system down, cancelled trains)
- Try to keep it to one sentence
- Only end with a period if the text is more than one sentence

### Error page examples

| Swedish | English |
|---------|---------|
| **Natverksfel** | **Network error** |
| Kontrollera din natverksanslutning och prova att ladda om sidan. | Check your network connection and try to reload the page. |
| Ladda om sidan | Reload page |
| **Det finns inget har** | **There's nothing here** |
| Det kan bero pa att lanken ar felaktig, eller att innehallet har flyttats eller tagits bort. | The link may be incorrect, or the content may have been moved or deleted. |
| Ga till startsidan | Go to home page |

## Abbreviations & Symbols

- Avoid "&" and "/" in running text
- OK to abbreviate common terms in tables and compact UI
- Explain abbreviations the first time they appear

## Politeness Phrases

- Avoid "vanligen" — it steals focus from the message
- Be sparing with apologies — only say "forlat" or "tyvarr" when SJ caused a bad experience
- Focus on how the user moves forward

## Information Messages

- Write simply — focus on cause, consequence and action from the user's perspective
- Keep to one sentence when possible
- Only end with period if longer than one sentence

### Loading states

| Swedish | English |
|---------|---------|
| Vi hamtar din resa... | We're getting your journey... |
| Vi hamtar ditt periodkort... | We're getting your period card... |
| Vi loggar in dig... | We're logging you in... |

If loading takes longer than expected:

| Swedish | English |
|---------|---------|
| Just nu tar det lite tid att hamta dina resor. Tack for ditt talamod! | It takes some time to get your journeys right now. Thanks for your patience! |

## Input Fields

### Labels
- Only ask for directly necessary information
- Mark non-required fields with "(valfritt)" / "(optional)"
- Keep labels short: "Fornamn" not "Fyll i ditt fornamn"
  - Exception: context-specific questions like "Vilken station vill du resa ifran?"
- Always start with capital letter
- Never end with period

### Helper texts
- Labels and options should be clear enough without helper text
- Use helper text for format instructions where needed
- Keep necessary information always visible — don't rely on placeholder text (disappears on input)

## Negations

- Avoid "inte" when possible — it's easily skipped when scanning
- "Du kan inte byta avgang for strackor som kors av andra operatorer an SJ" → "Du kan byta avgang for resor dar SJ kor hela strackan"
- Use "inte" when necessary, e.g. in warnings

## Buttons

- Focus on what the button **does** and the value of clicking it: "Betala", "Valj aterresa"
- Be specific but remove unnecessary words: "Boka resa" not "Boka en resa"

### Standard button labels

| Use | Don't use | Context |
|-----|-----------|---------|
| Fortsatt / Continue | ~~Nasta/Next, Ga vidare/proceed~~ | Moving forward in a flow |
| Tillbaka / Back | ~~Foregaende/Previous~~ | Moving backward in a flow |
| Spara / Save | ~~Klar/Done, Valj/Choose, Ok~~ | Saving something |
| Avbryt / Cancel | ~~Avsluta/Exit~~ | Cancel without saving |
| Stang / Close | ~~Jag forstar/I understand, Ok~~ | Close dialog/modal (exception: iOS uses OK) |
| Klar / Done | ~~Avsluta/Exit~~ | Complete a flow, confirmation views |
| Andra / Change | ~~Redigera/Edit~~ | Change something, e.g. a departure |

## Links

- Focus on the destination content
- Avoid generic "las mer" — describe the value of clicking
- Avoid interaction text ("klicka pa knappen till hoger")
- If link opens in new tab, add "(oppnas i ny flik)"

### Standard link texts

| Swedish | English |
|---------|---------|
| Sa hanterar vi personuppgifter | How we handle personal data |
| SJ Prio medlemsvillkor | SJ Prio membership rules |
| Vara inloggningsvillkor | Our terms and conditions of login |
| Vara kopvillkor | Our terms and conditions of purchase |

## Punctuation

### Period
- Use period to create reading pauses
- Skip period in buttons and headings
- Single-sentence standalone texts (cards, validation errors) don't need a period

### Exclamation marks
- Use very sparingly

### Hyphens and dashes
- Hyphen (-): compound words, line breaks, omitted compound parts ("Lans- och lokaltrafik")
- En dash (–, no spaces): ranges for routes, times, dates, amounts ("Stockholm–Goteborg", "12–13 april")
- En dash with spaces ( – ): parenthetical pause in a sentence

## Bullet Lists

- Keep each point to one sentence
- Start each point the same way (all verbs or all nouns)
- When the list completes one sentence: only capitalise the first item, only the last item gets a period
- When the sentence before the list is complete: end it with a colon

## Line Breaking

Use non-breaking space (\u00A0) to keep these together:
- SJ\u00A03000, SJ\u00A0X 2000, SJ\u00A0Biz, SJ\u00A0Labs, SJ\u00A0Prio, SJ\u00A0Snabbtag
- 1\u00A0000, 10\u00A0%

## Headings

- Headings should describe the section content
- No punctuation (exception: question marks for questions)
- Don't force a heading — sometimes body text is enough

## Page Titles

- Describe the page content
- Consider SEO when relevant
- Always end with " – SJ"

## Numbers & Prices

- Write similar numbers consistently (all digits or all words)
- Avoid starting a sentence with a digit
- Thousands separator: space in Swedish (1 000), comma in English (1,000)
- Write "kronor" in running text. Exception: "SEK" on receipts
- Swedish kronor → "Swedish kronor" (not "Swedish crowns")
- Decimals: comma in Swedish (175,50), period in English (175.50)
- Price ranges: en dash, no spaces (250–300:-)
- Age ranges: use inclusive language ("till och med 25 ar" not "under 26 ar")

### Price format examples

| Swedish | English |
|---------|---------|
| 1 995:- / 12 800:- | SEK 1,995 / SEK 12,800 |
| fran 1995:- | from SEK 1,995 |
| 250–300:- | SEK 250–300 |
| 175,50:- | SEK 175.50 |
| 250 € | EUR 250 |
| 9 419 poang / 9 419 p | 9,419 points / 9,419 p |
| Till och med 25 ar | Up to 25 years |

Note: In booking/rebooking/cancellation flows, currency is written after the amount (Swedish order): "250 SEK", "250 EUR".

## Station Names

- Use "medium-length" station names: "Goteborg Central" (not "Goteborg C" or "Goteborg Centralstation")
- Controlled centrally based on Samtrafikens station names

## English Guidelines

- Write in British English
- Use contractions (it's, you're, that's, don't) for informal, human tone
- **Select** vs **Choose**:
  - Select: when choosing between equivalent options (Select a departure date, Select a station)
  - Choose: when the choice requires more thought (Choose a departure, Choose a travel class)
