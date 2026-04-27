import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { C, F, useIsMobile } from "../../yango-city-transit-rwanda.jsx";

const NAV_ITEMS = [
  { to: "/", label: "Overview" },
  { to: "/citizens", label: "Citizens" },
  { to: "/operators", label: "Operators" },
  { to: "/government", label: "Government" },
  { to: "/methodology", label: "Methodology" },
  { to: "/platform", label: "Platform" },
  { to: "/impact", label: "Impact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mob = useIsMobile();
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  // Close on resize to desktop
  useEffect(() => {
    if (!mob) setOpen(false);
  }, [mob]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: mob ? "12px 16px" : "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "white",
            fontFamily: F.headline,
            fontWeight: 900,
            fontSize: mob ? 13 : 14,
            letterSpacing: "0.02em",
          }}
        >
          <img
            src="https://avatars.mds.yandex.net/get-lpc/14837328/21641dca-3288-4eeb-8d99-81f8cb31a763/orig"
            alt="Yango Tech"
            style={{ height: mob ? 18 : 20, width: "auto", filter: "invert(1)" }}
          />
          <span style={{ opacity: 0.5, fontWeight: 400 }}>·</span>
          <span style={{ textTransform: "uppercase" }}>Rwanda</span>
        </Link>

        {!mob && (
          <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_ITEMS.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                style={({ isActive }) => ({
                  color: isActive ? "white" : "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontFamily: F.body,
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  transition: "color 0.2s",
                  borderBottom: isActive ? `2px solid ${C.red}` : "2px solid transparent",
                  paddingBottom: 4,
                })}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        )}

        {mob && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
              padding: "8px 12px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: F.body,
              cursor: "pointer",
              minHeight: 36,
            }}
          >
            {open ? "Close" : "Menu"}
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      {mob && open && (
        <div
          style={{
            background: "rgba(0,0,0,0.95)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "8px 16px 20px",
          }}
        >
          {NAV_ITEMS.map((n, i) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              style={({ isActive }) => ({
                display: "block",
                color: isActive ? C.red : "white",
                textDecoration: "none",
                fontFamily: F.body,
                fontSize: 15,
                fontWeight: isActive ? 700 : 500,
                padding: "12px 0",
                borderBottom: i < NAV_ITEMS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              })}
            >
              {n.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const mob = useIsMobile();
  return (
    <footer style={{ background: C.black, padding: mob ? "32px 0 20px" : "44px 0 28px", textAlign: "center" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 14 }}>
          <img
            src="https://avatars.mds.yandex.net/get-lpc/14837328/21641dca-3288-4eeb-8d99-81f8cb31a763/orig"
            alt="Yango Tech"
            style={{ height: 22, width: "auto", filter: "invert(1)" }}
          />
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, fontFamily: F.body }}>
          Prepared for the Government of Rwanda — building on Tap & Go, Ecofleet and the World Bank RUMI programme.
        </p>
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: 11,
            color: "rgba(255,255,255,0.25)",
            fontFamily: F.body,
          }}
        >
          © 2026 Yango Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/**
 * SubPageHero — small breadcrumb + title block used on every sub-page (not /).
 */
export function SubPageHero({ tag, title, subtitle, accent = C.red }) {
  const mob = useIsMobile();
  return (
    <section
      style={{
        background: C.black,
        color: "white",
        paddingTop: mob ? 100 : 128,
        paddingBottom: mob ? 36 : 56,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Link
          to="/"
          style={{
            color: "rgba(255,255,255,0.55)",
            textDecoration: "none",
            fontSize: 12,
            fontFamily: F.body,
            fontWeight: 600,
            letterSpacing: "0.05em",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 18,
          }}
        >
          ← Back to overview
        </Link>
        <div
          style={{
            display: "inline-block",
            background: `${accent}20`,
            border: `1px solid ${accent}40`,
            color: accent,
            padding: "5px 14px",
            borderRadius: "1.875rem",
            fontSize: mob ? 10 : 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            marginBottom: 16,
            fontFamily: F.body,
          }}
        >
          {tag}
        </div>
        <h1
          style={{
            fontFamily: F.headline,
            fontSize: mob ? 28 : 44,
            fontWeight: 900,
            color: "white",
            margin: "0 0 12px",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily: F.body,
              fontSize: mob ? 14 : 17,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              maxWidth: 760,
              lineHeight: 1.55,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function Layout({ children }) {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "60vh" }}>{children}</main>
      <Footer />
    </>
  );
}
