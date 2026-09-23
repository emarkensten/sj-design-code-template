# UX Writing — Screen Reader Texts

Guidelines for writing effective screen reader texts to ensure digital products are accessible.

## Core Principles

1. **Clear and concise** — Use simple language. Avoid information that overwhelms or confuses.
2. **Relevant and informative** — Text should describe the element or function. A button should describe what happens when activated, not just a generic description.
3. **Contextual accuracy** — Ensure text fits the context. Navigation elements should describe how users interact with the page.
4. **Use ARIA labels where needed** — Apply ARIA (Accessible Rich Internet Applications) labels for additional descriptions where standard HTML is insufficient.
5. **Test with multiple screen readers** — Screen reader texts may differ between readers. Test across tools for consistent experience.
6. **Alt text for images** — All informational images need alt text describing what's important in the current context.
7. **Name, role and value for interactive elements** — Buttons and links should have clear names, correct role identification, and clear values where relevant.
8. **Descriptive link text** — Never "klicka har" / "click here". Describe what the user will find after following the link.
9. **Don't rely on colour alone** — Colour-blind users may miss colour-only information. Use text descriptions to supplement.
10. **Clear headings and structure** — Logical, well-defined headings help screen reader users navigate and understand page structure.

## Food Add-on Examples

These patterns show how to write screen reader texts for dynamic content with singular/plural and SV/EN variants.

### Before food is added

| State | Svenska | English |
|-------|---------|---------|
| No food included | Lagg till mat, fran NN kronor | Add food, from NN Swedish crowns |
| No breakfast included | Lagg till frukost, fran NN kronor | Add breakfast, from NN Swedish crowns |
| Food is included | Mat ingar | Food is included |
| Breakfast is included | Frukost ingar | Breakfast is included |

### Food included (before selection)

| Variant | Svenska | English |
|---------|---------|---------|
| Singular | Mat ingar, raksmorgass | Food is included, prawn sandwich |
| Plural | Mat ingar, N raksmorgas | Food is included, N prawn sandwich |

### After food is added (single traveller)

| Type | Svenska | English |
|------|---------|---------|
| Food | Raksmorgas tillagd | Prawn sandwich added |
| Breakfast | Frukost tillagd | Breakfast included |
| Vegan breakfast | Vegansk frukost tillagd | Vegan breakfast added |

### After food is added (multiple travellers)

| Variant | Svenska | English |
|---------|---------|---------|
| Food, singular | Mat tillagd, N raksmorgas | Food added, N prawn sandwich |
| Food, plural | Mat tillagd, N matratter | Food added, N dishes |
| Breakfast, singular | Frukost tillagd, N frukost | Breakfast included, N breakfast |
| Breakfast, plural | Frukost tillagd, N frukostar | Breakfast included, N breakfasts |
