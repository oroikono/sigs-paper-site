# Neuro-Symbolic AI for Analytical Solutions of Differential Equations

Interactive project page for the **SIGS** paper. Built with Vite + React.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Configuration (`src/site.config.js`)

All page content lives in a single file — `src/site.config.js`.

| Field | Description |
|---|---|
| `anonymous` | `true` → hide authors/logos (default, double-blind safe). `false` → show them. |
| `title` | Paper title shown in hero. |
| `tldr` | Array of 3 HTML strings for the TL;DR cards. |
| `abstract` | Full abstract text (plain text, paragraphs separated by blank lines). |
| `links.paper` | Path or URL to the paper PDF. |
| `links.code` | GitHub repository URL. |
| `authors` | List of `{ name, affil[] }` — shown only when `anonymous = false`. |
| `affiliations` | List of `{ id, name }` — shown only when `anonymous = false`. |
| `logos` | List of `{ src, alt, href }` logo images — shown only when `anonymous = false`. |
| `bibtex` | BibTeX citation block string. |
| `methodSteps` | 4-step (A–D) array driving the Method section stepper and mini-flow. |

### Anonymous / public mode

**Default is anonymous = true** (double-blind safe).

Enable public mode at build or dev time:

```bash
# Development
VITE_ANON=false npm run dev

# Production build
VITE_ANON=false npm run build
```

Or set `anonymous: false` directly in `src/site.config.js`.

---

## Benchmark data (`public/data/`)

Each problem is a JSON file loaded at runtime. Schema:

```json
{
  "id": "burgers",
  "name": "Viscous Burgers (1D)",
  "pde_latex": "...",
  "domain_latex": "...",
  "ansatz_latex": "...",
  "solution_latex": "...",
  "metrics": { "rel_l2": 6.64e-14, "time_sec": 11.62 },
  "baseline": [
    { "method": "HD-TLGP", "error": "DNF", "time_sec": ">3600" }
  ],
  "plots": {
    "type": "line",
    "x": [...],
    "t_slices": [{ "t": 0.1, "u": [...] }]
  }
}
```

The catalog listing all problems is in `public/data/problems.json`.

---

## Assets

Place the following files in `public/assets/`:

| File | Used for |
|---|---|
| `fig1.png` | Method pipeline diagram (already present) |
| `eth.png`, `uzh.png`, etc. | Institution logos (public mode only) |

---

## Deploy to GitHub Pages

See [DEPLOY.md](./DEPLOY.md) for full instructions.

---

## Template attribution

The page layout and design is inspired by the
[Nerfies](https://nerfies.github.io) paper project page template,
created by Keunhong Park et al., and released under the MIT License.

Template license: see [`licenses/nerfies/LICENSE`](./licenses/nerfies/LICENSE).
