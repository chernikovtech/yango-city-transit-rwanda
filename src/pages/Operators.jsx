import React from "react";
import { Link } from "react-router-dom";
import {
  C,
  F,
  useIsMobile,
  PhoneMockup,
  TabletMockup,
  DriverApp,
  OperatorDashboard,
  SpeedMapDemo,
} from "../../yango-city-transit-rwanda.jsx";
import { SubPageHero } from "../components/Layout.jsx";

const CV_USE_CASES = [
  {
    title: "Bus-depot security",
    desc: "Overnight vehicle accountability, theft prevention, unauthorised access alerts at depot gates.",
  },
  {
    title: "Crowding detection at major stops",
    desc: "Real-time passenger volume at Nyabugogo and Kicukiro — informs frequency adjustments and inspector deployment.",
  },
  {
    title: "Bus-bay occupancy at terminals",
    desc: "Live stand allocation at interchange hubs — reduces dwell-time and prevents bay conflicts during peak.",
  },
  {
    title: "Accident & incident detection",
    desc: "Automatic detection at hubs and along BRT corridors. Alerts dispatched to MININFRA, RNP and emergency response within seconds.",
  },
  {
    title: "Lane-discipline monitoring",
    desc: "Cars violating dedicated bus lanes detected, plate captured, evidence packaged for RTDA enforcement.",
  },
  {
    title: "Licence-plate recognition for fare-evasion",
    desc: "Optional gate-based vehicle and passenger counting at terminals. Cross-checks against ticketing data — closes the leakage loop.",
  },
];

export default function Operators() {
  const mob = useIsMobile();

  return (
    <>
      <SubPageHero
        tag="FOR CARRIERS"
        title="One operator console for every bus, every depot, every camera."
        subtitle="Live fleet tracking, automated dispatching, computer-vision safety, and KPI reporting — co-delivered with Ecofleet across all 18 licensed Kigali operators."
        accent={C.blue}
      />

      {/* DRIVER CONSOLE + OPERATOR DASHBOARD */}
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
            DRIVER & DISPATCH
          </div>
          <h2
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 26 : 38,
              fontWeight: 900,
              color: C.black,
              margin: "0 0 18px",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Drivers know the route. Dispatchers know the fleet.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: mob ? 14 : 16,
              lineHeight: 1.6,
              color: "#333",
              margin: "0 0 36px",
              maxWidth: 760,
            }}
          >
            Standardised digital tooling across all 18 licensed Kigali operators — navigation, schedule adherence, automated fare collection on the driver side; live fleet status, dispatch, and KPI reporting on the operator side. Aligned with RURA's regulatory framework.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 28 : 36 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <PhoneMockup label="Driver Console · Simulation">
                <DriverApp />
              </PhoneMockup>
              <p style={{ fontFamily: F.body, fontSize: 13, color: "#555", marginTop: 18, textAlign: "center", maxWidth: 320, lineHeight: 1.5 }}>
                In-cab interface — turn-by-turn navigation, schedule adherence, automated fare collection.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <PhoneMockup label="Operator Dashboard · Simulation">
                <OperatorDashboard />
              </PhoneMockup>
              <p style={{ fontFamily: F.body, fontSize: 13, color: "#555", marginTop: 18, textAlign: "center", maxWidth: 320, lineHeight: 1.5 }}>
                Operator control tower — live fleet status, dispatch decisions, KPI reporting to MININFRA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPUTER VISION INTEGRATION — Amendment 3 */}
      <section style={{ background: C.black, color: "white", padding: mob ? "44px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: mob ? 28 : 40, display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 24 : 56, alignItems: "start" }}>
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: `${C.red}20`,
                  border: `1px solid ${C.red}40`,
                  color: C.red,
                  padding: "5px 14px",
                  borderRadius: "1.875rem",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  marginBottom: 14,
                  fontFamily: F.body,
                }}
              >
                OPERATIONS + SAFETY
              </div>
              <h2
                style={{
                  fontFamily: F.headline,
                  fontSize: mob ? 26 : 38,
                  fontWeight: 900,
                  color: "white",
                  margin: "0 0 18px",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                Computer Vision integration.
              </h2>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: mob ? 14 : 16,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.7)",
                  margin: 0,
                }}
              >
                The same platform connects to the city's existing camera infrastructure. Object-detection models run on-edge or in the cloud and surface real-time alerts to the operator console — without any new hardware on the buses themselves.
              </p>
            </div>

            {/* CV demo video — the existing screencast that was previously labelled "Operations Dashboard" */}
            <div
              style={{
                background: "#1a1a1a",
                borderRadius: "1.25rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  background: "#0d0d18",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ width: 8, height: 8, background: "#FF5F57", borderRadius: "50%" }} />
                <div style={{ width: 8, height: 8, background: "#FFBD2E", borderRadius: "50%" }} />
                <div style={{ width: 8, height: 8, background: "#28CA41", borderRadius: "50%" }} />
                <span style={{ marginLeft: 10, fontSize: 10, color: "rgba(255,255,255,0.45)", fontFamily: F.body }}>
                  CV-detection feed — depot camera
                </span>
              </div>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", display: "block" }}
                poster="https://res.cloudinary.com/dc99897dw/video/upload/so_1,f_jpg,w_800,q_auto/Screen_Recording_2026-02-12_at_1.11.13_PM_khhntc.jpg"
              >
                <source
                  src="https://res.cloudinary.com/dc99897dw/video/upload/f_mp4,q_auto,w_800,ac_none/Screen_Recording_2026-02-12_at_1.11.13_PM_khhntc.mp4"
                  type="video/mp4"
                />
              </video>
              <div style={{ padding: "14px 18px", fontFamily: F.body, fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                Live detection feed — vehicles tagged, counted, audited. Same pipeline applies to passenger crowding, lane discipline, and incident response.
              </div>
            </div>
          </div>

          {/* Use-case grid */}
          <h3
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 18 : 22,
              fontWeight: 900,
              color: "white",
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            What it can do.
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr", gap: 14 }}>
            {CV_USE_CASES.map((u, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "1rem",
                  padding: "20px 18px",
                  borderTop: `2px solid ${C.red}`,
                }}
              >
                <div
                  style={{
                    fontFamily: F.headline,
                    fontSize: 15,
                    fontWeight: 800,
                    color: "white",
                    margin: "0 0 8px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {u.title}
                </div>
                <div
                  style={{
                    fontFamily: F.body,
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {u.desc}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: F.body,
              fontSize: mob ? 12 : 13,
              color: "rgba(255,255,255,0.45)",
              marginTop: 28,
              maxWidth: 800,
              lineHeight: 1.5,
            }}
          >
            Optional ML modules (driver drowsiness detection, mobile-phone use detection) are available on request — recommended only after baseline operational deployment and explicit driver-union and RURA approval.
          </p>
        </div>
      </section>

      {/* SPEED MAP DEMO */}
      <section style={{ background: C.body, padding: mob ? "44px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
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
            ROUTE INTELLIGENCE
          </div>
          <h2
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 24 : 32,
              fontWeight: 900,
              color: C.black,
              margin: "0 0 14px",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            Where buses run fast — and where they don't.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: mob ? 13 : 15,
              lineHeight: 1.6,
              color: "#444",
              margin: "0 0 28px",
              maxWidth: 760,
            }}
          >
            Real-time and historical bus speeds across Kigali. Hover any district to see the average speed and the platform's recommendation — extend service, redeploy, or invest in lane priority.
          </p>
          <SpeedMapDemo />
        </div>
      </section>

      {/* INTERNAL NAV */}
      <section style={{ background: "white", padding: mob ? "32px 0" : "48px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
            <Link
              to="/government"
              style={{
                background: C.body,
                padding: mob ? "20px 22px" : "24px 28px",
                borderRadius: "1.25rem",
                textDecoration: "none",
                color: "inherit",
                borderLeft: `3px solid ${C.amber}`,
                display: "block",
              }}
            >
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.amber, marginBottom: 8 }}>
                NEXT — FOR GOVERNMENT
              </div>
              <div style={{ fontFamily: F.headline, fontSize: mob ? 18 : 20, fontWeight: 800, color: C.black, margin: 0 }}>
                City dashboards, fare-evasion control, alignment →
              </div>
            </Link>
            <Link
              to="/platform"
              style={{
                background: C.body,
                padding: mob ? "20px 22px" : "24px 28px",
                borderRadius: "1.25rem",
                textDecoration: "none",
                color: "inherit",
                borderLeft: `3px solid ${C.red}`,
                display: "block",
              }}
            >
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.red, marginBottom: 8 }}>
                PLATFORM
              </div>
              <div style={{ fontFamily: F.headline, fontSize: mob ? 18 : 20, fontWeight: 800, color: C.black, margin: 0 }}>
                See every screencast + dashboard →
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
