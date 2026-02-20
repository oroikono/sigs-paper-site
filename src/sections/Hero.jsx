import React from "react";
import { anonymous, SITE, AUTHORS, AFFILIATIONS, LOGOS } from "../siteContent.js";
import GitHubIcon from "../components/GitHubIcon.jsx";

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  const { title, subtitle, noticeLine, venue, links } = SITE;
  return (
    <section className="hero" id="overview">
      <div className="hero-venue">{venue}</div>

      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>

      {anonymous ? (
        <div className="anon-badge">
          <span>🔒</span> Anonymous Submission · Double-blind review
        </div>
      ) : (
        <>
          <p className="hero-authors">
            {AUTHORS.map((a, i) => (
              <span key={i}>
                {i > 0 && ", "}
                {a.url
                  ? <a href={a.url} target="_blank" rel="noreferrer" className="author-link">{a.name}</a>
                  : a.name}
                {a.aff.map(id => <sup key={id}>{id}</sup>)}
              </span>
            ))}
          </p>
          <div className="hero-affiliations">
            {Object.entries(AFFILIATIONS).map(([id, name]) => (
              <div key={id}><sup>{id}</sup>{name}</div>
            ))}
          </div>
          {LOGOS.length > 0 && (
            <div className="logos-row">
              {LOGOS.map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noreferrer">
                  <img
                    src={BASE + l.src.replace(/^\//, "")}
                    alt={l.alt}
                    onError={e => { e.currentTarget.style.display = "none"; }}
                  />
                </a>
              ))}
            </div>
          )}
        </>
      )}

      <div className="btn-row">
        <a className="btn-primary" href={links.paperPdf} target="_blank" rel="noreferrer">
          📄 Paper
        </a>
        <span className="btn-secondary" style={{ opacity: 0.6, cursor: "default" }}>
          <GitHubIcon /> {links.codeRepoLabel || "Code"}
        </span>
      </div>

      <div className="hero-quick-links">
        <a href={links.paperPdf} target="_blank" rel="noreferrer">PDF ↗</a>
        <a href="#abstract">Abstract</a>
        <a href="#method">Method</a>
        <a href="#results">Demo ↓</a>
        <a href="#benchmarks">Benchmarks</a>
        <a href="#citation">BibTeX</a>
      </div>
      <p className="hero-notice">{noticeLine}</p>
    </section>
  );
}
