import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// Создаем аналог __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoName = "paleniska-i-grille-premium";

export default defineConfig(({ command }) => ({
  base: command === "build" ? `/${repoName}/` : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Направляем алиас @ сразу в папку src для удобства импортов
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== "true",
    // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
    watch: process.env.DISABLE_HMR === "true" ? null : {},
  },
}));
