# Visual Prominence

SJ uses a prominence system to establish visual hierarchy. Components have multiple style levels from minimal to maximum prominence.

## Button Prominence Scale

Five styles from least to most prominent:

1. **Plain** — minimal, text-only appearance
2. **Outlined** — border only, no fill
3. **Gray** — subtle gray background
4. **Tinted** — light color fill
5. **Filled** — full color fill, maximum prominence

Use `FlowButton` with `colorVariant`:
- `colorVariant="secondary"` → outlined/less prominent
- `colorVariant="primary"` → filled/most prominent

**Rule:** A page should have one clearly most prominent action. Use filled style for the primary CTA and outlined or plain for secondary actions.

## Form Component Prominence

Three tiers:
1. **Plain** — minimal, inline
2. **List** — grouped in a list layout
3. **Card** — elevated card container, maximum prominence

## General Rules

- Higher prominence = draws more attention. Use sparingly.
- Primary actions should stand out clearly from secondary ones.
- Don't give equal prominence to competing actions — guide the user toward the most important one.
- On dark backgrounds (App Bar, Bottom Bar), use darker fill colors for additional visual separation.
