import React, { useState } from "react";
import {
  BENCHMARKS,
  RESULTS_HIGHLIGHTS,
  KNOWN_COLS,
  UNKNOWN_COLS,
} from "../siteContent.js";

const CATEGORY_FILTERS = [
  { id: "all",     label: "All"                      },
  { id: "known",   label: "Known analytical"         },
  { id: "unknown", label: "Unknown (FEniCS ref.)"    },
];

function MetricCell({ value, isSigs }) {
  // SIGS column values get accent colour when they look like small numbers (machine precision)
  const isMachinePrecision = isSigs && value.includes("10⁻");
  return (
    <td
      className={
        "rt-cell" +
        (isSigs ? " rt-sigs" : "") +
        (isMachinePrecision ? " rt-machine" : "")
      }
    >
      {value}
    </td>
  );
}

function BenchmarkTable({ rows, cols }) {
  return (
    <div className="rt-scroll">
      <table className="rt-table">
        <thead>
          <tr>
            <th className="rt-th rt-th-name">Benchmark</th>
            {cols.map(c => (
              <th key={c} className={"rt-th" + (c === "SIGS" ? " rt-th-sigs" : "")}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(b => (
            <tr key={b.id} className="rt-row">
              <td className="rt-name">
                {b.name}
                {b.note && <span className="rt-note"> — {b.note}</span>}
              </td>
              {cols.map(c => (
                <MetricCell
                  key={c}
                  value={b.metrics[c] ?? "—"}
                  isSigs={c === "SIGS"}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ResultsTable() {
  const [filter, setFilter] = useState("all");

  const known   = BENCHMARKS.filter(b => b.category === "Known analytical");
  const unknown = BENCHMARKS.filter(b => b.category === "Unknown (FEniCS reference)");

  return (
    <section id="benchmarks">
      <div className="section-inner wide">
        <div className="section-eyebrow">Results at a Glance</div>
        <h2 className="section-title">Benchmark Summary</h2>

        {/* Highlights */}
        <ul className="results-highlights">
          {RESULTS_HIGHLIGHTS.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

        {/* Category filter */}
        <div className="filter-tabs" style={{ marginBottom: 24 }}>
          {CATEGORY_FILTERS.map(f => (
            <button
              key={f.id}
              className={`tab-btn${filter === f.id ? " active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Known-solution table */}
        {(filter === "all" || filter === "known") && (
          <div style={{ marginBottom: 32 }}>
            <div className="rt-category-label">Known analytical solutions</div>
            <p className="rt-caption">
              Relative L² error — lower is better. Values without a % suffix indicate near-zero
              absolute error (machine precision).
            </p>
            <BenchmarkTable rows={known} cols={KNOWN_COLS} />
          </div>
        )}

        {/* Unknown/FEM-reference table */}
        {(filter === "all" || filter === "unknown") && (
          <div>
            <div className="rt-category-label">Unknown solutions (FEniCS reference)</div>
            <p className="rt-caption">
              Relative L² error (%) compared to a high-resolution FEniCS reference solution.
            </p>
            <BenchmarkTable rows={unknown} cols={UNKNOWN_COLS} />
          </div>
        )}

        <p className="rt-footnote">
          † DNF = did not finish within time budget. Errors for SIGS are from the best run;
          baselines use published or reproduced figures.
        </p>
      </div>
    </section>
  );
}
