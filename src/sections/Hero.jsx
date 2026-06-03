import React from "react";
import { anonymous, SITE, AUTHORS, AFFILIATIONS, LOGOS } from "../siteContent.js";
import GitHubIcon from "../components/GitHubIcon.jsx";

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  const { title, subtitle, noticeLine, venue, links } = SITE;
  return (
    <section className="hero" id="overview">
      <div className="hero-venue">
        {links.icml
          ? <a href={links.icml} target="_blank" rel="noreferrer">{venue}</a>
          : venue}
      </div>

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

      <div className="btn-row hero-cta-row">
        <a className="btn-primary" href={links.arxiv} target="_blank" rel="noreferrer">
          📄 Paper
        </a>
        {links.icml && (
          <a className="btn-secondary" href={links.icml} target="_blank" rel="noreferrer">
            ICML Poster
          </a>
        )}
        <a className="btn-secondary" href={links.codeRepo} target="_blank" rel="noreferrer">
          <GitHubIcon /> {links.codeRepoLabel || "Code"}
        </a>
        {links.video && (
          <a className="btn-secondary" href={links.video} target="_blank" rel="noreferrer">
            ▶ 5-min Video
          </a>
        )}
      </div>

      <div className="hero-quick-links" aria-label="Page sections">
        <a href="#abstract">Abstract</a>
        <a href="#method">Method</a>
        <a href="#results">Demo</a>
        <a href="#benchmarks">Benchmarks</a>
        <a href="#citation">BibTeX</a>
      </div>
      <p className="hero-notice">{noticeLine}</p>
    </section>
  );
}
