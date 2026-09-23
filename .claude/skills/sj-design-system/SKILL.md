---
name: sj-design-system
description: >-
  Use when building React/Next.js apps with SJ's design system from Bit Cloud.
  Covers @sj-ab/component-library installation, ThemeProvider setup (light/dark/darkDesktop/contrast),
  design tokens, translations (i18n), component usage, MUI sx-prop styling, theme mixins,
  style utilities, accessibility, and SJ's design + UX writing guidelines.
  Trigger phrases: "SJ design system", "SJ components", "sj-ab", "Bit Cloud SJ",
  "SJ theme", "SJ button", "FlowButton", "design tokens", "dark mode SJ",
  "SJ komponent", "designsystemet", "komponentbiblioteket".
  Also use when a project imports from @sj-ab/component-library and the user
  asks about styling, theming, component APIs, or accessibility.
---

# SJ Design System — Guide for Next.js Developers

SJ's design system is published on **Bit Cloud** as `@sj-ab/component-library`. Each component is an individual package using dot-notation imports.

## 1. Installation

### Configure npm registry (required)

SJ packages live on Bit Cloud, not npm. Create `.npmrc` in your project root:

```ini
@sj-ab:registry=https://node-registry.bit.cloud
@teambit:registry=https://node-registry.bit.cloud
```

### Install components individually

```bash
npm install @sj-ab/component-library.ui.flow-button
npm install @sj-ab/component-library.ui.text-field
npm install @sj-ab/component-library.ui.typography
```

### Peer dependencies

```bash
npm install @emotion/react @emotion/styled @mui/material@^7 @mui/system@^7 @mui/utils@^7 @mui/material-nextjs@^7 react@^19 react-dom@^19
```

Optional: `@mui/x-data-grid@^7`, `@mui/x-date-pickers@^8`, `i18next@^23`, `react-i18next@^14`

---

## 2. Next.js Setup

For complete setup with code examples, see [references/nextjs-setup.md](references/nextjs-setup.md). Key points:

- Wrap root layout with `AppRouterCacheProvider` from `@mui/material-nextjs` (prevents Emotion style issues)
- All SJ components are client components
- Use `generateThemeOptions(mode, moreContrast?)` from `@sj-ab/component-library.styles.themes`. In styles.themes 14.1.9 `mode` is only `"light" | "dark"`; `darkDesktop` below is from older versions, so check the installed `.d.ts`
- Next.js 16+: provide both `turbopack` and `webpack` config for icon alias fix

---

## 3. Theme System

| Mode | When to use |
|------|-------------|
| `"light"` | Default light theme |
| `"dark"` | Mobile dark mode |

```tsx
import { createTheme } from "@mui/material/styles";
import { generateThemeOptions } from "@sj-ab/component-library.styles.themes";

const light = createTheme(generateThemeOptions("light"));
const lightHighContrast = createTheme(generateThemeOptions("light", true));
```

Pre-built: `import { lightTheme, darkTheme } from "@sj-ab/component-library.styles.themes";`

**High contrast**: Pass `true` as second parameter. Adjusts `fill.lov` → `lov2`, promotes secondary labels. Detect: `useMediaQuery("(prefers-contrast: more)")`.

**ScopedCssBaseline**: Render a section with a different theme inside a light page.

Rules:
- All components must be inside `ThemeProvider`
- Set `document.documentElement.style.colorScheme` to match active theme

---

## 4. Design Tokens

Access via `theme.designTokens` (from `useTheme()`). Each token is `{ value: string }`.

> **Verified correction (styles.themes 14.x):** color tokens are mode-scoped: `theme.designTokens.{light,dark}.color.{fill,border,label,text,graphics,background,nonadaptable}.<name>.value`. `fill.lov` exists, `fill.lov2` does not (`lov1`/`lov2` live under `label`/`graphics`). Many tokens carry `deprecated: true` + `extensions.replacement` — check before using a path. Prefer the MUI palette via `sx` (`color: "text.primary"`, `bgcolor: "background.default"`, `borderColor: "divider"`) and only reach for raw tokens as a last resort. The tree below is the older shape.

```
theme.designTokens
├── global
│   ├── typography    — heading1md, heading2, body1, link, monoRegular, ...
│   ├── spacing       — { value: "8px" }
│   ├── breakpoint    — xs, xs2, sm, md
│   ├── opacity       — disabled, hover, loading, pressed, selected
│   ├── borderRadius  — small, medium, large
│   └── borderWidth   — small, medium
├── color
│   ├── fill          — lov1, lov2, gras, himmel1, himmel2, mossa, hostlov1, ang, varning, raps, sand
│   ├── text          — primary, secondary, disabled, hint, error
│   ├── border        — divider, border, focused, input
│   ├── background    — primary, secondary
│   ├── label         — primary, secondary, placeholder, hostlov
│   └── graphics      — icon/illustration colors
```

```tsx
const theme = useTheme();
const leafGreen = theme.designTokens.color.fill.lov1.value;     // "rgb(...)"
const baseSpacing = theme.designTokens.global.spacing.value;     // "8px"
```

| Need | Use |
|------|-----|
| Standard styling | `sx` prop: `bgcolor: "primary.main"`, `color: "text.primary"` |
| Raw token values | `theme.designTokens.*` — for charts, SVGs, CSS variables |
| Spacing | `theme.spacing(N)` — 1 unit = 8px |

---

## 5. Theme Mixins & Style Utilities

### Mixins (via `theme.mixins.*`)

| Mixin | Purpose |
|-------|---------|
| `focusVisibleStyles(inset?, isForTextFieldLike?)` | Focus outline using `--sjse-focus-*` CSS vars |
| `hover()` | Media query — only on hover-capable devices |
| `active()` | Active/pressed state |
| `highContrast()` | Windows High Contrast Mode |
| `moreContrast()` | Styles for high-contrast mode only |

### Utilities (from `@sj-ab/component-library.styles.utils`)

| Utility | Purpose |
|---------|---------|
| `rgbWithOpacity(color, opacity)` | `rgb(...)` → `rgba(...)` |
| `boxShadow(shadow, negativeY?)` | Shadow token → CSS |
| `borderRadius(value)` | px → rem |
| `getHoverColorStyles(theme)` | Standard hover styles |

---

## 6. Translations (i18n)

SJ supports Swedish (`sv`) and English (`en`). Components accept a `lang` prop or read from i18next context.

Translation packages: `@sj-ab/component-library.translations.<name>` (e.g., `date-picker-translation`, `route-description-translation`).

```tsx
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({ fallbackLng: "sv", supportedLngs: ["sv", "en"] });
```

---

> **Typography variants:** use the current names (`bodyRegular`, `subheadlineRegular`, `caption1Regular`, `title1Emphasized`, `largeTitleEmphasized`, …). `body1`, `caption`, `heading*`, `link`, `overline`, `subtitle1` are deprecated and warn on every render. `h1`–`h4` are fine. The full map is `DEPRECATED_TYPOGRAPHY_VARIANT_REPLACEMENTS` in `node_modules/@sj-ab/component-library.ui.typography/dist/typography.d.ts`.

## 7. Import Patterns

| Category | Pattern | Example |
|----------|---------|---------|
| Components | `@sj-ab/component-library.ui.<kebab-name>` | `.ui.flow-button` |
| Icons | `@sj-ab/component-library.ui.icons` | Single package, named exports |
| Styles | `@sj-ab/component-library.styles.<name>` | `.styles.themes` |
| Hooks | `@sj-ab/component-library.hooks.<name>` | `.hooks.use-breakpoints` |
| Translations | `@sj-ab/component-library.translations.<name>` | `.translations.date-picker-translation` |
| Assets | `@sj-ab/component-library.assets.assets` | SVGs, illustrations |

> **Default vs named export varies per package.** `AppBar`, `InformationCard`, `Typography`, `Stack` are default exports; `FlowButton`, `TextField`, `Switch` are also named. Check the package's `dist/index.d.ts` before importing.

### Icons — single package, named exports

```tsx
import { Search, Done, DoneSmall, ChevronRight, CancelSmall, MoonSmall } from "@sj-ab/component-library.ui.icons";
```

Naming: PascalCase (`Search`), small variants append `Small` (`CancelSmall`).

---

## 8. Component Quick Reference

### Buttons
- **FlowButton** — Primary CTA (green). Prefer for user-facing actions
- **Button** — Standard button
- **TextButton** — Text-only, minimal prominence
- **IconButton** — Icon-only (uses `ariaLabel` camelCase, not `aria-label`)

### Form Inputs
- **TextField** — Requires `id` + `autoComplete`. Has `endIcon`, `errorHelperText`
- **Select** — Requires `labelId` + `labelText`. `startIcon` takes JSX
- **Checkbox** / **Radio** / **Switch** — Switch requires `name`
- **DatePicker** — String value `'yyyy-MM-dd'`. Needs `LocalizationProvider`
- **Autocomplete** — `errorMessage` always required. Options need `name: string`

### Cards
- **Card** — Variants: active, comment, critical, error, inactive, information, success, urgent, severe
- **InformationCard** — Structured card (NOT same as `Card variant="information"`)
- **Alert** — **THIS IS A DIALOG**, not an inline banner! Use `Card variant="information"` for banners

### Overlays
- **Dialog** — Full-screen container with slide animations
- **Sheet** — Overlay panel (replaces deprecated BottomSheet). Requires `height` + `width`
- **Alert** — Confirmation dialog
- **Tooltip** — 3 variants: `Tooltip`, `TimedTooltip`, `TooltipOnClick`

### Travel Domain
- **DepartureCard**, **JourneyCard**, **RouteDescription**, **TransportDetails**, **PriceObject**

### Critical gotcha: icon prop format varies by component

Chip `startIcon` takes **FC** (`DoneSmall`), but Select `startIcon` takes **JSX** (`<Search />`).

For detailed API differences, code examples, and all the gotchas: read [references/component-api.md](references/component-api.md).

---

## 9. Component sourcing — SJ first, MUI only as fallback

**Always use SJ packages over MUI when an SJ wrapper exists.** SJ wrappers add a11y, design tokens, responsive behavior (e.g. Select → bottomsheet on mobile, Menu → automatic variant), and consistent styling. Importing MUI directly bypasses these.

### SJ packages that exist (install via `pnpm add @sj-ab/component-library.ui.<name>`)

typography, text-field, chip, switch, card, button, button-group, flow-button, text-button, icon-button, icons, app-bar, sheet, **stack**, list, list-item, list-item-text, divider, form-control-label, **select**, badge, **menu**, menu-item, bottom-navigation, tabs, tab, tab-panel, accordion, accordion-summary, accordion-details, spacing, alert, snackbar, checkbox, radio, autocomplete

### MUI primitives WITHOUT SJ equivalent (ok to import from `@mui/material`)

`Box`, `Fade`, `Drawer`, `useMediaQuery`, `useTheme`, `createTheme`, `ThemeProvider`, `CssBaseline`, `Container`, `Grid`

### Import conventions

```tsx
// SJ Stack exports "Box" as named — use default import and name it Stack
import Stack from "@sj-ab/component-library.ui.stack";

// SJ Select handles its own label — no FormControl/InputLabel needed
import { Select } from "@sj-ab/component-library.ui.select";
<Select labelId="my-id" labelText="Label" value={v} onChange={fn}>

// SJ Menu requires title, supports automatic responsive variant
import { Menu } from "@sj-ab/component-library.ui.menu";
<Menu open={open} onClose={fn} title="Pick item" variant="automatic">
```

## 10. Styling Rules

- **No generic cards around content** — SJ screens don't box sections or even forms in a `Card`. Only the purpose-built card components (DepartureCard, TicketCard, SwitchCard, InformationCard, …) are cards; everything else sits directly on the page with spacing.
- **Use MUI `sx` prop** — never Tailwind (conflicts with MUI theming)
- **Spacing**: `theme.spacing(N)`, 1 unit = 8px
- **Colors**: always via theme tokens, never hardcode hex
- **Layout**: `Box` from `@mui/material`, `Stack` from `@sj-ab/component-library.ui.stack`

```tsx
// Correct
<Box sx={{ bgcolor: "primary.main", color: "text.primary", p: 2 }} />

// Wrong — never hardcode
<Box sx={{ bgcolor: "#1a6b3c" }} />
```

---

## 11. Accessibility

- `ThemeProvider` from SJ includes `LiveAnnouncer` for screen reader announcements
- Use `theme.mixins.focusVisibleStyles()` for focus rings
- All interactive elements need accessible names (`ariaLabel` on IconButton, `label` on TextField)
- Use `errorHelperText` for screen reader error announcements
- Don't rely on color alone — supplement with text and icons

---

## Reference Files

Read these when you need deeper guidance on a specific topic:

| When to read | File |
|-------------|------|
| Using a specific SJ component | [references/component-api.md](references/component-api.md) — API gotchas, code examples |
| Setting up Next.js from scratch | [references/nextjs-setup.md](references/nextjs-setup.md) — layouts, providers, config |
| Choosing component prominence | [references/design-prominence.md](references/design-prominence.md) — button/form hierarchy |
| Layout and spacing decisions | [references/design-layout.md](references/design-layout.md) — mobile-first, responsive |
| Error handling patterns | [references/design-help.md](references/design-help.md) — contextual help |
| Color system and dark mode | [references/colors.md](references/colors.md) — token mapping |
| Typography scale | [references/typography.md](references/typography.md) — h1–caption, SJ Sans |
| Writing UI text | [references/ux-writing.md](references/ux-writing.md) — tone, voice |
| Date/price/button text rules | [references/ux-writing-rules.md](references/ux-writing-rules.md) — formatting |
| SV/EN glossary (~160 terms) | [references/ux-writing-glossary.md](references/ux-writing-glossary.md) |
| Validation error messages | [references/ux-writing-validation.md](references/ux-writing-validation.md) |
| Screen reader text | [references/ux-writing-screenreader.md](references/ux-writing-screenreader.md) |
| Full component catalog (140+) | [references/components.md](references/components.md) |
| Design principles | [references/design-philosophy.md](references/design-philosophy.md) — 9 principles |
