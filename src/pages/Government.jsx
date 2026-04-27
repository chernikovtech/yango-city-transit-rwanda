import React from "react";
import { Link } from "react-router-dom";
import {
  C,
  F,
  useIsMobile,
  TabletMockup,
  CityDashboard,
  FareEvasionDemo,
} from "../../yango-city-transit-rwanda.jsx";
import { SubPageHero } from "../components/Layout.jsx";

const FRAMEWORKS = [
  { h: "Vision 2050", d: "70% public-transport mode share for Kigali by 2050" },
  { h: "NST2 (National Strategy for Transformation 2024–29)", d: "Smart city, digital transformation pillar" },
  { h: "Rwanda Transport Sector Strategic Plan 2024–2029", d: "Modernise PT, reduce congestion, digital fare collection" },
  { h: "Kigali City Master Plan 2050", d: "Transit-oriented development, BRT corridors" },
  { h: "World Bank RUMI ($100M, 2025–2029)", d: "Rwanda Urban Mobility Improvement — the funding backbone" },
];

const PARTNERS = [
  { h: "MININFRA", d: "Ministry of Infrastructure — policy & procurement lead" },
  { h: "MINICT", d: "Ministry of ICT & Innovation — digital transformation alignment" },
  { h: "City of Kigali", d: "Local delivery, dashboards, citizen engagement" },
  { h: "Ecofleet Solutions", d: "State-owned PT manager (since Dec 2025) — operational counterpart" },
  { h: "RURA / RTDA", d: "Sector regulation, licensing, compliance" },
];

const FARE_EVASION_STEPS = [
  {
    num: "01",
    title: "Log every app interaction",
    desc: "The citizen app logs every open, route search and live-bus track. This is the 'intent to travel' signal.",
  },
  {
    num: "02",
    title: "Log every payment",
    desc: "Tap & Go, MoMo, Airtel Money, USSD and QR payments land in the same ledger — timestamped, geo-stamped.",
  },
  {
    num: "03",
    title: "Calibrate with inspectors",
    desc: "Human inspectors spot-check a sample of routes. Their ground truth anchors the statistical model.",
  },
  {
    num: "04",
    title: "Auto-target the worst zones",
    desc: "Where intent-to-pay diverges from actual payments, the system flags the zone. Inspectors' apps show the top leakage hotspots daily.",
  },
];

export default function Government() {
  const mob = useIsMobile();

  return (
    <>
      <SubPageHero
        tag="FOR GOVERNMENT"
        title="A revenue stream. Not a cost centre."
        subtitle="Real-time city dashboards, fare-evasion control, route-optimisation analytics, and automated KPI reporting — fully aligned with Vision 2050, NST2, and the World Bank RUMI programme."
        accent={C.amber}
      />

      {/* CITY DASHBOARD MOCKUP */}
      <section style={{ background: "white", padding: mob ? "40px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#FFF8E1",
              border: "1px solid #F5D87A",
              color: "#8B6A00",
              padding: "5px 12px",
              borderRadius: "1rem",
              fontSize: 11,
              fontWeight: 600,
              marginBottom: 22,
              fontFamily: F.body,
            }}
          >
            <span>⚙</span>
            <span>Simulation — example of how the final product could look</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "0.7fr 1fr", gap: mob ? 28 : 56, alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TabletMockup label="City Operations Dashboard · Simulation">
                <CityDashboard />
              </TabletMockup>
            </div>
            <div>
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.red, marginBottom: 10 }}>
                CITY DASHBOARD
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
                What MININFRA, the City, and Ecofleet see — together, in real time.
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: F.body }}>
                {[
                  "Live fleet position across all 18 operators and 7 corridors",
                  "Daily ridership, paid-trip rate, and fare-evasion heatmap",
                  "Schedule adherence by route — bunching alerts and gaps surfaced automatically",
                  "Revenue reporting auto-generated for RURA and the Treasury",
                  "Aligned with Rwanda Transport Sector Strategic Plan KPIs out of the box",
                ].map((b, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom: i < 4 ? "1px solid #EEE" : "none",
                      fontSize: mob ? 13 : 14,
                      lineHeight: 1.55,
                      color: "#222",
                    }}
                  >
                    <span style={{ color: C.amber, fontWeight: 900, flexShrink: 0 }}>→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FARE EVASION METHODOLOGY */}
      <section style={{ background: C.black, color: "white", padding: mob ? "44px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.red, marginBottom: 10 }}>
            REVENUE CONTROL · HOW IT WORKS
          </div>
          <h2
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 26 : 38,
              fontWeight: 900,
              color: "white",
              margin: "0 0 14px",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Close the leakage.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: mob ? 14 : 16,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 36px",
              lineHeight: 1.55,
              maxWidth: 800,
            }}
          >
            In cash systems, fare-evasion is invisible until it's too late. On the platform, it's a live dashboard — and it tells inspectors exactly where to go.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
            {FARE_EVASION_STEPS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "1rem",
                  padding: "22px 20px",
                }}
              >
                <div style={{ fontFamily: F.headline, fontSize: 22, fontWeight: 900, color: C.red, margin: "0 0 12px" }}>
                  {s.num}
                </div>
                <div style={{ fontFamily: F.headline, fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 10px", letterSpacing: "-0.01em" }}>
                  {s.title}
                </div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#2A0E0B",
              border: `1px solid ${C.red}`,
              borderRadius: "1rem",
              padding: mob ? "16px 18px" : "20px 24px",
              borderLeft: `4px solid ${C.red}`,
            }}
          >
            <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.red, marginBottom: 8 }}>
              OUTCOME
            </div>
            <div style={{ fontFamily: F.body, fontSize: mob ? 13 : 15, color: "white", lineHeight: 1.55 }}>
              In comparable deployments, closing the top 30% of leakage zones captured roughly{" "}
              <span style={{ color: C.red, fontWeight: 700 }}>30% of the recoverable revenue gap</span> within the first 90 days.
            </div>
          </div>

          <FareEvasionDemo />
        </div>
      </section>

      {/* ALIGNMENT */}
      <section style={{ background: "white", padding: mob ? "44px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.red, marginBottom: 10 }}>
            ALIGNMENT · RWANDA FRAMEWORKS
          </div>
          <h2
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 26 : 36,
              fontWeight: 900,
              color: C.black,
              margin: "0 0 36px",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Built to plug into Rwanda's existing plans.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 18 : 24 }}>
            <div style={{ background: C.body, borderRadius: "1.25rem", padding: mob ? "22px 22px" : "28px 28px" }}>
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.red, marginBottom: 10 }}>
                NATIONAL POLICY & STRATEGY
              </div>
              <h3 style={{ fontFamily: F.headline, fontSize: 18, fontWeight: 900, margin: "0 0 18px", color: C.black, letterSpacing: "-0.02em" }}>
                What we align with
              </h3>
              {FRAMEWORKS.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < FRAMEWORKS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                  <span style={{ width: 4, alignSelf: "stretch", background: C.red, borderRadius: 2, flexShrink: 0 }} />
                  <div style={{ fontFamily: F.body }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.black, marginBottom: 2 }}>{f.h}</div>
                    <div style={{ fontSize: 12, color: "#555", lineHeight: 1.45 }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: C.body, borderRadius: "1.25rem", padding: mob ? "22px 22px" : "28px 28px" }}>
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.red, marginBottom: 10 }}>
                DELIVERY & OVERSIGHT
              </div>
              <h3 style={{ fontFamily: F.headline, fontSize: 18, fontWeight: 900, margin: "0 0 18px", color: C.black, letterSpacing: "-0.02em" }}>
                Who we partner with
              </h3>
              {PARTNERS.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < PARTNERS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                  <span style={{ width: 4, alignSelf: "stretch", background: C.red, borderRadius: 2, flexShrink: 0 }} />
                  <div style={{ fontFamily: F.body }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.black, marginBottom: 2 }}>{p.h}</div>
                    <div style={{ fontSize: 12, color: "#555", lineHeight: 1.45 }}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL NAV */}
      <section style={{ background: C.body, padding: mob ? "32px 0" : "48px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
            <Link to="/methodology" style={{ background: "white", padding: mob ? "20px 22px" : "24px 28px", borderRadius: "1.25rem", textDecoration: "none", color: "inherit", borderLeft: `3px solid ${C.red}`, display: "block" }}>
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.red, marginBottom: 8 }}>
                HOW WE DELIVER
              </div>
              <div style={{ fontFamily: F.headline, fontSize: mob ? 18 : 20, fontWeight: 800, color: C.black, margin: 0 }}>
                The 4-step rollout methodology →
              </div>
            </Link>
            <Link to="/impact" style={{ background: "white", padding: mob ? "20px 22px" : "24px 28px", borderRadius: "1.25rem", textDecoration: "none", color: "inherit", borderLeft: `3px solid ${C.amber}`, display: "block" }}>
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
