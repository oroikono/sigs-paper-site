import React from "react";
import { ABSTRACT } from "../siteContent.js";

export default function Abstract() {
  const paragraphs = ABSTRACT.trim().split(/\n\n+/);
  return (
    <section id="abstract">
      <div className="section-inner">
        <div className="section-eyebrow">Abstract</div>
        <div className="abstract-body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p.trim()}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
