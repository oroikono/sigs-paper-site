import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

function renderLatex(latex) {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: true,
    });
  } catch {
    // fallback to plain text if KaTeX fails
    return `<pre>${latex}</pre>`;
  }
}

/**
 * Display a labeled block of LaTeX using KaTeX. The label appears in a
 * muted color above the rendered equation.
 */
export default function EquationBlock({ label, latex }) {
  return (
    <div className="eqBlock">
      <div className="eqLabel">{label}</div>
      <div
        className="eqLatex"
        dangerouslySetInnerHTML={{ __html: renderLatex(latex) }}
      />
    </div>
  );
}
