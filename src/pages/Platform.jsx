import React from "react";
import { Link } from "react-router-dom";
import { C, F, useIsMobile } from "../../yango-city-transit-rwanda.jsx";
import { SubPageHero } from "../components/Layout.jsx";
import { DubaiVideo } from "../components/DubaiVideo.jsx";
import { FastVideo } from "../components/FastVideo.jsx";

const TASHKENT_VIDEOS = [
  {
    id: "IMG_4799_kzkmkx",
    title: "Citizen App — route planning",
    desc: "Live bus tracking, multi-modal route planner, all-in-one citizen experience.",
    tag: "Live · Tashkent",
    width: 400,
  },
  {
    id: "IMG_4800_ltvopm",
    title: "Citizen App — live arrivals",
    desc: "Real-time vehicle position on the map. Tap any bus to see exact arrival countdown.",
    tag: "Live · Tashkent",
    width: 400,
  },
  {
    id: "iOS_Traffic_Lights_ywbdsj",
    title: "Smart traffic signals",
    desc: "Countdown timers for traffic lights — drivers see seconds to next phase, reducing stop-and-go.",
    tag: "Live · Tashkent",
    width: 400,
  },
  {
    id: "CarPlay_Traffic_Lights_l5uzje",
    title: "CarPlay & in-vehicle",
    desc: "Apple CarPlay with live signal countdown — for fleet operators and individual drivers.",
    tag: "Live · Tashkent",
    width: 800,
  },
];

const DASHBOARDS = [
  {
    img: "https://res.cloudinary.com/dc99897dw/image/upload/w_1200,q_auto,f_auto/yango-tech/demos/rwanda-city/schedule-optimization-yaroslavl.jpg",
    title: "Schedule optimisation",
    desc: "Live screen from Yaroslavl. 105 vehicles, 1,327 vehicle-hours/day. Bunching, gaps, and over/under-served stops surfaced automatically.",
    tag: "Production · Yaroslavl",
  },
  {
    img: "https://res.cloudinary.com/dc99897dw/image/upload/w_1200,q_auto,f_auto/yango-tech/demos/rwanda-city/public-transport-accessibility.jpg",
    title: "Accessibility analysis",
    desc: "Pink = residents. Green/yellow = routes and operating speed. Where pink exists without a line, the city extends a route.",
    tag: "Production",
  },
  {
    img: "https://res.cloudinary.com/dc99897dw/image/upload/w_1600,q_auto,f_auto/yango-tech/demos/rwanda-city/fare-evasion-tracking.jpg",
    title: "Fare-evasion & revenue control",
    desc: "Daily boardings vs alightings vs payments. The gap is the leakage — typically 20–35% in cash systems. Closing it: ~$115M / year for a city of Kigali's size.",
    tag: "Production",
  },
];

export default function Platform() {
  const mob = useIsMobile();

  return (
    <>
      <SubPageHero
        tag="PLATFORM IN ACTION"
        title="Real interfaces running in production today."
        subtitle="The same platform you'd ship to Kigali — already serving citizens, operators, and city authorities in Dubai, Tashkent, Yerevan, and Yaroslavl."
        accent={C.red}
      />

      {/* DUBAI — featured at the top */}
      <section style={{ background: C.black, color: "white", padding: mob ? "32px 0" : "56px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.red }}>
              FEATURED — JUST SHIPPED
            </div>
          </div>
          <h2
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 24 : 34,
              fontWeight: 900,
              color: "white",
              margin: "0 0 18px",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Yango × Dubai's RTA — public bus integration.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: mob ? 14 : 16,
              color: "rgba(255,255,255,0.7)",
              marginBottom: 22,
              maxWidth: 800,
              lineHeight: 1.55,
            }}
          >
            Citizens search a route, pick a bus, see real-time ETA, and tap to pay — same product Kigali would receive. The bus operator keeps full control of the fleet; Yango is the consumer-facing layer.
          </p>
          <DubaiVideo variant="platform" mob={mob} />
        </div>
      </section>

      {/* TASHKENT VIDEOS */}
      <section style={{ background: "white", padding: mob ? "44px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.red, marginBottom: 10 }}>
            TASHKENT DEPLOYMENT
          </div>
          <h2
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 24 : 34,
              fontWeight: 900,
              color: C.black,
              margin: "0 0 36px",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Citizen, driver, traffic — every layer.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 22 : 28 }}>
            {TASHKENT_VIDEOS.map((v, i) => (
              <div
                key={i}
                style={{
                  background: "#1a1a1a",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ background: C.black, padding: 20 }}>
                  <FastVideo
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: "100%", display: "block", borderRadius: 12 }}
                    poster={`https://res.cloudinary.com/dc99897dw/video/upload/so_1,f_jpg,w_${v.width},q_auto/${v.id}.jpg`}
                  >
                    <source src={`https://res.cloudinary.com/dc99897dw/video/upload/f_mp4,q_auto,w_${v.width}/${v.id}.mp4`} type="video/mp4" />
                  </FastVideo>
                </div>
                <div style={{ padding: "20px 22px", background: "white", color: C.black }}>
                  <div
                    style={{
                      fontFamily: F.body,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: C.red,
                      marginBottom: 8,
                    }}
                  >
                    {v.tag}
                  </div>
                  <div style={{ fontFamily: F.headline, fontSize: 16, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.01em" }}>
                    {v.title}
                  </div>
                  <div style={{ fontFamily: F.body, fontSize: 13, color: "#555", lineHeight: 1.5 }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPUTER VISION CARD — pointer to /operators */}
      <section style={{ background: C.body, padding: mob ? "32px 0" : "48px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              background: C.black,
              color: "white",
              borderRadius: "1.5rem",
              padding: mob ? "26px 24px" : "36px 40px",
              display: "grid",
              gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
              gap: mob ? 22 : 40,
              alignItems: "center",
            }}
          >
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
              <h3 style={{ fontFamily: F.headline, fontSize: mob ? 22 : 28, fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                Computer Vision integration.
              </h3>
              <p style={{ fontFamily: F.body, fontSize: mob ? 13 : 15, color: "rgba(255,255,255,0.7)", margin: "0 0 16px", lineHeight: 1.55 }}>
                Object-detection on existing camera infrastructure. Crowding, lane discipline, incident detection, plate recognition for fare evasion. No new bus hardware.
              </p>
              <Link
                to="/operators"
                style={{
                  color: C.red,
                  fontFamily: F.body,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                See use cases on /operators →
              </Link>
            </div>
            <div style={{ background: "#0d0d18", borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <FastVideo
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", display: "block" }}
                poster="https://res.cloudinary.com/dc99897dw/video/upload/so_1,f_jpg,w_800,q_auto/Screen_Recording_2026-02-12_at_1.11.13_PM_khhntc.jpg"
              >
                <source src="https://res.cloudinary.com/dc99897dw/video/upload/f_mp4,q_auto,w_800,ac_none/Screen_Recording_2026-02-12_at_1.11.13_PM_khhntc.mp4" type="video/mp4" />
              </FastVideo>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTION DASHBOARDS */}
      <section style={{ background: "white", padding: mob ? "44px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.red, marginBottom: 10 }}>
            REAL CITY DASHBOARDS
          </div>
          <h2
            style={{
              fontFamily: F.headline,
              fontSize: mob ? 24 : 34,
              fontWeight: 900,
              color: C.black,
              margin: "0 0 36px",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            What the city operator actually sees.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 22 : 28 }}>
            {DASHBOARDS.slice(0, 2).map((d, i) => (
              <div key={i} style={{ background: C.body, borderRadius: "1.5rem", overflow: "hidden", border: "1px solid #EAEAEA" }}>
                <img src={d.img} alt={d.title} style={{ width: "100%", display: "block" }} />
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ fontFamily: F.body, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.red, marginBottom: 6 }}>
                    {d.tag}
                  </div>
                  <div style={{ fontFamily: F.headline, fontSize: 16, fontWeight: 800, color: C.black, marginBottom: 6, letterSpacing: "-0.01em" }}>
                    {d.title}
                  </div>
                  <div style={{ fontFamily: F.body, fontSize: 13, color: "#555", lineHeight: 1.55 }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Fare evasion full-width */}
          <div style={{ marginTop: mob ? 22 : 28, background: C.body, borderRadius: "1.5rem", overflow: "hidden", border: "1px solid #EAEAEA" }}>
            <img src={DASHBOARDS[2].img} alt={DASHBOARDS[2].title} style={{ width: "100%", display: "block" }} />
            <div style={{ padding: mob ? "20px 22px" : "26px 32px" }}>
              <div style={{ fontFamily: F.body, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.red, marginBottom: 6 }}>
                {DASHBOARDS[2].tag}
              </div>
              <div style={{ fontFamily: F.headline, fontSize: 18, fontWeight: 800, color: C.black, marginBottom: 8, letterSpacing: "-0.01em" }}>
                {DASHBOARDS[2].title}
              </div>
              <div style={{ fontFamily: F.body, fontSize: 14, color: "#444", lineHeight: 1.6, maxWidth: 800 }}>{DASHBOARDS[2].desc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL NAV */}
      <section style={{ background: C.body, padding: mob ? "32px 0" : "48px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
            <Link to="/impact" style={{ background: "white", padding: mob ? "20px 22px" : "24px 28px", borderRadius: "1.25rem", textDecoration: "none", color: "inherit", borderLeft: `3px solid ${C.amber}`, display: "block" }}>
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.amber, marginBottom: 8 }}>
                IMPACT
              </div>
              <div style={{ fontFamily: F.headline, fontSize: mob ? 18 : 20, fontWeight: 800, color: C.black, margin: 0 }}>
                Yerevan benchmark + multilateral financing →
              </div>
            </Link>
            <Link to="/methodology" style={{ background: "white", padding: mob ? "20px 22px" : "24px 28px", borderRadius: "1.25rem", textDecoration: "none", color: "inherit", borderLeft: `3px solid ${C.red}`, display: "block" }}>
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.red, marginBottom: 8 }}>
                METHODOLOGY
              </div>
              <div style={{ fontFamily: F.headline, fontSize: mob ? 18 : 20, fontWeight: 800, color: C.black, margin: 0 }}>
                The 4-step rollout →
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
