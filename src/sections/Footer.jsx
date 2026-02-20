import React from "react";
import { anonymous, LOGOS } from "../siteContent.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {!anonymous && LOGOS.length > 0 && (
          <div className="footer-logos">
            {LOGOS.map((l, i) => (
              <a key={i} href={l.href} target="_blank" rel="noreferrer">
                <img
                  src={l.src}
                  alt={l.alt}
                  onError={e => { e.currentTarget.style.display = "none"; }}
                />
              </a>
            ))}
          </div>
        )}
        <p className="footer-text">
          This page template is adapted from the{" "}
          <a href="https://nerfies.github.io" target="_blank" rel="noreferrer">
            Nerfies
          </a>{" "}
          project page (MIT License —{" "}
          <a
            href="https://github.com/nerfies/nerfies.github.io/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            view license
          </a>
          ).
        </p>
      </div>
    </footer>
  );
}
