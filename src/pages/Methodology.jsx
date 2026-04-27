import React from "react";
import { Link } from "react-router-dom";
import { C, F, useIsMobile, RouteDesignMethodology } from "../../yango-city-transit-rwanda.jsx";
import { SubPageHero } from "../components/Layout.jsx";

export default function Methodology() {
  const mob = useIsMobile();

  return (
    <>
      <SubPageHero
        tag="HOW WE DELIVER"
        title="Four steps. That's it."
        subtitle="A simple, sequenced rollout. Each step stands on its own and delivers value — Kigali can stop at Step 02 or continue to Step 04. Budget, scope and timeline are decided by the city, not pre-set by us."
        accent={C.red}
      />

      <section style={{ background: C.body, padding: mob ? "44px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <RouteDesignMethodology />
        </div>
      </section>

      {/* INTERNAL NAV */}
      <section style={{ background: "white", padding: mob ? "32px 0" : "48px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
            <Link to="/platform" style={{ background: C.body, padding: mob ? "20px 22px" : "24px 28px", borderRadius: "1.25rem", textDecoration: "none", color: "inherit", borderLeft: `3px solid ${C.red}`, display: "block" }}>
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.red, marginBottom: 8 }}>
                PLATFORM
              </div>
              <div style={{ fontFamily: F.headline, fontSize: mob ? 18 : 20, fontWeight: 800, color: C.black, margin: 0 }}>
                See every screencast and dashboard →
              </div>
            </Link>
            <Link to="/impact" style={{ background: C.body, padding: mob ? "20px 22px" : "24px 28px", borderRadius: "1.25rem", textDecoration: "none", color: "inherit", borderLeft: `3px solid ${C.amber}`, display: "block" }}>
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.amber, marginBottom: 8 }}>
                IMPACT
              </div>
              <div style={{ fontFamily: F.headline, fontSize: mob ? 18 : 20, fontWeight: 800, color: C.black, margin: 0 }}>
                The Yerevan +$115M case →
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
