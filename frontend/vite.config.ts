import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all", { prefix: "VITE_" })],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
