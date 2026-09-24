import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Börjar varje ny sida överst. React Router behåller annars scrolläget från förra sidan. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
