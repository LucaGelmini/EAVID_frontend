import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import graphql from "@rollup/plugin-graphql";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), graphql()],
  root: "./src/ui/",
  css: {
    postcss: path.resolve(__dirname, "./src/ui/postcss.config.js"),
  },
  build: {
    outDir: "../../dist",
  },
});
