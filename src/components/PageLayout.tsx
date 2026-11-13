import { useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Box, GlobalStyles } from "@mui/material";
import AppBar from "@sj-ab/component-library.ui.app-bar";
import Typography from "@sj-ab/component-library.ui.typography";
import Stack from "@sj-ab/component-library.ui.stack";

/** SJ:s tillåtna maxbredder för innehåll (Sanity: Grid). */
type MaxWidth = 400 | 600 | 800 | 1000 | 1200 | 1400 | 1600;

type Props = {
  /** Sidans rubrik. Blir h1 och visas i AppBar när h1:an scrollats ur bild. */
  title: string;
  /** Ingress under rubriken. */
  intro?: ReactNode;
  /** Visar en tillbaka-knapp i AppBar. */
  back?: { to: string; label: string };
  /** 600 passar formulär och flöden, 1200 är SJ:s standard för bredare sidor. */
  maxWidth?: MaxWidth;
  /** Fast yta i nederkant, t.ex. BottomBarContainer. Ger main extra luft nedtill. */
  bottomBar?: ReactNode;
  children: ReactNode;
};

/**
 * Standardskal för en sida enligt SJ:s layoutregioner: App Bar + Body.
 * Innehållet ligger direkt på sidan med 16px sidomarginal, aldrig i ett kort.
 */
export function PageLayout({ title, intro, back, maxWidth = 600, bottomBar, children }: Props) {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <AppBar
        title={title}
        headingRef={headingRef}
        // AppBar suddar innehållet bakom sig med backdrop-filter när sidan skrollats.
        // Safari på iPhone färgar då statusfältet grått i stället för i sidans färg.
        sx={{ backdropFilter: "none !important", WebkitBackdropFilter: "none !important" }}
        navigationButtons={
          back ? [{ label: back.label, variant: "back", action: () => navigate(back.to) }] : undefined
        }
      />
      <Box
        component="main"
        sx={(theme) => ({
          maxWidth,
          mx: "auto",
          px: 2,
          pt: 3,
          // Luft nedtill plus hemlinjen på iPhone när appen ligger på hemskärmen
          // (viewport-fit=cover i index.html gör att sidan går ända ned till kanten).
          pb: `calc(${theme.spacing(bottomBar ? 16 : 6)} + env(safe-area-inset-bottom, 0px))`,
        })}
      >
        <Stack useFlexGap spacing={3}>
          <Stack useFlexGap spacing={1}>
            <Typography ref={headingRef} variant="h1">
              {title}
            </Typography>
            {intro && (
              <Typography variant="bodyRegular" color="text.secondary">
                {intro}
              </Typography>
            )}
          </Stack>
          {children}
        </Stack>
      </Box>
      {bottomBar && (
        // BottomBarContainer ligger fast i nederkant. Det som skrollas fram eller får
        // tangentbordsfokus ska hamna ovanför den, inte bakom den.
        <GlobalStyles styles={(theme) => ({ html: { scrollPaddingBottom: theme.spacing(16) } })} />
      )}
      {bottomBar}
    </>
  );
}
