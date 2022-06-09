import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// @ts-ignore
import { babelTransform } from "../vite-utils";

const emotionPlugin = [
  "@emotion",
  {
    importMap: {
      theming: {
        styled: { canonicalImport: ["@emotion/styled", "default"] },
        css: { canonicalImport: ["@emotion/react", "css"] },
        Global: { canonicalImport: ["@emotion/react", "Global"] },
      },
    },
  },
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babelTransform([/design-system/], { plugins: [emotionPlugin] }),
    react({
      babel: {
        plugins: [emotionPlugin],
      },
    }),
  ],
});
