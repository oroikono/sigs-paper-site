import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { SITE, AUTHORS, ABSTRACT } from "./src/paperMetadata.js";

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

// The interactive app replaces this initial article after loading.
function paperIntro(anonymous) {
  const authors = anonymous ? "" : `<p>${escapeHtml(AUTHORS.map(author => author.name).join(", "))}</p>`;
  return `<main class="container">
    <h1>${escapeHtml(SITE.title)}</h1>
    ${authors}
    <p>${escapeHtml(SITE.venue)}</p>
    <h2>Abstract</h2>
    <p>${escapeHtml(ABSTRACT)}</p>
    <p><a href="https://proceedings.mlr.press/v306/oikonomou26a.html">Published paper</a>
      · <a href="${escapeHtml(SITE.links.arxiv)}">arXiv preprint</a>
      · <a href="${escapeHtml(SITE.links.codeRepo)}">Code and reproduction instructions</a></p>
  </main>`;
}

/**
 * Public author display is the default; VITE_ANON=true hides visible authors.
 * Set VITE_BASE=/sigs-paper-site/ for the GitHub Pages deployment.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const anonymous = env.VITE_ANON !== undefined && env.VITE_ANON !== "false";
  return {
    plugins: [
      react(),
      {
        name: "paper-initial-html",
        transformIndexHtml(html) {
          const root = '<div id="root"></div>';
          if (!html.includes(root)) {
            throw new Error('Expected an empty #root element for the initial paper HTML.');
          }
          return html.replace(root, `<div id="root">${paperIntro(anonymous)}</div>`);
        },
      },
    ],
    base: env.VITE_BASE ?? "/",
  };
});
