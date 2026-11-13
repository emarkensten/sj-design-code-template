import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// SJ:s CSS-variabler (--sjse-*) som Container, Spacing, Grid och Confirmation läser.
// Ligger i CSS-lager, så temat och komponenternas egna stilar går före.
import "@sj-ab/component-library.styles.sj-global-styles";
import "./i18n";
import { ThemeProvider } from "./theme/ThemeProvider";
import { App } from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
