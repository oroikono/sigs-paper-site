import React from "react";
import { MINI_FLOW } from "../siteContent.js";

/**
 * MiniFlow: SVG pipeline diagram with 3 nodes (Grammar → Latent manifold → Residual & refine).
 * step prop: 0/1/2 highlights the corresponding node.
 */

const BOX_W = 220;
const BOX_H = 68;
const BOX_Y = 11;
const GAP   = 48;
const ARR   = 42;

const starts = MINI_FLOW.map((_, i) => 8 + i * (BOX_W + GAP + ARR));
const centers = starts.map(x => x + BOX_W / 2);
const TOTAL_W = starts[MINI_FLOW.length - 1] + BOX_W + 8;

export default function MiniFlow({ step = 0 }) {
  const isActive = (i) => i === step;
  const isPast   = (i) => step > i;

  const boxStyle = (i) => ({
    stroke:      isActive(i) ? "var(--accent)" : "var(--border)",
    fill:        isActive(i) ? "var(--accent-bg)" : "var(--bg-alt)",
    strokeWidth: isActive(i) ? 2 : 1.5,
    transition:  "all 0.35s",
  });

  const arrowCol = (i) =>
    (isPast(i) || isActive(i)) ? "var(--accent)" : "var(--border)";

  const titleCol = (i) => isActive(i) ? "var(--text)"  : "var(--muted)";
  const subCol   = (i) => isActive(i) ? "var(--text2)" : "var(--dim)";

  const midY = BOX_Y + BOX_H / 2;

  return (
    <div style={{ marginTop: 4 }}>
      <svg
        viewBox={`0 0 ${TOTAL_W} 90`}
        width="100%"
        height="90"
        role="img"
        aria-label="SIGS pipeline: Grammar → Latent manifold → Residual & refine"
      >
        {MINI_FLOW.map((s, i) => {
          const x = starts[i];
          const cx = centers[i];

          const showArrow = i < MINI_FLOW.length - 1;
          const ax1 = x + BOX_W + 4;
          const ax2 = x + BOX_W + GAP + ARR - 4;
          const ax3 = ax2 - 1;

          return (
            <g key={s.id}>
              <rect
                x={x} y={BOX_Y}
                rx="12" ry="12"
                width={BOX_W} height={BOX_H}
                style={boxStyle(i)}
              />

              <text
                x={cx} y={BOX_Y + 28}
                textAnchor="middle"
                fontSize="14" fontWeight="700"
                fill={titleCol(i)}
                style={{ transition: "fill 0.35s" }}
              >
                {s.label}
              </text>

              <text
                x={cx} y={BOX_Y + 48}
                textAnchor="middle"
                fontSize="11"
                fill={subCol(i)}
                fontFamily="'JetBrains Mono', 'Fira Mono', monospace"
                style={{ transition: "fill 0.35s" }}
              >
                {s.sub}
              </text>

              {showArrow && (
                <>
                  <line
                    x1={ax1} y1={midY} x2={ax3} y2={midY}
                    stroke={arrowCol(i + 1)}
                    strokeWidth="2.5"
                    style={{ transition: "stroke 0.35s" }}
                  />
                  <polygon
                    points={`${ax3 + 5},${midY} ${ax3 - 7},${midY - 6} ${ax3 - 7},${midY + 6}`}
                    fill={arrowCol(i + 1)}
                    style={{ transition: "fill 0.35s" }}
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
