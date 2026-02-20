import React, { useEffect, useState } from "react";
import MiniFlow from "./MiniFlow.jsx";

// Steps describing the SIGS method succinctly.
const STEPS = [
  {
    title: "Grammar",
    description:
      "Generate candidate atoms and formulas from symbolic grammar rules.",
  },
  {
    title: "Latent search",
    description:
      "Embed formulas into a learned latent manifold and search for candidates.",
  },
  {
    title: "Residual & refinement",
    description:
      "Optimize constants by minimizing physics residuals and refine the solution.",
  },
];

/**
 * A simple rotating carousel that cycles through the SIGS method steps.
 * Users can click the dots to jump directly to a step. An interval
 * automatically advances the active step every few seconds.
 */
export default function SigsIn30() {
  const [step, setStep] = useState(0);

  // Automatically cycle steps
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sigs30">
      <MiniFlow step={step} />
      <div className="steps">
        {STEPS.map((st, idx) => (
          <div key={st.title} className={`step ${idx === step ? "active" : ""}`}>
            <h3>{st.title}</h3>
            <p>{st.description}</p>
          </div>
        ))}
      </div>
      <div className="dots">
        {STEPS.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === step ? "active" : ""}`}
            onClick={() => setStep(idx)}
            aria-label={`Show step ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
