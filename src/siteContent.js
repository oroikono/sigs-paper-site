/**
 * siteContent.js — single source of truth for all text/data on the SIGS site.
 * Sections import from here.  Change content here; the page updates automatically.
 */

// ── ANONYMOUS MODE ────────────────────────────────────────────────────────────
// Override at build/dev time: VITE_ANON=true npm run build
const _envAnon = import.meta.env.VITE_ANON;
export const anonymous =
  _envAnon === undefined ? false : _envAnon !== "false";

// ── SITE METADATA ─────────────────────────────────────────────────────────────
export const SITE = {
  title:
    "Neuro-Symbolic AI for Analytical Solutions of Differential Equations",
  subtitle:
    "SIGS: grammar-constrained latent search that assembles, scores, and refines closed-form solutions by minimizing physics residuals.",
  noticeLine:
    "Interactive companion page (paper-style). Scroll for method → interactive results → citation.",
  venue: " · ",
  links: {
    paperPdf: "/paper.pdf",
    arxiv: "https://arxiv.org/abs/2502.01476",
    codeRepo: "#",
    codeRepoLabel: "TBD after review",
  },
};

// ── AUTHORS & AFFILIATIONS (public mode only) ─────────────────────────────────
export const AUTHORS = [
  { name: "Orestis Oikonomou", aff: [1, 2, 3], url: "https://ai.ethz.ch/about-us/people.html" },
  { name: "Levi Lingsch", aff: [1, 2, 3], url: "https://scholar.google.com/citations?user=9pJIGJUAAAAJ" },
  { name: "Dana Grund", aff: [1, 4], url: "https://camlab.ethz.ch/the-group/people.html" },
  { name: "Siddhartha Mishra", aff: [1, 2], url: "https://math.ethz.ch/sam/the-institute/people/siddhartha-mishra.html" },
  { name: "Georgios Kissas", aff: [5], url: "https://scholar.google.com/citations?user=gGvVfmAAAAAJ" },
];

export const AFFILIATIONS = {
  1: "Seminar for Applied Mathematics (SAM), D-MATH, ETH Zürich",
  2: "ETH AI Center, ETH Zürich",
  3: "IBM Research Zürich",
  4: "Department of Civil, Environmental and Geomatic Engineering (D-USYS), ETH Zürich",
  5: "Swiss Data Science Center (SDSC), Zürich",
};

// Logo images — show only when anonymous = false
// Place PNG files in public/assets/; silently hidden if file missing.
export const LOGOS = [
  { src: "/assets/eth_ai_center.png", alt: "ETH AI Center", href: "https://ai.ethz.ch" },
  { src: "/assets/camlab.png", alt: "CAMlab", href: "https://camlab.ethz.ch" },
];

// ── TL;DR (3 bullets) ─────────────────────────────────────────────────────────
export const TLDR = [
  "We cast PDE solution discovery as hierarchical composition of atoms under a structural Ansatz, constraining candidates to admissible expressions while retaining generality across PDE classes.",
  "We embed grammar-valid expressions into a continuous latent manifold (GVAE / Topological GVAE) to enable global-to-local search without enumerating symbolic trees.",
  "We discover solutions in two stages: latent structure search driven by PDE residuals, followed by gradient-based refinement of numerical constants to reach exact or high-precision solutions.",
];

// ── ABSTRACT ──────────────────────────────────────────────────────────────────
export const ABSTRACT =
  "Analytical solutions to differential equations offer exact, interpretable insight but are rarely available because discovering them requires expert intuition or exhaustive search in combinatorial spaces. We introduce SIGS, a neuro-symbolic framework that automates this process. SIGS uses a formal grammar to generate only syntactically valid building blocks, embeds these expressions into a continuous space, and then searches this space to assemble, score, and refine candidate closed-form solutions by minimizing a physics-based residual. This design unifies symbolic reasoning with numerical optimization; the grammar constrains candidate solution blocks to be proper by construction, while the latent search makes exploration tractable and data-free. SIGS is the first neuro-symbolic method to (i) analytically solve coupled systems of nonlinear PDEs, (ii) discover solutions under grammar misspecification, and (iii) produce accurate symbolic approximations for PDEs lacking known closed-form solutions. Overall, SIGS achieves orders-of-magnitude improvements in accuracy and efficiency over existing symbolic methods on standard benchmarks.";

// ── METHOD STEPS (4 steps; miniFlowStep indexes into MINI_FLOW) ───────────────
// Fig 1 is a 2×2 grid: A=top-left (Grammar), B=bottom-left (Language),
// C=top-right (TGVAE), D=bottom-right (Search).
export const METHOD_STEPS = [
  {
    id: "grammar",
    title: "A) Grammar & Language of Functions",
    body:
      "Define a context-free grammar that generates only syntactically valid atoms, then compose them into a language of candidate solution building blocks. This constrains the search to admissible expressions by construction.",
    miniFlowStep: 0,
    highlight: { x: 0.6, y: 2.5, w: 49.0, h: 38.8 },   // panel A (top-left)
  },
  {
    id: "language",
    title: "B) Structural Ansatz",
    body:
      "Specify a structural Ansatz that composes grammar atoms into candidate solutions. The Ansatz encodes expert knowledge about solution form (e.g., product of spatial/temporal modes) while remaining general across PDE classes.",
    miniFlowStep: 0,
    highlight: { x: 0.5, y: 43.4, w: 49.1, h: 55.4 },  // panel B (bottom-left)
  },
  {
    id: "latent",
    title: "C) Autoencoding (GVAE / Topological GVAE)",
    body:
      "Train a Grammar VAE to embed grammar-valid expressions into a continuous latent space. Topological GVAE regularization ensures nearby latents decode to predictably similar expressions, reducing artifacts in the manifold.",
    miniFlowStep: 1,
    highlight: { x: 50.3, y: 2.1, w: 49.1, h: 39.2 },  // panel C (top-right)
  },
  {
    id: "search",
    title: "D) Solution Search & Refinement",
    body:
      "Search the latent space to find a candidate minimizing the physics-based residual, then refine numerical constants via gradient-based optimization to reach exact or high-precision closed-form solutions.",
    miniFlowStep: 2,
    highlight: { x: 50.3, y: 43.2, w: 49.1, h: 55.6 }, // panel D (bottom-right)
  },
];

// ── MINI-FLOW (3 nodes shown under the figure) ────────────────────────────────
export const MINI_FLOW = [
  { id: "grammar", label: "Grammar", sub: "G → L(G)" },
  { id: "latent", label: "Latent manifold", sub: "GVAE / TGVAE" },
  { id: "refine", label: "Residual & refine", sub: "z* → u*" },
];

// ── BENCHMARKS (Tables 3–4 from the paper) ───────────────────────────────────
export const BENCHMARKS = [
  {
    id: "burgers",
    name: "Burgers",
    category: "Known analytical",
    note: "Relative L² error. SIGS reaches machine precision.",
    metrics: {
      "SIGS": "6.64×10⁻¹⁴",
      "HD-TLGP P1": "2.04%",
      "HD-TLGP P2": "35.68%",
      "SSDE": "45.62%",
      "PINNs": "6.09%",
      "FBPINNs": "28.26%",
      "FEniCS": "8.69×10⁻³%",
    },
  },
  {
    id: "diffusion",
    name: "Diffusion",
    category: "Known analytical",
    note: "Relative L² error.",
    metrics: {
      "SIGS": "7.16×10⁻¹³",
      "HD-TLGP P1": "33.34%",
      "HD-TLGP P2": "79.73%",
      "SSDE": "5.87×10³%",
      "PINNs": "2.56%",
      "FBPINNs": "55.54%",
      "FEniCS": "2.26×10⁻³%",
    },
  },
  {
    id: "damping_wave",
    name: "Damping Wave",
    category: "Known analytical",
    note: "Relative L² error.",
    metrics: {
      "SIGS": "1.22×10⁻¹³",
      "HD-TLGP P1": "423.30%",
      "HD-TLGP P2": "178.77%",
      "SSDE": "1.19×10³%",
      "PINNs": "3.56%",
      "FBPINNs": "71.36%",
      "FEniCS": "2.28×10⁻²%",
    },
  },
  {
    id: "pg2",
    name: "Poisson–Gauss PG-2",
    category: "Unknown (FEniCS reference)",
    note: "Relative L² error (%) vs FEniCS.",
    metrics: {
      "SIGS": "2.66%",
      "HD-TLGP P1": "200.9%",
      "HD-TLGP P2": "98.94%",
      "SSDE": "69.29%",
    },
  },
  {
    id: "pg3",
    name: "Poisson–Gauss PG-3",
    category: "Unknown (FEniCS reference)",
    note: "Relative L² error (%) vs FEniCS.",
    metrics: {
      "SIGS": "1.54%",
      "HD-TLGP P1": "NaN",
      "HD-TLGP P2": "5.61×10⁷%",
      "SSDE": "69.64%",
    },
  },
  {
    id: "pg4",
    name: "Poisson–Gauss PG-4",
    category: "Unknown (FEniCS reference)",
    note: "Relative L² error (%) vs FEniCS.",
    metrics: {
      "SIGS": "1.05%",
      "HD-TLGP P1": "NaN",
      "HD-TLGP P2": "5.45×10⁷%",
      "SSDE": "58.70%",
    },
  },
];

// Columns per category
export const KNOWN_COLS = ["SIGS", "HD-TLGP P1", "HD-TLGP P2", "SSDE", "PINNs", "FBPINNs", "FEniCS"];
export const UNKNOWN_COLS = ["SIGS", "HD-TLGP P1", "HD-TLGP P2", "SSDE"];

// ── RESULTS HIGHLIGHTS ────────────────────────────────────────────────────────
export const RESULTS_HIGHLIGHTS = [
  "Machine precision on scalar PDEs: SIGS recovers exact closed-form solutions with relative L² errors 6.64×10⁻¹⁴ – 1.22×10⁻¹³ on Burgers, Diffusion, and Damping Wave equations.",
  "First symbolic method to solve coupled nonlinear systems: SIGS analytically solves the Shallow Water Equations (3-field system) and Compressible Euler (4-field system) — problems where all symbolic baselines (HD-TLGP, SSDE) fail due to combinatorial explosion.",
  "Robust to grammar misspecification: On the KdV equation, SIGS discovers accurate solutions even when the grammar does not contain the exact building blocks of the true solution.",
  "Accurate approximations without analytical solutions: For Poisson–Gauss problems (PG-2/3/4) with no known closed form, SIGS achieves 2.66%, 1.54%, 1.05% relative L² error vs FEniCS reference — improving as problem complexity increases.",
  "Orders-of-magnitude improvement over symbolic baselines across all benchmarks in both accuracy and wall-clock time.",
];

// ── BIBTEX ────────────────────────────────────────────────────────────────────
export const BIBTEX = `@article{oikonomou2025neuro,
  title   = {Neuro-symbolic {AI} for analytical solutions of differential equations},
  author  = {Oikonomou, Orestis and Lingsch, Levi and Grund, Dana and Mishra, Siddhartha and Kissas, Georgios},
  journal = {arXiv preprint arXiv:2502.01476},
  year    = {2025}
}`;
