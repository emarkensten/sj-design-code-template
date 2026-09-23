import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // SJ:s paket har egna beroenden på React, MUI och Emotion. En enda kopia av
    // varje undviker "Invalid hook call" och dubbla Emotion-instanser.
    dedupe: ["react", "react-dom", "@emotion/react", "@emotion/styled", "@mui/material", "@mui/system"],
  },
});
