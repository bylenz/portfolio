// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://bylenz.com",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});