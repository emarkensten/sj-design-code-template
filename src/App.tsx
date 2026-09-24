import { Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { StartPage } from "./pages/StartPage";

/** Alla sidor i prototypen. Lägg till en <Route> per ny sida i src/pages/. */
export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
    </>
  );
}
