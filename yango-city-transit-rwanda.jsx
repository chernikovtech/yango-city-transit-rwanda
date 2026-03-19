import { useState, useEffect, useRef } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

const C = {
  red: "#FF1A1A", black: "#141414", dark: "#232323", mid: "#323232",
  body: "#F5F5F5", white: "#FFFFFF", muted: "#7A7A7A",
  border: "rgba(196,196,196,1)", green: "#2ECC71", blue: "#3498DB",
  amber: "#F39C12", teal: "#1ABC9C",
};

// Yango Tech font stacks
const F = {
  headline: '"Yango Headline", Helvetica, Arial, sans-serif',
  body: '"Yango Group Text", "YS Text", Helvetica, Arial, sans-serif',
};

function Counter({ end, suffix = "", prefix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let s = 0; const step = end / (duration / 16);
    const t = setInterval(() => { s += step; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [started, end, duration]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function Section({ children, bg = C.white, id, style = {} }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const mob = useIsMobile();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} id={id} style={{
      background: bg, padding: mob ? "3rem 0" : "6rem 0", opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(2rem)",
      transition: "opacity 0.6s ease-out, transform 0.6s ease-out", ...style,
    }}>
      <div style={{ maxWidth: "116rem", margin: "0 auto", padding: mob ? "0 1.25rem" : "0 1.87rem" }}>{children}</div>
    </section>
  );
}

function PhoneMockup({ children, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: 270, margin: "0 auto", background: C.black,
        borderRadius: 32, padding: "12px 8px",
      }}>
        <div style={{ width: 60, height: 6, background: "#444", borderRadius: 3, margin: "0 auto 8px" }} />
        <div style={{ background: C.white, borderRadius: 24, overflow: "hidden", minHeight: 460 }}>{children}</div>
        <div style={{ width: 40, height: 5, background: "#555", borderRadius: 3, margin: "10px auto 0" }} />
      </div>
      {label && <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: C.black }}>{label}</div>}
    </div>
  );
}

function TabletMockup({ children, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: "100%", maxWidth: 580, margin: "0 auto", background: C.black,
        borderRadius: '1.875rem', padding: "14px 10px",
      }}>
        <div style={{ background: C.white, borderRadius: '1.5rem', overflow: "hidden", minHeight: 360 }}>{children}</div>
      </div>
      {label && <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: C.black }}>{label}</div>}
    </div>
  );
}

function PassengerApp() {
  const [sel, setSel] = useState(null);
  const [paid, setPaid] = useState(null);
  const stops = [
    { name: "Nyabugogo Hub", time: "2 min", buses: ["Route 14", "Route 7"], fare: "RWF 300" },
    { name: "Kicukiro Center", time: "8 min", buses: ["Route 14"], fare: "RWF 300" },
    { name: "UR Remera Campus", time: "15 min", buses: ["Route 14", "Route 22"], fare: "RWF 500" },
  ];
  return (
    <div style={{ fontSize: 13, fontFamily: F.body }}>
      <div style={{ background: C.red, color: C.white, padding: "10px 14px 8px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Yango Transit</span>
        <span style={{ fontSize: 11, opacity: 0.9 }}>9:41 AM</span>
      </div>
      <div style={{ background: "#E8F4E8", height: 155, position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%" style={{ position: "absolute" }}>
          <defs><pattern id="pg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#cde0cd" strokeWidth="1"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#pg)"/>
          <path d="M30 140Q80 100 130 80T230 30" stroke={C.red} strokeWidth="3" fill="none" strokeDasharray="6,3"/>
          <circle cx="75" cy="108" r="12" fill={C.red}/><text x="75" y="113" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">BUS</text>
          <circle cx="30" cy="140" r="6" fill={C.red} stroke="white" strokeWidth="2"/>
          <circle cx="130" cy="80" r="5" fill="#666" stroke="white" strokeWidth="2"/>
          <circle cx="230" cy="30" r="5" fill="#666" stroke="white" strokeWidth="2"/>
        </svg>
        <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(255,255,255,0.95)", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 600 }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: C.red, marginRight: 6 }} />Route 14 — <span style={{ color: C.red }}>Live</span>
        </div>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: C.black }}>Nearby Stops</div>
        {stops.map((s, i) => (
          <div key={i} onClick={() => { setSel(i === sel ? null : i); setPaid(null); }} style={{
            padding: "9px 12px", marginBottom: 5, borderRadius: '1.25rem',
            background: sel === i ? "#FFF0ED" : "#F5F5F5",
            border: sel === i ? `2px solid ${C.red}` : "2px solid transparent",
            cursor: "pointer", transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{s.buses.join(" · ")}</div>
              </div>
              <div style={{
                background: i === 0 ? C.green : "#EEE", color: i === 0 ? "white" : C.black,
                padding: "3px 10px", borderRadius: '1.5rem', fontSize: 12, fontWeight: 700,
              }}>{s.time}</div>
            </div>
            {sel === i && (
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #E0E0E0" }}>
                {paid === i ? (
                  <div style={{ background: "#E8F8E8", color: C.green, padding: "10px", borderRadius: 8, textAlign: "center", fontWeight: 700, fontSize: 13 }}>
                    ✓ Fare Paid — {s.fare} · Ticket #YT-{Math.floor(Math.random()*9000+1000)}
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <div onClick={(e) => { e.stopPropagation(); setPaid(i); }} style={{
                      flex: 1, background: C.red, color: "white", padding: "8px 0", borderRadius: 8,
                      textAlign: "center", fontWeight: 600, fontSize: 12, cursor: "pointer",
                    }}>Pay {s.fare}</div>
                    <div onClick={(e) => e.stopPropagation()} style={{
                      flex: 1, background: C.black, color: "white", padding: "8px 0", borderRadius: 8,
                      textAlign: "center", fontWeight: 600, fontSize: 12, cursor: "pointer",
                    }}>Set Alert</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DriverApp() {
  const [announcing, setAnnouncing] = useState(false);
  return (
    <div style={{ fontSize: 13, fontFamily: F.body }}>
      <div style={{ background: C.black, color: C.white, padding: "10px 14px 8px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Driver Console</span>
        <span style={{ fontSize: 11, color: C.green }}>● Online</span>
      </div>
      <div style={{ background: "#1E1E2E", height: 165, position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%" style={{ position: "absolute" }}>
          <defs><pattern id="dg" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0L0 0 0 50" fill="none" stroke="#2a2a3e" strokeWidth="1"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dg)"/>
          <path d="M20 150L130 90L240 40" stroke="#4A90D9" strokeWidth="4" fill="none"/>
          <polygon points="235,35 245,40 235,45" fill="#4A90D9"/>
          <circle cx="20" cy="150" r="8" fill={C.green}/><circle cx="130" cy="90" r="6" fill={C.amber} stroke="white" strokeWidth="1.5"/>
          <circle cx="240" cy="40" r="6" fill={C.red} stroke="white" strokeWidth="1.5"/>
        </svg>
        <div style={{ position: "absolute", top: 10, left: 10, right: 10, background: "rgba(0,0,0,0.7)", borderRadius: '1.25rem', padding: "8px 12px", color: "white" }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>↗ 280m</div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>Turn right onto Main Ave · Next stop in 3 min</div>
        </div>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 12px", background: "#F5F5F5", borderRadius: '1.25rem', marginBottom: 8 }}>
          <div><div style={{ fontSize: 11, color: C.muted }}>Route</div><div style={{ fontWeight: 700, fontSize: 13 }}>Route 14 — North</div></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: C.muted }}>Passengers</div><div style={{ fontWeight: 700, color: C.red }}>34 / 55</div></div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {[{ label: "On Time", val: "✓", bg: "#E8F8E8", c: C.green }, { label: "Next Stop", val: "2:30", bg: "#FFF3E0", c: C.amber }, { label: "Fares Paid", val: "98%", bg: "#E8F0FE", c: C.blue }].map((m, i) => (
            <div key={i} style={{ flex: 1, background: m.bg, borderRadius: '1.25rem', padding: "9px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: m.c }}>{m.val}</div>
              <div style={{ fontSize: 9, color: C.black, marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
          <div onClick={() => { setAnnouncing(true); setTimeout(() => setAnnouncing(false), 2000); }}
            style={{ flex: 1, padding: "10px", borderRadius: '1.25rem', textAlign: "center", fontWeight: 600, fontSize: 12, background: announcing ? C.green : C.black, color: "white", cursor: "pointer", transition: "all 0.3s" }}>
            {announcing ? "Announced" : "Announce Stop"}
          </div>
          <div style={{ flex: 1, padding: "10px", borderRadius: '1.25rem', textAlign: "center", fontWeight: 600, fontSize: 12, background: "#F5F5F5", color: C.black, cursor: "pointer" }}>
            Report Issue
          </div>
        </div>
      </div>
    </div>
  );
}

function OperatorDashboard() {
  const [aiTip, setAiTip] = useState(null);
  const [applied, setApplied] = useState({});
  const tips = [
    { id: 0, route: "Route 7", insight: "Low ridership 10PM–6AM", suggestion: "Reduce frequency to 30-min intervals after 10PM", saving: "Save 2 vehicles nightly", icon: "—" },
    { id: 1, route: "Route 14", insight: "Overcrowding 7–9AM peak", suggestion: "Add 3 express buses during morning peak", saving: "+18% capacity", icon: "+" },
    { id: 2, route: "New Route", insight: "Underserved district detected", suggestion: "Create Route 31: Industrial Zone → Central Station via Market", saving: "Serve 12K residents", icon: "*" },
  ];
  return (
    <div style={{ fontSize: 12, fontFamily: F.body }}>
      <div style={{ background: C.black, color: "white", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontWeight: 800, fontSize: 11 }}>YANGO TECH</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
          <span style={{ fontWeight: 600, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Operator</span>
        </div>
        <span style={{ fontSize: 10, color: C.green }}>● Live Data</span>
      </div>
      <div style={{ background: "#E8F4E8", height: 85, position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%">
          <defs><pattern id="og" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0L0 0 0 25" fill="none" stroke="#cde0cd" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#og)"/>
          <path d="M10 70Q100 30 200 50T400 20" stroke={C.red} strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M20 20Q120 60 280 30T520 60" stroke={C.blue} strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M40 80Q200 10 350 50" stroke={C.green} strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="4,4"/>
          {[[60,55],[150,38],[250,42],[340,28],[420,45],[90,25],[310,55]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3" fill={[C.red,C.blue,C.green][i%3]} opacity="0.8"/>
          ))}
        </svg>
        <div style={{ position: "absolute", bottom: 4, left: 6, fontSize: 9, background: "rgba(255,255,255,0.9)", padding: "2px 6px", borderRadius: 3, fontWeight: 600 }}>
          28 routes · 342 vehicles active
        </div>
      </div>
      <div style={{ padding: "8px 12px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
          {[{ l: "Fleet Util.", v: "87%", c: C.green }, { l: "On-Time", v: "94%", c: C.blue }, { l: "Revenue", v: "+8%", c: C.red }].map((k, i) => (
            <div key={i} style={{ flex: 1, background: "#F5F5F5", borderRadius: 6, padding: "6px 4px", textAlign: "center", borderTop: `2px solid ${k.c}` }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: k.c }}>{k.v}</div>
              <div style={{ fontSize: 8, color: C.muted }}>{k.l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>AI Route Insights</span>
          <span style={{ fontSize: 9, color: C.red, fontWeight: 600 }}>Real-time</span>
        </div>
        {tips.map((t) => (
          <div key={t.id} style={{
            marginBottom: 5, borderRadius: 8, overflow: "hidden",
            border: aiTip === t.id ? `1.5px solid ${C.red}` : "1.5px solid #E8E8E8",
            transition: "all 0.2s",
          }}>
            <div onClick={() => setAiTip(aiTip === t.id ? null : t.id)} style={{
              padding: "7px 10px", background: aiTip === t.id ? "#FFF8F6" : "white",
              cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 14 }}>{t.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11 }}>{t.route}</div>
                  <div style={{ fontSize: 9, color: C.muted }}>{t.insight}</div>
                </div>
              </div>
              <span style={{ fontSize: 10, color: C.muted }}>{aiTip === t.id ? "▲" : "▼"}</span>
            </div>
            {aiTip === t.id && (
              <div style={{ padding: "8px 10px", background: "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
                <div style={{ fontSize: 10, color: C.black, marginBottom: 4, lineHeight: 1.4 }}>
                  <strong>AI Suggestion:</strong> {t.suggestion}
                </div>
                <div style={{ fontSize: 9, color: C.green, fontWeight: 600, marginBottom: 6 }}>Impact: {t.saving}</div>
                {applied[t.id] ? (
                  <div style={{ background: "#E8F8E8", color: C.green, padding: "6px", borderRadius: 6, textAlign: "center", fontWeight: 700, fontSize: 10 }}>✓ Applied to schedule</div>
                ) : (
                  <div style={{ display: "flex", gap: 4 }}>
                    <div onClick={(e) => { e.stopPropagation(); setApplied(p => ({...p, [t.id]: true})); }} style={{
                      flex: 1, background: C.red, color: "white", padding: "6px", borderRadius: 6,
                      textAlign: "center", fontWeight: 700, fontSize: 10, cursor: "pointer",
                    }}>Apply Change</div>
                    <div onClick={(e) => e.stopPropagation()} style={{
                      flex: 1, background: "#F0F0F0", color: C.black, padding: "6px", borderRadius: 6,
                      textAlign: "center", fontWeight: 600, fontSize: 10, cursor: "pointer",
                    }}>Simulate First</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CityDashboard() {
  return (
    <div style={{ fontSize: 12, fontFamily: F.body }}>
      <div style={{ background: C.black, color: "white", padding: "9px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontWeight: 800, fontSize: 11 }}>YANGO TECH</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
          <span style={{ fontWeight: 600, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>City Operations</span>
        </div>
        <span style={{ fontSize: 10, color: C.green }}>● Live</span>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          {[
            { l: "Active Buses", v: "342", t: "+12", c: C.green },
            { l: "Revenue Today", v: "RWF 48M", t: "+8%", c: C.green },
            { l: "On-Time", v: "94.2%", t: "+2.1%", c: C.blue },
            { l: "Evasion", v: "3.1%", t: "−1.4%", c: C.red },
          ].map((k, i) => (
            <div key={i} style={{ flex: 1, background: "#F8F8F8", borderRadius: 8, padding: "7px 5px", textAlign: "center", borderTop: `3px solid ${k.c}` }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.black }}>{k.v}</div>
              <div style={{ fontSize: 7, color: C.muted, marginTop: 1 }}>{k.l}</div>
              <div style={{ fontSize: 8, color: k.c, fontWeight: 600 }}>{k.t}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#E8F4E8", height: 105, borderRadius: '1.25rem', position: "relative", overflow: "hidden", marginBottom: 10 }}>
          <svg width="100%" height="100%">
            <defs><pattern id="cg" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0L0 0 0 30" fill="none" stroke="#cde0cd" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#cg)"/>
            <path d="M20 90Q100 40 200 25T400 50" stroke={C.red} strokeWidth="2" fill="none" opacity="0.5"/>
            <path d="M50 15Q150 70 300 90T500 35" stroke={C.blue} strokeWidth="2" fill="none" opacity="0.5"/>
            {[[80,55],[200,30],[150,60],[300,65],[100,38],[250,48],[350,55]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="3.5" fill={[C.red,C.green,C.blue][i%3]} opacity="0.85"/>
            ))}
          </svg>
          <div style={{ position: "absolute", bottom: 5, right: 8, fontSize: 8, background: "rgba(255,255,255,0.9)", padding: "2px 6px", borderRadius: 3, fontWeight: 600 }}>342 active · 28 routes</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>Weekly Fare Revenue ($K)</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 50 }}>
            {[32,35,38,42,40,45,48].map((v,i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: v * 1, background: i === 6 ? C.red : "#DDD", borderRadius: "3px 3px 0 0" }}/>
                <div style={{ fontSize: 7, color: C.muted, marginTop: 1 }}>{["M","T","W","T","F","S","S"][i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeedMapDemo() {
  const [selected, setSelected] = useState(null);
  const mob = useIsMobile();
  const zones = [
    { x: 15, y: 20, w: 25, h: 30, speed: "10-12", color: "#FF4444", label: "Nyarugenge / CBD", rec: "BRT dedicated lane priority zone" },
    { x: 45, y: 15, w: 25, h: 25, speed: "12-15", color: "#FF8800", label: "Kicukiro", rec: "Signal optimization at 22 junctions" },
    { x: 20, y: 55, w: 30, h: 30, speed: "18-22", color: "#FFCC00", label: "Gasabo District", rec: "Frequency adjustment for peak demand" },
    { x: 55, y: 45, w: 30, h: 35, speed: "22-30", color: "#44BB44", label: "Nyabugogo Corridor", rec: "Express corridor to secondary cities" },
  ];
  return (
    <div style={{ background: "white", borderRadius: '1.875rem', padding: mob ? "1.25rem" : "2rem", marginBottom: "1.25rem" }}>
      <h4 style={{ fontFamily: F.headline, fontSize: mob ? "1rem" : "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Public Transport Speed Mapping</h4>
      <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, margin: "0 0 1rem", lineHeight: 1.5 }}>{mob ? "Tap zones to see speed data" : "Hover zones to see speed data and AI recommendations"}</p>
      <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? 12 : 24, alignItems: "flex-start" }}>
        <div style={{ flex: 1, width: "100%", position: "relative", background: "#E8F0E8", borderRadius: '1.5rem', height: mob ? 200 : 260, overflow: "hidden" }}>
          <svg width="100%" height="100%">
            <defs><pattern id="sm" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0L0 0 0 20" fill="none" stroke="#d0ddd0" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#sm)"/>
            {zones.map((z, i) => (
              <g key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                onMouseEnter={() => { if (!mob) setSelected(i); }}
                onMouseLeave={() => { if (!mob) setSelected(null); }}
                style={{ cursor: "pointer" }}>
                <rect x={`${z.x}%`} y={`${z.y}%`} width={`${z.w}%`} height={`${z.h}%`}
                  fill={z.color} opacity={selected === i ? 0.7 : 0.35} rx="6" stroke={selected === i ? C.black : "none"} strokeWidth="2" style={{ transition: "all 0.3s" }}/>
                <text x={`${z.x + z.w/2}%`} y={`${z.y + z.h/2}%`} textAnchor="middle" fill={C.black} fontSize="11" fontWeight="700">{z.speed} km/h</text>
              </g>
            ))}
          </svg>
        </div>
        <div style={{ width: mob ? "100%" : 220 }}>
          {selected !== null ? (
            <div style={{ background: "white", borderRadius: '1.5rem', padding: "16px", border: `2px solid ${zones[selected].color}` }}>
              <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>{zones[selected].label}</div>
              <div style={{ fontSize: mob ? 22 : 28, fontWeight: 900, color: zones[selected].color, marginBottom: 4 }}>{zones[selected].speed} <span style={{ fontSize: 14 }}>km/h</span></div>
              <div style={{ fontSize: 11, color: C.black, lineHeight: 1.4, marginBottom: 8 }}><strong>AI Recommendation:</strong><br/>{zones[selected].rec}</div>
              <div style={{ height: 3, background: zones[selected].color, borderRadius: 2 }}/>
            </div>
          ) : (
            <div style={{ background: "white", borderRadius: '1.5rem', padding: "16px", textAlign: "center", color: C.muted }}>
              <div style={{ fontSize: 12 }}>{mob ? "Tap a zone to see speed data" : "Select a zone to see speed data"}</div>
            </div>
          )}
          <div style={{ marginTop: 12, display: "flex", gap: 4, flexWrap: "wrap" }}>
            {[{ c: "#FF4444", l: "Critical" }, { c: "#FF8800", l: "Slow" }, { c: "#FFCC00", l: "Moderate" }, { c: "#44BB44", l: "Good" }].map((leg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: C.black }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: leg.c }}/>{leg.l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FareEvasionDemo() {
  const [sel, setSel] = useState(null);
  const mob = useIsMobile();
  const districts = [
    { name: "Nyarugenge", area: "CBD Core", evasion: 12, inspectors: 2, status: "critical" },
    { name: "Kicukiro", area: "Transit Hub", evasion: 8, inspectors: 1, status: "warning" },
    { name: "Gasabo", area: "North", evasion: 3, inspectors: 0, status: "good" },
    { name: "Nyabugogo Hub", area: "Transit Hub", evasion: 15, inspectors: 3, status: "critical" },
    { name: "Remera", area: "West", evasion: 5, inspectors: 1, status: "good" },
  ];
  return (
    <div style={{ background: "white", borderRadius: '1.875rem', padding: mob ? "1.25rem" : "2rem" }}>
      <h4 style={{ fontFamily: F.headline, fontSize: mob ? "1rem" : "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Fare Evasion Heatmap & Inspector Routing</h4>
      <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, margin: "0 0 1rem", lineHeight: 1.5 }}>Tap districts to see AI-assigned inspector routes</p>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(5, 1fr)", gap: 8 }}>
        {districts.map((d, i) => (
          <div key={i} onClick={() => setSel(sel === i ? null : i)} style={{
            borderRadius: '1.25rem', padding: mob ? "12px 8px" : "14px 10px", textAlign: "center", cursor: "pointer",
            background: sel === i ? (d.status === "critical" ? "#FFE8E8" : d.status === "warning" ? "#FFF3E0" : "#E8F8E8") : "white",
            border: sel === i ? `2px solid ${d.status === "critical" ? C.red : d.status === "warning" ? C.amber : C.green}` : "2px solid #E8E8E8",
            transition: "all 0.2s", minHeight: 44,
          }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: d.status === "critical" ? C.red : d.status === "warning" ? C.amber : C.green }}>{d.evasion}%</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.black, marginTop: 2 }}>{d.name}</div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>{d.area}</div>
            {sel === i && (
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #E0E0E0", fontSize: 10, lineHeight: 1.4, color: C.black }}>
                <div style={{ fontWeight: 700 }}>{d.inspectors} inspectors assigned</div>
                <div style={{ color: C.muted, marginTop: 2 }}>
                  {d.status === "critical" ? "AI: Increase patrols at peak" : d.status === "warning" ? "AI: Spot checks needed" : "AI: Coverage OK"}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AccessibilityDemo() {
  const [expanded, setExpanded] = useState(null);
  const mob = useIsMobile();
  const areas = [
    { name: "Gikondo Industrial", pop: "45K", coverage: 12, status: "underserved", rec: "New route connecting Gikondo to Nyabugogo via BRT corridor" },
    { name: "Kinyinya Hillside", pop: "28K", coverage: 35, status: "partial", rec: "Feeder service from Kinyinya hills to main corridor" },
    { name: "UR Nyarugenge Campus", pop: "62K", coverage: 89, status: "covered", rec: "Increase frequency during university sessions" },
    { name: "Masaka / Ndera", pop: "38K", coverage: 8, status: "underserved", rec: "Extend scheduled service to Masaka growth area" },
  ];
  return (
    <div style={{ background: "white", borderRadius: '1.875rem', padding: mob ? "1.25rem" : "2rem", marginTop: "1.25rem" }}>
      <h4 style={{ fontFamily: F.headline, fontSize: mob ? "1rem" : "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Accessibility Analysis</h4>
      <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, margin: "0 0 1rem", lineHeight: 1.5 }}>Identify underserved areas and get AI recommendations for new routes</p>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 10 }}>
        {areas.map((a, i) => (
          <div key={i} onClick={() => setExpanded(expanded === i ? null : i)} style={{
            background: "white", borderRadius: '1.5rem', padding: "16px", cursor: "pointer",
            border: expanded === i ? `2px solid ${a.status === "underserved" ? C.red : a.status === "partial" ? C.amber : C.green}` : "2px solid #E8E8E8",
            transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</div>
                <div style={{ fontSize: 11, color: C.muted }}>Population: {a.pop}</div>
              </div>
              <div style={{
                padding: "3px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                background: a.status === "underserved" ? "#FFE8E8" : a.status === "partial" ? "#FFF3E0" : "#E8F8E8",
                color: a.status === "underserved" ? C.red : a.status === "partial" ? C.amber : C.green,
              }}>{a.status}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, background: "#E8E8E8", borderRadius: 4, height: 8, overflow: "hidden" }}>
                <div style={{
                  width: `${a.coverage}%`, height: "100%", borderRadius: 4,
                  background: a.coverage < 20 ? C.red : a.coverage < 50 ? C.amber : C.green,
                  transition: "width 0.5s",
                }}/>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.black, minWidth: 35 }}>{a.coverage}%</span>
            </div>
            {expanded === i && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #F0F0F0", fontSize: 12, color: C.black, lineHeight: 1.5 }}>
                <strong style={{ color: C.red }}>AI Recommendation:</strong> {a.rec}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RouteDesignMethodology() {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);
  const [expandedKpi, setExpandedKpi] = useState(null);
  const mob = useIsMobile();

  const phases = [
    {
      num: "01",
      title: "Data Collection & Baseline",
      subtitle: "Weeks 1-4",
      color: C.blue,
      icon: "01",
      overview: "Establish a comprehensive understanding of current travel demand, network performance, and urban growth patterns through multi-source data collection aligned with ITDP and World Bank standards.",
      methods: [
        { name: "Origin-Destination Surveys", desc: "Household travel surveys (HTS) following UN-Habitat methodology — stratified sampling across Kigali's 35 sectors, capturing trip purpose, mode, time-of-day, and willingness-to-pay. Target: 2% of population (~25,000 households).", standard: "UN-Habitat / World Bank SSATP" },
        { name: "Automatic Passenger Counts", desc: "Deploy infrared APC sensors on all major routes for 4-week baseline. Cross-validate with manual counts at 50+ key boarding points including Nyabugogo, Kicukiro Centre, and Remera.", standard: "TCRP Report 113" },
        { name: "Smart Card Transaction Mining", desc: "Analyze Tap & Go card transaction data to reconstruct trip chains, identify transfer patterns, and calculate actual vs. scheduled headways across all 28 routes.", standard: "GTFS / Oyster Card Methodology" },
        { name: "GPS Trajectory Analysis", desc: "Process vehicle GPS traces to derive actual running times, dwell times, speed profiles, and route adherence. Identify recurring congestion bottlenecks by time-of-day.", standard: "AVL Data Standards (APTA)" },
        { name: "Land Use & Growth Mapping", desc: "Integrate City of Kigali master plan, building permit data, and satellite imagery to model current and projected trip generators — commercial zones, institutions, industrial areas, and residential densification corridors.", standard: "NACTO / ITDP TOD Standard" },
        { name: "Accessibility Isochrone Analysis", desc: "Calculate walk-to-transit coverage using 400m (5-min) and 800m (10-min) catchment areas. Map population served vs. underserved against the 80% coverage target in Rwanda's transport strategy.", standard: "ITDP BRT Standard v3.0" },
      ],
    },
    {
      num: "02",
      title: "Demand Modeling & Forecasting",
      subtitle: "Weeks 5-8",
      color: C.red,
      icon: "02",
      overview: "Build a calibrated four-step travel demand model adapted to Kigali's unique topography and travel patterns, producing reliable ridership forecasts for route planning decisions.",
      methods: [
        { name: "Four-Step Transport Model", desc: "Trip Generation: zonal production/attraction rates by land use. Trip Distribution: gravity model calibrated to OD survey data. Mode Choice: nested logit model incorporating fare, travel time, wait time, and walk access. Assignment: capacity-constrained transit assignment on multimodal network.", standard: "UTPS / TransCAD / PTV Visum" },
        { name: "Direct Ridership Modeling", desc: "Station-level regression models using population density, employment density, transit connectivity, land-use mix, and pedestrian environment quality as predictors. Validated against APC data.", standard: "TCRP Report 167" },
        { name: "Scenario-Based Forecasting", desc: "Model three growth scenarios (baseline, medium, high) aligned with Vision 2050 urbanization targets. Incorporate planned developments: Kigali Innovation City, BRT Phase 1, secondary city corridors (Huye, Musanze, Rubavu).", standard: "World Bank TSSP Framework" },
        { name: "Peak Spreading Analysis", desc: "Analyze temporal demand distribution to identify peak hour factors, shoulder patterns, and off-peak opportunities. Critical for determining fleet size and frequency allocation.", standard: "HCM 7th Edition" },
        { name: "Transfer Penalty Estimation", desc: "Quantify the perceived cost of transfers through stated preference surveys at Nyabugogo and Kicukiro hubs. Essential for designing a network that minimizes perceived journey time, not just travel time.", standard: "TCRP Report 95" },
      ],
    },
    {
      num: "03",
      title: "Network Architecture Design",
      subtitle: "Weeks 9-14",
      color: C.green,
      icon: "03",
      overview: "Design the transit network structure using international best practice in network typology — balancing coverage vs. ridership goals, direct connections vs. transfers, and frequency vs. span.",
      methods: [
        { name: "Trunk-Feeder Network Design", desc: "Design high-frequency trunk corridors (BRT-ready) on major demand axes: Nyabugogo–CBD–Kicukiro, Kimironko–CBD, Nyabugogo–Nyamirambo. Connect feeder routes from hillside neighborhoods to trunk stops with timed transfers.", standard: "Jarrett Walker / Human Transit" },
        { name: "Frequency-Coverage Trade-off", desc: "Apply the Pareto-optimal allocation framework: allocate 70% of service hours to high-ridership trunk routes (frequency priority) and 30% to coverage routes ensuring no sector exceeds 800m walk to transit.", standard: "Walker (2012) / ITDP" },
        { name: "Grid vs. Radial Optimization", desc: "For Kigali's topography, design a modified radial network with CBD hub, supplemented by crosstown routes connecting Kimironko-Remera-Kicukiro without requiring CBD transfer. Model shows 22% reduction in average transfers.", standard: "NACTO Transit Street Guide" },
        { name: "Route Geometry Principles", desc: "Apply five cardinal rules: (1) symmetrical routes — same path in both directions; (2) no excessive branching — max 2 branches per route; (3) straight & direct — circuity ratio below 1.3; (4) through-routing where possible; (5) consistent stopping patterns.", standard: "TRB TCRP Report 165" },
        { name: "Span & Frequency Standards", desc: "Define service tiers: Tier 1 (trunk) — 5:00-23:00, every 5-8 min peak / 10-15 min off-peak; Tier 2 (crosstown) — 5:30-22:00, every 10-15 min; Tier 3 (feeder) — 6:00-21:00, every 15-20 min. Aligned with RURA service standards.", standard: "APTA Service Guidelines" },
        { name: "Intermodal Integration Points", desc: "Design 8 strategic transfer nodes with infrastructure for bus-to-bus, bus-to-moto, and future bus-to-BRT connections. Optimize layout for sub-3-minute timed transfers using synchronized scheduling.", standard: "Dutch OV-Chipkaart Model" },
      ],
    },
    {
      num: "04",
      title: "Service Planning & Scheduling",
      subtitle: "Weeks 15-18",
      color: C.amber,
      icon: "04",
      overview: "Translate network design into operational schedules — determining vehicle requirements, driver rosters, and deadheading patterns that maximize efficiency while meeting service standards.",
      methods: [
        { name: "Headway-Based Scheduling", desc: "Set headways based on maximum load point analysis: headway = (vehicle capacity × target load factor) / peak passenger flow. Target 85% load factor at max load point. Produces specific vehicle requirements per route per time period.", standard: "Ceder (2007) / HASTUS" },
        { name: "Interlining & Through-Service", desc: "Pair complementary routes to minimize deadheading: Route 14 (Nyabugogo-Kicukiro) interlines with Route 7 (Kicukiro-Kanombe). Reduces fleet requirement by estimated 12% while providing passengers with one-seat rides on high-demand pairs.", standard: "UITP Best Practice" },
        { name: "Timed Transfer Optimization", desc: "At Nyabugogo hub (8 routes converge), optimize arrival/departure times to create pulse scheduling — all feeder routes arrive within a 3-minute window, trunk routes depart 4 minutes later. Modeled using TCQSM wait-time methodology.", standard: "TCQSM 3rd Edition" },
        { name: "Fleet Allocation Model", desc: "Linear programming optimization: minimize total fleet size subject to frequency, span, and vehicle capacity constraints across all routes. Includes 15% spare ratio per APTA guidelines. Account for Kigali's elevation-dependent running times.", standard: "LP Optimization / APTA" },
        { name: "GTFS Feed Generation", desc: "Produce standards-compliant GTFS static feed for integration into Google Maps, Apple Maps, and Yango Transit passenger app. Include GTFS-Realtime for live vehicle positions and trip updates.", standard: "GTFS / MobilityData" },
      ],
    },
    {
      num: "05",
      title: "Performance Monitoring & Iteration",
      subtitle: "Ongoing",
      color: C.teal,
      icon: "05",
      overview: "Establish continuous monitoring using international KPIs, with AI-powered anomaly detection and quarterly optimization cycles aligned with Rwanda's performance-based contracting framework.",
      methods: [
        { name: "Real-Time KPI Dashboard", desc: "Monitor 12 key indicators in real-time: on-time performance, load factor, headway regularity, revenue per vehicle-km, cost recovery ratio, passengers per vehicle-hour, mean distance between failures, accessibility coverage, fare evasion rate, customer complaints per 100K trips, safety incidents, and carbon intensity per passenger-km.", standard: "UITP World Metro Benchmarks" },
        { name: "Quarterly Network Review", desc: "Every 90 days: analyze ridership trends, recalibrate demand model with new APC/smart card data, adjust frequencies and spans. Major restructuring annually or when new infrastructure (BRT, new roads) comes online.", standard: "London TfL / Singapore LTA" },
        { name: "AI Anomaly Detection", desc: "Machine learning models trained on historical patterns to flag unusual ridership drops, bunching events, revenue anomalies, and route performance degradation in real-time. Triggers alerts to dispatchers and planners.", standard: "Yango Tech Proprietary AI" },
        { name: "A/B Route Testing", desc: "Test route modifications on parallel corridors: run variant A and variant B for 4 weeks each, measure ridership response, travel times, and passenger satisfaction. Data-driven decision on which variant to adopt permanently.", standard: "Evidence-Based Transit Planning" },
        { name: "Passenger Satisfaction Surveying", desc: "Quarterly intercept surveys at 20 high-ridership stops measuring satisfaction across 8 dimensions: frequency, reliability, crowding, safety, cleanliness, information, accessibility, and value-for-money. Target: NPS > 40.", standard: "ACSI / European BEST Survey" },
      ],
    },
  ];

  const designPrinciples = [
    {
      title: "Frequency is Freedom",
      author: "Jarrett Walker, Human Transit",
      body: "Passengers don't memorize schedules when service runs every 10 minutes or less. High-frequency networks unlock spontaneous travel and grow ridership. For Kigali, this means concentrating resources on fewer, straighter, more frequent routes rather than spreading thin across many infrequent ones.",
      metric: "Target: <10 min headway on all trunk routes",
    },
    {
      title: "The Geometry of Useful Transit",
      author: "Jarrett Walker / ITDP",
      body: "Routes must be straight and direct (circuity ratio <1.3), operate in both directions on the same street (symmetry), and avoid excessive branching. Every deviation from a straight line adds travel time that drives passengers away. Kigali's grid-challenged topography requires creative routing along ridgelines and valley corridors.",
      metric: "Target: circuity ratio <1.3 for all trunk routes",
    },
    {
      title: "Coverage vs. Ridership Trade-off",
      author: "TRB TCRP Report 165",
      body: "Every transit system must explicitly decide its allocation between coverage goals (ensuring everyone has access) and ridership goals (carrying the most people). International best practice: allocate 60-75% of resources to ridership-maximizing routes, remainder to coverage. Kigali's 80% population coverage target requires ~30% coverage allocation.",
      metric: "Recommended: 70/30 ridership/coverage split",
    },
    {
      title: "Connections Over One-Seat Rides",
      author: "Houston METRO Redesign / Barcelona TMB",
      body: "Well-designed transfer-based networks outperform direct-service networks in total mobility. Houston's 2015 network redesign proved that a high-frequency grid with good transfers increased weekend ridership 30%. For Kigali, this means investing in quality transfer facilities at Nyabugogo rather than running circuitous one-seat routes.",
      metric: "Benchmark: Houston +30% ridership post-redesign",
    },
    {
      title: "The 400-Meter Rule",
      author: "ITDP BRT Standard v3.0",
      body: "No more than a 5-minute walk (400 meters) to a transit stop for urban areas; 800 meters (10 minutes) for suburban. This international standard determines stop spacing — too many stops slow down service; too few create coverage gaps. For Kigali's hilly terrain, effective walk distances are shorter; altitude-adjusted catchments are essential.",
      metric: "Standard: 400m urban / 800m suburban catchment",
    },
    {
      title: "Right-Sizing Vehicle Capacity",
      author: "UITP / World Bank",
      body: "Match vehicle size to demand: 12m standard buses for trunk routes with 1,000+ pphpd; 9m midi-buses for crosstown routes with 400-800 pphpd; minibuses for feeders under 400 pphpd. Kigali's current fleet is oversized on feeders and undersized on trunks — rebalancing yields 15% cost savings.",
      metric: "Target: 85% load factor at max load point",
    },
  ];

  const kpis = [
    { name: "Passengers per Vehicle-Hour", target: ">45", benchmark: "Top quartile: 55+ (Bogota, Curitiba)", category: "Productivity", desc: "The single most important efficiency metric. Measures how effectively vehicles are deployed against demand. Low values indicate oversupply, poor route alignment, or wrong time-of-day deployment." },
    { name: "On-Time Performance", target: ">90%", benchmark: "World class: 95%+ (Zurich, Singapore)", category: "Reliability", desc: "Percentage of departures within -1/+5 minutes of schedule. Directly correlates with ridership retention. Every 1% improvement in OTP yields ~0.5% ridership increase." },
    { name: "Headway Regularity (cv)", target: "<0.3", benchmark: "Best practice: <0.21 (London, Seoul)", category: "Reliability", desc: "Coefficient of variation of actual headways. Measures bus bunching. More important than OTP for high-frequency routes where passengers don't use schedules." },
    { name: "Cost Recovery Ratio", target: ">85%", benchmark: "Top: 100%+ (Hong Kong, Singapore)", category: "Financial", desc: "Fare revenue as percentage of operating costs. Rwanda's subsidy-free model requires >85%. Achieved through route optimization, demand-responsive scheduling, and fare evasion reduction." },
    { name: "Revenue per Vehicle-km", target: ">RWF 800", benchmark: "Set by route-level analysis", category: "Financial", desc: "Total fare revenue divided by total vehicle-kilometers operated. Key metric for identifying underperforming routes requiring restructuring or frequency adjustment." },
    { name: "Accessibility Coverage", target: ">80%", benchmark: "Leaders: 90%+ (Vienna, Zurich)", category: "Equity", desc: "Percentage of population within 400m of a transit stop with minimum 15-minute frequency. Aligned with Rwanda Transport SSSP 2024-2029 target." },
    { name: "Average Transfer Wait", target: "<6 min", benchmark: "Best practice: <4 min (Dutch OV model)", category: "Passenger Experience", desc: "Mean wait time at transfer points. Critical for network acceptance. Timed transfers at hub stations can achieve <3 min for scheduled connections." },
    { name: "Fare Evasion Rate", target: "<5%", benchmark: "Best practice: <2% (London, Stockholm)", category: "Revenue Protection", desc: "Percentage of boardings without valid payment. Each 1% reduction translates to ~$2M annual revenue in Kigali. AI-optimized inspector deployment targets high-evasion zones." },
  ];

  const currentPhase = phases[activePhase];

  return (
    <>
      {/* Phase Header */}
      <div style={{ textAlign: "center", marginBottom: mob ? "1.75rem" : "4rem" }}>
        <div style={{ display: "inline-block", background: "rgba(255,26,26,0.08)", border: "1px solid rgba(255,26,26,0.2)", color: C.red, padding: "0.6rem 1rem", borderRadius: '2rem', fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: "1rem" }}>
          Consulting-Grade Methodology
        </div>
        <h2 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(1.5rem, 4vw, 2rem)" : "clamp(2rem, 3.5vw, 3.85rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 1rem" }}>
          Route Design <span style={{ color: C.red }}>Methodology</span>
        </h2>
        <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, maxWidth: "44rem", margin: "0 auto", lineHeight: 1.5 }}>
          A five-phase, data-driven framework for designing Kigali's transit network — based on ITDP, World Bank, TCRP, and proven methodologies from the world's best transit systems.
        </p>
      </div>

      {/* Phase Selector */}
      <div style={{ display: "flex", gap: mob ? "0.25rem" : "0.5rem", marginBottom: mob ? "1.25rem" : "2rem", overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4 }}>
        {phases.map((p, i) => (
          <button key={i} onClick={() => setActivePhase(i)} style={{
            flex: mob ? "0 0 auto" : 1, padding: mob ? "0.75rem 1rem" : "1rem 1.25rem", borderRadius: '2rem', border: "none",
            background: activePhase === i ? p.color : "#F0F0F0",
            color: activePhase === i ? "white" : C.black,
            fontFamily: F.body, fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: "pointer", transition: "0.2s ease-in-out", minHeight: 44, whiteSpace: "nowrap",
            textAlign: "center",
          }}>
            <div style={{ fontSize: mob ? "0.875rem" : "1.125rem", marginBottom: 2, fontFamily: F.headline, fontWeight: 900, letterSpacing: "calc(1em / 50)" }}>{p.icon}</div>
            <div>{mob ? p.title.split(" ")[0] : p.title}</div>
            <div style={{ fontSize: "0.625rem", opacity: 0.8, marginTop: 2 }}>{p.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Active Phase Detail */}
      <div style={{ background: "white", borderRadius: '1.875rem', padding: mob ? "1.5rem" : "2.5rem", marginBottom: "2rem", borderTop: `4px solid ${currentPhase.color}` }}>
        <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? "0.75rem" : "1.25rem", alignItems: mob ? "flex-start" : "center", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ fontFamily: F.headline, fontSize: "2rem", fontWeight: 900, letterSpacing: "calc(1em / 50)", width: 56, height: 56, borderRadius: '1.875rem', background: `${currentPhase.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: currentPhase.color }}>{currentPhase.icon}</div>
            <div>
              <div style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: currentPhase.color }}>Phase {currentPhase.num}</div>
              <h3 style={{ fontFamily: F.headline, fontSize: mob ? "1.25rem" : "1.5rem", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: 0 }}>{currentPhase.title}</h3>
            </div>
          </div>
          <div style={{ marginLeft: mob ? 0 : "auto", fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', background: `${currentPhase.color}10`, color: currentPhase.color, padding: "0.6rem 1rem", borderRadius: '2rem' }}>
            {currentPhase.subtitle}
          </div>
        </div>
        <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", lineHeight: 1.5, color: C.black, marginBottom: "1.25rem", maxWidth: "50rem" }}>{currentPhase.overview}</p>

        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: "1rem" }}>
          {currentPhase.methods.map((m, i) => (
            <div key={i} style={{
              background: "#FAFAFA", borderRadius: '1.875rem', padding: mob ? "1rem" : "1.25rem", border: "1px solid #EAEAEA",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <h4 style={{ fontFamily: F.headline, fontSize: mob ? "0.875rem" : "1rem", fontWeight: 900, letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: 0, color: C.black, flex: 1 }}>{m.name}</h4>
                <div style={{ fontFamily: F.body, fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', background: `${currentPhase.color}10`, color: currentPhase.color, padding: "0.25rem 0.5rem", borderRadius: '2rem', flexShrink: 0, marginLeft: "0.5rem" }}>
                  {m.standard}
                </div>
              </div>
              <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", lineHeight: 1.5, color: C.black, margin: 0 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Design Principles */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ width: 4, height: 28, background: C.red, borderRadius: 2 }} />
          <h3 style={{ fontFamily: F.headline, fontSize: mob ? "1.125rem" : "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: 0 }}>Core Design Principles</h3>
          <span style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted }}>International best practice</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: "0.75rem" }}>
          {designPrinciples.map((p, i) => (
            <div key={i} onClick={() => setExpandedPrinciple(expandedPrinciple === i ? null : i)} style={{
              background: expandedPrinciple === i ? "#FFF8F6" : "white", borderRadius: '1.875rem', padding: mob ? "1rem" : "1.25rem",
              border: expandedPrinciple === i ? `2px solid ${C.red}` : "2px solid #EAEAEA",
              cursor: "pointer", transition: "0.2s ease-in-out",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.headline, fontSize: mob ? "0.875rem" : "1rem", fontWeight: 900, letterSpacing: "calc(1em / 50)", textTransform: "uppercase", color: C.black }}>{p.title}</div>
                  <div style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, marginTop: "0.25rem" }}>{p.author}</div>
                </div>
                <span style={{ fontSize: "0.75rem", color: C.muted, marginLeft: "0.5rem" }}>{expandedPrinciple === i ? "▲" : "▼"}</span>
              </div>
              {expandedPrinciple === i && (
                <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #F0F0F0" }}>
                  <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", lineHeight: 1.5, color: C.black, margin: "0 0 0.75rem" }}>{p.body}</p>
                  <div style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', background: "rgba(255,26,26,0.08)", color: C.red, padding: "0.6rem 1rem", borderRadius: '2rem' }}>
                    {p.metric}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* KPI Framework */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ width: 4, height: 28, background: C.blue, borderRadius: 2 }} />
          <h3 style={{ fontFamily: F.headline, fontSize: mob ? "1.125rem" : "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: 0 }}>Performance KPI Framework</h3>
          <span style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted }}>UITP / World Bank benchmarks</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: "0.75rem" }}>
          {kpis.map((k, i) => (
            <div key={i} onClick={() => setExpandedKpi(expandedKpi === i ? null : i)} style={{
              background: expandedKpi === i ? "#F0F4FF" : "white", borderRadius: '1.875rem', padding: mob ? "1rem" : "1.25rem",
              border: expandedKpi === i ? `2px solid ${C.blue}` : "2px solid #EAEAEA",
              cursor: "pointer", transition: "0.2s ease-in-out",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.headline, fontSize: mob ? "0.875rem" : "1rem", fontWeight: 900, letterSpacing: "calc(1em / 50)", textTransform: "uppercase" }}>{k.name}</div>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem", alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: F.body, fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', background: "#E8F0FE", color: C.blue, padding: "0.25rem 0.5rem", borderRadius: '2rem' }}>{k.category}</span>
                    <span style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.green }}>Target: {k.target}</span>
                  </div>
                </div>
                <span style={{ fontSize: "0.75rem", color: C.muted, marginLeft: "0.5rem" }}>{expandedKpi === i ? "▲" : "▼"}</span>
              </div>
              {expandedKpi === i && (
                <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #F0F0F0" }}>
                  <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", lineHeight: 1.5, color: C.black, margin: "0 0 0.5rem" }}>{k.desc}</p>
                  <div style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, fontStyle: "italic" }}>Benchmark: {k.benchmark}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════ MAIN ═══════════════════════════
export default function YangoCityTransit() {
  const [activeTab, setActiveTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const mob = useIsMobile();
  const handleNav = (href, e) => {
    // For operators/government, switch to the right tab and scroll to the demos section
    if (href === "#operators") {
      e.preventDefault();
      setActiveTab(1);
      document.getElementById("passengers")?.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#government") {
      e.preventDefault();
      setActiveTab(3);
      document.getElementById("passengers")?.scrollIntoView({ behavior: "smooth" });
    }
    if (mob) setMenuOpen(false);
  };

  const navItems = [
    { label: "Overview", href: "#overview" },
    { label: "For Passengers", href: "#passengers" },
    { label: "For Operators", href: "#operators" },
    { label: "For Government", href: "#government" },
    { label: "Methodology", href: "#methodology" },
    { label: "Platform", href: "#platform" },
    { label: "Impact", href: "#impact" },
  ];
  const tabs = [
    { title: "Passenger App", icon: "" },
    { title: "Driver Console", icon: "" },
    { title: "Operator Dashboard", icon: "" },
    { title: "City Dashboard", icon: "" },
  ];

  // Close menu on resize to desktop
  useEffect(() => {
    if (!mob) setMenuOpen(false);
  }, [mob]);

  return (
    <div style={{ fontFamily: F.body, color: C.black, overflowX: "hidden" }}>
      {/* Fonts loaded via index.html font-face declarations */}

      {/* NAV — Yango Tech gradient overlay pattern */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "1.25rem 1.87rem" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)", pointerEvents: "none", zIndex: -1 }} />
        <div style={{ maxWidth: "116rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="https://avatars.mds.yandex.net/get-lpc/14837328/21641dca-3288-4eeb-8d99-81f8cb31a763/orig" alt="Yango Tech" style={{ height: 30, width: "auto" }} />
            {!mob && <>
              <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 4px" }}>|</span>
              <span style={{ color: C.white, fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>City Transit</span>
            </>}
            <span style={{ color: C.red, fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', background: "rgba(255,26,26,0.15)", padding: "0.6rem 1rem", borderRadius: '2rem', backdropFilter: "blur(5px)" }}>RWANDA</span>
          </div>
          {mob ? (
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{
              background: "none", border: "none", color: "white", fontSize: 24, cursor: "pointer",
              padding: 8, minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", listStyle: "none" }}>
              {navItems.map((n, i) => (
                <a key={i} href={n.href} onClick={(e) => handleNav(n.href, e)} style={{
                  padding: "1.1rem 1rem", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em',
                  textTransform: 'uppercase', textDecoration: "none", color: C.white,
                  transition: "0.2s ease-in-out",
                }}
                  onMouseEnter={e => e.target.style.opacity = "1"} onMouseLeave={e => e.target.style.opacity = "0.7"}>{n.label}</a>
              ))}
              <a href="https://tech.yango.com/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                padding: "1rem 2rem", background: C.dark, color: C.white, borderRadius: "2rem",
                fontFamily: F.body, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.15em",
                textTransform: "uppercase", textDecoration: "none", transition: "0.2s ease-in-out",
              }}
                onMouseEnter={e => e.currentTarget.style.background = C.red}
                onMouseLeave={e => e.currentTarget.style.background = C.dark}
              >Talk to an expert</a>
            </div>
          )}
        </div>
        {/* Mobile menu dropdown */}
        {mob && menuOpen && (
          <div style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)", padding: "1.25rem 1.87rem", borderRadius: "0 0 2.5rem 2.5rem", marginTop: "0.5rem" }}>
            {navItems.map((n, i) => (
              <a key={i} href={n.href} onClick={(e) => handleNav(n.href, e)} style={{
                display: "block", color: C.white, textDecoration: "none", fontSize: '0.72rem', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: "1rem 0", borderBottom: i < navItems.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>{n.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO — dark bg, white text, Yango style */}
      <section id="overview" style={{ background: "#000", minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "6rem", color: C.white }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse at 25% 50%, rgba(255,26,26,0.15) 0%, transparent 60%), radial-gradient(ellipse at 75% 30%, rgba(255,26,26,0.08) 0%, transparent 50%), #000" }} />
        </div>
        <div style={{ maxWidth: "116rem", margin: "0 auto", padding: mob ? "2.5rem 1.25rem" : "0 1.87rem", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "flex", flexDirection: mob ? "column" : "row", alignItems: mob ? "flex-start" : "center", gap: mob ? "2rem" : "3.75rem" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-block", background: "rgba(255,26,26,0.12)", border: "1px solid rgba(255,26,26,0.25)", color: C.red, padding: "0.6rem 1rem", borderRadius: '2rem', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: mob ? "1rem" : "1.5rem" }}>
                SMART MOBILITY FOR KIGALI & RWANDA
              </div>
              <h1 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(2.5rem, 8vw, 3.5rem)" : "clamp(3rem, 5vw, 6.25rem)", fontWeight: 900, lineHeight: "85%", color: "white", margin: "0 0 2rem", letterSpacing: "calc(1em / 50)", maxWidth: "50rem", textTransform: "uppercase" }}>
                Accelerate Kigali's<br/><span style={{ color: C.red }}>smart mobility.</span>
              </h1>
              <p style={{ fontFamily: F.body, fontSize: mob ? "0.875rem" : "1rem", lineHeight: 1.5, letterSpacing: "0.05em", color: "rgba(245,245,245,0.6)", maxWidth: "36rem", margin: "0 0 2rem" }}>
                Kigali already leads Africa in smart city innovation. Yango City Transit takes your transport system to the next level — upgrading from Tap & Go cards to a full AI-powered platform with real-time optimization, BRT readiness, and electric bus integration.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "3rem" }}>
                <a href="#platform" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "1.25rem 2.5rem", background: C.red, color: "white", borderRadius: "2rem", fontFamily: F.body, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", transition: "0.2s ease-in-out" }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.black; }} onMouseLeave={e => { e.currentTarget.style.background = C.red; }}>Explore Platform</a>
                <a href="#impact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "1.25rem 2.5rem", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "2rem", fontFamily: F.body, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", transition: "0.2s ease-in-out" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.red; e.currentTarget.style.color = C.red; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "white"; }}>See Impact</a>
              </div>
            </div>
            <div style={{ flex: mob ? "unset" : 0.8, width: mob ? "100%" : "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                {[
                  { val: "98%", label: "4G Population Coverage" },
                  { val: "500+", label: "Buses in Kigali" },
                  { val: "180K", label: "Daily Passengers at Nyabugogo" },
                  { val: "30+", label: "Countries We Operate In" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: '1.875rem', padding: mob ? "1.25rem" : "2rem 1.5rem" }}>
                    <div style={{ fontSize: mob ? "1.5rem" : "2rem", fontWeight: 900, color: "white", fontFamily: F.headline, lineHeight: "90%", letterSpacing: "calc(1em / 50)" }}>{s.val}</div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: "rgba(255,255,255,0.5)", marginTop: "0.75rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <Section bg={C.body} id="pillars">
        <div style={{ textAlign: "center", marginBottom: mob ? "1.75rem" : "4rem" }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(1.5rem, 4vw, 2rem)" : "clamp(2rem, 3.5vw, 3.85rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 1rem" }}>One platform. <span style={{ color: C.red }}>Three transformations.</span></h2>
          <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, maxWidth: "36rem", margin: "0 auto", lineHeight: 1.5 }}>Connects passengers, operators, and city authorities on a single intelligent transport system.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: "2rem" }}>
          {[
            { title: "For Citizens", num: "01", color: C.green, items: ["Upgrade from Tap & Go to full real-time tracking", "Pay via MTN MoMo, Airtel Money, or smart card", "Multi-modal trips: bus + moto-taxi + walking", "Know exactly when your bus arrives — no more waiting", "Seamless transfers at Nyabugogo & Kicukiro hubs"] },
            { title: "For Carriers", num: "02", color: C.blue, items: ["GPS navigation for Kigali's hilly terrain", "Digital fare collection replaces cash completely", "Real-time fleet monitoring for all 18+ operators", "RURA-ready compliance and reporting built in", "AI optimization ready for BRT dedicated lanes"] },
            { title: "For the City", num: "03", color: C.red, items: ["Full analytics aligned with Vision 2050 targets", "Data-driven route planning for 80% coverage goal", "Subsidy-free operations supported by efficiency gains", "Real-time dashboards for City of Kigali & MININFRA", "Electric bus fleet integration & BRT corridor planning"] },
          ].map((p, i) => (
            <div key={i} style={{ background: "white", borderRadius: '1.875rem', padding: "2.5rem 2rem", borderTop: `4px solid ${p.color}` }}>
              <div style={{ fontFamily: F.body, fontSize: "2rem", fontWeight: 900, color: C.black, opacity: 0.06, marginBottom: "0.5rem" }}>{p.num}</div>
              <h3 style={{ fontFamily: F.headline, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 1rem" }}>{p.title}</h3>
              {p.items.map((item, j) => (
                <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", marginBottom: "0.75rem", fontFamily: F.body, fontSize: "0.875rem", lineHeight: 1.5, letterSpacing: "0.05em", color: C.black }}>
                  <span style={{ color: p.color, fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>→</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* INTERACTIVE DEMOS */}
      <Section bg="white" id="passengers">
        <div style={{ textAlign: "center", marginBottom: mob ? "1.5rem" : "4rem" }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(1.5rem, 4vw, 2rem)" : "clamp(2rem, 3.5vw, 3.85rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 1rem" }}>See it in <span style={{ color: C.red }}>action.</span></h2>
          <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, lineHeight: 1.5 }}>Interactive mockups — tap through every interface.</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: mob ? "1.5rem" : "3rem", flexWrap: "wrap" }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: "1rem 2rem", borderRadius: '2rem', border: "none",
              background: activeTab === i ? C.dark : "#F0F0F0", color: activeTab === i ? "white" : C.black,
              fontFamily: F.body, fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              cursor: "pointer", transition: "0.2s ease-in-out", minHeight: 44, whiteSpace: "nowrap",
            }}>{t.title}</button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: mob ? 20 : 40 }}>
          {activeTab === 0 && (
            <div style={{ display: "flex", flexDirection: mob ? "column" : "row", alignItems: "center", gap: mob ? "1.5rem" : "3.75rem" }}>
              <PhoneMockup label="Passenger App"><PassengerApp/></PhoneMockup>
              <div style={{ maxWidth: mob ? "100%" : "25rem" }}>
                <h3 style={{ fontFamily: F.headline, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", marginBottom: "1rem" }}>Passengers know exactly when the bus arrives</h3>
                <p style={{ fontFamily: F.body, fontSize: "0.875rem", lineHeight: 1.5, letterSpacing: "0.05em", color: C.black, marginBottom: "1.25rem" }}>Kigali's Tap & Go system was a great start. Yango Transit takes it further — real-time GPS tracking of every bus, predictive arrival times, and seamless mobile money integration with MTN MoMo and Airtel Money.</p>
                {["Real-time arrival predictions at every Kigali stop", "Pay via MTN MoMo, Airtel Money, or Safaribus card", "Multi-modal planner: bus + moto-taxi + walking routes", "Kinyarwanda, English & French interface support"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.625rem", marginBottom: "0.625rem", fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.black }}>
                    <span style={{ background: "#FFF0ED", color: C.red, width: 24, height: 24, borderRadius: '1rem', display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.72rem", flexShrink: 0 }}>{i+1}</span>{f}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div style={{ display: "flex", flexDirection: mob ? "column-reverse" : "row", alignItems: "center", gap: mob ? "1.5rem" : "3.75rem" }}>
              <div style={{ maxWidth: mob ? "100%" : "25rem" }}>
                <h3 style={{ fontFamily: F.headline, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", marginBottom: "1rem" }}>Drivers navigate, the app handles ticketing</h3>
                <p style={{ fontFamily: F.body, fontSize: "0.875rem", lineHeight: 1.5, letterSpacing: "0.05em", color: C.black, marginBottom: "1.25rem" }}>With 18+ bus operators in Kigali, standardized digital tools are essential. Yango Transit gives every driver navigation, scheduling, and automated fare collection — ready for BRT corridors.</p>
                {["Turn-by-turn route navigation with live traffic", "Automatic passenger counting via sensors", "Schedule adherence alerts & announcements", "Digital trip logging — no paper manifests"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.625rem", marginBottom: "0.625rem", fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.black }}>
                    <span style={{ background: "#E8F0FE", color: C.blue, width: 24, height: 24, borderRadius: '1rem', display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.72rem", flexShrink: 0 }}>{i+1}</span>{f}
                  </div>
                ))}
              </div>
              <PhoneMockup label="Driver Console"><DriverApp/></PhoneMockup>
            </div>
          )}
          {activeTab === 2 && (
            <div style={{ display: "flex", flexDirection: mob ? "column" : "row", alignItems: "center", gap: mob ? "1.5rem" : "2.5rem" }}>
              <PhoneMockup label="Operator Dashboard"><OperatorDashboard/></PhoneMockup>
              <div style={{ maxWidth: mob ? "100%" : "26rem" }}>
                <h3 style={{ fontFamily: F.headline, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", marginBottom: "1rem" }}>Create & optimize routes with AI insights</h3>
                <p style={{ fontFamily: F.body, fontSize: "0.875rem", lineHeight: 1.5, letterSpacing: "0.05em", color: C.black, marginBottom: "1.25rem" }}>Whether you're managing a fleet of 20 buses or planning the entire Kigali network, operators get AI insights aligned with RURA standards and City of Kigali transport targets.</p>
                {["AI detects low-ridership periods and suggests changes", "Overcrowding alerts with express bus recommendations", "Underserved area detection → new route proposals", "One-click route changes or simulate-first mode", "Dynamic adjustments based on real-time demand"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.625rem", marginBottom: "0.625rem", fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.black }}>
                    <span style={{ background: "#FFF0ED", color: C.red, width: 24, height: 24, borderRadius: '1rem', display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.72rem", flexShrink: 0 }}>{i+1}</span>{f}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
              <TabletMockup label="City Operations Dashboard"><CityDashboard/></TabletMockup>
              <div style={{ maxWidth: "44rem", textAlign: "center" }}>
                <h3 style={{ fontFamily: F.headline, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", marginBottom: "1rem" }}>Full transparency. Zero fraud. Taxable revenue.</h3>
                <p style={{ fontFamily: F.body, fontSize: "0.875rem", lineHeight: 1.5, letterSpacing: "0.05em", color: C.black }}>Every fare digitally recorded, every bus GPS-tracked, every route optimized. Drivers and fleet operators cannot cheat or skim. Transport quality is controlled through measurable metrics.</p>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ANALYTICS */}
      <Section bg="white" id="analytics">
        <div style={{ textAlign: "center", marginBottom: mob ? "1.75rem" : "4rem" }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(1.5rem, 4vw, 2rem)" : "clamp(2rem, 3.5vw, 3.85rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 1rem" }}>Data-driven <span style={{ color: C.red }}>decisions.</span></h2>
          <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, maxWidth: "36rem", margin: "0 auto", lineHeight: 1.5 }}>AI analytics aligned with Rwanda's Transport Sector Strategic Plan 2024–2029 and Vision 2050.</p>
        </div>
        <SpeedMapDemo/>
        <FareEvasionDemo/>
        <AccessibilityDemo/>
      </Section>

      {/* ROUTE DESIGN METHODOLOGY */}
      <Section bg={C.body} id="methodology">
        <RouteDesignMethodology />
      </Section>

      {/* ANTI-FRAUD — dark section */}
      <Section bg="#000" id="transparency" style={{ color: C.white }}>
        <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? "1.75rem" : "3.75rem", alignItems: mob ? "flex-start" : "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.body, color: C.red, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: "1rem" }}>Transparency & Control</div>
            <h2 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(1.5rem, 4vw, 2rem)" : "clamp(2rem, 3.5vw, 3.85rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", color: "white", margin: "0 0 2rem" }}>Every fare captured.<br/>Every bus tracked.<br/>Every route optimized.</h2>
            <p style={{ fontFamily: F.body, fontSize: "0.875rem", lineHeight: 1.5, letterSpacing: "0.05em", color: "rgba(245,245,245,0.6)" }}>Rwanda's government ended transport subsidies in March 2024, making operational efficiency critical for every operator. Yango City Transit maximizes revenue capture while keeping fares affordable through AI-optimized routes and schedules.</p>
          </div>
          <div style={{ flex: 1, width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: "1rem" }}>
              {[
                { title: "Digital Fare Collection", desc: "Every payment logged with timestamp, route, vehicle ID." },
                { title: "GPS Fleet Tracking", desc: "Real-time location. No ghost buses, no route deviations." },
                { title: "Automated Reporting", desc: "Revenue reports generated for authorities and tax offices." },
                { title: "Dynamic Routes", desc: "Adjust routes in real-time based on demand or events." },
                { title: "Inspector Tools", desc: "AI-powered routing targets high-evasion areas automatically." },
                { title: "Fraud Prevention", desc: "Tamper-proof records. Cannot manipulate counts or fares." },
              ].map((f, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: '1.875rem', padding: "1.5rem" }}>
                  <div style={{ fontFamily: F.body, fontSize: "0.875rem", fontWeight: 500, color: "white", marginBottom: "0.375rem", letterSpacing: "0.05em" }}>{f.title}</div>
                  <div style={{ fontFamily: F.body, fontSize: "0.875rem", lineHeight: 1.5, letterSpacing: "0.05em", color: "rgba(245,245,245,0.5)" }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PLATFORM */}
      <Section bg={C.body} id="platform">
        <div style={{ textAlign: "center", marginBottom: mob ? "1.75rem" : "4rem" }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(1.5rem, 4vw, 2rem)" : "clamp(2rem, 3.5vw, 3.85rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 1rem" }}>Integrated <span style={{ color: C.red }}>platform</span> architecture</h2>
          <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, maxWidth: "36rem", margin: "0 auto", lineHeight: 1.5 }}>Four modules working as one integrated system.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: "2rem", maxWidth: "56rem", margin: "0 auto" }}>
          {[
            { num: "01", title: "Analytics & Optimization", color: C.red, items: ["Origin-destination trip matrix", "Route optimization based on real demand", "Decision support for transport engineers", "Accessibility, speed & accident mapping"] },
            { num: "02", title: "Central Dispatching", color: C.blue, items: ["Operational control of all carriers", "Real-time schedule monitoring", "Dynamic route adjustments", "Fleet allocation optimization"] },
            { num: "03", title: "On-Board Equipment", color: C.green, items: ["Passenger counting sensors", "Driver behavior monitoring", "Road infrastructure condition control", "GPS tracking and telemetry"] },
            { num: "04", title: "Inspection & Revenue Control", color: C.amber, items: ["AI-powered inspector route planning", "Fare evasion heat mapping", "Revenue leakage detection", "Automated compliance reporting"] },
          ].map((m, i) => (
            <div key={i} style={{ background: "white", borderRadius: '1.875rem', padding: "2rem", borderLeft: `4px solid ${m.color}` }}>
              <div style={{ fontFamily: F.body, fontSize: "2rem", fontWeight: 900, color: C.black, opacity: 0.06, marginBottom: "0.5rem" }}>{m.num}</div>
              <h3 style={{ fontFamily: F.headline, fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 1rem" }}>{m.title}</h3>
              {m.items.map((item, j) => (
                <div key={j} style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.black, marginBottom: "0.5rem", display: "flex", gap: "0.5rem", lineHeight: 1.5 }}>
                  <span style={{ color: m.color, fontWeight: 700 }}>→</span> {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* IMPACT */}
      <Section bg="white" id="impact">
        <div style={{ textAlign: "center", marginBottom: mob ? "1.75rem" : "4rem" }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(1.5rem, 4vw, 2rem)" : "clamp(2rem, 3.5vw, 3.85rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 1rem" }}>Proven <span style={{ color: C.red }}>impact</span></h2>
          <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, maxWidth: "36rem", margin: "0 auto", lineHeight: 1.5 }}>Proven results from live deployments — ready to scale across Kigali and Rwanda's secondary cities.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4, 1fr)", gap: "2rem", marginBottom: mob ? "1.75rem" : "4rem" }}>
          {[
            { value: 30, suffix: "%", label: "Increase in Fare Revenue", desc: "Potential for Kigali through AI-optimized operations" },
            { value: 115, prefix: "+$", suffix: "M", label: "Additional Revenue / Year", desc: "Scalable across Kigali and secondary cities" },
            { value: 40, suffix: "%", label: "Faster Decision Making", desc: "With real-time data gathering & analysis" },
            { value: 15, suffix: "%", label: "Travel Time Reduction", desc: "Through optimized routing & scheduling" },
          ].map((m, i) => (
            <div key={i} style={{ background: C.body, borderRadius: '1.875rem', padding: mob ? "1.5rem 1rem" : "2.5rem 1.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.red }}/>
              <div style={{ fontFamily: F.headline, fontSize: mob ? "2rem" : "clamp(2rem, 3.5vw, 3.85rem)", fontWeight: 900, color: C.red, lineHeight: "90%", letterSpacing: "calc(1em / 50)" }}>
                <Counter end={m.value} prefix={m.prefix || "+"} suffix={m.suffix}/>
              </div>
              <div style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.black, marginTop: "0.75rem", marginBottom: "0.375rem" }}>{m.label}</div>
              <div style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, lineHeight: 1.5 }}>{m.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: C.black, borderRadius: '1.875rem', padding: mob ? "2rem" : "3rem", display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? "1.5rem" : "3rem", color: C.white }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.body, color: C.red, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: "0.75rem" }}>Case Study</div>
            <h3 style={{ fontFamily: F.headline, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", color: "white", margin: "0 0 1rem" }}>Yerevan, Armenia</h3>
            <p style={{ fontFamily: F.body, fontSize: "0.875rem", lineHeight: 1.5, letterSpacing: "0.05em", color: "rgba(245,245,245,0.6)", marginBottom: "1.25rem" }}>
              Full transport analytics deployment including speed mapping, accessibility analysis, route optimization, and fare evasion tracking for a city of 1.1 million residents.
            </p>
            {["Speed mapping identified bottlenecks at 10–15 km/h", "Accessibility gaps found in 6+ underserved districts", "Dedicated bus lane recommendations for major avenues", "Road safety analysis with targeted interventions", "AI-powered inspector routing for fare evasion hotspots"].map((item, j) => (
              <div key={j} style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: "rgba(245,245,245,0.5)", marginBottom: "0.5rem", display: "flex", gap: "0.5rem" }}>
                <span style={{ color: C.red }}>→</span> {item}
              </div>
            ))}
          </div>
          <div style={{ flex: 0.6, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ background: "rgba(255,26,26,0.1)", border: "1px solid rgba(255,26,26,0.25)", borderRadius: '1.875rem', padding: "2rem 1.5rem", textAlign: "center" }}>
              <div style={{ fontFamily: F.headline, fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 900, color: C.red, lineHeight: "90%", letterSpacing: "calc(1em / 50)" }}>~+$115M</div>
              <div style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: "rgba(245,245,245,0.6)", marginTop: "0.5rem" }}>estimated additional revenue per year</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: '1.875rem', padding: "2rem 1.5rem", textAlign: "center" }}>
              <div style={{ fontFamily: F.headline, fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 900, color: "white", lineHeight: "90%", letterSpacing: "calc(1em / 50)" }}>+30%</div>
              <div style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: "rgba(245,245,245,0.6)", marginTop: "0.5rem" }}>growth in paid passenger trips</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: '1.875rem', padding: "1rem 1.5rem", textAlign: "center" }}>
              <div style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: "rgba(245,245,245,0.35)", lineHeight: 1.5 }}>Preliminary estimate based on route optimization, schedule improvements, and more efficient fare inspection</div>
            </div>
          </div>
        </div>
      </Section>

      {/* IMPLEMENTATION + PPP */}
      <Section bg={C.body}>
        <div style={{ textAlign: "center", marginBottom: mob ? "1.75rem" : "4rem" }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(1.5rem, 4vw, 2rem)" : "clamp(2rem, 3.5vw, 3.85rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 1rem" }}>How we <span style={{ color: C.red }}>deliver</span></h2>
          <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, maxWidth: "36rem", margin: "0 auto", lineHeight: 1.5 }}>Flexible partnership models designed for government and transport authorities.</p>
        </div>
        <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? "1.25rem" : 0, maxWidth: "56rem", margin: "0 auto", position: "relative" }}>
          {!mob && <div style={{ position: "absolute", top: 32, left: "10%", right: "10%", height: 3, background: C.border, zIndex: 0 }}/>}
          {[
            { month: "Month 1–2", title: "Assessment & Design", desc: "City mapping, demand analysis, system architecture" },
            { month: "Month 3–4", title: "Deployment", desc: "Equipment, app rollout, operator training" },
            { month: "Month 5–6", title: "Go-Live & Tuning", desc: "Optimization, route refinements, scaling" },
            { month: "Month 7+", title: "Full Operations", desc: "Ongoing optimization, expansion, support" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 1rem",
                background: i === 3 ? C.red : "white", border: `3px solid ${i === 3 ? C.red : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: F.headline, fontWeight: 900, fontSize: "1.25rem", letterSpacing: "calc(1em / 50)", color: i === 3 ? "white" : C.black,
              }}>{i+1}</div>
              <div style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.red, marginBottom: "0.375rem" }}>{s.month}</div>
              <div style={{ fontFamily: F.headline, fontSize: "1rem", fontWeight: 900, letterSpacing: "calc(1em / 50)", textTransform: "uppercase", marginBottom: "0.375rem" }}>{s.title}</div>
              <div style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, lineHeight: 1.5, padding: "0 0.5rem" }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: mob ? "1.75rem" : "4rem", background: "white", borderRadius: '1.875rem', padding: mob ? "1.5rem" : "2.5rem", maxWidth: "50rem", marginLeft: "auto", marginRight: "auto", border: `2px solid rgba(255,26,26,0.12)` }}>
          <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? "1rem" : "2rem", alignItems: mob ? "flex-start" : "center" }}>
            <div style={{ fontFamily: F.headline, fontSize: mob ? "1.75rem" : "2.5rem", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", color: C.red, flexShrink: 0 }}>PPP</div>
            <div>
              <div style={{ fontFamily: F.headline, fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", color: C.black, marginBottom: "0.5rem" }}>Open to Public-Private Partnership Models</div>
              <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.black, lineHeight: 1.5, margin: 0 }}>
                Rwanda pioneered Africa's most successful e-government PPP with Irembo's 25-year partnership model. Yango Tech is ready to bring the same approach to transport — partnering with MININFRA, City of Kigali, RURA, and RTDA through structures that complement the World Bank's $100M RUMI project and JICA's intelligent transport system investment. We align with Rwanda's proven PPP frameworks.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* TECH BACKBONE */}
      <Section bg="white">
        <div style={{ textAlign: "center", marginBottom: mob ? "1.75rem" : "4rem" }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(1.5rem, 4vw, 2rem)" : "clamp(2rem, 3.5vw, 3.85rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", margin: "0 0 1rem" }}>Built on <span style={{ color: C.red }}>proven technology</span></h2>
          <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.muted, maxWidth: "36rem", margin: "0 auto", lineHeight: 1.5 }}>Battle-tested infrastructure powering ride-hailing, logistics, and navigation for millions daily.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: "2rem" }}>
          {[
            { title: "Yango Maps", desc: "HD mapping with 25% better geocoding and 16% better routing than competitors. On-premise available.", stat: "~30% lower cost" },
            { title: "RouteQ Dispatch", desc: "AI-powered route optimization handling 1M+ daily orders in peak. Proven 15% efficiency boost.", stat: "430+ clients" },
            { title: "AI & ML Engine", desc: "60+ services powered by proprietary AI — computer vision, predictive analytics, demand forecasting.", stat: "10+ B2B products" },
            { title: "Cloud Infrastructure", desc: "Full-stack cloud with on-premise options. ~30% TCO savings vs AWS/GCP. Data sovereignty guaranteed.", stat: "99.9% SLA" },
            { title: "White-Label Apps", desc: "Production-ready passenger, driver, and operator apps. Customizable branding. iOS, Android, web.", stat: "Rapid deployment" },
            { title: "On-Premise Security", desc: "All systems deployable on-premise for full data sovereignty. No external cloud dependency.", stat: "Full control" },
          ].map((t, i) => (
            <div key={i} style={{ background: C.body, borderRadius: '1.875rem', padding: "2rem" }}>
              <h4 style={{ fontFamily: F.headline, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: 'uppercase', margin: "0 0 0.75rem" }}>{t.title}</h4>
              <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: C.black, lineHeight: 1.5, margin: "0 0 1rem" }}>{t.desc}</p>
              <div style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.red, background: "rgba(255,26,26,0.08)", display: "inline-block", padding: "0.6rem 1rem", borderRadius: '2rem' }}>{t.stat}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section style={{ background: C.red, padding: mob ? "3rem 0" : "6rem 0", textAlign: "center" }}>
        <div style={{ maxWidth: "44rem", margin: "0 auto", padding: "0 1.87rem" }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? "clamp(1.5rem, 5vw, 2rem)" : "clamp(2rem, 4vw, 3.85rem)", fontWeight: 900, lineHeight: "90%", letterSpacing: "calc(1em / 50)", textTransform: "uppercase", color: "white", margin: "0 0 1.5rem" }}>Ready to accelerate Rwanda's smart mobility?</h2>
          <p style={{ fontFamily: F.body, fontSize: "0.875rem", letterSpacing: "0.05em", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: "0 0 2.5rem" }}>Let's discuss how Yango City Transit can complement Kigali's existing smart city investments and scale Rwanda's transport vision. We start with a free assessment.</p>
          <a href="https://tech.yango.com/" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: "white", color: C.black, padding: "1.25rem 2.5rem", borderRadius: '2rem',
            fontFamily: F.body, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.15em", textTransform: "uppercase",
            textDecoration: "none", cursor: "pointer", transition: "0.2s ease-in-out",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.black; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = C.black; }}
          >Talk to an expert</a>
        </div>
      </section>

      {/* FOOTER — Yango Tech footer pattern with columns */}
      <footer style={{ background: C.black, color: C.white, padding: "4rem 0 2rem" }}>
        <div style={{ maxWidth: "116rem", margin: "0 auto", padding: "0 1.87rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>
            <a href="/">
              <img src="https://avatars.mds.yandex.net/get-lpc/14837328/21641dca-3288-4eeb-8d99-81f8cb31a763/orig" alt="Yango Tech" style={{ height: 30, width: "auto", filter: "invert(1)" }} />
            </a>
            <div style={{ display: "flex", gap: "3.75rem", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: "1rem", opacity: 0.5 }}>Platform</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["Analytics & Optimization", "Central Dispatching", "On-Board Equipment", "Revenue Control"].map((item, i) => (
                    <li key={i}><a href="#platform" style={{ fontFamily: F.body, fontSize: "0.78rem", letterSpacing: "0.05em", color: C.white, textDecoration: "none", transition: "opacity 0.2s ease-in-out" }}
                      onMouseEnter={e => e.target.style.opacity = "0.5"} onMouseLeave={e => e.target.style.opacity = "1"}>{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: "1rem", opacity: 0.5 }}>Solutions</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["For Passengers", "For Operators", "For Government", "Route Design"].map((item, i) => (
                    <li key={i}><a href={`#${["passengers","operators","government","methodology"][i]}`} style={{ fontFamily: F.body, fontSize: "0.78rem", letterSpacing: "0.05em", color: C.white, textDecoration: "none", transition: "opacity 0.2s ease-in-out" }}
                      onMouseEnter={e => e.target.style.opacity = "0.5"} onMouseLeave={e => e.target.style.opacity = "1"}>{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: "1rem", opacity: 0.5 }}>Company</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["About Yango Tech", "Careers", "Contact"].map((item, i) => (
                    <li key={i}><a href="https://tech.yango.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.body, fontSize: "0.78rem", letterSpacing: "0.05em", color: C.white, textDecoration: "none", transition: "opacity 0.2s ease-in-out" }}
                      onMouseEnter={e => e.target.style.opacity = "0.5"} onMouseLeave={e => e.target.style.opacity = "1"}>{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 3.75rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.5 }}>© 2026 Yango Tech</span>
            <a href="https://tech.yango.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.white, textDecoration: "none" }}>Privacy Policy</a>
            <a href="https://tech.yango.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.body, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.white, textDecoration: "none" }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
