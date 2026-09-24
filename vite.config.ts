import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Alla installerade SJ-paket. Vite förbereder dem när dev-servern startar, i stället
// för mitt i en session första gången ett nytt paket importeras. Det senare laddar
// om sidan och ger tillfälliga "Invalid hook call"-fel i konsolen.
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const sjPackages = Object.keys(pkg.dependencies ?? {}).filter((name) =>
  name.startsWith("@sj-ab/component-library."),
);

export default defineConfig({
  plugins: [react()],
  build: {
    // SJ:s tågillustrationer gör paketet stort. Väntat för en prototyp.
    chunkSizeWarningLimit: 3000,
  },
  resolve: {
    // SJ:s paket har egna beroenden på React, MUI och Emotion. En enda kopia av
    // varje undviker "Invalid hook call" och dubbla Emotion-instanser.
    dedupe: ["react", "react-dom", "@emotion/react", "@emotion/styled", "@mui/material", "@mui/system"],
  },
  optimizeDeps: {
    include: sjPackages,
  },
});
