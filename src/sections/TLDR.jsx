import React from "react";
import { TLDR as bullets } from "../siteContent.js";

export default function TLDR() {
  return (
    <section className="alt-bg" id="tldr">
      <div className="section-inner wide">
        <div className="section-eyebrow">TL;DR</div>
        <div className="tldr-grid">
          {bullets.map((text, i) => (
            <div key={i} className="tldr-card">
              <div className="tldr-num">{i + 1}</div>
              <p className="tldr-text">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
