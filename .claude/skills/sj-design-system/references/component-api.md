# SJ Component API Differences vs MUI

SJ wraps several MUI components with modified APIs. This reference covers the gotchas — where SJ's API differs from what you'd expect from standard MUI.

## Table of Contents
- [Alert — THIS IS A DIALOG](#alert)
- [AccordionCard](#accordioncard)
- [Autocomplete](#autocomplete)
- [Badge](#badge)
- [Card](#card)
- [Chip](#chip)
- [DataGrid](#datagrid)
- [DatePicker](#datepicker)
- [Dialog vs Alert vs Sheet](#dialog-vs-alert-vs-sheet)
- [FlowButton](#flowbutton)
- [IconButton](#iconbutton)
- [InformationCard](#informationcard)
- [Link](#link)
- [Select](#select)
- [Sheet](#sheet)
- [Snackbar](#snackbar)
- [Switch](#switch)
- [TextField](#textfield)
- [Tooltip](#tooltip)
- [Icon prop format inconsistency](#icon-prop-format)

---

## Alert

SJ's Alert is a **modal dialog**, NOT an inline banner. It extends `MuiDialogProps` with `open`, `title`, `primaryAction`, etc. This is one of the most common traps — developers expect MUI's inline Alert and get a full dialog instead.

For inline informational banners, use `Card variant="information"` or `InformationCard`.

```tsx
// SJ Alert = modal dialog
<Alert
  open={showDialog}
  title="Bekräfta bokning"
  informativeText="Vill du boka resan Stockholm → Göteborg?"
  icon={<WarningFilled />}
  primaryAction={{ label: "Boka", color: "green", onClick: handleConfirm }}
  secondaryAction={{ label: "Avbryt", color: "grey", onClick: () => setShowDialog(false) }}
/>

// For inline banners — use Card, NOT Alert
<Card variant="information" sx={{ p: 2 }}>
  <Typography variant="body1">Information som visas direkt på sidan</Typography>
</Card>
```

## AccordionCard

Discriminated union on `titleFontWeight`: when present, `titleVariant` must be `"body1"`. When absent, `titleVariant` can be `"h2"`, `"h3"`, or `"h4"`.

```tsx
// Without titleFontWeight → heading variants allowed
<AccordionCard id="acc-1" title="Rubrik" titleVariant="h3">
  <p>Content</p>
</AccordionCard>

// With titleFontWeight → forces body1
<AccordionCard id="acc-2" title="Body text" titleFontWeight="bold">
  <p>Content</p>
</AccordionCard>
```

## Autocomplete

`errorMessage` is required even when there's no error — the component needs the string ready for when validation triggers. Options use `SelectedItemProps[]` (requires `name: string`). `startIcon`/`endIcon` take JSX elements.

```tsx
import Autocomplete, { SelectedItemProps } from "@sj-ab/component-library.ui.autocomplete";

const options: SelectedItemProps[] = [
  { name: "Stockholm Central" },
  { name: "Göteborg Central" },
];

<Autocomplete
  id="station-search"
  placeholder="Sök..."
  errorMessage="Välj en giltig station"
  options={options}
  value={value}
  onChange={(item) => setValue(item.name)}
  highlightMatch
  useInternalFilter
/>
```

## Badge

Requires `size` prop — discriminated union: `"sm"` = dot only (no label), `"md"` = dot + optional label, `"lg"` = dot + required label (supports elevation + extra colors).

```tsx
<Badge size="sm" color="green" />
<Badge size="md" color="blue" label="Spår 3" />
<Badge size="lg" color="green" label="I tid" />
<Badge size="lg" color="outlined" label="Planerad" elevation={1} />
```

## Card

Supports `variant`: `active`, `comment`, `critical`, `error`, `inactive`, `information`, `success`, `urgent`, `severe`.

```tsx
<Card variant="information">
  <CardContent>Info card with blue accent</CardContent>
</Card>
<Card variant="critical">
  <CardContent>Critical alert with red accent</CardContent>
</Card>
```

## Chip

`startIcon` takes a **Function Component** (not JSX!): pass `DoneSmall`, NOT `<DoneSmall />`. `selected` shows border but no checkmark. `onDelete` makes the CancelSmall icon clickable.

```tsx
// CORRECT — pass the component itself
<Chip
  label="Filter"
  selected={isActive}
  startIcon={isActive ? DoneSmall : undefined}
  isMenuOpen={menuOpen}
  onDelete={isActive ? handleClear : undefined}
/>

// WRONG — do NOT pass JSX element
<Chip startIcon={<DoneSmall />} />  // TypeScript error!
```

## DataGrid

Custom `DataGridColumnProps<T>` type — `field` must be `keyof T`. Badge columns use a discriminated union (`badgeSize` + `badgeColor` function). Requires `lang`.

```tsx
import DataGrid, { DataGridColumnProps } from "@sj-ab/component-library.ui.data-grid";

type Row = { id: number; name: string; status: string };

const columns: DataGridColumnProps<Row>[] = [
  { field: "name", headerName: "Namn", width: 200 },
  { field: "status", headerName: "Status", width: 120,
    badgeSize: "lg",
    badgeColor: (row) => row.status === "OK" ? "green" : "red" },
];

<DataGrid rows={rows} columns={columns} lang="sv" pagination checkboxes />
```

For Pro features: `import { setDataGridLicense } from "@sj-ab/component-library.ui.data-grid";`

## DatePicker

Inherits from TextField, so `id` and `autoComplete` are required. Must wrap in `LocalizationProvider`. Value is a `'yyyy-MM-dd'` string, not a Date object.

```tsx
import DatePicker from "@sj-ab/component-library.ui.date-picker";
import LocalizationProvider from "@sj-ab/component-library.ui.localization-provider";

<LocalizationProvider locale="sv">
  <DatePicker
    id="travel-date"
    autoComplete="off"
    label="Resedatum"
    lang="sv"
    value="2026-03-30"
    minDate="2026-03-30"
    timeZone="Europe/Stockholm"
    onAccept={(date: string) => setDate(date)}
    onChange={(e) => setDate(e.target.value)}
  />
</LocalizationProvider>
```

Optional props: `hasWeekNumbers`, `hasActionButtons`, `journeyDirection` ("outward"/"return" for a11y), `secondaryView` ("month"/"year").

## Dialog vs Alert vs Sheet

| Component | Purpose | Key difference |
|-----------|---------|----------------|
| **Alert** | Confirmation modal | Icon + title + up to 3 action buttons + suppressing checkbox |
| **Dialog** | General full-screen container | Slide animations (`enteringDirection`), AppBar support, heading auto-focus |
| **Sheet** | Overlay panel (replaces BottomSheet) | Sized: height auto/cover, width medium/large |

## FlowButton

Primary CTA. Colors: `"green"`, `"blue"`, `"orange"`, `"black"`, `"white"`, `"critical"`, `"grey"`. Variants: `"primary"` (filled) or `"secondary"` (outlined).

```tsx
<FlowButton color="green" colorVariant="primary" fullWidth>Boka resa</FlowButton>
<FlowButton color="green" colorVariant="secondary">Visa detaljer</FlowButton>
```

## IconButton

Uses `ariaLabel` (camelCase), NOT `aria-label`. The standard HTML attribute won't work.

```tsx
// Correct
<IconButton ariaLabel="Stäng" size="medium" color="grey"><CancelSmall /></IconButton>

// WRONG
<IconButton aria-label="Stäng"><CancelSmall /></IconButton>
```

## InformationCard

Different from `Card variant="information"`. Structured card with `listItems`, `ImageProps`, `secondaryMeta`, `type` ("filled"/"elevated"). Title uses a discriminated union.

```tsx
<InformationCard
  title="Reseinformation"
  titleVariant="h3"
  secondaryMeta="Uppdaterad idag"
  type="elevated"
  listItems={[
    { id: 1, text: "Plattform 3" },
    { id: 2, text: "Avgång 14:35" },
  ]}
/>
```

## Link

`variant` uses Typography variant. `disablePadding` removes touch padding. `negativeMargins` (boolean or per-side object).

## Select

`labelId` + `labelText` both required. `startIcon` takes ReactElement (JSX: `<Search />`). Uses MUI `MenuItem` children. Has `rounded` and `hasExternalLabel`.

```tsx
<Select
  labelId="type-label"
  labelText="Tågtyp"
  value={value}
  onChange={(e) => setValue(e.target.value as string)}
  startIcon={<Search />}
  rounded
>
  <MenuItem value="snabbtag">Snabbtåg</MenuItem>
  <MenuItem value="regional">Regional</MenuItem>
</Select>
```

## Sheet

Replaces BottomSheet (deprecated!). Requires `height` ("auto"/"cover") + `width` ("medium"/"large"). Has `shouldCloseOnBackdropClick`.

```tsx
<Sheet
  open={isOpen}
  onClose={() => setOpen(false)}
  height="auto"
  width="medium"
  ariaLabel="Filterval"
  enteringDirection="up"
  shouldCloseOnBackdropClick
>
  {/* content */}
</Sheet>
```

## Snackbar

`text` + `circleColor` both required. `action` takes `{ text, onClick, icon? }`.

```tsx
<Snackbar
  open={show}
  onClose={() => setShow(false)}
  text="Bokningen har sparats"
  circleColor="green"
  autoHideDuration={5000}
  action={{ text: "Ångra", onClick: handleUndo }}
/>
```

## Switch

`name` is required. Renders `<input role="switch">`. Uses `onChange(event, checked)` signature.

## TextField

Requires `id` and `autoComplete`. Has `endIcon` instead of `InputProps.endAdornment`. Has `errorHelperText` for validation messages.

```tsx
<TextField
  id="email"
  autoComplete="email"
  label="E-post"
  error
  errorHelperText="Kontrollera att e-postadressen stämmer"
  endIcon={<IconButton ariaLabel="Visa lösenord"><VisibilityIcon /></IconButton>}
/>
```

## Tooltip

3 variants from same package: `Tooltip` (hover), `TimedTooltip` (auto-show), `TooltipOnClick` (controlled). Colors: `"standard"`, `"information"`, `"urgent"`, `"critical"`.

```tsx
import { Tooltip, TimedTooltip, TooltipOnClick } from "@sj-ab/component-library.ui.tooltip";

<Tooltip title="Info" direction="down" color="information">
  <button>Hover</button>
</Tooltip>
```

## Icon prop format

Different components expect icons in different formats — this is a common source of TypeScript errors:

| Component | Icon prop | Format | Example |
|-----------|-----------|--------|---------|
| Chip | `startIcon` | **FC** (component) | `startIcon={DoneSmall}` |
| Select | `startIcon` | **ReactElement** (JSX) | `startIcon={<Search />}` |
| Alert | `icon` | **ReactElement** (JSX) | `icon={<WarningFilled />}` |
| Snackbar action | `icon` | **JSX.Element** | `icon: <Copy />` |
| InformationCard listItem | `icon` | **FC** (component) | `icon: ChevronRight` |

## customAttribute prop

Many SJ components support `customAttribute` for test automation:

```tsx
<FlowButton customAttribute={{ attribute: "data-testid", value: "submit-btn" }}>
  Boka
</FlowButton>
```
