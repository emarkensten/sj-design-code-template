# Product

> Mall. Kodagenten fyller i de tomma fälten tillsammans med designern första gången en prototyp startas, eller med `impeccable init`. Fälten som redan är ifyllda gäller alla prototyper från mallen.

## Platform

web

## Stack

React 19 + Vite + TypeScript. SJ:s komponentbibliotek `@sj-ab/component-library.*` från Bit Cloud (MUI 7 under huven). react-router-dom för sidor, i18next för texter (svenska). Publiceras på Vercel.

## Users

_Fylls i per prototyp._ Vem använder vyn, i vilken situation och med vilken enhet? (Till exempel: resenär på väg till stationen, i mobilen, med bråttom.)

## Product Purpose

_Fylls i per prototyp._ Vilken fråga ska prototypen besvara, och vad ska användaren kunna göra?

## Positioning

En del av SJ:s digitala tjänster. Upplevelsen ska kännas som SJ: enkel, pålitlig, mänsklig och härlig.

## Operating Context

Klickbar prototyp för att testa och visa idéer, inte produktion. Exempeldata är påhittad. Ingen riktig backend.

## Capabilities and Constraints

- Bara SJ:s komponenter och tema. Den visuella världen är given (se DESIGN.md).
- Ingen riktig kund- eller persondata. Inga interna SJ-system.
- Mobil först, ska fungera på desktop.

## Brand Commitments

SJ:s identitet: SJ Sans, SJ:s färger via temat, SJ:s ikoner och tonläge. Varm, lättsam och i ögonhöjd, aldrig högtravande eller babblig.

## Evidence on Hand

_Fylls i per prototyp._ Figma-länkar, research, Jira-ärenden eller skärmdumpar av nuvarande lösning.

## Product Principles

- Leda användaren framåt: en tydlig nästa handling per vy.
- Innehåll direkt på sidan. Lager (Sheet, SideSheet) för detaljer.
- Tydlighet före uttryck.

## Accessibility & Inclusion

WCAG 2.1 AA. Klickytor på minst 44×44px. Färg aldrig ensam bärare av information. Stöd för skärmläsare (SJ:s komponenter har inbyggt stöd, använd deras `ariaLabel` och liknande). Ljust läge, mörkt läge och högkontrast.
