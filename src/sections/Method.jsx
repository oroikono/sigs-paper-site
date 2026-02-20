import React, { useState, useEffect, useCallback } from "react";
import { METHOD_STEPS } from "../siteContent.js";
import MiniFlow from "../components/MiniFlow.jsx";

export default function Method() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIdx(i => (i + 1) % METHOD_STEPS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const selectStep = useCallback(i => {
    setActiveIdx(i);
    setPaused(true);
    const t = setTimeout(() => setPaused(false), 12000);
    return () => clearTimeout(t);
  }, []);

  const step = METHOD_STEPS[activeIdx];

  return (
    <section className="alt-bg" id="method">
      <div className="section-inner wide">
        <div className="section-eyebrow">Method</div>
        <h2 className="section-title">The SIGS Pipeline</h2>

        <div className="method-stepper">
          {METHOD_STEPS.map((s, i) => (
            <button
              key={s.id}
              className={`step-tab${i === activeIdx ? " active" : ""}`}
              onClick={() => selectStep(i)}
              aria-pressed={i === activeIdx}
            >
              <div className="step-tab-id">Panel {s.title.charAt(0)}</div>
              <div className="step-tab-name">{s.title.slice(3)}</div>
            </button>
          ))}
        </div>

        <div className="method-fig-wrap">
          <img src="/assets/fig1.png" alt="SIGS pipeline overview — Figure 1" />
          {step.highlight && (
            <div
              className="fig-overlay-rect"
              style={{
                left:   `${step.highlight.x}%`,
                top:    `${step.highlight.y}%`,
                width:  `${step.highlight.w}%`,
                height: `${step.highlight.h}%`,
              }}
            />
          )}
        </div>

        <div className="mini-flow-wrap">
          <MiniFlow step={step.miniFlowStep} />
        </div>

        <div className="step-desc-card">
          <div className="step-desc-label">
            {step.title}
          </div>
          <p className="step-desc-text">{step.body}</p>
        </div>

        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 20 }}>
          {METHOD_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => selectStep(i)}
              aria-label={`Step ${i + 1}`}
              style={{
                width: 8, height: 8,
                borderRadius: "50%",
                border: "none",
                background: i === activeIdx ? "var(--accent)" : "var(--border)",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
