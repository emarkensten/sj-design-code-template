# Fynd att ignorera

Kända fynd som kommer från SJ:s egna komponenter och inte kan åtgärdas i prototypen. Hoppa över dem tyst i `critique` och `audit`.

- `layout-transition` på `AppBarContent-leftContentWrapper` och `AppBarContent-rightContentWrapper`: `transition: width` i SJ:s `AppBar`.
- `overused-font` (Arial eller sans-serif) på `MuiTypography-srOnly`: dolda skärmläsartexter i SJ-komponenter, till exempel `DepartureCard`. Den synliga texten är SJ:s typsnitt.
- `skipped-heading` från `<h4>` direkt under ett `DepartureCard` med `availability="soldOut"`: rubriken "Slutsåld" är hårdkodad i komponenten.
- Typsnitt, färger, skuggor och radier som kommer från SJ:s tema. De är givna av designsystemet (se `DESIGN.md`).
