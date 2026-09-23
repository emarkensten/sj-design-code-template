# Help & Error Handling

## Core Principle

Help should be easy to access right where the user is. Prioritize in-context guidance over separate help sections.

## Error Messages

- Always provide helpful, specific error messages directly in form fields
- Use `TextField` with `error` and `errorHelperText` props for inline validation
- Error text should tell the user what went wrong and how to fix it
- Write error messages in plain language, not technical jargon

```tsx
<TextField
  id="phone"
  autoComplete="tel"
  label="Telefonnummer"
  error
  errorHelperText="Ange ett giltigt telefonnummer, t.ex. 070-123 45 67"
/>
```

## Guidance Approach

- Provide real-time feedback directly where users encounter issues
- Only show help buttons on pages where data indicates users frequently need assistance
- Use `Tooltip` for brief contextual explanations
- Use helper text below form fields for persistent guidance
