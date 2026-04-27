import React from "react";
import { Link } from "react-router-dom";
import { C, F, useIsMobile } from "../../yango-city-transit-rwanda.jsx";
import { DubaiVideo } from "../components/DubaiVideo.jsx";

const HERO_STATS = [
  { val: "~100%", label: "4G Population Coverage" },
  { val: "90%+", label: "Smartphone Penetration" },
  { val: "500", label: "Public Buses in Kigali" },
  { val: "250K", label: "Daily Passenger Rides" },
];

const PILLARS = [
  {
    num: "01",
    title: "For Citizens",
    headline: "Real-time arrivals. Cashless fares.",
    body: "One white-label app for every passenger — live bus tracking, multi-modal route planning, and digital fare payment. Same product Dubai is using today.",
    color: C.green,
    href: "/citizens",
  },
  {
    num: "02",
    title: "For Carriers",
    headline: "One operator console.",
    body: "GPS fleet tracking, computer-vision safety, automated dispatch and KPI reporting — co-delivered with Ecofleet across all 18 licensed operators.",
    color: C.blue,
    href: "/operators",
  },
  {
    num: "03",
    title: "For Government",
    headline: "Revenue stream. Not a cost centre.",
    body: "Real-time dashboards, fare-evasion control, and route-optimisation analytics. Fully aligned with Vision 2050, NST2, and the World Bank RUMI programme.",
    color: C.amber,
    href: "/government",
  },
];

export default function Home() {
  const mob = useIsMobile();

  return (
    <>
      {/* HERO */}
      <section
        style={{
          background: C.black,
          color: "white",
          paddingTop: mob ? 88 : 116,
          paddingBottom: mob ? 36 : 64,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, ${C.red}12 0%, transparent 40%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              background: `${C.red}20`,
              border: `1px solid ${C.red}40`,
              color: C.red,
              padding: "6px 16px",
              borderRadius: "1.875rem",
              fontSize: mob ? 11 : 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginBottom: mob ? 18 : 22,
              fontFamily: F.body,
            }}
          >
            CITY TRANSPORT BY YANGO · RWANDA
          </div>

          <h1
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 36 : 64,
              fontWeight: 900,
              lineHeight: 1.02,
              color: "white",
              margin: "0 0 18px",
              letterSpacing: "-0.035em",
              maxWidth: 1100,
            }}
          >
            Accelerate Kigali's <span style={{ color: C.red }}>smart mobility.</span>
          </h1>

          <p
            style={{
              fontFamily: F.body,
              fontSize: mob ? 15 : 19,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.66)",
              maxWidth: 760,
              margin: "0 0 28px",
            }}
          >
            A revenue-generating public-transport platform aligned with Vision 2050, NST2, and the World Bank RUMI programme — delivered in partnership with MININFRA, Ecofleet, and RURA.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: mob ? 8 : 14,
              marginBottom: mob ? 28 : 40,
              maxWidth: 880,
            }}
          >
            {HERO_STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: mob ? 12 : 14,
                  padding: mob ? "14px 12px" : "18px 16px",
                }}
              >
                <div style={{ fontFamily: F.headline, fontSize: mob ? 22 : 26, fontWeight: 900, color: "white" }}>
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: mob ? 10 : 11,
                    color: "rgba(255,255,255,0.55)",
                    marginTop: 4,
                    fontFamily: F.body,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: mob ? 36 : 48 }}>
            <Link
              to="/platform"
              style={{
                background: C.red,
                color: "white",
                padding: mob ? "12px 22px" : "14px 28px",
                borderRadius: "1rem",
                fontWeight: 700,
                fontSize: mob ? 14 : 15,
                textDecoration: "none",
                fontFamily: F.body,
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              See the platform live →
            </Link>
            <Link
              to="/government"
              style={{
                color: "white",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: mob ? "12px 22px" : "14px 28px",
                borderRadius: "1rem",
                fontWeight: 600,
                fontSize: mob ? 14 : 15,
                textDecoration: "none",
                fontFamily: F.body,
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Read the Government brief
            </Link>
          </div>

          {/* DUBAI VIDEO PROOF — Amendment 2 */}
          <div style={{ marginTop: mob ? 8 : 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 14,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    color: C.red,
                    fontSize: mob ? 10 : 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    marginBottom: 6,
                    fontFamily: F.body,
                  }}
                >
                  PROOF · ALREADY LIVE
                </div>
                <h2
                  style={{
                    fontFamily: F.headline,
                    fontSize: mob ? 24 : 32,
                    fontWeight: 900,
                    color: "white",
                    margin: 0,
                    letterSpacing: "-0.025em",
                  }}
                >
                  Already live in Dubai.
                </h2>
              </div>
              <Link
                to="/platform"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontFamily: F.body,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Other deployments →
              </Link>
            </div>

            <DubaiVideo variant="hero" mob={mob} />

            <p
              style={{
                fontFamily: F.body,
                fontSize: mob ? 13 : 15,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.7)",
                marginTop: 18,
                marginBottom: 8,
                maxWidth: 920,
              }}
            >
              The citizen searches for a route, picks a public bus, sees the real-time ETA, and pays in-app. The Yango platform is the consumer-facing layer; Dubai's RTA keeps full control of the fleet — same architecture we'd ship to Kigali.
            </p>
            <p
              style={{
                fontFamily: F.body,
                fontSize: mob ? 12 : 13,
                color: "rgba(255,255,255,0.45)",
                margin: 0,
              }}
            >
              Same platform — live in Tashkent, Yerevan, Yaroslavl, and now Dubai.{" "}
              <Link to="/platform" style={{ color: C.red, textDecoration: "none", fontWeight: 600 }}>
                Kigali next →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* THREE PILLAR CARDS */}
      <section style={{ background: C.body, padding: mob ? "44px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: mob ? 28 : 40 }}>
            <div
              style={{
                color: C.red,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                marginBottom: 10,
                fontFamily: F.body,
              }}
            >
              THE PLATFORM
            </div>
            <h2
              style={{
                fontFamily: F.headline,
                fontSize: mob ? 26 : 38,
                fontWeight: 900,
                margin: 0,
                color: C.black,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              One platform. Three transformations.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 14 : 22 }}>
            {PILLARS.map((p, i) => (
              <Link
                key={i}
                to={p.href}
                style={{
                  background: "white",
                  borderRadius: "1.5rem",
                  padding: mob ? "24px 22px" : "32px 28px",
                  textDecoration: "none",
                  color: "inherit",
                  borderTop: `4px solid ${p.color}`,
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontFamily: F.body,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: p.color,
                    marginBottom: 10,
                  }}
                >
                  {p.num} · {p.title.toUpperCase()}
                </div>
                <div
                  style={{
                    fontFamily: F.headline,
                    fontSize: mob ? 22 : 24,
                    fontWeight: 900,
                    color: C.black,
                    margin: "0 0 12px",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {p.headline}
                </div>
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: mob ? 13 : 14,
                    lineHeight: 1.55,
                    color: "#444",
                    margin: "0 0 22px",
                    flex: 1,
                  }}
                >
                  {p.body}
                </p>
                <div
                  style={{
                    fontFamily: F.body,
                    fontSize: 13,
                    fontWeight: 700,
                    color: p.color,
                    marginTop: "auto",
                  }}
                >
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT BAR — single stat */}
      <section style={{ background: C.black, padding: mob ? "44px 0" : "64px 0", color: "white" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: mob ? "1fr" : "auto 1fr",
            gap: mob ? 18 : 60,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: F.body,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 8,
              }}
            >
              MODELLED REVENUE UPLIFT
            </div>
            <div
              style={{
                fontFamily: F.headline,
                fontSize: mob ? 56 : 88,
                fontWeight: 900,
                color: C.red,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              +$115M
            </div>
            <div
              style={{
                fontFamily: F.body,
                fontSize: mob ? 12 : 14,
                color: "rgba(255,255,255,0.55)",
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              per year — Yerevan benchmark
            </div>
          </div>
          <div>
            <p
              style={{
                fontFamily: F.body,
                fontSize: mob ? 14 : 17,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.78)",
                margin: "0 0 16px",
                maxWidth: 720,
              }}
            >
              In a comparable capital city of one million residents, paid-trip uplift after platform rollout delivered roughly $115M in incremental annual revenue — through higher fare capture, lower leakage, and right-sized fleet allocation.
            </p>
            <Link
              to="/impact"
              style={{
                color: C.red,
                textDecoration: "none",
                fontFamily: F.body,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              How we modelled it →
            </Link>
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
              fontSize: mob ? 26 : 36,
              fontWeight: 900,
              margin: "0 0 14px",
              letterSpacing: "-0.025em",
              color: "white",
              lineHeight: 1.15,
            }}
          >
            Ready to brief Hon. Iradukunda's office?
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: mob ? 14 : 16,
              color: "rgba(255,255,255,0.85)",
              margin: "0 0 24px",
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.5,
            }}
          >
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
