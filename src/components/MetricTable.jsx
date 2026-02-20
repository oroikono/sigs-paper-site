import React from "react";

/**
 * MetricTable renders a simple table of metrics for a problem.
 * It accepts an object with key/value pairs. Keys are displayed as
 * human-readable names (the keys themselves) and values are printed as-is.
 */
export default function MetricTable({ metrics }) {
  if (!metrics || Object.keys(metrics).length === 0) return null;
  return (
    <div className="metricTable">
      <h3>SIGS metrics</h3>
      <table>
        <tbody>
          {Object.entries(metrics).map(([key, value]) => (
            <tr key={key}>
              <td style={{ textTransform: "capitalize" }}>{key.replace(/_/g, " ")}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
