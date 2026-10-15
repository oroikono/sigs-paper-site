// Shared paper content for the interactive page and its initial HTML.
export const SITE = {
  title:
    "Neuro-Symbolic AI for Analytical Solutions of Differential Equations",
  subtitle:
    "SIGS: grammar-constrained latent search that assembles, scores, and refines closed-form solutions by minimizing physics residuals.",
  noticeLine:
    "Interactive companion page (paper-style). Scroll for method → interactive results → citation.",
  venue: "ICML 2026",
  links: {
    paperPdf: "/paper.pdf",
    arxiv: "https://arxiv.org/abs/2502.01476",
    icml: "https://icml.cc/virtual/2026/poster/63043",
    codeRepo: "https://github.com/oroikono/SIGS",
    codeRepoLabel: "Code",
    video: "https://www.youtube.com/watch?v=a9MMvKVGhuQ",
  },
};

export const AUTHORS = [
  { name: "Orestis Oikonomou", aff: [1, 2, 3], url: "https://ai.ethz.ch/about-us/people.html" },
  { name: "Levi Lingsch", aff: [1, 2, 3], url: "https://scholar.google.com/citations?user=9pJIGJUAAAAJ" },
  { name: "Dana Grund", aff: [1, 4], url: "https://camlab.ethz.ch/the-group/people.html" },
  { name: "Siddhartha Mishra", aff: [1, 2], url: "https://math.ethz.ch/sam/the-institute/people/siddhartha-mishra.html" },
  { name: "Georgios Kissas", aff: [5], url: "https://scholar.google.com/citations?user=gGvVfmAAAAAJ" },
];

export const ABSTRACT =
  "Analytical solutions to differential equations offer exact, interpretable insight but are rarely available because discovering them requires expert intuition or exhaustive search in combinatorial spaces. We introduce SIGS, a neuro-symbolic framework that automates this process. SIGS uses a formal grammar to generate only syntactically valid building blocks, embeds these expressions into a continuous space, and then searches this space to assemble, score, and refine candidate closed-form solutions by minimizing a physics-based residual. This design unifies symbolic reasoning with numerical optimization; the grammar constrains candidate solution blocks to be proper by construction, while the latent search makes exploration tractable and data-free. SIGS is the first neuro-symbolic method to (i) analytically solve coupled systems of nonlinear PDEs, (ii) discover solutions under grammar misspecification, and (iii) produce accurate symbolic approximations for PDEs lacking known closed-form solutions. Overall, SIGS achieves orders-of-magnitude improvements in accuracy and efficiency over existing symbolic methods on standard benchmarks.";

export const BIBTEX = `@inproceedings{pmlr-v306-oikonomou26a,
  title = {Neuro-Symbolic {AI} for Analytical Solutions of Differential Equations},
  author = {Oikonomou, Orestis and Lingsch, Levi and Grund, Dana and Mishra, Siddhartha and Kissas, Georgios},
  booktitle = {Proceedings of the 43rd International Conference on Machine Learning},
  series = {Proceedings of Machine Learning Research},
  volume = {306},
  pages = {94420--94451},
  year = {2026},
  publisher = {PMLR},
  url = {https://proceedings.mlr.press/v306/oikonomou26a.html}
}`;
