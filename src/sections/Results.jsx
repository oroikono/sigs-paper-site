import React, { useEffect, useState, useMemo } from "react";
import ProblemPicker from "../components/ProblemPicker.jsx";
import EquationBlock from "../components/EquationBlock.jsx";
import PlotPanel from "../components/PlotPanel.jsx";
import MetricTable from "../components/MetricTable.jsx";
import BaselineTable from "../components/BaselineTable.jsx";

const BASE = import.meta.env.BASE_URL;

async function fetchJSON(path) {
  const r = await fetch(BASE + path.replace(/^\//, ""));
  if (!r.ok) throw new Error(`Failed to load ${path}`);
  return r.json();
}

const FILTERS = [
  { id: "all",     label: "All benchmarks" },
  { id: "known",   label: "Known analytical solution" },
  { id: "unknown", label: "Unknown / FEM reference" },
];

export default function Results() {
  const [catalog, setCatalog]     = useState([]);
  const [filter, setFilter]       = useState("all");
  const [problemId, setProblemId] = useState(null);
  const [problem, setProblem]     = useState(null);
  const [loading, setLoading]     = useState(true);

  // Load problem catalog on mount
  useEffect(() => {
    (async () => {
      try {
        const c = await fetchJSON("/data/problems.json");
        setCatalog(c.problems || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredCatalog = useMemo(() => {
    if (filter === "known")   return catalog.filter(p => p.known !== false);
    if (filter === "unknown") return catalog.filter(p => p.known === false);
    return catalog;
  }, [catalog, filter]);

  // Auto-select first problem when catalog or filter changes
  useEffect(() => {
    setProblemId(filteredCatalog[0]?.id ?? null);
  }, [filteredCatalog]);

  // Load selected problem data
  useEffect(() => {
    if (!problemId) { setProblem(null); return; }
    (async () => {
      try {
        setProblem(null);
        const p = await fetchJSON(`/data/${problemId}.json`);
        setProblem(p);
      } catch (e) {
        console.error(e);
        setProblem(null);
      }
    })();
  }, [problemId]);

  const hasPlot   = problem?.plots != null;
  const hasFigure = problem?.figure != null;

  return (
    <section id="results">
      <div className="section-inner wide">
        <div className="section-eyebrow">Interactive Demo</div>
        <h2 className="section-title">Results Explorer</h2>

        <p className="demo-intro">
          Select a benchmark PDE to see the governing equation, the analytical solution
          (or symbolic approximation) discovered by SIGS, performance metrics, and a
          comparison against baseline methods. Plots are fully interactive — hover, zoom,
          and toggle time slices.
        </p>

        {/* Filter tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Benchmark filter">
          {FILTERS.map(f => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`tab-btn${filter === f.id ? " active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: "var(--muted)" }}>Loading benchmarks…</p>
        ) : (
          <>
            {/* Problem selector */}
            <div className="demo-card" style={{ marginBottom: 14 }}>
              <div className="demo-card-title">Choose a PDE benchmark</div>
              {filteredCatalog.length > 0 ? (
                <ProblemPicker
                  catalog={filteredCatalog}
                  value={problemId}
                  onChange={setProblemId}
                />
              ) : (
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  No problems in this category.
                </p>
              )}
            </div>

            {/* Equations + metrics side-by-side */}
            {problem && (
              <>
                <div className="demo-grid">
                  {/* Left: equations */}
                  <div className="demo-card">
                    <div className="demo-card-title">Equations</div>
                    {problem.pde_latex && (
                      <EquationBlock label="PDE" latex={problem.pde_latex} />
                    )}
                    {problem.domain_latex && (
                      <EquationBlock
                        label="Domain / Conditions"
                        latex={problem.domain_latex}
                      />
                    )}
                    {problem.ansatz_latex && (
                      <EquationBlock label="Ansatz" latex={problem.ansatz_latex} />
                    )}
                    {problem.solution_latex && (
                      <EquationBlock
                        label="SIGS discovered"
                        latex={problem.solution_latex}
                      />
                    )}
                    {problem.true_latex && (
                      <EquationBlock
                        label="True solution"
                        latex={problem.true_latex}
                      />
                    )}
                    {problem.note && (
                      <p className="problem-note">{problem.note}</p>
                    )}
                  </div>

                  {/* Right: performance */}
                  <div className="demo-card">
                    <div className="demo-card-title">Performance</div>
                    {problem.metrics && (
                      <MetricTable metrics={problem.metrics} />
                    )}
                    {problem.baseline && (
                      <BaselineTable baseline={problem.baseline} />
                    )}
                  </div>
                </div>

                {/* Paper figure (always shown when present, no extra header) */}
                {hasFigure && (
                  <div className="demo-card result-figure-card">
                    <img
                      src={BASE + problem.figure.replace(/^\//, "")}
                      alt={problem.figure_caption || problem.name}
                      className="result-figure"
                    />
                    {problem.figure_caption && (
                      <p className="result-figure-caption">{problem.figure_caption}</p>
                    )}
                  </div>
                )}

                {/* Interactive plot (only when plot data is available) */}
                {hasPlot && (
                  <div className="demo-card">
                    <div className="demo-card-title">Interactive plot</div>
                    <PlotPanel plots={problem.plots} />
                  </div>
                )}
              </>
            )}

            {!problem && problemId && (
              <p style={{ color: "var(--muted)", marginTop: 12 }}>Loading problem…</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
