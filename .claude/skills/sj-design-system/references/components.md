# Available Components

ALWAYS use SJ components instead of HTML elements, Radix UI, or other libraries.

## Core Component Mapping

| Instead of... | Use this | Import |
|---------------|----------|--------|
| `<button>`, Radix Button | `FlowButton` | `@sj-ab/component-library.ui.flow-button` |
| `<input>`, Radix Input | `TextField` | `@sj-ab/component-library.ui.text-field` |
| `<input type="checkbox">` | `Checkbox` | `@sj-ab/component-library.ui.checkbox` |
| `<input type="radio">` | `Radio` | `@sj-ab/component-library.ui.radio` |
| `<select>` | `Select` | `@sj-ab/component-library.ui.select` |
| `<h1>`, `<p>`, `<span>` | `Typography` | `@sj-ab/component-library.ui.typography` |
| Custom badge/tag | `Badge` | `@sj-ab/component-library.ui.badge` |
| Radix Tooltip | `Tooltip` | `@sj-ab/component-library.ui.tooltip` |
| `<hr>` | `Divider` | `@sj-ab/component-library.ui.divider` |
| `<a>` | `Link` | `@sj-ab/component-library.ui.link` |
| `<img>` | `Image` | `@sj-ab/component-library.ui.image` |
| Radix Dialog/Modal | `Dialog` or `Sheet` | `@sj-ab/component-library.ui.dialog` / `@sj-ab/component-library.ui.sheet` |
| Radix Switch | `Switch` | `@sj-ab/component-library.ui.switch` |
| `<div>` with layout | `Box`, `Stack` | `@mui/material` or `@sj-ab/component-library.ui.stack` |

## All Available Components

### Layout & Navigation
- `AppBar` — Top navigation bar (`@sj-ab/component-library.ui.app-bar`)
- `NavigationBar` — Bottom navigation (`@sj-ab/component-library.ui.navigation-bar`)
- `NavigationButton` — Back/forward navigation buttons
- `BottomBarContainer` — Sticky bottom actions
- `Sheet` — Overlay panel, replaces BottomSheet (DEPRECATED). Extends `DialogProps`. Requires `height` ("auto"/"cover") + `width` ("medium"/"large") (`@sj-ab/component-library.ui.sheet`)
- ~~`BottomSheet`~~ — **DEPRECATED**, use `Sheet` instead
- `SideSheet` — Slide-in panel
- `ScrollableContainer` — Scrollable area with indicators

### Buttons & Actions
- `FlowButton` — Primary CTA (green). **ALWAYS prefer for user-facing actions** (`@sj-ab/component-library.ui.flow-button`)
- `Button` — Standard button (`@sj-ab/component-library.ui.button`)
- `TextButton` — Text-only button (`@sj-ab/component-library.ui.text-button`)
- `IconButton` — Icon-only button, uses `ariaLabel` (`@sj-ab/component-library.ui.icon-button`)
- `Fab` — Floating action button
- `SearchButton` — Search trigger
- `FeatureButton` — Feature highlight button
- `ProminentActionButton` — High-emphasis action

### Form Inputs
- `TextField` — Text input, requires `id` + `autoComplete`. Has `endIcon`, `errorHelperText` (`@sj-ab/component-library.ui.text-field`)
- `TextFieldButton` — TextField that acts as a button (opens picker/dialog)
- `Checkbox` / `CheckboxCard` — Checkbox standalone or in card (`@sj-ab/component-library.ui.checkbox`)
- `Radio` / `RadioCard` / `RadioToggleCard` — Radio buttons. RadioCard = discriminated union (`@sj-ab/component-library.ui.radio`)
- `Select` — Dropdown. `labelId` + `labelText` both REQUIRED. `startIcon` takes **ReactElement** (JSX). Uses MUI `MenuItem` children. Has `rounded` (`@sj-ab/component-library.ui.select`)
- `Autocomplete` — Search/filter. `errorMessage` REQUIRED even without error. Options are `SelectedItemProps[]` (needs `name`). `startIcon`/`endIcon` take JSX elements (`@sj-ab/component-library.ui.autocomplete`)
- `Switch` / `SwitchCard` — Toggle. `name` is REQUIRED. Renders `<input role="switch">` (`@sj-ab/component-library.ui.switch`)
- `DatePicker` / `DatePickerButton` — Date selection. Inherits TextField → requires `id`, `autoComplete`, `label`, `lang`. Value is `'yyyy-MM-dd'` string. Needs `LocalizationProvider` wrapper (`@sj-ab/component-library.ui.date-picker`)
- `TimePicker` — Time selection
- `StationPicker` — Station search and selection (`@sj-ab/component-library.ui.station-picker`)

### Cards
- `Card` / `CardContent` / `CardActionArea` / `CardMedia` — Base card with variants: `active`, `comment`, `critical`, `error`, `inactive`, `information`, `success`, `urgent`, `severe` (`@sj-ab/component-library.ui.card`)
- `CampaignCard` — Marketing/campaign card (`@sj-ab/component-library.ui.campaign-card`)
- `EditorialCard` — Content card with image
- `InformationCard` — Structured info card. NOT same as `Card variant="information"`! Has `listItems`, `ImageProps`, `secondaryMeta`, `type` ("filled"/"elevated"). Title discriminated union (`@sj-ab/component-library.ui.information-card`)
- `ProductCard` — Product listing (`@sj-ab/component-library.ui.product-card`)
- `TicketCard` — Travel ticket display
- `ErrorSummaryCard` — Error state card
- `AccordionCard` — Expandable card. Discriminated union on `titleFontWeight`: present → `titleVariant` must be "body1", absent → "h2"/"h3"/"h4" (`@sj-ab/component-library.ui.accordion-card`)

### Travel Domain Components
- `DepartureCard` / `DepartureCardSkeleton` — Train departure with time, route, status (`@sj-ab/component-library.ui.departure-card`)
- `JourneyCard` — Journey overview with segments
- `JourneySummary` — Compact journey overview (`@sj-ab/component-library.ui.journey-summary`)
- `RouteDescription` / `RouteDescriptionItem` — Step-by-step route (`@sj-ab/component-library.ui.route-description`)
- `TransportDetails` / `TransportSummary` — Transport type/info (`@sj-ab/component-library.ui.transport-details`)
- `TransportImage` — Train/vehicle images
- `TravelTime` — Duration display
- `Trains` — Train type visualization
- `PaymentMethod` — Payment option display
- `PriceObject` — Price display with formatting

### Data Display
- `DataGrid` — Data table. Custom `DataGridColumnProps<T>` type — `field` must be `keyof T`. Badge columns via discriminated union. Requires `lang`. Optional: `checkboxes`, `pagination`, `fillHeight` (`@sj-ab/component-library.ui.data-grid`)
- `List` / `ListItem` / `ListItemButton` / `ListItemText` / `ListItemIcon` — List components
- `TextList` — Simple text list
- `Table` — HTML-style table
- `Meter` — Progress/capacity meter

### Feedback & Status
- `Badge` — Status indicator. **Requires `size`:** `"sm"` (dot only), `"md"` (dot + optional label), `"lg"` (dot + required label). Colors: green, yellow, red, blue, grey, orange. `"lg"` also supports `"outlined"`, `"lightGrey"` (`@sj-ab/component-library.ui.badge`)
- `Chip` — Tag/filter chip. **`startIcon` takes FC, not JSX!** Pass `DoneSmall`, not `<DoneSmall />`. Has `selected`, `endIcon`, `hasBadge`, `isMenuOpen`, `onDelete` (`@sj-ab/component-library.ui.chip`)
- `StatusCircle` — Color-coded status dot
- `Alert` — **DIALOG (modal), NOT inline banner!** Extends `MuiDialogProps`. Requires `open` + `title`. Has `primaryAction`, `secondaryAction`, `tertiaryAction`, `informativeText`, `icon`, `suppressingAction`. For inline messages use `Card variant="information"` instead (`@sj-ab/component-library.ui.alert`)
- `Snackbar` — Toast notification (`@sj-ab/component-library.ui.snackbar`)
- `SystemMessage` — System-level message (VMA)
- `CircularProgress` / `LinearProgress` — Loading indicators
- `EmptyState` — No-data state (`@sj-ab/component-library.ui.empty-state`)

### Overlays
- `Dialog` — General full-screen modal container. `enteringDirection`: "up"/"down"/"left"/"right"/"none". Auto-focuses first h1/h2 heading (`@sj-ab/component-library.ui.dialog`)
- `Sheet` — Overlay panel (**replaces BottomSheet**). Extends `DialogProps`. Requires `height` ("auto"/"cover") + `width` ("medium"/"large"). Has `shouldCloseOnBackdropClick`, `enteringDirection` (`@sj-ab/component-library.ui.sheet`)
- `Alert` — **DIALOG (modal)**, NOT inline banner! Extends MuiDialogProps. Requires `open` + `title`. Has `primaryAction`, `secondaryAction`, `tertiaryAction`, `icon`, `suppressingAction` (`@sj-ab/component-library.ui.alert`)
- `Tooltip` — 3 variants: `Tooltip` (hover), `TimedTooltip` (auto-show), `TooltipOnClick` (controlled). Colors: "standard"/"information"/"urgent"/"critical" (`@sj-ab/component-library.ui.tooltip`)
- `Snackbar` — Toast notification. `text` + `circleColor` (BadgeColor) both REQUIRED. `action` takes `{ text, onClick, icon? }` (`@sj-ab/component-library.ui.snackbar`)
- `Menu` / `MenuItem` — Dropdown menu
- `Popper` — Positioned popup

### Media & Text
- `Image` — Responsive image (`@sj-ab/component-library.ui.image`)
- `Avatar` / `AvatarGroup` — User avatars
- `Logo` — SJ logo
- `Typography` — All text rendering (`@sj-ab/component-library.ui.typography`)
- `Stepper` — Step indicator

### Icons
All icons in one package: `@sj-ab/component-library.ui.icons`

```tsx
import { Search, Done, DoneSmall, ChevronRight, ChevronDown, ChevronUp,
  ChevronDownSmall, ChevronUpSmall, ChevronUpDown, CancelSmall,
  MoonSmall, OpenInNewTab, Copy } from "@sj-ab/component-library.ui.icons";
```

### Theme & Layout (from MUI)
- `Box`, `Container`, `Grid` → `@mui/material`
- `Stack` → `@sj-ab/component-library.ui.stack` or `@mui/material`
- `Tab` → `@sj-ab/component-library.ui.tab`
- `ThemeProvider` → `@sj-ab/component-library.ui.theme-provider`
- `Divider` → `@sj-ab/component-library.ui.divider`
