/**
 * SIGS Paper Site — single source of truth for all content.
 * All text is grounded in the paper: "Neuro-Symbolic AI for Analytical
 * Solutions of Differential Equations" (reviewer copy, ICML submission).
 *
 * ANONYMOUS / PUBLIC MODE
 * -----------------------
 * Default: anonymous = true  (double-blind safe).
 * Override at build/dev time:  VITE_ANON=false npm run build
 */
const _defaultAnonymous = false;  // public mode — set VITE_ANON=true for double-blind
const _envAnon = import.meta.env.VITE_ANON;
export const anonymous =
  _envAnon === undefined ? _defaultAnonymous : _envAnon !== "false";

// ── PAPER METADATA ─────────────────────────────────────────────────────────

export const title =
  "Neuro-Symbolic AI for Analytical Solutions of Differential Equations";

export const subtitle = "SIGS · Interactive companion";

export const venue = " · ICML";

/**
 * TL;DR bullets — quoted/paraphrased directly from the abstract & intro.
 * HTML tags allowed.
 */
export const tldr = [
  "SIGS uses a <strong>context-free grammar</strong> to generate only syntactically valid symbolic building blocks, then assembles them into an <em>Ansatz</em> that constrains the search to physically admissible candidate solutions by construction.",
  "A <strong>topology-regularised Graph VAE (TGVAE)</strong> embeds expression trees into a smooth continuous latent manifold — transforming combinatorial tree search into quasi-continuous optimisation over a data-supported enclosure.",
  "A <strong>two-stage solver</strong> first identifies the correct symbolic structure via iterative latent-space clustering, then refines numeric constants with JAX-based residual minimisation — recovering machine-precision analytical solutions (rel. L² ≈ 10⁻¹³–10⁻¹⁴) on classical benchmarks.",
];

/**
 * Abstract — copied verbatim from the paper.
 */
export const abstract = `Analytical solutions to differential equations offer exact, interpretable insight but are rarely available because discovering them requires expert intuition or exhaustive search in combinatorial spaces. We introduce SIGS, a neuro-symbolic framework that automates this process. SIGS uses a formal grammar to generate only syntactically valid building blocks, embeds these expressions into a continuous space, and then searches this space to assemble, score, and refine candidate closed-form solutions by minimizing a physics-based residual. This design unifies symbolic reasoning with numerical optimization; the grammar constrains candidate solution blocks to be proper by construction, while the latent search makes exploration tractable and data-free.

SIGS is the first neuro-symbolic method to (i) analytically solve coupled systems of nonlinear PDEs, (ii) discover solutions under grammar misspecification, and (iii) produce accurate symbolic approximations for PDEs lacking known closed-form solutions. Overall, SIGS achieves orders-of-magnitude improvements in accuracy and efficiency over existing symbolic methods on standard benchmarks.`;

// ── LINKS ───────────────────────────────────────────────────────────────────

export const links = {
  paper: "/paper.pdf",
  code: "https://github.com/anonymous/sigs", // replace with real URL for public mode
};

// ── AUTHORS / AFFILIATIONS (shown only when anonymous = false) ──────────────

export const authors = [
  { name: "Anonymous Author 1", affil: [1] },
  { name: "Anonymous Author 2", affil: [1, 2] },
  { name: "Anonymous Author 3", affil: [2] },
  { name: "Anonymous Author 4", affil: [1, 3] },
];

export const affiliations = [
  { id: 1, name: "Anonymous Institution" },
  { id: 2, name: "Anonymous Research Lab" },
  { id: 3, name: "Anonymous Institute" },
];

// ── LOGOS (shown only when anonymous = false) ───────────────────────────────
export const logos = [
  // { src: "/assets/eth.png",  alt: "ETH Zürich",   href: "https://ethz.ch" },
  // { src: "/assets/uzh.png",  alt: "UZH",          href: "https://uzh.ch"  },
  // { src: "/assets/ibm.png",  alt: "IBM Research", href: "https://research.ibm.com" },
];

// ── BIBTEX ──────────────────────────────────────────────────────────────────

export const bibtex = `@inproceedings{anonymous2025sigs,
  title     = {Neuro-Symbolic {AI} for Analytical Solutions of Differential Equations},
  author    = {Anonymous},
  booktitle = {Proceedings of the 42nd International Conference on Machine Learning (ICML)},
  year      = {2025},
  note      = {},
}`;

// ── METHOD STEPS A–D ────────────────────────────────────────────────────────
// Grounded in Figure 1 caption from the paper.
// Fig 1 is a 2×2 grid: A=top-left, B=bottom-left, C=top-right, D=bottom-right
// miniFlowStep: 0=A(Grammar) 1=B(Language) 2=C(TGVAE) 3=D(Search)
// highlight: overlay rect on fig1.png (percentages of image width/height)
export const methodSteps = [
  {
    id: "A",
    label: "Grammar & Language",
    miniFlowStep: 0,
    description:
      "Terminal symbols Φ and production rules R, together with non-terminals N and starting symbol S, form the grammar G = {Φ, N, R, S}. The grammar generates the mathematical library L(G) — the finite set of all syntactically valid symbolic expressions. This guarantees candidates are proper by construction, eliminating meaningless or physically inconsistent expressions before any evaluation.",
    highlight: { x: 0, y: 0, w: 50, h: 50 },
  },
  {
    id: "B",
    label: "Language of Functions",
    miniFlowStep: 1,
    description:
      "Each expression w ∈ L(G) is mapped through an interpretation map I : L(G) → U, identifying it with a concrete function u in the finite candidate set U = U(G). This compositional Ansatz separates which families of atoms and couplings are admissible (specified by the user per problem) from how those atoms are generated (handled by the CFG).",
    highlight: { x: 0, y: 50, w: 50, h: 50 },
  },
  {
    id: "C",
    label: "Autoencoding (TGVAE)",
    miniFlowStep: 2,
    description:
      "The encoder E and decoder D of the Topology-regularised Grammar VAE (TGVAE) embed the finite library L(G) into a continuous latent space Z ⊆ ℝⁿ. Three regularisers — a convex-enclosure loss, a persistent-homology loss, and a decoder-smoothness loss — ensure the manifold is smooth, data-supported, and free of topological artifacts, so that small latent moves produce predictably similar decoded expressions.",
    highlight: { x: 50, y: 0, w: 50, h: 50 },
  },
  {
    id: "D",
    label: "Solution Search",
    miniFlowStep: 3,
    description:
      "Given the PDE and system conditions, Stage I performs an iterative clustering search over z ∈ Z to identify the best symbolic structure w⋆. Stage II then freezes the form and exposes only its numeric literals as trainable parameters, minimising the discretised physics residual R(u) = ‖S[u]‖² + ‖u(0,x)−u₀‖² + ‖B[u]−g‖² using Adam in float64 JAX. An analytical solution is recovered when R(u⋆) = 0.",
    highlight: { x: 50, y: 50, w: 50, h: 50 },
  },
];
