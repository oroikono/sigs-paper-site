import React, { useEffect, useRef, useState, useMemo } from "react";
import Plotly from "plotly.js-dist-min";

/**
 * PlotPanel — interactive Plotly charts matching light / dark theme.
 *
 * "line"                  → LinePlot     (all time slices overlaid)
 * "heatmap" + time_anim   → AnimatedHeatmap  (single field, time slider + play/pause)
 * "heatmap"               → TabHeatmap   (multiple static fields, tab switcher)
 * "multi_animated_heatmap"→ MultiAnimatedHeatmap (multiple fields each time-animated)
 */

// ── Colour helpers ────────────────────────────────────────────────────────────

const LINE_PALETTE = [
  "#2563eb", "#e11d48", "#16a34a", "#d97706", "#7c3aed",
  "#0891b2", "#be123c", "#065f46",
];

// Paper-matched RdBu diverging: blue=negative, white=0, red=positive
const RD_BU = [
  [0.0, "#2166ac"], [0.1, "#4393c3"], [0.2, "#74add1"],
  [0.3, "#abd9e9"], [0.4, "#d1e5f0"], [0.5, "#f7f7f7"],
  [0.6, "#fddbc7"], [0.7, "#f4a582"], [0.8, "#d6604d"],
  [0.9, "#b2182b"], [1.0, "#67001f"],
];

function getTheme() {
  const dark = document.documentElement.dataset.theme === "dark";
  return dark
    ? {
        paper_bgcolor: "transparent",
        plot_bgcolor:  "rgba(8,11,20,0.5)",
        font:          { color: "#b8c5d9", family: "Inter,system-ui,sans-serif", size: 13 },
        xaxis:  { gridcolor: "#1e2d44", linecolor: "#1e2d44", tickfont: { color: "#7d8fa8" }, zerolinecolor: "#1e2d44" },
        yaxis:  { gridcolor: "#1e2d44", linecolor: "#1e2d44", tickfont: { color: "#7d8fa8" }, zerolinecolor: "#1e2d44" },
        legend: { bgcolor: "rgba(20,25,41,0.85)", bordercolor: "#1e2d44", borderwidth: 1, font: { color: "#b8c5d9" } },
      }
    : {
        paper_bgcolor: "transparent",
        plot_bgcolor:  "#f8fafc",
        font:          { color: "#3d4f6b", family: "Inter,system-ui,sans-serif", size: 13 },
        xaxis:  { gridcolor: "#e2e8f0", linecolor: "#dde3ed", tickfont: { color: "#6b7d96" }, zerolinecolor: "#dde3ed" },
        yaxis:  { gridcolor: "#e2e8f0", linecolor: "#dde3ed", tickfont: { color: "#6b7d96" }, zerolinecolor: "#dde3ed" },
        legend: { bgcolor: "rgba(255,255,255,0.9)", bordercolor: "#dde3ed", borderwidth: 1, font: { color: "#3d4f6b" } },
      };
}

// Pick colorscale: RdBu for density/pressure fields (matching paper figures)
// and for any field that crosses zero; Viridis for positive-only sequential data.
function pickColorscale(vals, fieldName = "") {
  const lower = fieldName.toLowerCase();
  if (lower.includes("ρ") || lower.includes("density") || lower.includes("pressure")) {
    return "diverging";
  }
  const mn = Math.min(...vals), mx = Math.max(...vals);
  return mn < -0.05 && mx > 0.05 ? "diverging" : "sequential";
}

// For diverging data that is all-positive (like density centered ~1),
// compute symmetric bounds around the data midpoint.
function divergingBounds(vals) {
  const mn = Math.min(...vals), mx = Math.max(...vals);
  const mid = (mn + mx) / 2;
  const halfRange = Math.max(mx - mid, mid - mn);
  return { zmid: mid, zmin: mid - halfRange, zmax: mid + halfRange };
}

// ── Play / Pause button row (shared UI) ───────────────────────────────────────
function PlayControls({ playing, onPlay, onPause }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
      <button
        className={`tab-btn${playing ? " active" : ""}`}
        style={{ padding: "5px 16px", fontSize: "0.82rem" }}
        onClick={onPlay}
      >▶ Play</button>
      <button
        className={`tab-btn${!playing ? " active" : ""}`}
        style={{ padding: "5px 16px", fontSize: "0.82rem" }}
        onClick={onPause}
      >⏸ Pause</button>
    </div>
  );
}

// ── Slider-only layout helper ─────────────────────────────────────────────────
function makeSlider(steps, fontColor) {
  return {
    active:  0,
    steps,
    x: 0, len: 1,
    y: -0.1, yanchor: "top",
    pad: { t: 8, b: 8 },
    currentvalue: {
      visible: true, xanchor: "center",
      font: { size: 13, color: fontColor },
    },
    transition: { duration: 50, easing: "linear" },
    font:        { color: fontColor, size: 10 },
    bgcolor:     "rgba(150,150,150,0.12)",
    bordercolor: "rgba(150,150,150,0.28)",
  };
}

// ── Line plot ─────────────────────────────────────────────────────────────────
function LinePlot({ plots }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !plots) return;
    const th = getTheme();
    Plotly.newPlot(
      ref.current,
      plots.t_slices.map((s, i) => ({
        x: plots.x, y: s.u,
        name: `t = ${s.t}`, mode: "lines",
        line: { color: LINE_PALETTE[i % LINE_PALETTE.length], width: 2 },
        hovertemplate: "x=%{x:.2f}  u=%{y:.4f}<extra>t=" + s.t + "</extra>",
      })),
      {
        paper_bgcolor: th.paper_bgcolor, plot_bgcolor: th.plot_bgcolor, font: th.font,
        xaxis:  { ...th.xaxis, title: { text: "x", font: { color: th.font.color } } },
        yaxis:  { ...th.yaxis, title: { text: "u", font: { color: th.font.color } } },
        legend: { ...th.legend, orientation: "h", x: 0, y: 1.12, xanchor: "left" },
        margin: { t: 40, r: 16, l: 54, b: 48 },
        hovermode: "x unified",
      },
      { responsive: true }
    );
    return () => { if (ref.current) Plotly.purge(ref.current); };
  }, [plots]);

  return <div ref={ref} style={{ width: "100%", height: 420 }} />;
}

// ── Animated heatmap (single field, time animation) ───────────────────────────
function AnimatedHeatmap({ plots }) {
  const ref      = useRef(null);
  const timerRef = useRef(null);
  const frameRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const n = plots.fields.length;

  // Init Plotly once per plots object
  useEffect(() => {
    if (!ref.current || !plots) return;
    const th = getTheme();
    const allZ  = plots.fields.flatMap(f => f.z.flat());
    const zmax  = Math.max(...allZ.map(Math.abs));

    const sliderSteps = plots.fields.map((f, i) => ({
      label: f.label, method: "animate",
      args:  [[String(i)], { frame: { duration: 80, redraw: true }, mode: "immediate", transition: { duration: 50 } }],
    }));

    Plotly.newPlot(ref.current, [{
      type: "heatmap", x: plots.x, y: plots.y, z: plots.fields[0].z,
      colorscale: RD_BU, zmin: -zmax, zmax, zmid: 0, zsmooth: "best",
      colorbar: { tickfont: { color: th.font.color, size: 11 },
                  title: { text: "u(x,y,t)", font: { color: th.font.color, size: 12 } },
                  len: 0.85, thickness: 14 },
    }], {
      paper_bgcolor: th.paper_bgcolor, plot_bgcolor: th.plot_bgcolor, font: th.font,
      xaxis:  { ...th.xaxis, title: { text: "x", font: { color: th.font.color } }, constrain: "domain" },
      yaxis:  { ...th.yaxis, title: { text: "y", font: { color: th.font.color } }, scaleanchor: "x" },
      margin: { t: 10, r: 20, l: 54, b: 76 },
      sliders: [makeSlider(sliderSteps, th.font.color)],
    }, { responsive: true });

    Plotly.addFrames(ref.current, plots.fields.map((f, i) => ({ name: String(i), data: [{ z: f.z }] })));
    frameRef.current = 0;

    // Sync frameRef when user drags slider
    ref.current.on("plotly_sliderchange", ev => {
      const idx = plots.fields.findIndex(f => f.label === ev.step.label);
      if (idx >= 0) frameRef.current = idx;
    });

    return () => { if (ref.current) Plotly.purge(ref.current); };
  }, [plots]);

  // React-driven play loop
  useEffect(() => {
    clearInterval(timerRef.current);
    if (!playing) return;
    timerRef.current = setInterval(() => {
      frameRef.current = (frameRef.current + 1) % n;
      if (ref.current) {
        Plotly.animate(ref.current, [String(frameRef.current)], {
          transition: { duration: 50, easing: "linear" },
          frame: { duration: 80, redraw: true }, mode: "immediate",
        });
      }
    }, 120);
    return () => clearInterval(timerRef.current);
  }, [playing, n]);

  return (
    <div>
      <PlayControls playing={playing} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <div ref={ref} style={{ width: "100%", height: 500 }} />
    </div>
  );
}

// ── Multi-field animated heatmap (SWE: ρ, u, v each with time animation) ──────
function MultiAnimatedHeatmap({ plots }) {
  // plots.data[fieldIdx][frameIdx] = z-array
  const ref       = useRef(null);
  const timerRef  = useRef(null);
  const frameRef  = useRef(0);
  const [fieldIdx, setFieldIdx] = useState(0);
  const [playing,  setPlaying]  = useState(false);
  const n = plots.t_labels.length;

  // Per-field colorscale info
  const fieldInfo = useMemo(() =>
    plots.field_names.map((name, fi) => {
      const vals = plots.data[fi].flat(2);
      const mn = Math.min(...vals), mx = Math.max(...vals);
      const type = pickColorscale(vals, name);
      if (type === "diverging") {
        const crossesZero = mn < -0.05 && mx > 0.05;
        if (crossesZero) {
          const absMax = Math.max(Math.abs(mn), mx);
          return { mn, mx, type, zmin: -absMax, zmax: absMax, zmid: 0 };
        }
        const bounds = divergingBounds(vals);
        return { mn, mx, type, ...bounds };
      }
      return { mn, mx, type, zmin: mn, zmax: mx, zmid: undefined };
    }), [plots]);

  // Re-init when field changes
  useEffect(() => {
    if (!ref.current || !plots) return;
    const th = getTheme();
    const info = fieldInfo[fieldIdx];
    const label = (plots.colorbar_labels || plots.field_names)[fieldIdx];

    const sliderSteps = plots.t_labels.map((lbl, i) => ({
      label: lbl, method: "animate",
      args:  [[String(i)], { frame: { duration: 80, redraw: true }, mode: "immediate", transition: { duration: 50 } }],
    }));

    const trace = {
      type: "heatmap", x: plots.x, y: plots.y, z: plots.data[fieldIdx][0],
      colorscale: info.type === "diverging" ? RD_BU : "Viridis",
      zsmooth: "best",
      colorbar: { tickfont: { color: th.font.color, size: 11 },
                  title: { text: label, font: { color: th.font.color, size: 12 } },
                  len: 0.85, thickness: 14 },
      zmin: info.zmin, zmax: info.zmax,
      ...(info.zmid !== undefined ? { zmid: info.zmid } : {}),
    };

    Plotly.newPlot(ref.current, [trace], {
      paper_bgcolor: th.paper_bgcolor, plot_bgcolor: th.plot_bgcolor, font: th.font,
      xaxis:  { ...th.xaxis, title: { text: "x", font: { color: th.font.color } }, constrain: "domain" },
      yaxis:  { ...th.yaxis, title: { text: "y", font: { color: th.font.color } }, scaleanchor: "x" },
      margin: { t: 10, r: 20, l: 54, b: 76 },
      sliders: [makeSlider(sliderSteps, th.font.color)],
    }, { responsive: true });

    Plotly.addFrames(ref.current, plots.data[fieldIdx].map((z, i) => ({ name: String(i), data: [{ z }] })));
    frameRef.current = 0;

    ref.current.on("plotly_sliderchange", ev => {
      const idx = plots.t_labels.indexOf(ev.step.label);
      if (idx >= 0) frameRef.current = idx;
    });

    return () => { if (ref.current) Plotly.purge(ref.current); };
  }, [plots, fieldIdx, fieldInfo]);

  // Pause when switching fields
  useEffect(() => {
    setPlaying(false);
    clearInterval(timerRef.current);
    frameRef.current = 0;
  }, [fieldIdx]);

  // Play loop
  useEffect(() => {
    clearInterval(timerRef.current);
    if (!playing) return;
    timerRef.current = setInterval(() => {
      frameRef.current = (frameRef.current + 1) % n;
      if (ref.current) {
        Plotly.animate(ref.current, [String(frameRef.current)], {
          transition: { duration: 50, easing: "linear" },
          frame: { duration: 80, redraw: true }, mode: "immediate",
        });
      }
    }, 120);
    return () => clearInterval(timerRef.current);
  }, [playing, fieldIdx, n]);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        <div className="filter-tabs" style={{ margin: 0, gap: 6 }}>
          {plots.field_names.map((name, i) => (
            <button
              key={name}
              className={`tab-btn${i === fieldIdx ? " active" : ""}`}
              onClick={() => setFieldIdx(i)}
            >{name}</button>
          ))}
        </div>
        <PlayControls
          playing={playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
      <div ref={ref} style={{ width: "100%", height: 500 }} />
    </div>
  );
}

// ── Static heatmap with tab switcher ─────────────────────────────────────────
function TabHeatmap({ plots }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  // Smart colorscale per field — forces RdBu for density/pressure
  const fieldInfo = useMemo(() =>
    plots.fields.map(f => {
      const vals = f.z.flat();
      const mn = Math.min(...vals), mx = Math.max(...vals);
      const type = pickColorscale(vals, f.label);
      if (type === "diverging") {
        const crossesZero = mn < -0.05 && mx > 0.05;
        if (crossesZero) {
          const absMax = Math.max(Math.abs(mn), mx);
          return { mn, mx, type, zmin: -absMax, zmax: absMax, zmid: 0 };
        }
        const bounds = divergingBounds(vals);
        return { mn, mx, type, ...bounds };
      }
      return { mn, mx, type, zmin: mn, zmax: mx, zmid: undefined };
    }), [plots]);

  useEffect(() => {
    if (!ref.current || !plots) return;
    const th = getTheme();
    const f  = plots.fields[active];
    const info = fieldInfo[active];

    Plotly.newPlot(ref.current, [{
      type: "heatmap", x: plots.x, y: plots.y, z: f.z,
      colorscale: info.type === "diverging" ? RD_BU : "Viridis",
      zsmooth: "best",
      colorbar: { tickfont: { color: th.font.color, size: 11 }, len: 0.85, thickness: 14 },
      zmin: info.zmin, zmax: info.zmax,
      ...(info.zmid !== undefined ? { zmid: info.zmid } : {}),
    }], {
      paper_bgcolor: th.paper_bgcolor, plot_bgcolor: th.plot_bgcolor, font: th.font,
      xaxis: { ...th.xaxis, title: { text: "x", font: { color: th.font.color } }, constrain: "domain" },
      yaxis: { ...th.yaxis, title: { text: "y", font: { color: th.font.color } }, scaleanchor: "x" },
      margin: { t: 10, r: 20, l: 54, b: 48 },
    }, { responsive: true });

    return () => { if (ref.current) Plotly.purge(ref.current); };
  }, [plots, active, fieldInfo]);

  return (
    <div>
      <div className="filter-tabs" style={{ marginBottom: 12 }}>
        {plots.fields.map((f, i) => (
          <button key={f.label} className={`tab-btn${i === active ? " active" : ""}`} onClick={() => setActive(i)}>
            {f.label}
          </button>
        ))}
      </div>
      <div ref={ref} style={{ width: "100%", height: 480 }} />
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function PlotPanel({ plots }) {
  if (!plots) return null;
  if (plots.type === "line")                    return <LinePlot plots={plots} />;
  if (plots.type === "multi_animated_heatmap")  return <MultiAnimatedHeatmap plots={plots} />;
  if (plots.type === "heatmap" && plots.time_animation) return <AnimatedHeatmap plots={plots} />;
  if (plots.type === "heatmap")                 return <TabHeatmap plots={plots} />;
  return null;
}
