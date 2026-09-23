# Next.js App Router Setup with SJ Design System

Complete setup guide for Next.js 15+/16+ with SJ's design system.

## Table of Contents
- [Root layout](#root-layout)
- [Providers — simple](#providers-simple)
- [Providers — full (dark mode + contrast)](#providers-full)
- [next.config.ts](#nextconfigts)
- [Complete example page](#complete-example)

---

## Root layout

All SJ components are client components (MUI depends on browser APIs and React context). Wrap with `AppRouterCacheProvider` to prevent Emotion/MUI style issues with App Router.

```tsx
// app/layout.tsx
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

## Providers — simple

Single theme, no switching:

```tsx
// app/providers.tsx
"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { generateThemeOptions } from "@sj-ab/component-library.styles.themes";

const theme = createTheme(generateThemeOptions("light"));

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

## Providers — full

Theme switching + system preference detection + high contrast support:

```tsx
// app/providers.tsx
"use client";

import React, { createContext, useState, useMemo, useEffect } from "react";
import { createTheme, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { generateThemeOptions } from "@sj-ab/component-library.styles.themes";

type ThemeMode = "dark" | "light" | "auto";
type ContrastMode = "more" | "less" | "auto";

export const ThemeContext = createContext<{
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  contrast: ContrastMode;
  setContrast: (c: ContrastMode) => void;
}>({ theme: "auto", setTheme: () => {}, contrast: "auto", setContrast: () => {} });

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("auto");
  const [contrast, setContrast] = useState<ContrastMode>("auto");

  const isMobile = useMediaQuery("(max-width: 600px)");
  const userPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const userPrefersContrast = useMediaQuery("(prefers-contrast: more)");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light" || stored === "auto") setTheme(stored);
    const storedContrast = localStorage.getItem("contrast");
    if (storedContrast === "more" || storedContrast === "less") setContrast(storedContrast);
  }, []);

  const preferredTheme = theme === "auto" ? (userPrefersDark ? "dark" : "light") : theme;
  const preferredContrast = contrast === "auto" ? userPrefersContrast : contrast === "more";

  // darkDesktop provides enhanced dark styling for larger screens
  const darkVariant = isMobile ? "dark" : "darkDesktop";

  const muiTheme = useMemo(
    () => createTheme(generateThemeOptions(
      preferredTheme === "dark" ? darkVariant : "light",
      preferredContrast,
    )),
    [preferredTheme, darkVariant, preferredContrast],
  );

  // Sync colorScheme for native elements (scrollbars, form controls)
  useEffect(() => {
    document.documentElement.style.colorScheme = preferredTheme;
  }, [preferredTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, contrast, setContrast }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
```

## next.config.ts

Next.js 16 uses Turbopack by default. Provide both `turbopack` and `webpack` configs:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // Fix case-sensitivity issue with SJ icon imports (Icons vs icons folder)
      "@sj-ab/component-library.assets.assets/Icons":
        "@sj-ab/component-library.assets.assets/icons",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@sj-ab/component-library.assets.assets/Icons":
        "@sj-ab/component-library.assets.assets/icons",
    };
    config.module.rules.push({
      test: /\.svg$/,
      include: /node_modules\/@sj-ab/,
      type: "asset/resource",
      generator: { filename: "static/media/[name].[hash][ext]" },
    });
    return config;
  },
};

export default nextConfig;
```

## Complete example

A login page with dark mode toggle:

```tsx
"use client";

import { useContext } from "react";
import { FlowButton } from "@sj-ab/component-library.ui.flow-button";
import { TextField } from "@sj-ab/component-library.ui.text-field";
import { Typography } from "@sj-ab/component-library.ui.typography";
import { Checkbox } from "@sj-ab/component-library.ui.checkbox";
import { IconButton } from "@sj-ab/component-library.ui.icon-button";
import { MoonSmall } from "@sj-ab/component-library.ui.icons";
import { Box, Stack, FormControlLabel } from "@mui/material";
import { ThemeContext } from "./providers";

export default function LoginPage() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Logga in</Typography>
        <IconButton
          ariaLabel={theme === "dark" ? "Byt till ljust tema" : "Byt till mörkt tema"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <MoonSmall />
        </IconButton>
      </Stack>
      <Stack spacing={3} sx={{ mt: 3 }}>
        <TextField id="email" autoComplete="email" label="E-post" />
        <TextField id="password" autoComplete="current-password" label="Lösenord" type="password" />
        <FormControlLabel control={<Checkbox />} label="Kom ihåg mig" />
        <FlowButton color="green" colorVariant="primary" fullWidth>Logga in</FlowButton>
      </Stack>
    </Box>
  );
}
```
