import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "/Paleniska-i-Grille-Premium/", // 👈 ВАЖНО: слева и справа должны быть знаки '/'
});
