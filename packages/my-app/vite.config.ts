import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "@emotion",
            {
              importMap: {
                theming: {
                  styled: { canonicalImport: ["@emotion/styled", "default"] },
                  css: { canonicalImport: ["@emotion/react", "css"] },
                  Global: { canonicalImport: ["@emotion/react", "Global"] }
                }
              }
            }
          ]
        ]
      }
    })
  ]
});
