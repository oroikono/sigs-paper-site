import React from "react";

/**
 * BaselineTable renders a comparison table for multiple methods.
 * Each entry in the baseline array should contain `method`, `error`,
 * and `time_sec` properties. Additional fields are ignored.
 */
export default function BaselineTable({ baseline }) {
  if (!baseline || baseline.length === 0) return null;
  return (
    <div className="baselineTable">
      <h3>Baseline comparison</h3>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Rel&nbsp;L2</th>
            <th>Time&nbsp;(s)</th>
          </tr>
        </thead>
        <tbody>
          {baseline.map((row, idx) => (
            <tr key={idx}>
              <td>{row.method}</td>
              <td>{row.error}</td>
              <td>{row.time_sec}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
