import React from "react";
import { Link } from "react-router-dom";
import {
  C,
  F,
  useIsMobile,
  PhoneMockup,
  PassengerApp,
  AccessibilityDemo,
} from "../../yango-city-transit-rwanda.jsx";
import { SubPageHero } from "../components/Layout.jsx";
import { DubaiVideo } from "../components/DubaiVideo.jsx";
import { Asterisk, PaymentMethodsLine } from "../components/Tooltip.jsx";

export default function Citizens() {
  const mob = useIsMobile();

  return (
    <>
      <SubPageHero
        tag="FOR CITIZENS"
        title="What every Kigali commuter sees."
        subtitle="A single white-label app for live arrivals, multi-modal trips, and digital fare payment. Already running for citizens in Tashkent, Yerevan, Yaroslavl — and now Dubai."
        accent={C.green}
      />

      {/* DUBAI VIDEO — proof, not mockup */}
      <section style={{ background: C.body, padding: mob ? "32px 0 36px" : "48px 0 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
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
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  marginBottom: 6,
                  fontFamily: F.body,
                }}
              >
                LIVE TODAY
              </div>
              <h2
                style={{
                  fontFamily: F.headline,
                  fontSize: mob ? 22 : 30,
                  fontWeight: 900,
                  color: C.black,
                  margin: 0,
                  letterSpacing: "-0.025em",
                }}
              >
                Dubai citizens, Dubai buses, Yango app.
              </h2>
            </div>
          </div>
          <DubaiVideo variant="inline" mob={mob} />
          <p
            style={{
              fontFamily: F.body,
              fontSize: mob ? 13 : 15,
              lineHeight: 1.6,
              color: "#444",
              marginTop: 16,
              marginBottom: 0,
              maxWidth: 920,
            }}
          >
            Search a route, pick a bus, see real-time arrival, tap to pay — the same product Kigali would receive, already deployed for Dubai's RTA-operated public buses. The bus operator keeps full control of the fleet; Yango is the consumer-facing layer.
          </p>
        </div>
      </section>

      {/* PASSENGER APP MOCKUP */}
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

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 0.7fr", gap: mob ? 28 : 64, alignItems: "center" }}>
            <div>
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
                Citizens know exactly when the bus arrives.
              </h2>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: mob ? 14 : 16,
                  lineHeight: 1.6,
                  color: "#333",
                  marginBottom: 22,
                }}
              >
                Live GPS tracking of every public bus. Predictive ETAs. Multi-modal route planning that combines bus, moto-taxi, and walking in a single trip. Fully white-labelled — launches under your city's brand, not ours.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { icon: "📍", text: "Real-time arrival predictions at every Kigali stop" },
                  { icon: "💳", node: <PaymentMethodsLine size={14} color="#222" /> },
                  { icon: "🗺", text: "Multi-modal planner: bus + moto-taxi + walking, in one app" },
                  { icon: "🌐", text: "Kinyarwanda, English & French interface support" },
                  { icon: "🔁", text: "Seamless transfers at Nyabugogo & Kicukiro hubs" },
                ].map((f, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom: i < 4 ? "1px solid #EEE" : "none",
                      alignItems: "flex-start",
                      fontFamily: F.body,
                      fontSize: mob ? 13 : 14,
                    }}
                  >
                    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.2 }}>{f.icon}</span>
                    <span style={{ color: "#222", lineHeight: 1.55 }}>{f.node || f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PhoneMockup label="Passenger App · Simulation">
                <PassengerApp />
              </PhoneMockup>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT METHODS — the asterisk gets explained again, prominently */}
      <section style={{ background: C.body, padding: mob ? "40px 0" : "60px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
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
            PAYMENT
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
            Cashless from day one.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: mob ? 14 : 16,
              lineHeight: 1.6,
              color: "#333",
              margin: "0 0 22px",
              maxWidth: 760,
            }}
          >
            <PaymentMethodsLine size={mob ? 14 : 16} color="#333" />
          </p>

          <div style={{
            background: "white",
            border: "1px solid #EAEAEA",
            borderRadius: "1rem",
            padding: mob ? "16px 18px" : "20px 24px",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
            maxWidth: 760,
          }}>
            <div style={{
              color: C.red,
              fontFamily: F.headline,
              fontWeight: 900,
              fontSize: 18,
              flexShrink: 0,
              lineHeight: 1,
            }}>*</div>
            <p style={{ fontFamily: F.body, fontSize: mob ? 12 : 13, color: "#555", margin: 0, lineHeight: 1.55 }}>
              Payment methods depend on local regulation, telco integrations, and partnership agreements with Tap & Go, MTN, Airtel and BNR. The available methods at launch will be confirmed during the integration phase.
            </p>
          </div>
        </div>
      </section>

      {/* ACCESSIBILITY DEMO — keeps the existing analytics demo */}
      <section style={{ background: "white", padding: mob ? "40px 0" : "72px 0" }}>
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
            ACCESSIBILITY
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
            Coverage analysed against where people actually live.
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
            Pink zones are residents. Green and yellow are routes and operating speed. Where pink exists without a nearby line, the platform flags an under-served neighbourhood for the city to address.
          </p>
          <AccessibilityDemo />
        </div>
      </section>

      {/* INTERNAL NAV */}
      <section style={{ background: C.body, padding: mob ? "32px 0" : "48px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
            <Link
              to="/operators"
              style={{
                background: "white",
                padding: mob ? "20px 22px" : "24px 28px",
                borderRadius: "1.25rem",
                textDecoration: "none",
                color: "inherit",
                borderLeft: `3px solid ${C.blue}`,
                display: "block",
              }}
            >
              <div
                style={{
                  fontFamily: F.body,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: C.blue,
                  marginBottom: 8,
                }}
              >
                NEXT — FOR CARRIERS
              </div>
              <div
                style={{
                  fontFamily: F.headline,
                  fontSize: mob ? 18 : 20,
                  fontWeight: 800,
                  color: C.black,
                  margin: 0,
                }}
              >
                Driver console, dispatch, computer-vision safety →
              </div>
            </Link>
            <Link
              to="/methodology"
              style={{
                background: "white",
                padding: mob ? "20px 22px" : "24px 28px",
                borderRadius: "1.25rem",
                textDecoration: "none",
                color: "inherit",
                borderLeft: `3px solid ${C.red}`,
                display: "block",
              }}
            >
              <div
                style={{
                  fontFamily: F.body,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: C.red,
                  marginBottom: 8,
                }}
              >
                HOW WE DELIVER
              </div>
              <div
                style={{
                  fontFamily: F.headline,
                  fontSize: mob ? 18 : 20,
                  fontWeight: 800,
                  color: C.black,
                  margin: 0,
                }}
              >
                The 4-step rollout methodology →
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
