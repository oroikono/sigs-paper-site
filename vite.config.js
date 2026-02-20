import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite configuration for the SIGS paper site.
 *
 * Base path
 * ---------
 * For local development the base path is "/" (default).
 * For GitHub Pages (or any sub-path deployment) set the VITE_BASE env var:
 *
 *   VITE_BASE=/your-repo-name/ npm run build
 *
 * Or hardcode below, e.g.:  base: "/sigs-paper-site/"
 *
 * Anonymous / public mode
 * -----------------------
 * Set VITE_ANON=false to enable public mode (shows author names & logos):
 *
 *   VITE_ANON=false npm run build
 */
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? "/",
});
