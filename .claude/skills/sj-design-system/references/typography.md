# SJ Typography

## Font Family

Primary: **SJ Sans** (falls back to Arial in environments without the font installed).

Font weights:
- Regular (400) — body text
- Medium (500) — emphasis, subtitles
- Bold (700) — headings

## Typography Scale

Use the `Typography` component with these `variant` values:

| Variant | Size | Weight | Usage |
|---------|------|--------|-------|
| `h1` | Responsive (32-48px) | Bold | Page titles |
| `h1Small` | 32px | Bold | Compact page titles |
| `h1Medium` | 36px | Bold | Medium page titles |
| `h1Large` | 48px | Bold | Hero titles |
| `h2` | 24px | Bold | Section headings |
| `h3` | 19px | Bold | Subsection headings |
| `h4` | 16px | Bold | Card headings |
| `subtitle1` | 16px | Medium | Subtitles |
| `body1` | 16px | Regular | Body text (default) |
| `caption` | 14px | Regular | Small text, labels |
| `overline` | 12px | Bold | Category labels |

## Color Options

| Color Value | Usage |
|-------------|-------|
| `"textPrimary"` | Main content (default) |
| `"textSecondary"` | De-emphasized text |
| `"error"` | Error messages |
| `"disabled"` | Disabled state |

## Example

```tsx
<Typography variant="h2" color="textPrimary">
  Section Title
</Typography>
<Typography variant="body1">
  Body text content here.
</Typography>
```
