import React from "react";
import { Link } from "react-router-dom";
import { C, F, useIsMobile, Counter } from "../../yango-city-transit-rwanda.jsx";
import { SubPageHero } from "../components/Layout.jsx";

const SOURCES = [
  {
    h: "Closing fare evasion",
    d: "Leakage of 20–35% in cash systems → sub-10% with digital payments and ML-targeted inspection.",
  },
  {
    h: "Right-sizing the fleet",
    d: "Analytics reveals over-served corridors. Redeploy buses where demand actually is — typically ~15% operating-cost saving.",
  },
  {
    h: "Frequency-based service design",
    d: "Trunk routes with higher frequency grow ridership disproportionately. Houston METRO redesign delivered +30% weekend ridership.",
  },
  {
    h: "Existing infrastructure on top",
    d: "Rwanda's $430M FY25/26 infra budget plus the $100M World Bank RUMI fund the rails. The platform sits on top — no parallel investment needed.",
  },
];

export default function Impact() {
  const mob = useIsMobile();

  return (
    <>
      <SubPageHero
        tag="IMPACT · YEREVAN BENCHMARK"
        title="A new revenue stream, not a cost centre."
        subtitle="Benchmarked against a comparable Yango Tech deployment in a capital city of similar size and demographic profile."
        accent={C.amber}
      />

      {/* HEADLINE NUMBER */}
      <section style={{ background: "white", padding: mob ? "44px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1.2fr", gap: mob ? 28 : 56, alignItems: "center" }}>
            <div
              style={{
                background: C.black,
                borderRadius: "1.5rem",
                padding: mob ? "32px 24px" : "44px 36px",
                color: "white",
              }}
            >
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
                MODELLED REVENUE UPLIFT
              </div>
              <div
                style={{
                  fontFamily: F.headline,
                  fontSize: mob ? 56 : 80,
                  fontWeight: 900,
                  color: C.red,
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  marginBottom: 8,
                }}
              >
                +$115M
              </div>
              <div style={{ fontFamily: F.body, fontSize: mob ? 13 : 15, color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>
                additional annual revenue
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 22, display: "flex", gap: 36, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontFamily: F.headline, fontSize: 28, fontWeight: 900, color: "white" }}>
                    +<Counter end={30} suffix="%" duration={1500} />
                  </div>
                  <div style={{ fontFamily: F.body, fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                    paid passenger trips
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: F.headline, fontSize: 28, fontWeight: 900, color: "white" }}>
                    ~<Counter end={30} suffix="%" duration={1500} />
                  </div>
                  <div style={{ fontFamily: F.body, fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                    increase in fare revenue
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: F.headline, fontSize: mob ? 22 : 28, fontWeight: 900, color: C.black, margin: "0 0 24px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Where the money comes from.
              </h2>
              {SOURCES.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red, marginTop: 8, flexShrink: 0 }} />
                  <div style={{ fontFamily: F.body }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.black, marginBottom: 4 }}>{s.h}</div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.55 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MULTILATERAL FINANCING */}
      <section style={{ background: C.body, padding: mob ? "44px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.red, marginBottom: 10 }}>
            FINANCING
          </div>
          <h2
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 26 : 36,
              fontWeight: 900,
              color: C.black,
              margin: "0 0 18px",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Funded by the rails Rwanda has already laid.
          </h2>
          <p style={{ fontFamily: F.body, fontSize: mob ? 14 : 16, lineHeight: 1.6, color: "#333", margin: "0 0 24px", maxWidth: 760 }}>
            The platform sits on top of Rwanda's existing infrastructure investment — no parallel ask. The digitised fare stream and recovered leakage fund the platform, then return a net positive to the Treasury.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
            <div style={{ background: "white", padding: mob ? "22px 22px" : "26px 28px", borderRadius: "1.25rem", borderLeft: `4px solid ${C.red}` }}>
              <div style={{ fontFamily: F.headline, fontSize: 26, fontWeight: 900, color: C.red, marginBottom: 6 }}>
                $430M
              </div>
              <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 700, color: C.black, marginBottom: 4 }}>
                Rwanda infrastructure budget — FY25/26
              </div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: "#555", lineHeight: 1.5 }}>
                Existing line-item allocation. The platform doesn't add to this number.
              </div>
            </div>
            <div style={{ background: "white", padding: mob ? "22px 22px" : "26px 28px", borderRadius: "1.25rem", borderLeft: `4px solid ${C.amber}` }}>
              <div style={{ fontFamily: F.headline, fontSize: 26, fontWeight: 900, color: C.amber, marginBottom: 6 }}>
                $100M
              </div>
              <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 700, color: C.black, marginBottom: 4 }}>
                World Bank RUMI — 2025–2029
              </div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: "#555", lineHeight: 1.5 }}>
                Ring-fenced for Rwanda Urban Mobility Improvement. Public-transport digitisation is in scope.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          background: C.red,
          padding: mob ? "44px 0" : "60px 0",
          color: "white",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>
          <h2
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 24 : 34,
              fontWeight: 900,
              margin: "0 0 14px",
              letterSpacing: "-0.025em",
              color: "white",
              lineHeight: 1.15,
            }}
          >
            Ready to brief Hon. Iradukunda's office?
          </h2>
          <p style={{ fontFamily: F.body, fontSize: mob ? 14 : 16, color: "rgba(255,255,255,0.85)", margin: "0 0 24px", lineHeight: 1.5 }}>
            We will run a 90-minute working session with MININFRA, Ecofleet, and your office to scope the Kigali pilot.
          </p>
          <a
            href="mailto:eechernikov@yango.com?subject=Yango%20City%20Transit%20—%20Rwanda%20pilot%20briefing"
            style={{
              background: "white",
              color: C.red,
              padding: mob ? "12px 22px" : "14px 32px",
              borderRadius: "1rem",
              fontWeight: 700,
              fontSize: mob ? 14 : 15,
              textDecoration: "none",
              fontFamily: F.body,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              minHeight: 44,
            }}
          >
            Schedule the briefing →
          </a>
        </div>
      </section>
    </>
  );
}
