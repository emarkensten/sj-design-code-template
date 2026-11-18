# SJ Typography

## Font Family

Primary: **SJ Sans** (falls back to Arial in environments without the font installed).

Font weights:
- Regular (400) — body text
- Medium (500) — emphasis, subtitles
- Bold (700) — headings

## Typography Scale

Use the `Typography` component with these `variant` values (typography 8.4+). The variant only sets the look; set the heading level with `component`.

| Variant | Usage |
|---------|-------|
| `largeTitleEmphasized` | Page title, with `component="h1"` |
| `title1Emphasized` | Large section title |
| `title2Emphasized` | Section heading, with `component="h2"` |
| `title3Emphasized` | Subsection heading, with `component="h3"` |
| `headlineRegular` | Short emphasized line |
| `subtitleRegular` / `subtitleEmphasized` | Subtitles |
| `bodyRegular` / `bodyEmphasized` | Body text (default) |
| `subheadlineRegular` | Secondary text |
| `footnoteRegular` | Small print |
| `caption1Regular` / `caption2Regular` | Labels, metadata |

`Regular`, `Emphasized` and `Italic` versions exist for most sizes; check the variant list in `node_modules/@sj-ab/component-library.ui.typography/dist/Typography.d.ts`.

Removed as variants (fail the typecheck): `h1`–`h4`, `h1Small`, `h1Medium`, `h1Large`, `body1`, `caption`, `heading*`, `link`, `overline`, `subtitle1`.

## Color Options

| Color Value | Usage |
|-------------|-------|
| `"textPrimary"` | Main content (default) |
| `"textSecondary"` | De-emphasized text |
| `"error"` | Error messages |
| `"disabled"` | Disabled state |

## Example

```tsx
<Typography variant="title2Emphasized" component="h2" color="textPrimary">
  Section Title
</Typography>
<Typography variant="bodyRegular">
  Body text content here.
</Typography>
```
