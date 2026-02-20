import React from "react";
import { LIMITATIONS } from "../siteContent.js";

export default function Limitations() {
  return (
    <section id="limitations">
      <div className="section-inner">
        <div className="section-eyebrow">Limitations</div>
        <h2 className="section-title">Current Limitations</h2>
        <ul className="limitations-list">
          {LIMITATIONS.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
