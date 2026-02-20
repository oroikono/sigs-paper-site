import React from "react";
import NavBar       from "./components/NavBar.jsx";
import Hero         from "./sections/Hero.jsx";
import TLDR         from "./sections/TLDR.jsx";
import Abstract     from "./sections/Abstract.jsx";
import Method       from "./sections/Method.jsx";
import Results      from "./sections/Results.jsx";
import ResultsTable from "./sections/ResultsTable.jsx";
import Citation     from "./sections/Citation.jsx";
import Footer       from "./sections/Footer.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <TLDR />
      <Abstract />
      <Method />
      <Results />
      <ResultsTable />
      <Citation />
      <Footer />
    </>
  );
}
