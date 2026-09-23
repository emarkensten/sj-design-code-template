# SJ Color System

SJ's color palette is nature-inspired, named after Swedish landscapes. All colors adapt automatically between light and dark mode via design tokens.

## Design Token Color Categories

Access via `theme.designTokens.color.*` (from `useTheme()`). Each token is `{ value: "rgb(...)" }`.

### Fill Colors (`color.fill.*`)

| Token | Light Mode | Usage |
|-------|-----------|-------|
| `lov1` | `#00AB3B` (Leaf green) | Primary brand color, CTAs |
| `lov2` | Darker leaf | High-contrast primary |
| `gras` | `#62DB5A` (Grass green) | Secondary green |
| `himmel1` | `#22BCE8` (Sky blue) | Informational, links |
| `himmel2` | Darker sky blue | High-contrast info |
| `mossa` | `#E8F7F6` (Moss) | Subtle green surfaces |
| `hostlov1` | `#F56200` (Fall leaf) | Orange accent, warnings |
| `ang` | Secondary | Accents |
| `varning` | `#DE1F26` (Warning red) | Error, destructive |
| `raps` | `#FFD700` (Rapeseed yellow) | Warning, pending |
| `sand` | `#F9F4CF` | Warm surfaces |

### Text Colors (`color.text.*`)

| Token | Usage |
|-------|-------|
| `primary` | Main text (`#696B57` in light, lighter in dark) |
| `secondary` | De-emphasized text |
| `disabled` | Disabled state text |
| `hint` | Placeholder/hint text |
| `error` | Error messages |
| `hostlov2` | High-contrast orange text |

### Border Colors (`color.border.*`)

| Token | Usage |
|-------|-------|
| `divider` | Section dividers |
| `border` | Standard borders |
| `focused` | Focus ring color |
| `input` | Input field borders |

### Background Colors (`color.background.*`)

| Token | Usage |
|-------|-------|
| `primary` | Main background |
| `secondary` | Secondary/elevated surfaces |

### Label Colors (`color.label.*`)

| Token | Usage |
|-------|-------|
| `primary` | Primary labels |
| `secondary` | Secondary labels (promoted to `text.primary` in high-contrast) |
| `placeholder` | Placeholder text (promoted to `text.primary` in high-contrast) |
| `hostlov` | Orange labels |

## Dark Mode Color Mapping

Colors invert automatically. Key differences:

| Color | Light | Dark |
|-------|-------|------|
| SJBlack | `#000000` | `#FFFFFF` |
| SJWhite | `#FFFFFF` | `#000000` |
| SJLeaf | `#00AB3B` | `#009433` |
| SJGrass | `#62DB5A` | `#1BBD0F` |
| SJMeadow | `#E8F7E4` | `#142C11` |
| SJSky | `#22BCE8` | `#15A3CB` |
| SJMoss | `#E8F7F6` | `#022D31` |
| SJGranite | `#696B57` | `#8C8C8C` |
| SJWarningText | `#DE1F26` | `#FF040D` |

## FlowButton Colors

Use these via the `color` prop:

| Color | Usage |
|-------|-------|
| `"green"` | Primary actions (default) |
| `"blue"` | Informational actions |
| `"orange"` | Warning/attention actions |
| `"black"` | Neutral emphasis |
| `"white"` | On dark backgrounds |
| `"critical"` | Destructive actions |
| `"grey"` | De-emphasized actions |

Each supports `colorVariant="primary"` (filled) and `colorVariant="secondary"` (outlined).

## Badge Colors

| Color | Usage |
|-------|-------|
| `"green"` | Success, active (default) |
| `"yellow"` | Warning, pending |
| `"red"` | Error, critical |
| `"blue"` | Information |
| `"grey"` | Inactive, neutral |
| `"orange"` | Attention |

## Usage Examples

```tsx
const theme = useTheme();

// Via design tokens (raw values for charts, SVGs, custom styling)
const leafGreen = theme.designTokens.color.fill.lov1.value;
const textColor = theme.designTokens.color.text.primary.value;

// Via MUI palette (preferred for standard component styling)
<Box sx={{ bgcolor: "primary.main", color: "text.primary" }} />

// Semi-transparent using utility
import { rgbWithOpacity } from "@sj-ab/component-library.styles.utils";
const hoverBg = rgbWithOpacity(theme.designTokens.color.text.primary.value, "0.08");
```

## Do Not Hardcode Colors

Always use theme tokens or component color props. Never use raw hex/rgb values — the theme handles light/dark/contrast mode automatically.
