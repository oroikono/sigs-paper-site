import React from "react";
import SigsIn30 from "./SigsIn30.jsx";

/**
 * MethodOverview composes an illustrative figure for the SIGS pipeline
 * alongside a short interactive description. The figure is served from
 * the public/assets directory. Feel free to replace `fig1.png` with an
 * exported version of Figure 1 from the paper.
 */
export default function MethodOverview() {
  return (
    <div>
      <img
        src="/assets/fig1.png"
        alt="SIGS pipeline"
        style={{ width: "100%", borderRadius: "14px" }}
      />
      <SigsIn30 />
    </div>
  );
}
