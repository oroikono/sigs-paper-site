import React from "react";

/**
 * Renders a select dropdown for choosing a problem from the catalog.
 * The `catalog` prop should be an array of objects with `id` and `name`
 * fields. The `value` prop controls the selected problem ID, and
 * `onChange` is called when the selection changes.
 */
export default function ProblemPicker({ catalog, value, onChange }) {
  return (
    <div className="row">
      <select
        className="select"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {catalog.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
