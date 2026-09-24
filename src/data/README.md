# Exempeldata

Lägg påhittad data för prototypen här, en fil per område (t.ex. `departures.ts`).

- **Alltid påhittat.** Inga riktiga kunduppgifter, bokningsnummer eller data från SJ:s interna system.
- **Relativt till idag.** Räkna datum och tider från `new Date()` så att prototypen ser aktuell ut. Filtrera inte bort allt som passerat, så att sidan inte blir tom på kvällen. Visa hellre passerade poster som "Avgått".
- **Håll ihop flöden som ska ske samma dag.** En avgång om en timme med alternativ upp till sex timmar senare hamnar på nästa dygn när någon testar på kvällen. Förankra sådana flöden i en fast tid, till exempel nästa morgon klockan 07.00, när klockan är sen.
- **Täck in lägena.** Ta med minst ett fel- eller undantagsfall (slutsålt, inställt, försenat) så att designen prövas mot dem.

## Delat tillstånd mellan sidor

När något som görs på en sida ska synas på en annan (en ombokning syns i Mina resor, en vald avgång följer med till betalningen): lägg datan i en Context i `src/data/`. Ingen databas eller annat bibliotek behövs för en prototyp.

```tsx
// src/data/JourneysContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { initialJourneys, type Journey } from "./journeys";

type JourneysState = {
  journeys: Journey[];
  replaceJourney: (id: string, next: Journey) => void;
};

const JourneysContext = createContext<JourneysState | null>(null);

export function JourneysProvider({ children }: { children: ReactNode }) {
  const [journeys, setJourneys] = useState(initialJourneys);
  const replaceJourney = (id: string, next: Journey) =>
    setJourneys((all) => all.map((j) => (j.id === id ? next : j)));
  return <JourneysContext.Provider value={{ journeys, replaceJourney }}>{children}</JourneysContext.Provider>;
}

export function useJourneys() {
  const state = useContext(JourneysContext);
  if (!state) throw new Error("useJourneys måste användas inuti JourneysProvider");
  return state;
}
```

Lägg `<JourneysProvider>` runt `<App />` i `src/main.tsx` (innanför `ThemeProvider`). Tillståndet nollställs när sidan laddas om, vilket oftast är bra i en prototyp.

**Fallgrop: en sida som skickar vidare om datan saknas.** Säg att `RebookPage` letar upp resan med `journeys.find(...)` och renderar `<Navigate to="/" />` om den inte finns. Byter sidan själv ut resan och navigerar till Klart i samma klick, så renderas sidan om innan navigeringen, hittar ingen resa och skickar till `/` i stället. Läs därför in det sidan behöver en gång, när den visas:

```tsx
const [journey] = useState(() => journeys.find((j) => j.id === id));
if (!journey) return <Navigate to="/" replace />;
```
