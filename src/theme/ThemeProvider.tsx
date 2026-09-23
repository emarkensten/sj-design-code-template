import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { generateThemeOptions } from "@sj-ab/component-library.styles.themes";

type ThemePreference = "auto" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  resolved: ResolvedTheme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "sj-prototype.theme";

function readStoredPreference(): ThemePreference {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "auto") return v;
  } catch {
    // Privat läge o.d. – faller tillbaka på systemets val.
  }
  return "auto";
}

/**
 * SJ:s tema (ljust/mörkt, högkontrast) runt hela appen.
 * Alla SJ-komponenter måste ligga inuti den här.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState(readStoredPreference);
  const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const moreContrast = useMediaQuery("(prefers-contrast: more)");

  const resolved: ResolvedTheme =
    preference === "auto" ? (systemPrefersDark ? "dark" : "light") : preference;

  const setPreference = useCallback((p: ThemePreference) => {
    setPreferenceState(p);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {
      // ignoreras
    }
  }, []);

  const theme = useMemo(
    () => createTheme(generateThemeOptions(resolved, moreContrast)),
    [resolved, moreContrast]
  );

  useEffect(() => {
    document.documentElement.style.colorScheme = resolved;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = theme.palette.background.default;
  }, [resolved, theme]);

  const value = useMemo(
    () => ({ preference, setPreference, resolved }),
    [preference, setPreference, resolved]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemePreference(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemePreference must be used inside ThemeProvider");
  return ctx;
}
