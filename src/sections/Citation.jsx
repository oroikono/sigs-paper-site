import React, { useState } from "react";
import { BIBTEX } from "../siteContent.js";

export default function Citation() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(BIBTEX.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <section className="alt-bg" id="citation">
      <div className="section-inner">
        <div className="section-eyebrow">Citation</div>
        <h2 className="section-title">Cite This Work</h2>
        <p className="cite-intro">
          If you use SIGS or build on this work, please cite:
        </p>
        <div className="bibtex-wrap">
          <div className="bibtex-topbar">
            <span className="bibtex-lang">BibTeX</span>
            <button
              className={`copy-btn${copied ? " copied" : ""}`}
              onClick={handleCopy}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre className="bibtex-code">{BIBTEX.trim()}</pre>
        </div>
      </div>
    </section>
  );
}
