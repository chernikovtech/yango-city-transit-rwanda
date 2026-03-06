import { useState, useEffect, useRef } from "react";

const C = {
  red: "#FC3F1D", redDark: "#D4341A", black: "#1A1A1A", dark: "#2A2A2A",
  charcoal: "#333", white: "#FFF", off: "#F8F8F8", light: "#E8E8E8",
  med: "#999", green: "#2ECC71", blue: "#3498DB", amber: "#F39C12",
  teal: "#1ABC9C",
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
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} id={id} style={{
      background: bg, padding: "80px 0", opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)", ...style,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>{children}</div>
    </section>
  );
}

function PhoneMockup({ children, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: 270, margin: "0 auto", background: C.black,
        borderRadius: 32, padding: "12px 8px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ width: 60, height: 6, background: "#444", borderRadius: 3, margin: "0 auto 8px" }} />
        <div style={{ background: C.white, borderRadius: 24, overflow: "hidden", minHeight: 460 }}>{children}</div>
        <div style={{ width: 40, height: 5, background: "#555", borderRadius: 3, margin: "10px auto 0" }} />
      </div>
      {label && <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: C.charcoal }}>{label}</div>}
    </div>
  );
}

function TabletMockup({ children, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: "100%", maxWidth: 580, margin: "0 auto", background: C.black,
        borderRadius: 20, padding: "14px 10px", boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      }}>
        <div style={{ background: C.white, borderRadius: 12, overflow: "hidden", minHeight: 360 }}>{children}</div>
      </div>
      {label && <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: C.charcoal }}>{label}</div>}
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
    <div style={{ fontSize: 13, fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ background: C.red, color: C.white, padding: "10px 14px 8px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Yango Transit</span>
        <span style={{ fontSize: 11, opacity: 0.9 }}>9:41 AM</span>
      </div>
      <div style={{ background: "#E8F4E8", height: 155, position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%" style={{ position: "absolute" }}>
          <defs><pattern id="pg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#cde0cd" strokeWidth="1"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#pg)"/>
          <path d="M30 140Q80 100 130 80T230 30" stroke={C.red} strokeWidth="3" fill="none" strokeDasharray="6,3"/>
          <circle cx="75" cy="108" r="12" fill={C.red}/><text x="75" y="112" textAnchor="middle" fill="white" fontSize="11">🚌</text>
          <circle cx="30" cy="140" r="6" fill={C.red} stroke="white" strokeWidth="2"/>
          <circle cx="130" cy="80" r="5" fill="#666" stroke="white" strokeWidth="2"/>
          <circle cx="230" cy="30" r="5" fill="#666" stroke="white" strokeWidth="2"/>
        </svg>
        <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(255,255,255,0.95)", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 600, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          🔴 Route 14 — <span style={{ color: C.red }}>Live</span>
        </div>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: C.black }}>Nearby Stops</div>
        {stops.map((s, i) => (
          <div key={i} onClick={() => { setSel(i === sel ? null : i); setPaid(null); }} style={{
            padding: "9px 12px", marginBottom: 5, borderRadius: 10,
            background: sel === i ? "#FFF0ED" : "#F5F5F5",
            border: sel === i ? `2px solid ${C.red}` : "2px solid transparent",
            cursor: "pointer", transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: C.med, marginTop: 1 }}>{s.buses.join(" · ")}</div>
              </div>
              <div style={{
                background: i === 0 ? C.green : "#EEE", color: i === 0 ? "white" : C.charcoal,
                padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 700,
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
                    }}>💳 Pay {s.fare}</div>
                    <div onClick={(e) => e.stopPropagation()} style={{
                      flex: 1, background: C.black, color: "white", padding: "8px 0", borderRadius: 8,
                      textAlign: "center", fontWeight: 600, fontSize: 12, cursor: "pointer",
                    }}>🔔 Set Alert</div>
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
    <div style={{ fontSize: 13, fontFamily: "-apple-system, sans-serif" }}>
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
        <div style={{ position: "absolute", top: 10, left: 10, right: 10, background: "rgba(0,0,0,0.7)", borderRadius: 10, padding: "8px 12px", color: "white" }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>↗ 280m</div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>Turn right onto Main Ave · Next stop in 3 min</div>
        </div>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 12px", background: "#F5F5F5", borderRadius: 10, marginBottom: 8 }}>
          <div><div style={{ fontSize: 11, color: C.med }}>Route</div><div style={{ fontWeight: 700, fontSize: 13 }}>Route 14 — North</div></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: C.med }}>Passengers</div><div style={{ fontWeight: 700, color: C.red }}>34 / 55</div></div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {[{ label: "On Time", val: "✓", bg: "#E8F8E8", c: C.green }, { label: "Next Stop", val: "2:30", bg: "#FFF3E0", c: C.amber }, { label: "Fares Paid", val: "98%", bg: "#E8F0FE", c: C.blue }].map((m, i) => (
            <div key={i} style={{ flex: 1, background: m.bg, borderRadius: 10, padding: "9px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: m.c }}>{m.val}</div>
              <div style={{ fontSize: 9, color: C.charcoal, marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
          <div onClick={() => { setAnnouncing(true); setTimeout(() => setAnnouncing(false), 2000); }}
            style={{ flex: 1, padding: "10px", borderRadius: 10, textAlign: "center", fontWeight: 600, fontSize: 12, background: announcing ? C.green : C.black, color: "white", cursor: "pointer", transition: "all 0.3s" }}>
            {announcing ? "✓ Announced!" : "📢 Announce Stop"}
          </div>
          <div style={{ flex: 1, padding: "10px", borderRadius: 10, textAlign: "center", fontWeight: 600, fontSize: 12, background: "#F5F5F5", color: C.charcoal, cursor: "pointer" }}>
            🚨 Report Issue
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
    { id: 0, route: "Route 7", insight: "Low ridership 10PM–6AM", suggestion: "Reduce frequency to 30-min intervals after 10PM", saving: "Save 2 vehicles nightly", icon: "📉" },
    { id: 1, route: "Route 14", insight: "Overcrowding 7–9AM peak", suggestion: "Add 3 express buses during morning peak", saving: "+18% capacity", icon: "📈" },
    { id: 2, route: "New Route", insight: "Underserved district detected", suggestion: "Create Route 31: Industrial Zone → Central Station via Market", saving: "Serve 12K residents", icon: "🆕" },
  ];
  return (
    <div style={{ fontSize: 12, fontFamily: "-apple-system, sans-serif" }}>
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
              <div style={{ fontSize: 8, color: C.med }}>{k.l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>🤖 AI Route Insights</span>
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
                  <div style={{ fontSize: 9, color: C.med }}>{t.insight}</div>
                </div>
              </div>
              <span style={{ fontSize: 10, color: C.med }}>{aiTip === t.id ? "▲" : "▼"}</span>
            </div>
            {aiTip === t.id && (
              <div style={{ padding: "8px 10px", background: "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
                <div style={{ fontSize: 10, color: C.charcoal, marginBottom: 4, lineHeight: 1.4 }}>
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
                      flex: 1, background: "#F0F0F0", color: C.charcoal, padding: "6px", borderRadius: 6,
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
    <div style={{ fontSize: 12, fontFamily: "-apple-system, sans-serif" }}>
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
              <div style={{ fontSize: 7, color: C.med, marginTop: 1 }}>{k.l}</div>
              <div style={{ fontSize: 8, color: k.c, fontWeight: 600 }}>{k.t}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#E8F4E8", height: 105, borderRadius: 10, position: "relative", overflow: "hidden", marginBottom: 10 }}>
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
                <div style={{ fontSize: 7, color: C.med, marginTop: 1 }}>{["M","T","W","T","F","S","S"][i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeedMapDemo() {
  const [hovered, setHovered] = useState(null);
  const zones = [
    { x: 15, y: 20, w: 25, h: 30, speed: "10-12", color: "#FF4444", label: "Nyarugenge / CBD", rec: "BRT dedicated lane priority zone" },
    { x: 45, y: 15, w: 25, h: 25, speed: "12-15", color: "#FF8800", label: "Kicukiro", rec: "Signal optimization at 22 junctions" },
    { x: 20, y: 55, w: 30, h: 30, speed: "18-22", color: "#FFCC00", label: "Gasabo District", rec: "Frequency adjustment for peak demand" },
    { x: 55, y: 45, w: 30, h: 35, speed: "22-30", color: "#44BB44", label: "Nyabugogo Corridor", rec: "Express corridor to secondary cities" },
  ];
  return (
    <div style={{ background: "#F8F8F8", borderRadius: 16, padding: "24px", marginBottom: 20 }}>
      <h4 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 4px", fontFamily: "'Archivo', sans-serif" }}>🗺️ Public Transport Speed Mapping</h4>
      <p style={{ fontSize: 13, color: C.med, margin: "0 0 16px" }}>Hover zones to see speed data and AI recommendations</p>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ flex: 1, position: "relative", background: "#E8F0E8", borderRadius: 12, height: 260, overflow: "hidden" }}>
          <svg width="100%" height="100%">
            <defs><pattern id="sm" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0L0 0 0 20" fill="none" stroke="#d0ddd0" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#sm)"/>
            {zones.map((z, i) => (
              <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
                <rect x={`${z.x}%`} y={`${z.y}%`} width={`${z.w}%`} height={`${z.h}%`}
                  fill={z.color} opacity={hovered === i ? 0.7 : 0.35} rx="6" stroke={hovered === i ? C.black : "none"} strokeWidth="2" style={{ transition: "all 0.3s" }}/>
                <text x={`${z.x + z.w/2}%`} y={`${z.y + z.h/2}%`} textAnchor="middle" fill={C.black} fontSize="11" fontWeight="700">{z.speed} km/h</text>
              </g>
            ))}
          </svg>
        </div>
        <div style={{ width: 220 }}>
          {hovered !== null ? (
            <div style={{ background: "white", borderRadius: 12, padding: "16px", border: `2px solid ${zones[hovered].color}`, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>{zones[hovered].label}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: zones[hovered].color, marginBottom: 4 }}>{zones[hovered].speed} <span style={{ fontSize: 14 }}>km/h</span></div>
              <div style={{ fontSize: 11, color: C.charcoal, lineHeight: 1.4, marginBottom: 8 }}><strong>AI Recommendation:</strong><br/>{zones[hovered].rec}</div>
              <div style={{ height: 3, background: zones[hovered].color, borderRadius: 2 }}/>
            </div>
          ) : (
            <div style={{ background: "white", borderRadius: 12, padding: "16px", textAlign: "center", color: C.med }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>👆</div>
              <div style={{ fontSize: 12 }}>Hover a zone to see speed data & recommendations</div>
            </div>
          )}
          <div style={{ marginTop: 12, display: "flex", gap: 4, flexWrap: "wrap" }}>
            {[{ c: "#FF4444", l: "Critical" }, { c: "#FF8800", l: "Slow" }, { c: "#FFCC00", l: "Moderate" }, { c: "#44BB44", l: "Good" }].map((leg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: C.charcoal }}>
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
  const districts = [
    { name: "Nyarugenge", area: "CBD Core", evasion: 12, inspectors: 2, status: "critical" },
    { name: "Kicukiro", area: "Transit Hub", evasion: 8, inspectors: 1, status: "warning" },
    { name: "Gasabo", area: "North", evasion: 3, inspectors: 0, status: "good" },
    { name: "Nyabugogo Hub", area: "Transit Hub", evasion: 15, inspectors: 3, status: "critical" },
    { name: "Remera", area: "West", evasion: 5, inspectors: 1, status: "good" },
  ];
  return (
    <div style={{ background: "#F8F8F8", borderRadius: 16, padding: "24px" }}>
      <h4 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 4px", fontFamily: "'Archivo', sans-serif" }}>🔍 Fare Evasion Heatmap & Inspector Routing</h4>
      <p style={{ fontSize: 13, color: C.med, margin: "0 0 16px" }}>Click districts to see AI-assigned inspector routes</p>
      <div style={{ display: "flex", gap: 8 }}>
        {districts.map((d, i) => (
          <div key={i} onClick={() => setSel(sel === i ? null : i)} style={{
            flex: 1, borderRadius: 10, padding: "14px 10px", textAlign: "center", cursor: "pointer",
            background: sel === i ? (d.status === "critical" ? "#FFE8E8" : d.status === "warning" ? "#FFF3E0" : "#E8F8E8") : "white",
            border: sel === i ? `2px solid ${d.status === "critical" ? C.red : d.status === "warning" ? C.amber : C.green}` : "2px solid #E8E8E8",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: d.status === "critical" ? C.red : d.status === "warning" ? C.amber : C.green }}>{d.evasion}%</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.charcoal, marginTop: 2 }}>{d.name}</div>
            <div style={{ fontSize: 9, color: C.med, marginTop: 1 }}>{d.area}</div>
            {sel === i && (
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #E0E0E0", fontSize: 10, lineHeight: 1.4, color: C.charcoal }}>
                <div style={{ fontWeight: 700 }}>👮 {d.inspectors} inspectors</div>
                <div style={{ color: C.med, marginTop: 2 }}>
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
  const areas = [
    { name: "Gikondo Industrial", pop: "45K", coverage: 12, status: "underserved", rec: "New route connecting Gikondo to Nyabugogo via BRT corridor" },
    { name: "Kinyinya Hillside", pop: "28K", coverage: 35, status: "partial", rec: "Feeder service from Kinyinya hills to main corridor" },
    { name: "UR Nyarugenge Campus", pop: "62K", coverage: 89, status: "covered", rec: "Increase frequency during university sessions" },
    { name: "Masaka / Ndera", pop: "38K", coverage: 8, status: "underserved", rec: "Extend scheduled service to Masaka growth area" },
  ];
  return (
    <div style={{ background: "#F8F8F8", borderRadius: 16, padding: "24px", marginTop: 20 }}>
      <h4 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 4px", fontFamily: "'Archivo', sans-serif" }}>📍 Accessibility Analysis</h4>
      <p style={{ fontSize: 13, color: C.med, margin: "0 0 16px" }}>Identify underserved areas and get AI recommendations for new routes</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {areas.map((a, i) => (
          <div key={i} onClick={() => setExpanded(expanded === i ? null : i)} style={{
            background: "white", borderRadius: 12, padding: "16px", cursor: "pointer",
            border: expanded === i ? `2px solid ${a.status === "underserved" ? C.red : a.status === "partial" ? C.amber : C.green}` : "2px solid #E8E8E8",
            transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</div>
                <div style={{ fontSize: 11, color: C.med }}>Population: {a.pop}</div>
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
              <span style={{ fontSize: 12, fontWeight: 700, color: C.charcoal, minWidth: 35 }}>{a.coverage}%</span>
            </div>
            {expanded === i && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #F0F0F0", fontSize: 12, color: C.charcoal, lineHeight: 1.5 }}>
                <strong style={{ color: C.red }}>AI Recommendation:</strong> {a.rec}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════ MAIN ═══════════════════════════
export default function YangoCityTransit() {
  const [activeTab, setActiveTab] = useState(0);
  const navItems = [
    { label: "Overview", href: "#overview" },
    { label: "For Passengers", href: "#passengers" },
    { label: "For Operators", href: "#operators" },
    { label: "For Government", href: "#government" },
    { label: "Platform", href: "#platform" },
    { label: "Impact", href: "#impact" },
  ];
  const tabs = [
    { title: "Passenger App", icon: "🚏" },
    { title: "Driver Console", icon: "🚌" },
    { title: "Operator Dashboard", icon: "⚙️" },
    { title: "City Dashboard", icon: "🏛️" },
  ];

  return (
    <div style={{ fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif", color: C.black, overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(26,26,26,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "white", fontWeight: 900, fontSize: 18, fontFamily: "'Archivo', sans-serif" }}>YANGO TECH</span>
            <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 4px" }}>|</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 14 }}>City Transit</span>
            <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 6px" }}>·</span>
            <span style={{ color: C.red, fontWeight: 700, fontSize: 12, background: "rgba(252,63,29,0.15)", padding: "2px 8px", borderRadius: 4 }}>RWANDA</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {navItems.map((n, i) => (
              <a key={i} href={n.href} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "white"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{n.label}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="overview" style={{ background: C.black, minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 60 }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.red}15 0%, transparent 70%)` }}/>
          <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.red}08 0%, transparent 70%)` }}/>
          <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.03 }}>
            {Array.from({length:20}).map((_,i) => <line key={`h${i}`} x1="0" y1={i*60} x2="100%" y2={i*60} stroke="white" strokeWidth="1"/>)}
            {Array.from({length:30}).map((_,i) => <line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="100%" stroke="white" strokeWidth="1"/>)}
          </svg>
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-block", background: `${C.red}20`, border: `1px solid ${C.red}40`, color: C.red, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
                SMART MOBILITY FOR KIGALI & RWANDA
              </div>
              <h1 style={{ fontFamily: "'Archivo', sans-serif", fontSize: 56, fontWeight: 900, lineHeight: 1.05, color: "white", margin: "0 0 20px", letterSpacing: "-0.03em" }}>
                Accelerate Kigali's<br/><span style={{ color: C.red }}>smart mobility.</span>
              </h1>
              <p style={{ fontSize: 19, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 0 36px" }}>
                Kigali already leads Africa in smart city innovation. Yango City Transit takes your transport system to the next level — upgrading from Tap & Go cards to a full AI-powered platform with real-time optimization, BRT readiness, and electric bus integration.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <a href="#platform" style={{ background: C.red, color: "white", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Explore Platform →</a>
                <a href="#impact" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", padding: "14px 32px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>See Impact</a>
              </div>
            </div>
            <div style={{ flex: 0.8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { val: "98%", label: "4G Population Coverage", icon: "📡" },
                  { val: "500+", label: "Buses in Kigali", icon: "🚌" },
                  { val: "180K", label: "Daily Passengers at Nyabugogo", icon: "👥" },
                  { val: "30+", label: "Countries We Operate In", icon: "🌍" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "24px 20px" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "white", fontFamily: "'Archivo', sans-serif" }}>{s.val}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <Section bg={C.off} id="pillars">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontSize: 40, fontWeight: 900, margin: "0 0 12px" }}>One platform. <span style={{ color: C.red }}>Three transformations.</span></h2>
          <p style={{ fontSize: 17, color: C.med, maxWidth: 600, margin: "0 auto" }}>Connects passengers, operators, and city authorities on a single intelligent transport system.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            { title: "For Citizens", icon: "🚏", color: C.green, items: ["Upgrade from Tap & Go to full real-time tracking", "Pay via MTN MoMo, Airtel Money, or smart card", "Multi-modal trips: bus + moto-taxi + walking", "Know exactly when your bus arrives — no more waiting", "Seamless transfers at Nyabugogo & Kicukiro hubs"] },
            { title: "For Carriers", icon: "🚌", color: C.blue, items: ["GPS navigation for Kigali's hilly terrain", "Digital fare collection replaces cash completely", "Real-time fleet monitoring for all 18+ operators", "RURA-ready compliance and reporting built in", "AI optimization ready for BRT dedicated lanes"] },
            { title: "For the City", icon: "🏛️", color: C.red, items: ["Full analytics aligned with Vision 2050 targets", "Data-driven route planning for 80% coverage goal", "Subsidy-free operations supported by efficiency gains", "Real-time dashboards for City of Kigali & MININFRA", "Electric bus fleet integration & BRT corridor planning"] },
          ].map((p, i) => (
            <div key={i} style={{ background: "white", borderRadius: 20, padding: "36px 28px", borderTop: `4px solid ${p.color}`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 16px", fontFamily: "'Archivo', sans-serif" }}>{p.title}</h3>
              {p.items.map((item, j) => (
                <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, fontSize: 14, lineHeight: 1.5, color: C.charcoal }}>
                  <span style={{ color: p.color, fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✓</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* INTERACTIVE DEMOS */}
      <Section bg="white" id="passengers">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontSize: 40, fontWeight: 900, margin: "0 0 12px" }}>See it in <span style={{ color: C.red }}>action.</span></h2>
          <p style={{ fontSize: 17, color: C.med }}>Interactive mockups — tap through every interface.</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: "12px 24px", borderRadius: 12, border: "none",
              background: activeTab === i ? C.black : "#F0F0F0", color: activeTab === i ? "white" : C.charcoal,
              fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.3s", fontFamily: "'Archivo', sans-serif",
            }}>{t.icon} {t.title}</button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 40 }}>
          {activeTab === 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
              <PhoneMockup label="Passenger App"><PassengerApp/></PhoneMockup>
              <div style={{ maxWidth: 400 }}>
                <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, fontFamily: "'Archivo', sans-serif" }}>Passengers know exactly when the bus arrives</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: C.charcoal, marginBottom: 20 }}>Kigali's Tap & Go system was a great start. Yango Transit takes it further — real-time GPS tracking of every bus, predictive arrival times, and seamless mobile money integration with MTN MoMo and Airtel Money.</p>
                {["Real-time arrival predictions at every Kigali stop", "Pay via MTN MoMo, Airtel Money, or Safaribus card", "Multi-modal planner: bus + moto-taxi + walking routes", "Kinyarwanda, English & French interface support"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: C.charcoal }}>
                    <span style={{ background: "#FFF0ED", color: C.red, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i+1}</span>{f}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: 60 }} id="operators">
              <div style={{ maxWidth: 400 }}>
                <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, fontFamily: "'Archivo', sans-serif" }}>Drivers navigate, the app handles ticketing</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: C.charcoal, marginBottom: 20 }}>With 18+ bus operators in Kigali, standardized digital tools are essential. Yango Transit gives every driver navigation, scheduling, and automated fare collection — ready for BRT corridors.</p>
                {["Turn-by-turn route navigation with live traffic", "Automatic passenger counting via sensors", "Schedule adherence alerts & announcements", "Digital trip logging — no paper manifests"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: C.charcoal }}>
                    <span style={{ background: "#E8F0FE", color: C.blue, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i+1}</span>{f}
                  </div>
                ))}
              </div>
              <PhoneMockup label="Driver Console"><DriverApp/></PhoneMockup>
            </div>
          )}
          {activeTab === 2 && (
            <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
              <PhoneMockup label="Operator Dashboard"><OperatorDashboard/></PhoneMockup>
              <div style={{ maxWidth: 420 }}>
                <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, fontFamily: "'Archivo', sans-serif" }}>Create & optimize routes with AI insights</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: C.charcoal, marginBottom: 20 }}>Whether you're managing a fleet of 20 buses or planning the entire Kigali network, operators get AI insights aligned with RURA standards and City of Kigali transport targets.</p>
                {["AI detects low-ridership periods and suggests changes", "Overcrowding alerts with express bus recommendations", "Underserved area detection → new route proposals", "One-click route changes or simulate-first mode", "Dynamic adjustments based on real-time demand"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: C.charcoal }}>
                    <span style={{ background: "#FFF0ED", color: C.red, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i+1}</span>{f}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }} id="government">
              <TabletMockup label="City Operations Dashboard"><CityDashboard/></TabletMockup>
              <div style={{ maxWidth: 700, textAlign: "center" }}>
                <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12, fontFamily: "'Archivo', sans-serif" }}>Full transparency. Zero fraud. Taxable revenue.</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: C.charcoal }}>Every fare digitally recorded, every bus GPS-tracked, every route optimized. Drivers and fleet operators cannot cheat or skim. Transport quality is controlled through measurable metrics.</p>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ANALYTICS */}
      <Section bg="white" id="analytics">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontSize: 40, fontWeight: 900, margin: "0 0 12px" }}>Data-driven <span style={{ color: C.red }}>decisions.</span></h2>
          <p style={{ fontSize: 17, color: C.med, maxWidth: 600, margin: "0 auto" }}>AI analytics aligned with Rwanda's Transport Sector Strategic Plan 2024–2029 and Vision 2050.</p>
        </div>
        <SpeedMapDemo/>
        <FareEvasionDemo/>
        <AccessibilityDemo/>
      </Section>

      {/* ANTI-FRAUD */}
      <Section bg={C.black} id="transparency" style={{ color: "white" }}>
        <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.red, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>TRANSPARENCY & CONTROL</div>
            <h2 style={{ fontFamily: "'Archivo', sans-serif", fontSize: 38, fontWeight: 900, color: "white", margin: "0 0 20px" }}>Every fare captured.<br/>Every bus tracked.<br/>Every route optimized.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>Rwanda's government ended transport subsidies in March 2024, making operational efficiency critical for every operator. Yango City Transit maximizes revenue capture while keeping fares affordable through AI-optimized routes and schedules.</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: "🔒", title: "Digital Fare Collection", desc: "Every payment logged with timestamp, route, vehicle ID." },
                { icon: "📍", title: "GPS Fleet Tracking", desc: "Real-time location. No ghost buses, no route deviations." },
                { icon: "📊", title: "Automated Reporting", desc: "Revenue reports generated for authorities and tax offices." },
                { icon: "🔄", title: "Dynamic Routes", desc: "Adjust routes in real-time based on demand or events." },
                { icon: "👁️", title: "Inspector Tools", desc: "AI-powered routing targets high-evasion areas automatically." },
                { icon: "🛡️", title: "Fraud Prevention", desc: "Tamper-proof records. Cannot manipulate counts or fares." },
              ].map((f, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 16px" }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.5, color: "rgba(255,255,255,0.5)" }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PLATFORM */}
      <Section bg={C.off} id="platform">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontSize: 40, fontWeight: 900, margin: "0 0 12px" }}>Integrated <span style={{ color: C.red }}>platform</span> architecture</h2>
          <p style={{ fontSize: 17, color: C.med, maxWidth: 600, margin: "0 auto" }}>Four modules working as one integrated system.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {[
            { num: "01", title: "Analytics & Optimization", color: C.red, items: ["Origin-destination trip matrix", "Route optimization based on real demand", "Decision support for transport engineers", "Accessibility, speed & accident mapping"] },
            { num: "02", title: "Central Dispatching", color: C.blue, items: ["Operational control of all carriers", "Real-time schedule monitoring", "Dynamic route adjustments", "Fleet allocation optimization"] },
            { num: "03", title: "On-Board Equipment", color: C.green, items: ["Passenger counting sensors", "Driver behavior monitoring", "Road infrastructure condition control", "GPS tracking and telemetry"] },
            { num: "04", title: "Inspection & Revenue Control", color: C.amber, items: ["AI-powered inspector route planning", "Fare evasion heat mapping", "Revenue leakage detection", "Automated compliance reporting"] },
          ].map((m, i) => (
            <div key={i} style={{ background: "white", borderRadius: 16, padding: "28px 24px", borderLeft: `4px solid ${m.color}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 32, fontWeight: 700, color: m.color, opacity: 0.3, marginBottom: 8 }}>{m.num}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 14px", fontFamily: "'Archivo', sans-serif" }}>{m.title}</h3>
              {m.items.map((item, j) => (
                <div key={j} style={{ fontSize: 13, color: C.charcoal, marginBottom: 8, display: "flex", gap: 8 }}>
                  <span style={{ color: m.color, fontWeight: 700 }}>→</span> {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* IMPACT */}
      <Section bg="white" id="impact">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontSize: 40, fontWeight: 900, margin: "0 0 12px" }}>Proven <span style={{ color: C.red }}>impact</span></h2>
          <p style={{ fontSize: 17, color: C.med, maxWidth: 600, margin: "0 auto" }}>Proven results from live deployments — ready to scale across Kigali and Rwanda's secondary cities.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 48 }}>
          {[
            { value: 30, suffix: "%", label: "Increase in Fare Revenue", desc: "Potential for Kigali through AI-optimized operations" },
            { value: 115, prefix: "+$", suffix: "M", label: "Additional Revenue / Year", desc: "Scalable across Kigali and secondary cities" },
            { value: 40, suffix: "%", label: "Faster Decision Making", desc: "With real-time data gathering & analysis" },
            { value: 15, suffix: "%", label: "Travel Time Reduction", desc: "Through optimized routing & scheduling" },
          ].map((m, i) => (
            <div key={i} style={{ background: C.off, borderRadius: 16, padding: "32px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.red }}/>
              <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: 48, fontWeight: 900, color: C.red, lineHeight: 1 }}>
                <Counter end={m.value} prefix={m.prefix || "+"} suffix={m.suffix}/>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.black, marginTop: 8, marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: C.med, lineHeight: 1.4 }}>{m.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: C.black, borderRadius: 20, padding: "40px 36px", display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.red, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>CASE STUDY</div>
            <h3 style={{ fontSize: 28, fontWeight: 800, color: "white", margin: "0 0 16px", fontFamily: "'Archivo', sans-serif" }}>Yerevan, Armenia</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
              Full transport analytics deployment including speed mapping, accessibility analysis, route optimization, and fare evasion tracking for a city of 1.1 million residents.
            </p>
            {["Speed mapping identified bottlenecks at 10–15 km/h", "Accessibility gaps found in 6+ underserved districts", "Dedicated bus lane recommendations for major avenues", "Road safety analysis with targeted interventions", "AI-powered inspector routing for fare evasion hotspots"].map((item, j) => (
              <div key={j} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "flex", gap: 8 }}>
                <span style={{ color: C.red }}>▸</span> {item}
              </div>
            ))}
          </div>
          <div style={{ flex: 0.6, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "rgba(252,63,29,0.1)", border: "1px solid rgba(252,63,29,0.25)", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: C.red, fontFamily: "'Archivo', sans-serif", lineHeight: 1 }}>~+$115M</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>estimated additional revenue per year</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: "white", fontFamily: "'Archivo', sans-serif", lineHeight: 1 }}>+30%</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>growth in paid passenger trips</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>Preliminary estimate based on route optimization, schedule improvements, and more efficient fare inspection</div>
            </div>
          </div>
        </div>
      </Section>

      {/* IMPLEMENTATION + PPP */}
      <Section bg={C.off}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontSize: 40, fontWeight: 900, margin: "0 0 12px" }}>How we <span style={{ color: C.red }}>deliver</span></h2>
          <p style={{ fontSize: 17, color: C.med, maxWidth: 600, margin: "0 auto" }}>Flexible partnership models designed for government and transport authorities.</p>
        </div>
        <div style={{ display: "flex", gap: 0, maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <div style={{ position: "absolute", top: 32, left: "10%", right: "10%", height: 3, background: C.light, zIndex: 0 }}/>
          {[
            { month: "Month 1–2", title: "Assessment & Design", desc: "City mapping, demand analysis, system architecture" },
            { month: "Month 3–4", title: "Deployment", desc: "Equipment, app rollout, operator training" },
            { month: "Month 5–6", title: "Go-Live & Tuning", desc: "Optimization, route refinements, scaling" },
            { month: "Month 7+", title: "Full Operations", desc: "Ongoing optimization, expansion, support" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px",
                background: i === 3 ? C.red : "white", border: `3px solid ${i === 3 ? C.red : C.light}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 20, color: i === 3 ? "white" : C.charcoal,
                fontFamily: "'Archivo', sans-serif", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}>{i+1}</div>
              <div style={{ fontSize: 12, color: C.red, fontWeight: 700, marginBottom: 6 }}>{s.month}</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6, fontFamily: "'Archivo', sans-serif" }}>{s.title}</div>
              <div style={{ fontSize: 13, color: C.med, lineHeight: 1.4, padding: "0 8px" }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, background: "white", borderRadius: 16, padding: "32px 36px", maxWidth: 800, margin: "48px auto 0", border: `2px solid ${C.red}20`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div style={{ fontSize: 48, flexShrink: 0 }}>🤝</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.black, marginBottom: 6, fontFamily: "'Archivo', sans-serif" }}>Open to Public-Private Partnership Models</div>
              <p style={{ fontSize: 14, color: C.charcoal, lineHeight: 1.7, margin: 0 }}>
                Rwanda pioneered Africa's most successful e-government PPP with Irembo's 25-year partnership model. Yango Tech is ready to bring the same approach to transport — partnering with MININFRA, City of Kigali, RURA, and RTDA through structures that complement the World Bank's $100M RUMI project and JICA's intelligent transport system investment. We align with Rwanda's proven PPP frameworks.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* TECH BACKBONE */}
      <Section bg="white">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontSize: 40, fontWeight: 900, margin: "0 0 12px" }}>Built on <span style={{ color: C.red }}>proven technology</span></h2>
          <p style={{ fontSize: 17, color: C.med, maxWidth: 600, margin: "0 auto" }}>Battle-tested infrastructure powering ride-hailing, logistics, and navigation for millions daily.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "🗺️", title: "Yango Maps", desc: "HD mapping with 25% better geocoding and 16% better routing than competitors. On-premise available.", stat: "~30% lower cost" },
            { icon: "🚚", title: "RouteQ Dispatch", desc: "AI-powered route optimization handling 1M+ daily orders in peak. Proven 15% efficiency boost.", stat: "430+ clients" },
            { icon: "🤖", title: "AI & ML Engine", desc: "60+ services powered by proprietary AI — computer vision, predictive analytics, demand forecasting.", stat: "10+ B2B products" },
            { icon: "☁️", title: "Cloud Infrastructure", desc: "Full-stack cloud with on-premise options. ~30% TCO savings vs AWS/GCP. Data sovereignty guaranteed.", stat: "99.9% SLA" },
            { icon: "📱", title: "White-Label Apps", desc: "Production-ready passenger, driver, and operator apps. Customizable branding. iOS, Android, web.", stat: "Rapid deployment" },
            { icon: "🔐", title: "On-Premise Security", desc: "All systems deployable on-premise for full data sovereignty. No external cloud dependency.", stat: "Full control" },
          ].map((t, i) => (
            <div key={i} style={{ background: C.off, borderRadius: 14, padding: "24px 20px", transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{t.icon}</div>
              <h4 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 8px", fontFamily: "'Archivo', sans-serif" }}>{t.title}</h4>
              <p style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.5, margin: "0 0 12px" }}>{t.desc}</p>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.red, background: "#FFF0ED", display: "inline-block", padding: "4px 10px", borderRadius: 6 }}>{t.stat}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${C.red} 0%, #D4341A 100%)`, padding: "80px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontSize: 44, fontWeight: 900, color: "white", margin: "0 0 16px" }}>Ready to accelerate Rwanda's smart mobility?</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: "0 0 32px" }}>Let's discuss how Yango City Transit can complement Kigali's existing smart city investments and scale Rwanda's transport vision. We start with a free assessment.</p>
          <a href="https://tech.yango.com/" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", background: "white", color: C.red, padding: "16px 48px", borderRadius: 12, fontWeight: 800,
            fontSize: 17, textDecoration: "none", fontFamily: "'Archivo', sans-serif", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", cursor: "pointer",
          }}>Get in Touch →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.black, padding: "40px 0 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ color: "white", fontWeight: 900, fontSize: 18, fontFamily: "'Archivo', sans-serif" }}>YANGO TECH</span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>30+ countries · 26,000+ engineers · 300,000 vehicles on platform · Ready for Rwanda</p>
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2025 Yango Tech. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
