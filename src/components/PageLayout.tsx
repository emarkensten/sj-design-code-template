import { useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
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
        navigationButtons={
          back ? [{ label: back.label, variant: "back", action: () => navigate(back.to) }] : undefined
        }
      />
      <Box
        component="main"
        sx={{ maxWidth, mx: "auto", px: 2, pt: 3, pb: bottomBar ? 16 : 6 }}
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
      {bottomBar}
    </>
  );
}
