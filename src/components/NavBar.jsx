import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#overview",    label: "Overview"    },
  { href: "#method",      label: "Method"      },
  { href: "#results",     label: "Demo"        },
  { href: "#benchmarks",  label: "Benchmarks"  },
  { href: "#citation",    label: "Citation"    },
];

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function NavBar() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("sigs-theme") || "light"; }
    catch { return "light"; }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("sigs-theme", theme); } catch {}
  }, [theme]);

  const isDark    = theme === "dark";

  return (
    <nav className="nav" aria-label="Primary navigation">
      <div className="nav-inner">
        <span className="nav-logo">SIGS</span>

        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="theme-toggle" role="group" aria-label="Color theme">
          <button
            className={`theme-btn${!isDark ? " theme-btn-active" : ""}`}
            onClick={() => setTheme("light")}
            aria-pressed={!isDark}
            title="Light mode"
          >
            <SunIcon /> Light
          </button>
          <button
            className={`theme-btn${isDark ? " theme-btn-active" : ""}`}
            onClick={() => setTheme("dark")}
            aria-pressed={isDark}
            title="Dark mode"
          >
            <MoonIcon /> Dark
          </button>
        </div>
      </div>
    </nav>
  );
}
