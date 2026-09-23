# Layout

## Mobile First

SJ designs mobile-first. Start with small screens and scale up.

## Spacing

Use MUI's spacing system (theme.spacing), which defaults to 8px increments:
- `spacing={1}` = 8px
- `spacing={2}` = 16px (primary padding)
- `spacing={3}` = 24px (section separation)

```tsx
<Stack spacing={2} sx={{ p: 2 }}>
  {/* 16px gap between children, 16px padding */}
</Stack>
```

## Max Width

Content areas should have a maximum width for readability. Use MUI Container:

```tsx
import { Container } from "@mui/material";
<Container maxWidth="sm">{/* form content */}</Container>
```

## Responsive

Use MUI breakpoints via the `sx` prop:

```tsx
<Box sx={{
  px: 2,              // 16px padding on mobile
  px: { md: 3 },      // 24px on tablet+
  maxWidth: { lg: 1240 }
}}>
```

## Key Rules

- Fluid layouts that transition smoothly, not rigid snapping at breakpoints
- Account for safe areas on edge-to-edge devices
- Content padding: minimum 16px on mobile
- Stack content vertically on mobile, use grid/flex on desktop
