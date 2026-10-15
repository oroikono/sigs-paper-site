# SIGS: Neuro-Symbolic AI for Analytical Solutions of Differential Equations

This repository hosts the interactive companion website for **“Neuro-Symbolic AI for Analytical Solutions of Differential Equations”** by Orestis Oikonomou, Levi Lingsch, Dana Grund, Siddhartha Mishra, and Georgios Kissas (**ICML 2026**).

SIGS combines grammar-guided symbolic search with physics-based coefficient refinement to search for closed-form differential-equation solutions. The website presents the method and benchmark examples; the implementation and reproduction instructions are maintained in the SIGS code repository.

[Published paper](https://proceedings.mlr.press/v306/oikonomou26a.html) · [Project website](https://oroikono.github.io/sigs-paper-site/) · [Code](https://github.com/oroikono/SIGS) · [BibTeX](CITATION.bib)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Configuration

Shared paper metadata, the abstract, and the published ICML BibTeX live in
`src/paperMetadata.js`. The interactive sections import their content from
`src/siteContent.js`; `src/site.config.js` retains a compatibility citation
export. The Vite build also uses the shared metadata to put the title, authors,
abstract, and paper/code links in the initial HTML.

Keep `CITATION.bib` and the shared `BIBTEX` export consistent when updating the
citation. The preferred reference is the published ICML 2026 paper; the arXiv
link identifies the preprint.

### Author display

Public mode is the default. To hide the visible authors and logos:

```bash
VITE_ANON=true npm run build
```

Use `VITE_ANON=false` for explicit public mode. This setting controls display;
the public site's bibliographic metadata and links still identify the paper,
so it is not suitable for a blinded submission.

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
