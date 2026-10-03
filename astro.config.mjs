// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://www.bylenz.com",
  adapter: vercel(),
  // Spanish at "/", English at "/en/"
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    // Adds hreflang alternates for each locale to the sitemap
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: { es: "es-PE", en: "en-US" },
      },
    }),
  ],
});
