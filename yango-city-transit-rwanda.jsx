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
      background: bg, padding: mob ? "48px 0" : "80px 0", opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)", ...style,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: mob ? "0 16px" : "0 24px" }}>{children}</div>
    </section>
  );
}

function PhoneMockup({ children, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: 280, margin: "0 auto", background: "#1A1A1A",
        borderRadius: 38, padding: "14px 10px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset",
      }}>
        {/* Dynamic Island */}
        <div style={{ width: 72, height: 22, background: C.black, borderRadius: 11, margin: "0 auto 6px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: "#0D0D0D", border: "1px solid #222" }} />
        </div>
        <div style={{ background: C.white, borderRadius: 26, overflow: "hidden", minHeight: 490 }}>{children}</div>
        {/* Bottom bar */}
        <div style={{ width: 100, height: 4, background: "#444", borderRadius: 2, margin: "8px auto 2px" }} />
      </div>
      {label && <div style={{ marginTop: 18, fontSize: 14, fontWeight: 700, color: C.black, fontFamily: F.headline }}>{label}</div>}
    </div>
  );
}

function TabletMockup({ children, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: "100%", maxWidth: 620, margin: "0 auto", background: "#1A1A1A",
        borderRadius: '2rem', padding: "16px 14px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05) inset",
      }}>
        {/* Camera dot */}
        <div style={{ width: 6, height: 6, borderRadius: 3, background: "#333", margin: "0 auto 8px" }} />
        <div style={{ background: C.white, borderRadius: '1.5rem', overflow: "hidden", minHeight: 360 }}>{children}</div>
        <div style={{ height: 6 }} />
      </div>
      {label && <div style={{ marginTop: 18, fontSize: 14, fontWeight: 700, color: C.black, fontFamily: F.headline }}>{label}</div>}
    </div>
  );
}

function PassengerApp() {
  const [sel, setSel] = useState(null);
  const [paid, setPaid] = useState(null);
  const [tab, setTab] = useState(0);
  const stops = [
    { name: "Nyabugogo Hub", time: "2", buses: ["14", "7"], fare: "RWF 300", dist: "350m", occ: 72 },
    { name: "Kicukiro Center", time: "8", buses: ["14"], fare: "RWF 300", dist: "1.2km", occ: 45 },
    { name: "UR Remera Campus", time: "15", buses: ["14", "22"], fare: "RWF 500", dist: "2.8km", occ: 88 },
  ];
  return (
    <div style={{ fontSize: 13, fontFamily: F.body, background: "#FAFAFA" }}>
      {/* Status bar */}
      <div style={{ background: C.black, color: C.white, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 500 }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ width: 14, height: 8, border: "1px solid white", borderRadius: 2, position: "relative" }}><div style={{ position: "absolute", left: 1, top: 1, bottom: 1, width: "70%", background: C.green, borderRadius: 1 }}/></div>
        </div>
      </div>
      {/* App header */}
      <div style={{ background: C.white, padding: "12px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: F.headline, fontWeight: 900, fontSize: 17, color: C.black, letterSpacing: "-0.02em" }}>Yango Transit</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>Kigali, Rwanda</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: C.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, border: "2px solid white" }}/>
          </div>
        </div>
        {/* Search bar */}
        <div style={{ background: "#F3F3F3", borderRadius: 12, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, border: `2px solid ${C.muted}`, flexShrink: 0 }}/>
          <span style={{ fontSize: 12, color: C.muted }}>Where are you going?</span>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1.5px solid #ECECEC" }}>
          {["Nearby", "Routes", "Saved"].map((t, i) => (
            <div key={i} onClick={() => setTab(i)} style={{
              flex: 1, textAlign: "center", padding: "8px 0 6px", fontSize: 11, fontWeight: 600, cursor: "pointer",
              color: tab === i ? C.red : C.muted,
              borderBottom: tab === i ? `2.5px solid ${C.red}` : "2.5px solid transparent",
              marginBottom: "-1.5px", transition: "all 0.2s",
            }}>{t}</div>
          ))}
        </div>
      </div>
      {/* Live map strip */}
      <div style={{ background: "#DCE8DC", height: 100, position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%" style={{ position: "absolute" }}>
          <defs>
            <pattern id="pg" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0L0 0 0 30" fill="none" stroke="#c8d8c8" strokeWidth="0.5"/></pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pg)"/>
          {/* Roads */}
          <path d="M0 65L270 40" stroke="#b8c8b8" strokeWidth="6" fill="none"/>
          <path d="M60 0L100 100" stroke="#b8c8b8" strokeWidth="4" fill="none"/>
          <path d="M180 0L160 100" stroke="#b8c8b8" strokeWidth="4" fill="none"/>
          {/* Route path */}
          <path d="M30 80Q80 60 130 50T230 25" stroke={C.red} strokeWidth="3" fill="none" strokeLinecap="round"/>
          {/* Bus pulse */}
          <circle cx="85" cy="57" r="16" fill={C.red} opacity="0.12"><animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite"/></circle>
          <circle cx="85" cy="57" r="10" fill={C.red}/>
          <rect x="80" y="53" width="10" height="7" rx="1.5" fill="white"/>
          <circle cx="82" cy="62" r="1.5" fill="white"/><circle cx="88" cy="62" r="1.5" fill="white"/>
          {/* Stops */}
          <circle cx="30" cy="80" r="5" fill="white" stroke={C.red} strokeWidth="2"/>
          <circle cx="130" cy="50" r="4" fill="white" stroke="#999" strokeWidth="1.5"/>
          <circle cx="230" cy="25" r="4" fill="white" stroke="#999" strokeWidth="1.5"/>
        </svg>
        <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(255,255,255,0.95)", borderRadius: 10, padding: "4px 10px", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: C.green, display: "inline-block" }}/>
          <span>Live</span>
        </div>
      </div>
      {/* Stops list */}
      <div style={{ padding: "10px 14px 6px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: C.black }}>Nearby Stops</span>
          <span style={{ fontSize: 10, color: C.red, fontWeight: 600 }}>See all</span>
        </div>
        {stops.map((s, i) => (
          <div key={i} onClick={() => { setSel(i === sel ? null : i); setPaid(null); }} style={{
            padding: "10px 12px", marginBottom: 6, borderRadius: 14,
            background: sel === i ? "#FFF0ED" : C.white,
            border: sel === i ? `1.5px solid ${C.red}` : "1.5px solid transparent",
            cursor: "pointer", transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: i === 0 ? C.red : "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 14, height: 10, borderRadius: 3, border: `2px solid ${i === 0 ? "white" : C.muted}` }}/>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.black }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                    {s.dist} · Routes {s.buses.join(", ")}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: i === 0 ? C.red : C.black, lineHeight: 1 }}>{s.time}</div>
                <div style={{ fontSize: 9, color: C.muted }}>min</div>
              </div>
            </div>
            {/* Occupancy bar */}
            <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ flex: 1, height: 3, background: "#ECECEC", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${s.occ}%`, height: "100%", borderRadius: 2, background: s.occ > 80 ? C.red : s.occ > 60 ? C.amber : C.green }}/>
              </div>
              <span style={{ fontSize: 9, color: C.muted, fontWeight: 600 }}>{s.occ}% full</span>
            </div>
            {sel === i && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #F0E0E0" }}>
                {paid === i ? (
                  <div style={{ background: C.black, color: C.white, padding: "12px", borderRadius: 12, textAlign: "center" }}>
                    <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 2 }}>Ticket Confirmed</div>
                    <div style={{ fontSize: 11, opacity: 0.7 }}>{s.fare} · #YT-{Math.floor(Math.random()*9000+1000)}</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 6 }}>
                    <div onClick={(e) => { e.stopPropagation(); setPaid(i); }} style={{
                      flex: 2, background: C.red, color: "white", padding: "10px 0", borderRadius: 10,
                      textAlign: "center", fontWeight: 700, fontSize: 13, cursor: "pointer",
                    }}>Pay {s.fare}</div>
                    <div onClick={(e) => e.stopPropagation()} style={{
                      flex: 1, background: "#F0F0F0", color: C.black, padding: "10px 0", borderRadius: 10,
                      textAlign: "center", fontWeight: 600, fontSize: 12, cursor: "pointer",
                    }}>Alert</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Bottom nav */}
      <div style={{ display: "flex", borderTop: "1px solid #ECECEC", background: C.white }}>
        {[
          { label: "Home", active: true },
          { label: "Trips", active: false },
          { label: "Wallet", active: false },
          { label: "Profile", active: false },
        ].map((n, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px 0 6px" }}>
            <div style={{ width: 18, height: 18, borderRadius: i === 0 ? 4 : 9, background: n.active ? C.red : "#DDD", margin: "0 auto 3px", opacity: n.active ? 1 : 0.4 }}/>
            <div style={{ fontSize: 9, fontWeight: 600, color: n.active ? C.red : C.muted }}>{n.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DriverApp() {
  const [announcing, setAnnouncing] = useState(false);
  const progress = 62; // % of route completed
  const stopsLeft = [
    { name: "Downtown Station", eta: "2:30" },
    { name: "Market Square", eta: "5:10" },
    { name: "Northern Terminal", eta: "8:45" },
  ];
  return (
    <div style={{ fontSize: 13, fontFamily: F.body, background: "#0D0D14" }}>
      {/* Dark nav map area */}
      <div style={{ height: 215, position: "relative", overflow: "hidden", background: "#12121E" }}>
        <svg width="100%" height="100%" style={{ position: "absolute" }}>
          <defs>
            <pattern id="dg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#1a1a2a" strokeWidth="0.5"/></pattern>
            <linearGradient id="routeGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor={C.green}/><stop offset="100%" stopColor={C.blue}/></linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#dg)"/>
          {/* Roads */}
          <path d="M0 160L270 50" stroke="#1e1e30" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M80 0L120 215" stroke="#1e1e30" strokeWidth="8" fill="none"/>
          <path d="M200 0L170 215" stroke="#1e1e30" strokeWidth="8" fill="none"/>
          {/* Active route */}
          <path d="M25 185L100 130L170 90L245 35" stroke="url(#routeGrad)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Completed segment highlight */}
          <path d="M25 185L100 130" stroke={C.green} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8"/>
          {/* Stops */}
          <circle cx="25" cy="185" r="6" fill={C.green} opacity="0.4"/><circle cx="25" cy="185" r="3" fill={C.green}/>
          <circle cx="170" cy="90" r="5" fill="#333" stroke="#555" strokeWidth="1.5"/>
          <circle cx="245" cy="35" r="5" fill="#333" stroke={C.red} strokeWidth="1.5"/>
          {/* Bus position with glow */}
          <circle cx="100" cy="130" r="18" fill={C.green} opacity="0.08"><animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite"/></circle>
          <circle cx="100" cy="130" r="11" fill={C.green}/>
          <path d="M94 127h12v5a2 2 0 01-2 2h-8a2 2 0 01-2-2z" fill="white" opacity="0.9"/>
          <circle cx="96" cy="135" r="1.5" fill="white" opacity="0.7"/><circle cx="104" cy="135" r="1.5" fill="white" opacity="0.7"/>
        </svg>
        {/* Turn instruction */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)", padding: "10px 14px 30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontFamily: F.headline, fontWeight: 900, fontSize: 13, color: "white" }}>DRIVER</span>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: C.green, display: "inline-block" }}/>
            </div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>9:41</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "12px 14px", backdropFilter: "blur(8px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "white", fontWeight: 900 }}>↗</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "white", lineHeight: 1 }}>280m</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>Turn right onto KN 5 Ave</div>
              </div>
            </div>
          </div>
        </div>
        {/* Route progress bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "rgba(255,255,255,0.06)" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: C.green, transition: "width 0.5s" }}/>
        </div>
      </div>
      {/* Info panel */}
      <div style={{ background: C.white, borderRadius: "16px 16px 0 0", marginTop: -12, position: "relative", padding: "14px 14px 8px" }}>
        {/* Grab handle */}
        <div style={{ width: 32, height: 4, background: "#DDD", borderRadius: 2, margin: "0 auto 12px" }}/>
        {/* Route info */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: C.black, fontFamily: F.headline }}>Route 14 North</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>Nyabugogo → Northern Terminal</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 800, fontSize: 20, color: C.red, lineHeight: 1 }}>34<span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>/55</span></div>
            <div style={{ fontSize: 9, color: C.muted }}>passengers</div>
          </div>
        </div>
        {/* KPI strip */}
        <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
          {[{ label: "Status", val: "On Time", c: C.green }, { label: "Next Stop", val: "2:30", c: C.amber }, { label: "Fares", val: "98%", c: C.blue }].map((m, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 10, padding: "8px 4px", textAlign: "center", background: "#F8F8F8" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: m.c }}>{m.val}</div>
              <div style={{ fontSize: 8, color: C.muted, marginTop: 1, fontWeight: 500 }}>{m.label}</div>
            </div>
          ))}
        </div>
        {/* Upcoming stops */}
        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Upcoming</div>
        {stopsLeft.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 2, height: i === stopsLeft.length - 1 ? 6 : 22, background: i === 0 ? C.green : "#E0E0E0", borderRadius: 1, flexShrink: 0, marginLeft: 4 }}/>
            <div style={{ width: 8, height: 8, borderRadius: 4, border: `2px solid ${i === 0 ? C.green : "#CCC"}`, flexShrink: 0 }}/>
            <div style={{ flex: 1, fontSize: 11, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? C.black : C.muted }}>{s.name}</div>
            <span style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>{s.eta}</span>
          </div>
        ))}
        {/* Actions */}
        <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
          <div onClick={() => { setAnnouncing(true); setTimeout(() => setAnnouncing(false), 2000); }}
            style={{ flex: 1, padding: "11px", borderRadius: 12, textAlign: "center", fontWeight: 700, fontSize: 12, background: announcing ? C.green : C.red, color: "white", cursor: "pointer", transition: "all 0.3s" }}>
            {announcing ? "Announced" : "Announce Stop"}
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <div style={{ width: 16, height: 16, border: `2px solid ${C.muted}`, borderRadius: 3, position: "relative" }}>
              <div style={{ position: "absolute", top: 2, left: 5, width: 2, height: 6, background: C.muted, borderRadius: 1 }}/>
              <div style={{ position: "absolute", top: 8, left: 5, width: 2, height: 2, background: C.muted, borderRadius: 1 }}/>
            </div>
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
    { id: 0, route: "Route 7", insight: "Low ridership 10PM–6AM", suggestion: "Reduce frequency to 30-min intervals after 10PM", saving: "Save 2 vehicles nightly", severity: "low", color: C.amber },
    { id: 1, route: "Route 14", insight: "Overcrowding 7–9AM peak", suggestion: "Add 3 express buses during morning peak", saving: "+18% capacity", severity: "high", color: C.red },
    { id: 2, route: "New Route", insight: "Underserved district detected", suggestion: "Create Route 31: Industrial Zone → Central Station via Market", saving: "Serve 12K residents", severity: "new", color: C.blue },
  ];
  // Sparkline data
  const spark = [32, 35, 28, 42, 55, 48, 52, 60, 58, 63, 61, 68];
  const sparkMax = Math.max(...spark);
  return (
    <div style={{ fontSize: 12, fontFamily: F.body, background: "#FAFAFA" }}>
      {/* Header */}
      <div style={{ background: C.black, color: "white", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: C.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, border: "2px solid white", borderRadius: 2 }}/>
          </div>
          <div>
            <div style={{ fontFamily: F.headline, fontWeight: 900, fontSize: 12, letterSpacing: "0.04em" }}>OPERATOR</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Fleet Management</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: C.green }}/>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>Live</span>
        </div>
      </div>
      {/* KPI cards */}
      <div style={{ padding: "10px 12px 0" }}>
        <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
          {[
            { l: "Fleet Active", v: "87%", delta: "+3%", c: C.green },
            { l: "On-Time Rate", v: "94%", delta: "+1.2%", c: C.blue },
            { l: "Revenue", v: "+8%", delta: "RWF 48M", c: C.red },
          ].map((k, i) => (
            <div key={i} style={{ flex: 1, background: C.white, borderRadius: 10, padding: "8px 6px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: k.c }}/>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.black, lineHeight: 1.2 }}>{k.v}</div>
              <div style={{ fontSize: 8, color: C.muted, marginTop: 1 }}>{k.l}</div>
              <div style={{ fontSize: 8, color: k.c, fontWeight: 700, marginTop: 2 }}>{k.delta}</div>
            </div>
          ))}
        </div>
        {/* Mini sparkline chart */}
        <div style={{ background: C.white, borderRadius: 10, padding: "10px 10px 6px", marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: C.black }}>Ridership Trend</span>
            <span style={{ fontSize: 8, color: C.muted }}>Last 12h</span>
          </div>
          <svg width="100%" height="36" viewBox="0 0 240 36" preserveAspectRatio="none">
            <defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.red} stopOpacity="0.15"/><stop offset="100%" stopColor={C.red} stopOpacity="0"/></linearGradient></defs>
            <path d={`M0 36 ${spark.map((v, i) => `L${(i/(spark.length-1))*240} ${36 - (v/sparkMax)*32}`).join(" ")} L240 36Z`} fill="url(#sparkFill)"/>
            <path d={spark.map((v, i) => `${i === 0 ? "M" : "L"}${(i/(spark.length-1))*240} ${36 - (v/sparkMax)*32}`).join(" ")} stroke={C.red} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="240" cy={36 - (spark[spark.length-1]/sparkMax)*32} r="3" fill={C.red}/>
          </svg>
        </div>
        {/* AI insights */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: "#FFF0ED", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: C.red }}/>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.black }}>AI Insights</span>
          </div>
          <span style={{ fontSize: 8, color: C.red, fontWeight: 700, background: "#FFF0ED", padding: "2px 6px", borderRadius: 4 }}>{tips.length} new</span>
        </div>
        {tips.map((t) => (
          <div key={t.id} style={{
            marginBottom: 5, borderRadius: 10, overflow: "hidden",
            background: C.white,
            border: aiTip === t.id ? `1.5px solid ${t.color}` : "1.5px solid transparent",
            transition: "all 0.2s",
          }}>
            <div onClick={() => setAiTip(aiTip === t.id ? null : t.id)} style={{
              padding: "8px 10px",
              cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${t.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: t.color }}/>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: C.black }}>{t.route}</div>
                  <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>{t.insight}</div>
                </div>
              </div>
              <svg width="10" height="6" viewBox="0 0 10 6" style={{ transition: "transform 0.2s", transform: aiTip === t.id ? "rotate(180deg)" : "rotate(0)" }}>
                <path d="M1 1L5 5L9 1" stroke={C.muted} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            {aiTip === t.id && (
              <div style={{ padding: "0 10px 10px", background: "#FAFAFF" }}>
                <div style={{ fontSize: 10, color: C.black, marginBottom: 6, lineHeight: 1.5, padding: "8px 10px", background: "#F5F5F5", borderRadius: 8 }}>
                  {t.suggestion}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 9, color: t.color, fontWeight: 700 }}>Impact: {t.saving}</span>
                </div>
                {applied[t.id] ? (
                  <div style={{ background: C.black, color: C.white, padding: "8px", borderRadius: 8, textAlign: "center", fontWeight: 700, fontSize: 10 }}>Applied</div>
                ) : (
                  <div style={{ display: "flex", gap: 4 }}>
                    <div onClick={(e) => { e.stopPropagation(); setApplied(p => ({...p, [t.id]: true})); }} style={{
                      flex: 1, background: C.red, color: "white", padding: "8px", borderRadius: 8,
                      textAlign: "center", fontWeight: 700, fontSize: 10, cursor: "pointer",
                    }}>Apply</div>
                    <div onClick={(e) => e.stopPropagation()} style={{
                      flex: 1, background: "#F0F0F0", color: C.black, padding: "8px", borderRadius: 8,
                      textAlign: "center", fontWeight: 600, fontSize: 10, cursor: "pointer",
                    }}>Simulate</div>
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
  const revData = [32, 35, 38, 42, 40, 45, 48];
  const ridData = [120, 135, 128, 155, 162, 148, 170]; // thousands
  const revMax = Math.max(...revData);
  const ridMax = Math.max(...ridData);
  return (
    <div style={{ fontSize: 12, fontFamily: F.body, background: "#FAFAFA" }}>
      {/* Header bar */}
      <div style={{ background: C.black, color: "white", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: C.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, border: "2px solid white", borderRadius: 2 }}/>
          </div>
          <div>
            <div style={{ fontFamily: F.headline, fontWeight: 900, fontSize: 13, letterSpacing: "0.02em" }}>CITY OPERATIONS</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Kigali Transport Authority</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: C.green }}>
              <span style={{ display: "block", width: 6, height: 6, borderRadius: 3, background: C.green, animation: "none" }}/>
            </span>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>Live</span>
          </div>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, border: "1.5px solid rgba(255,255,255,0.4)" }}/>
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 16px" }}>
        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 12 }}>
          {[
            { l: "Active Fleet", v: "342", delta: "+12", c: C.green },
            { l: "Revenue", v: "48M", unit: "RWF", delta: "+8%", c: C.green },
            { l: "Punctuality", v: "94.2", unit: "%", delta: "+2.1%", c: C.blue },
            { l: "Evasion", v: "3.1", unit: "%", delta: "−1.4%", c: C.red },
          ].map((k, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 10, padding: "10px 8px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: k.c }}/>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 1 }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: C.black, lineHeight: 1 }}>{k.v}</span>
                {k.unit && <span style={{ fontSize: 9, color: C.muted, fontWeight: 500 }}>{k.unit}</span>}
              </div>
              <div style={{ fontSize: 8, color: C.muted, marginTop: 2 }}>{k.l}</div>
              <div style={{ fontSize: 8, color: k.c, fontWeight: 700, marginTop: 2 }}>{k.delta}</div>
            </div>
          ))}
        </div>
        {/* Fleet map mini */}
        <div style={{ background: "#E2EDE2", height: 90, borderRadius: 12, position: "relative", overflow: "hidden", marginBottom: 12 }}>
          <svg width="100%" height="100%">
            <defs><pattern id="cg" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0L0 0 0 25" fill="none" stroke="#c8d8c8" strokeWidth="0.3"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#cg)"/>
            {/* Kigali-like road structure */}
            <path d="M0 45L580 45" stroke="#b8c8b8" strokeWidth="3" fill="none"/>
            <path d="M140 0L140 90" stroke="#b8c8b8" strokeWidth="2" fill="none"/>
            <path d="M290 0L290 90" stroke="#b8c8b8" strokeWidth="2" fill="none"/>
            <path d="M430 0L430 90" stroke="#b8c8b8" strokeWidth="2" fill="none"/>
            {/* Active bus dots */}
            {[[45,30],[95,55],[140,42],[180,25],[230,60],[280,35],[310,50],[370,28],[420,62],[460,40],[510,48],[160,70],[340,15],[70,42],[250,45],[500,30],[390,55],[120,20]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill={C.red} opacity={0.6 + Math.random() * 0.4}/>
            ))}
            {/* Routes */}
            <path d="M30 70Q150 20 300 40T550 25" stroke={C.red} strokeWidth="1.5" fill="none" opacity="0.3"/>
            <path d="M20 20Q200 65 400 30T570 65" stroke={C.blue} strokeWidth="1.5" fill="none" opacity="0.3"/>
          </svg>
          <div style={{ position: "absolute", top: 8, left: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: C.black, background: "rgba(255,255,255,0.9)", padding: "2px 8px", borderRadius: 6 }}>342 buses · 28 routes</span>
          </div>
        </div>
        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {/* Revenue chart */}
          <div style={{ background: C.white, borderRadius: 10, padding: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.black }}>Revenue</span>
              <span style={{ fontSize: 8, color: C.green, fontWeight: 600 }}>+8%</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40 }}>
              {revData.map((v, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{
                    height: (v / revMax) * 36,
                    background: i === revData.length - 1 ? C.red : "#E8E8E8",
                    borderRadius: "3px 3px 0 0",
                    transition: "height 0.3s",
                  }}/>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
              {["M","T","W","T","F","S","S"].map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 7, color: C.muted }}>{d}</div>
              ))}
            </div>
          </div>
          {/* Ridership chart */}
          <div style={{ background: C.white, borderRadius: 10, padding: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.black }}>Ridership</span>
              <span style={{ fontSize: 8, color: C.blue, fontWeight: 600 }}>170K</span>
            </div>
            <svg width="100%" height="40" viewBox="0 0 140 40" preserveAspectRatio="none">
              <defs><linearGradient id="ridFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.blue} stopOpacity="0.12"/><stop offset="100%" stopColor={C.blue} stopOpacity="0"/></linearGradient></defs>
              <path d={`M0 40 ${ridData.map((v, i) => `L${(i/(ridData.length-1))*140} ${40 - (v/ridMax)*36}`).join(" ")} L140 40Z`} fill="url(#ridFill)"/>
              <path d={ridData.map((v, i) => `${i === 0 ? "M" : "L"}${(i/(ridData.length-1))*140} ${40 - (v/ridMax)*36}`).join(" ")} stroke={C.blue} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="140" cy={40 - (ridData[ridData.length-1]/ridMax)*36} r="2.5" fill={C.blue}/>
            </svg>
            <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
              {["M","T","W","T","F","S","S"].map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 7, color: C.muted }}>{d}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeedMapDemo() {
  const [selected, setSelected] = useState(null);
  const mob = useIsMobile();
  // Kigali districts with realistic polygonal shapes matching city geography
  // Viewbox 0 0 600 400 — Kigali roughly oriented: Gasabo (N/NE), Kicukiro (SE), Nyarugenge (W/center)
  const zones = [
    {
      id: 0,
      // Nyarugenge CBD — western center, the main business district
      path: "M120 140 L200 115 L240 145 L255 190 L240 240 L200 260 L155 245 L125 210 L110 175Z",
      speed: "10-12", color: "#FF4444", label: "Nyarugenge / CBD",
      rec: "BRT dedicated lane priority zone — average bus speed critically low during 7-9AM and 5-7PM peaks. Recommend bus-only corridor on KN 4 Ave.",
      routes: 12, buses: 86, congestion: "Severe",
      labelPos: { x: 182, y: 190 },
    },
    {
      id: 1,
      // Kicukiro — south/southeast
      path: "M255 190 L310 160 L385 170 L420 210 L410 280 L370 310 L300 310 L240 285 L240 240Z",
      speed: "12-15", color: "#FF8800", label: "Kicukiro",
      rec: "Signal optimization needed at 22 junctions. Install transit signal priority (TSP) to reduce dwell at major intersections along KK 15 Rd.",
      routes: 8, buses: 64, congestion: "Moderate-High",
      labelPos: { x: 325, y: 240 },
    },
    {
      id: 2,
      // Gasabo — large northern/northeastern district
      path: "M200 115 L240 60 L310 35 L400 45 L460 80 L470 140 L420 170 L385 170 L310 160 L255 190 L240 145Z",
      speed: "18-22", color: "#FFCC00", label: "Gasabo",
      rec: "Frequency adjustment for peak demand corridors. Remera-Kimironko axis needs 5-min headways during morning peak vs current 12-min.",
      routes: 10, buses: 95, congestion: "Moderate",
      labelPos: { x: 350, y: 110 },
    },
    {
      id: 3,
      // Nyabugogo corridor — northwest, the main transport hub area
      path: "M60 90 L120 60 L200 55 L240 60 L200 115 L120 140 L80 130Z",
      speed: "22-30", color: "#44BB44", label: "Nyabugogo Corridor",
      rec: "Express corridor to secondary cities performing well. Maintain current BRT-lite operations. Extend express service to Musanze via RN4.",
      routes: 6, buses: 42, congestion: "Low",
      labelPos: { x: 150, y: 95 },
    },
  ];

  // Major roads of Kigali
  const roads = [
    // KN 4 Ave (main north-south through CBD)
    { d: "M170 50 L180 120 L190 200 L185 280", w: 3, label: "KN 4 Ave" },
    // KK 15 Rd (east-west through Kicukiro)
    { d: "M200 240 L280 235 L360 230 L420 240", w: 2.5 },
    // Nyabugogo-Remera highway (diagonal arterial)
    { d: "M90 100 L150 140 L220 170 L310 165 L400 150", w: 3.5, label: "KN 1 Rd" },
    // RN4 to north
    { d: "M140 65 L170 30 L200 10", w: 2 },
    // Airport road east
    { d: "M400 150 L460 130 L510 110", w: 2.5 },
    // Kicukiro south road
    { d: "M300 250 L340 290 L370 330", w: 2 },
    // Ring road segments
    { d: "M80 130 L100 180 L130 230 L180 270", w: 2 },
    { d: "M430 90 L470 140 L460 200 L430 250", w: 2 },
    // Minor connecting roads
    { d: "M220 170 L240 230", w: 1.5 },
    { d: "M310 80 L330 160", w: 1.5 },
    { d: "M150 140 L160 200 L180 260", w: 1.5 },
    { d: "M350 170 L380 220 L400 260", w: 1.5 },
  ];

  // Key landmarks
  const landmarks = [
    { x: 90, y: 95, label: "Nyabugogo Hub" },
    { x: 310, y: 160, label: "Remera" },
    { x: 395, y: 155, label: "Kimironko" },
    { x: 300, y: 260, label: "Kicukiro Centre" },
    { x: 188, y: 165, label: "Downtown" },
    { x: 490, y: 115, label: "Airport" },
    { x: 180, y: 275, label: "Gikondo" },
  ];

  // Nyabarongo river / wetland (western edge)
  const waterPath = "M40 60 Q55 100 50 150 Q45 200 60 260 Q70 300 55 350";

  return (
    <div style={{ background: "#F8F8F8", borderRadius: '1.875rem', padding: mob ? "16px" : "24px", marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: mob ? 12 : 16, flexWrap: "wrap", gap: 8 }}>
        <div>
          <h4 style={{ fontSize: mob ? 16 : 18, fontWeight: 800, margin: "0 0 4px", fontFamily: F.headline }}>Public Transport Speed Mapping</h4>
          <p style={{ fontSize: mob ? 12 : 13, color: C.muted, margin: 0 }}>{mob ? "Tap districts to explore speed data" : "Hover over Kigali districts to see average bus speeds and AI recommendations"}</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[{ c: "#FF4444", l: "Critical (<12)" }, { c: "#FF8800", l: "Slow (12-15)" }, { c: "#FFCC00", l: "Moderate (18-22)" }, { c: "#44BB44", l: "Good (22-30)" }].map((leg, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: C.black }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: leg.c, flexShrink: 0 }}/><span>{leg.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? 12 : 20, alignItems: "flex-start" }}>
        {/* Map */}
        <div style={{ flex: 1, width: "100%", position: "relative", background: "#EDF2ED", borderRadius: 16, overflow: "hidden" }}>
          <svg viewBox="0 0 540 380" width="100%" style={{ display: "block" }}>
            <defs>
              <pattern id="smGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0L0 0 0 20" fill="none" stroke="#dce5dc" strokeWidth="0.4"/>
              </pattern>
              <filter id="zoneShadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08"/>
              </filter>
            </defs>
            <rect width="540" height="380" fill="url(#smGrid)"/>

            {/* Wetland / river on western edge */}
            <path d={waterPath} stroke="#a8cce8" strokeWidth="8" fill="none" opacity="0.4" strokeLinecap="round"/>
            <path d={waterPath} stroke="#7bb8d9" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" strokeDasharray="6,4"/>

            {/* District zones */}
            {zones.map((z, i) => (
              <g key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                onMouseEnter={() => { if (!mob) setSelected(i); }}
                onMouseLeave={() => { if (!mob) setSelected(null); }}
                style={{ cursor: "pointer" }}>
                <path d={z.path}
                  fill={z.color} opacity={selected === i ? 0.55 : 0.22}
                  stroke={selected === i ? z.color : "rgba(0,0,0,0.08)"}
                  strokeWidth={selected === i ? 2.5 : 1}
                  filter={selected === i ? "url(#zoneShadow)" : "none"}
                  style={{ transition: "all 0.3s ease" }}/>
              </g>
            ))}

            {/* Roads layer on top of zones */}
            {roads.map((r, i) => (
              <g key={i}>
                <path d={r.d} stroke="rgba(255,255,255,0.7)" strokeWidth={r.w + 1.5} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d={r.d} stroke="rgba(180,180,180,0.5)" strokeWidth={r.w} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            ))}

            {/* Zone speed labels */}
            {zones.map((z, i) => (
              <g key={`label-${i}`}>
                <rect x={z.labelPos.x - 28} y={z.labelPos.y - 9} width="56" height="18" rx="9" fill={selected === i ? z.color : "rgba(255,255,255,0.85)"} style={{ transition: "all 0.3s" }}/>
                <text x={z.labelPos.x} y={z.labelPos.y + 4} textAnchor="middle" fill={selected === i ? "white" : C.black} fontSize="10" fontWeight="700" fontFamily={F.body} style={{ pointerEvents: "none" }}>
                  {z.speed} km/h
                </text>
              </g>
            ))}

            {/* Landmark dots and labels */}
            {landmarks.map((lm, i) => (
              <g key={`lm-${i}`} style={{ pointerEvents: "none" }}>
                <circle cx={lm.x} cy={lm.y} r="3" fill="white" stroke={C.black} strokeWidth="1.2"/>
                <text x={lm.x} y={lm.y - 7} textAnchor="middle" fill="rgba(0,0,0,0.55)" fontSize="8" fontWeight="600" fontFamily={F.body}>{lm.label}</text>
              </g>
            ))}

            {/* Compass */}
            <g transform="translate(505, 35)">
              <circle cx="0" cy="0" r="14" fill="rgba(255,255,255,0.8)" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
              <text x="0" y="-3" textAnchor="middle" fill={C.red} fontSize="9" fontWeight="900">N</text>
              <path d="M0 -9 L0 -5" stroke={C.red} strokeWidth="2" strokeLinecap="round"/>
              <path d="M0 5 L0 9" stroke="rgba(0,0,0,0.2)" strokeWidth="1" strokeLinecap="round"/>
            </g>

            {/* Scale bar */}
            <g transform="translate(20, 360)">
              <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
              <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
              <line x1="60" y1="-3" x2="60" y2="3" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
              <text x="30" y="12" textAnchor="middle" fill="rgba(0,0,0,0.35)" fontSize="8" fontFamily={F.body}>2 km</text>
            </g>
          </svg>
        </div>

        {/* Info panel */}
        <div style={{ width: mob ? "100%" : 240, flexShrink: 0 }}>
          {selected !== null ? (
            <div style={{ background: "white", borderRadius: 16, padding: mob ? "14px" : "18px", border: `2px solid ${zones[selected].color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 800, fontFamily: F.headline, lineHeight: 1.2 }}>{zones[selected].label}</div>
                <div style={{ background: zones[selected].color, color: "white", padding: "2px 8px", borderRadius: 6, fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{zones[selected].congestion}</div>
              </div>
              <div style={{ fontSize: mob ? 28 : 34, fontWeight: 900, color: zones[selected].color, marginBottom: 2, lineHeight: 1 }}>{zones[selected].speed} <span style={{ fontSize: 14, fontWeight: 600 }}>km/h</span></div>
              <div style={{ fontSize: 10, color: C.muted, marginBottom: 12 }}>avg. bus speed</div>
              {/* Stats */}
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                <div style={{ flex: 1, background: "#F8F8F8", borderRadius: 8, padding: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.black }}>{zones[selected].routes}</div>
                  <div style={{ fontSize: 9, color: C.muted }}>routes</div>
                </div>
                <div style={{ flex: 1, background: "#F8F8F8", borderRadius: 8, padding: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.black }}>{zones[selected].buses}</div>
                  <div style={{ fontSize: 9, color: C.muted }}>buses</div>
                </div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.black, marginBottom: 4 }}>AI Recommendation</div>
              <div style={{ fontSize: 11, color: C.black, lineHeight: 1.5, background: "#F8F8F8", borderRadius: 8, padding: "10px" }}>{zones[selected].rec}</div>
              <div style={{ height: 3, background: zones[selected].color, borderRadius: 2, marginTop: 12 }}/>
            </div>
          ) : (
            <div style={{ background: "white", borderRadius: 16, padding: "20px", textAlign: "center", color: C.muted, border: "1.5px dashed #DDD" }}>
              <svg width="32" height="32" viewBox="0 0 32 32" style={{ margin: "0 auto 8px", display: "block", opacity: 0.3 }}>
                <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M16 18 L16 28 M10 22 L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div style={{ fontSize: 12 }}>{mob ? "Tap a district on the map" : "Hover over a district"}</div>
              <div style={{ fontSize: 10, marginTop: 4 }}>to see speed data and AI insights</div>
            </div>
          )}
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
    <div style={{ background: "#F8F8F8", borderRadius: '1.875rem', padding: mob ? "16px" : "24px" }}>
      <h4 style={{ fontSize: mob ? 16 : 18, fontWeight: 800, margin: "0 0 4px", fontFamily: F.headline }}>Fare Evasion Heatmap & Inspector Routing</h4>
      <p style={{ fontSize: mob ? 12 : 13, color: C.muted, margin: "0 0 16px" }}>Tap districts to see AI-assigned inspector routes</p>
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
    <div style={{ background: "#F8F8F8", borderRadius: '1.875rem', padding: mob ? "16px" : "24px", marginTop: 20 }}>
      <h4 style={{ fontSize: mob ? 16 : 18, fontWeight: 800, margin: "0 0 4px", fontFamily: F.headline }}>Accessibility Analysis</h4>
      <p style={{ fontSize: mob ? 12 : 13, color: C.muted, margin: "0 0 16px" }}>Identify underserved areas and get AI recommendations for new routes</p>
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
  const [activeStep, setActiveStep] = useState(0);
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);
  const mob = useIsMobile();

  const steps = [
    {
      num: "01",
      title: "Install GPS Trackers",
      subtitle: "Weeks 1-6",
      color: C.blue,
      icon: "📍",
      headline: "Every bus reports its position, every second.",
      body: "We start with the smallest piece of hardware that delivers the most value: a certified GPS tracker on every public bus in Kigali. This unlocks live vehicle tracking, accurate ETAs for citizens, schedule adherence monitoring for MININFRA and Ecofleet, and the raw data feed needed for every downstream analytic.",
      outputs: [
        "Live vehicle positions for all 500 Kigali buses",
        "Running-time and dwell-time data by route and time-of-day",
        "Baseline for schedule reliability and bunching analysis",
        "Foundation for the citizen app's live-arrival predictions",
      ],
    },
    {
      num: "02",
      title: "Collect Data & Go Live with the App",
      subtitle: "Weeks 6-16",
      color: C.green,
      icon: "📱",
      headline: "The citizen app launches. Every trip becomes a data point.",
      body: "The white-label passenger app goes live — route planning, live bus tracking, and USSD / Mobile Money / QR-code payments. Every ticket paid, every search, every boarding flows back into the city's operations dashboard. Kigali's existing Tap & Go infrastructure integrates directly.",
      outputs: [
        "Multi-modal route planner using live GPS data",
        "USSD, MTN MoMo, Airtel Money, QR code and smart-card payments",
        "Origin-destination matrix built from real trip data",
        "Ridership, revenue, and leakage reports live in the city dashboard",
      ],
    },
    {
      num: "03",
      title: "Add Passenger Counters (Optional)",
      subtitle: "Weeks 12-20",
      color: C.amber,
      icon: "👥",
      headline: "Know who's on each bus — no cameras, no privacy issues.",
      body: "For operators that want a second source of truth on passenger volumes, we install simple infrared door-counters. These count boardings and alightings at each stop — nothing more. No cameras, no facial recognition, no in-vehicle surveillance. The counts cross-check against app payments to measure fare-evasion by route and time.",
      outputs: [
        "Boarding and alighting counts per stop, per trip",
        "Precise load factor — the key metric for right-sizing fleets",
        "Cross-check against app payments → fare-evasion rate per route",
        "Low-cost hardware, no ongoing operating burden",
      ],
    },
    {
      num: "04",
      title: "Analytics & Route Optimisation",
      subtitle: "Ongoing",
      color: C.red,
      icon: "🎯",
      headline: "Use the data to reshape the network — both ways.",
      body: "With 3-6 months of GPS and ridership data in hand, the network optimises itself. The platform surfaces two kinds of actions: where to add capacity (under-served routes with long waits or long walks), and where to pull capacity (over-served routes with half-empty buses). The city approves changes; the operator executes; the dashboard measures the result.",
      outputs: [
        "Under-served corridors identified — add frequency or new lines",
        "Over-served corridors identified — redeploy buses, save operating cost",
        "Fare-evasion heatmap — direct inspectors to the highest-leakage zones",
        "Quarterly network review aligned with Rwanda Transport Strategic Plan",
      ],
    },
  ];

  const principles = [
    {
      title: "Frequency is Freedom",
      author: "Jarrett Walker · Human Transit",
      body: "Passengers don't memorise schedules when service runs every 10 minutes or less. High-frequency networks unlock spontaneous travel and grow ridership. For Kigali, this means concentrating resources on fewer, straighter, more frequent trunk routes rather than spreading thin across many infrequent ones.",
      metric: "Target: under 10-minute headway on all trunk routes",
    },
    {
      title: "Straight Lines, Both Directions",
      author: "Jarrett Walker · ITDP",
      body: "Routes must be straight and direct (circuity ratio below 1.3), operate symmetrically in both directions, and avoid excessive branching. Every deviation from a straight line adds travel time that drives passengers away. Kigali's hilly topography demands creative routing along ridgelines and valley corridors.",
      metric: "Target: circuity ratio under 1.3 on all trunk routes",
    },
    {
      title: "Coverage vs. Ridership — the Honest Trade-off",
      author: "TRB TCRP Report 165",
      body: "Every transit system makes an implicit trade-off. Coverage-maximising networks spread service thinly so everyone has a bus nearby, but each bus runs half-empty. Ridership-maximising networks concentrate service on busy corridors — more frequent, more full — but some neighbourhoods walk further. International best practice runs 60-75% of service-hours on ridership-maximising corridors, the rest on coverage. The platform shows the trade-off in real numbers so the city can decide.",
      metric: "Recommended: 70/30 ridership-to-coverage split",
    },
    {
      title: "Connections Over One-Seat Rides",
      author: "Houston METRO Redesign · Barcelona TMB",
      body: "Well-designed transfer-based networks outperform direct-service networks on total mobility. Houston's 2015 redesign — a high-frequency grid with quality transfers — increased weekend ridership by 30%. For Kigali, this means investing in quality transfer facilities at Nyabugogo rather than running circuitous one-seat routes.",
      metric: "Benchmark: Houston +30% ridership after redesign",
    },
    {
      title: "The 400-Metre Rule",
      author: "ITDP BRT Standard v3.0",
      body: "No more than a 5-minute walk (400 metres) to a transit stop in urban areas; 800 metres (10 minutes) for suburban. This determines stop spacing — too many stops slow the service; too few create coverage gaps. For Kigali's hilly terrain, effective walk distances are shorter, so altitude-adjusted catchments are essential.",
      metric: "Standard: 400 m urban / 800 m suburban catchment",
    },
    {
      title: "Right-Size the Vehicle to the Demand",
      author: "UITP · World Bank",
      body: "Match vehicle size to demand. Standard 12-metre buses for trunk routes with 1,000+ passengers per hour per direction; midi-buses for crosstown routes with 400-800; minibuses for feeders under 400. Kigali's current fleet is oversized on feeders and undersized on trunks — rebalancing yields roughly 15% operating-cost savings.",
      metric: "Target: 85% load factor at the maximum-load point",
    },
  ];

  const currentStep = steps[activeStep];

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: mob ? 28 : 48 }}>
        <div style={{ display: "inline-block", background: `${C.red}15`, border: `1px solid ${C.red}30`, color: C.red, padding: "6px 16px", borderRadius: '1.875rem', fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 16 }}>
          HOW WE DELIVER
        </div>
        <h2 style={{ fontFamily: F.headline, fontSize: mob ? 26 : 40, fontWeight: 900, margin: "0 0 12px" }}>
          Four steps. <span style={{ color: C.red }}>That's it.</span>
        </h2>
        <p style={{ fontSize: mob ? 14 : 17, color: C.muted, maxWidth: 720, margin: "0 auto" }}>
          A simple, sequenced rollout. Each step stands on its own and delivers value — Kigali can stop at Step 2 or continue to Step 4. Budget, scope and timeline are decided by the city, not pre-set by us.
        </p>
      </div>

      {/* Step selector */}
      <div style={{ display: "flex", gap: mob ? 6 : 10, marginBottom: mob ? 20 : 32, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4 }}>
        {steps.map((p, i) => (
          <button key={i} onClick={() => setActiveStep(i)} style={{
            flex: mob ? "0 0 auto" : 1, padding: mob ? "12px 14px" : "16px 18px", borderRadius: '1.5rem', border: "none",
            background: activeStep === i ? p.color : "white",
            color: activeStep === i ? "white" : C.black,
            fontWeight: 700, fontSize: mob ? 11 : 13, cursor: "pointer", transition: "all 0.3s",
            fontFamily: F.headline, minHeight: 44, whiteSpace: "nowrap", textAlign: "left",
            minWidth: mob ? 160 : 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              <div>
                <div style={{ fontSize: 10, opacity: 0.75, fontWeight: 600 }}>STEP {p.num}</div>
                <div style={{ fontSize: mob ? 12 : 13, marginTop: 1 }}>{p.title}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Active step detail */}
      <div style={{ background: "white", borderRadius: '1.875rem', padding: mob ? "24px 18px" : "36px 32px", marginBottom: 28, borderTop: `4px solid ${currentStep.color}` }}>
        <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? 12 : 20, alignItems: mob ? "flex-start" : "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 36, width: 64, height: 64, borderRadius: '1.5rem', background: `${currentStep.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>{currentStep.icon}</div>
            <div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: currentStep.color, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>STEP {currentStep.num} · {currentStep.subtitle}</div>
              <h3 style={{ fontSize: mob ? 22 : 26, fontWeight: 900, margin: "4px 0 0", fontFamily: F.headline }}>{currentStep.title}</h3>
            </div>
          </div>
        </div>
        <div style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: C.black, marginBottom: 12, fontFamily: F.headline, lineHeight: 1.4 }}>
          {currentStep.headline}
        </div>
        <p style={{ fontSize: mob ? 14 : 15, lineHeight: 1.7, color: C.black, marginBottom: 20, maxWidth: 820 }}>{currentStep.body}</p>

        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 10 }}>
          {currentStep.outputs.map((o, i) => (
            <div key={i} style={{
              background: "#FAFAFA", borderRadius: '1rem', padding: mob ? "12px 14px" : "14px 18px", border: "1px solid #EAEAEA",
              display: "flex", alignItems: "flex-start", gap: 10,
            }}>
              <span style={{ color: currentStep.color, fontWeight: 900, fontSize: 16, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: C.black, lineHeight: 1.5 }}>{o}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Design principles */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ width: 4, height: 28, background: C.red, borderRadius: 2 }} />
          <h3 style={{ fontSize: mob ? 18 : 22, fontWeight: 900, margin: 0, fontFamily: F.headline, textTransform: "uppercase", letterSpacing: "0.02em" }}>International Best Practice</h3>
          <span style={{ fontSize: 11, color: C.muted, fontWeight: 500 }}>The rules the platform is built on</span>
        </div>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 16, maxWidth: 700, lineHeight: 1.6 }}>
          These principles shape the analytics and route-design logic in the platform. Kigali's World Bank RUMI conditions, ITDP's BRT Standard, and Rwanda's own Transport Sector Strategic Plan all lean on the same playbook.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 10 }}>
          {principles.map((p, i) => (
            <div key={i} onClick={() => setExpandedPrinciple(expandedPrinciple === i ? null : i)} style={{
              background: expandedPrinciple === i ? "#FFF8F6" : "white", borderRadius: '1.5rem', padding: mob ? "16px" : "20px",
              border: expandedPrinciple === i ? `2px solid ${C.red}` : "2px solid #EAEAEA",
              cursor: "pointer", transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: mob ? 14 : 15, fontWeight: 800, fontFamily: F.headline, color: C.black }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{p.author}</div>
                </div>
                <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>{expandedPrinciple === i ? "▲" : "▼"}</span>
              </div>
              {expandedPrinciple === i && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #F0F0F0" }}>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: C.black, margin: "0 0 10px" }}>{p.body}</p>
                  <div style={{ background: `${C.red}10`, color: C.red, padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                    {p.metric}
                  </div>
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

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(26,26,26,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="https://avatars.mds.yandex.net/get-lpc/14837328/21641dca-3288-4eeb-8d99-81f8cb31a763/orig" alt="Yango Tech" style={{ height: 26, width: "auto", filter: "invert(1)" }} />
            {!mob && <>
              <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 4px" }}>|</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>City Transit</span>
            </>}
            <span style={{ color: C.red, fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', background: "rgba(255,26,26,0.15)", padding: "4px 10px", borderRadius: '2rem' }}>Rwanda</span>
          </div>
          {mob ? (
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{
              background: "none", border: "none", color: "white", fontSize: 24, cursor: "pointer",
              padding: 8, minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          ) : (
            <div style={{ display: "flex", gap: 24 }}>
              {navItems.map((n, i) => (
                <a key={i} href={n.href} onClick={(e) => handleNav(n.href, e)} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "white"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{n.label}</a>
              ))}
            </div>
          )}
        </div>
        {/* Mobile menu dropdown */}
        {mob && menuOpen && (
          <div style={{ background: "rgba(26,26,26,0.98)", padding: "8px 24px 16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {navItems.map((n, i) => (
              <a key={i} href={n.href} onClick={(e) => handleNav(n.href, e)} style={{
                display: "block", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 15, fontWeight: 500,
                padding: "12px 0", borderBottom: i < navItems.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>{n.label}</a>
            ))}
          </div>
        )}
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
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: mob ? "40px 20px" : "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "flex", flexDirection: mob ? "column" : "row", alignItems: mob ? "flex-start" : "center", gap: mob ? 32 : 60 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-block", background: `${C.red}20`, border: `1px solid ${C.red}40`, color: C.red, padding: "6px 16px", borderRadius: '1.875rem', fontSize: mob ? 11 : 13, fontWeight: 600, marginBottom: mob ? 16 : 24 }}>
                SMART MOBILITY FOR KIGALI & RWANDA
              </div>
              <h1 style={{ fontFamily: F.headline, fontSize: mob ? 32 : 56, fontWeight: 900, lineHeight: 1.05, color: "white", margin: "0 0 20px", letterSpacing: "-0.03em" }}>
                Accelerate Kigali's<br/><span style={{ color: C.red }}>smart mobility.</span>
              </h1>
              <p style={{ fontSize: mob ? 15 : 19, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 0 28px" }}>
                Kigali already leads Africa on smart city and digital transformation. Yango City Transit is the digital layer that turns Tap&nbsp;&amp;&nbsp;Go cards, Ecofleet's new bus operations and the RUMI project into one integrated, analytics-driven public transport platform — citizen app, operator dashboard, revenue control, and route optimisation in one system.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#platform" style={{ background: C.red, color: "white", padding: mob ? "12px 24px" : "14px 32px", borderRadius: '1.25rem', fontWeight: 700, fontSize: mob ? 14 : 15, textDecoration: "none", minHeight: 44, display: "inline-flex", alignItems: "center" }}>Explore Platform →</a>
                <a href="#impact" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", padding: mob ? "12px 24px" : "14px 32px", borderRadius: '1.25rem', fontWeight: 600, fontSize: mob ? 14 : 15, textDecoration: "none", minHeight: 44, display: "inline-flex", alignItems: "center" }}>See Impact</a>
              </div>
            </div>
            <div style={{ flex: mob ? "unset" : 0.8, width: mob ? "100%" : "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: mob ? 8 : 12 }}>
                {[
                  { val: "~100%", label: "4G Population Coverage", sub: "Near-universal mobile broadband — among Africa's best" },
                  { val: "90%+", label: "Smartphone / Broadband Mobile", sub: "Share of mobile connections on 3G/4G/5G" },
                  { val: "500", label: "Public Buses in Kigali", sub: "Up from 200 in 2021 — 18 operators, 7 corridors" },
                  { val: "250K", label: "Daily Passenger Rides in Kigali", sub: "Nyabugogo hub alone: ~100K/day today → 180K by 2030" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: mob ? 12 : 16, padding: mob ? "14px 12px" : "22px 18px" }}>
                    <div style={{ fontSize: mob ? 22 : 28, fontWeight: 900, color: "white", fontFamily: F.headline }}>{s.val}</div>
                    <div style={{ fontSize: mob ? 11 : 13, color: "rgba(255,255,255,0.65)", marginTop: 4, fontWeight: 600 }}>{s.label}</div>
                    <div style={{ fontSize: mob ? 9 : 11, color: "rgba(255,255,255,0.35)", marginTop: 4, lineHeight: 1.4 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RWANDA ALIGNMENT — landing strip showing we've done our homework */}
      <section style={{ background: "#0c0c0c", color: "white", padding: mob ? "40px 0" : "56px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: mob ? "0 16px" : "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1.3fr 1fr", gap: mob ? 24 : 48, alignItems: "center" }}>
            <div>
              <div style={{ color: C.red, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", marginBottom: 12 }}>CONTEXT — KIGALI 2026</div>
              <h2 style={{ fontFamily: F.headline, fontSize: mob ? 22 : 30, fontWeight: 900, color: "white", margin: "0 0 14px", lineHeight: 1.15 }}>
                Kigali already leads Africa on smart mobility. <span style={{ color: C.red }}>We make the next move feasible.</span>
              </h2>
              <p style={{ fontSize: mob ? 13 : 15, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 14px" }}>
                Tap &amp; Go cards launched December 2024. Ecofleet Solutions took over city-wide public transport in December 2025. Fixed schedules replaced the fill-up-and-go model. Dedicated bus lanes extended across four corridors in April 2026. The World Bank's $100M Rwanda Urban Mobility Improvement (RUMI) project runs 2025–2029.
              </p>
              <p style={{ fontSize: mob ? 13 : 15, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                The physical infrastructure is being built. Yango City Transit is the digital layer on top — the citizen app, the operator dashboard, the analytics engine, the revenue-control system. Designed to plug into what Kigali already has, not replace it.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { v: "$430M", l: "Rwanda infrastructure budget FY25/26" },
                { v: "$100M", l: "World Bank RUMI project 2025-2029" },
                { v: "180K", l: "Nyabugogo daily passenger target by 2030" },
                { v: "70%", l: "Public transport share — Vision 2050 target" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: '1rem', padding: mob ? "14px 12px" : "18px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: F.headline, fontSize: mob ? 20 : 24, fontWeight: 900, color: C.red }}>{s.v}</div>
                  <div style={{ fontSize: mob ? 10 : 11, color: "rgba(255,255,255,0.55)", marginTop: 6, lineHeight: 1.4, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: mob ? 24 : 32, paddingTop: mob ? 20 : 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexWrap: "wrap", gap: mob ? 8 : 14, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginRight: 4 }}>Aligned with</span>
            {[
              "Vision 2050",
              "NST2",
              "Rwanda Transport Sector Strategic Plan 2024-2029",
              "Kigali City Master Plan 2050",
              "World Bank RUMI",
              "MININFRA",
              "Ecofleet Solutions",
              "RURA",
              "RTDA",
              "City of Kigali",
            ].map((t, i) => (
              <span key={i} style={{ fontSize: mob ? 10 : 11, color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.04)", padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <Section bg={C.body} id="pillars">
        <div style={{ textAlign: "center", marginBottom: mob ? 28 : 48 }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? 26 : 40, fontWeight: 900, margin: "0 0 12px" }}>One platform. <span style={{ color: C.red }}>Three transformations.</span></h2>
          <p style={{ fontSize: mob ? 14 : 17, color: C.muted, maxWidth: 600, margin: "0 auto" }}>Connects passengers, operators, and city authorities on a single intelligent transport system.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr", gap: 20 }}>
          {[
            { title: "For Citizens", num: "01", color: C.green, items: ["Upgrade from Tap & Go cards to full real-time bus tracking", "Pay via USSD, MTN MoMo, Airtel Money, or QR scan — no smartphone required", "Multi-modal trips: bus + moto-taxi + walking, in one app", "Know exactly when your bus arrives — end the wait at the stop", "Seamless transfers at Nyabugogo & Kicukiro interchange hubs"] },
            { title: "For Carriers", num: "02", color: C.blue, items: ["GPS navigation optimised for Kigali's hilly terrain", "Digital fare collection replaces cash end-to-end", "Real-time fleet monitoring across all 18 operators and 7 corridors", "RURA-ready compliance and automated reporting built in", "Integrates with Ecofleet Solutions' service-level contracting model"] },
            { title: "For the City", num: "03", color: C.red, items: ["Whole project aligned with Rwanda Transport Sector Strategic Plan", "Data-driven route planning toward 100% network coverage", "New revenue stream for the Treasury — not a cost centre", "Real-time dashboards for City of Kigali & MININFRA", "Ready to integrate with BRT corridors and electric bus fleets"] },
          ].map((p, i) => (
            <div key={i} style={{ background: "white", borderRadius: '1.875rem', padding: "36px 28px", borderTop: `4px solid ${p.color}` }}>
              <div style={{ fontFamily: F.body, fontSize: 32, fontWeight: 900, color: p.color, opacity: 0.15, marginBottom: 8 }}>{p.num}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 16px", fontFamily: F.headline }}>{p.title}</h3>
              {p.items.map((item, j) => (
                <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, fontSize: 14, lineHeight: 1.5, color: C.black }}>
                  <span style={{ color: p.color, fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✓</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* INTERACTIVE DEMOS */}
      <Section bg="white" id="passengers">
        <div style={{ textAlign: "center", marginBottom: mob ? 24 : 40 }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? 26 : 40, fontWeight: 900, margin: "0 0 12px" }}>See it in <span style={{ color: C.red }}>action.</span></h2>
          <p style={{ fontSize: mob ? 14 : 17, color: C.muted }}>Interactive mockups — tap through every interface.</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFF8E1", border: "1px solid #F5D87A", color: "#8B6A00", padding: "6px 14px", borderRadius: '1rem', fontSize: mob ? 11 : 12, fontWeight: 600, marginTop: 14 }}>
            <span style={{ fontSize: 12 }}>⚙</span>
            <span>Simulation — an example of how the final product could look, not the finished UI. The production app is fully localised and branded.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: mob ? 24 : 40, flexWrap: "wrap" }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: mob ? "10px 14px" : "12px 24px", borderRadius: '1.5rem', border: "none",
              background: activeTab === i ? C.black : "#F0F0F0", color: activeTab === i ? "white" : C.black,
              fontWeight: 700, fontSize: mob ? 12 : 14, cursor: "pointer", transition: "all 0.3s", fontFamily: F.headline,
              minHeight: 44,
            }}>{t.title}</button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: mob ? 20 : 40 }}>
          {activeTab === 0 && (
            <div style={{ display: "flex", flexDirection: mob ? "column" : "row", alignItems: "center", gap: mob ? 24 : 60 }}>
              <PhoneMockup label="Passenger App · Simulation"><PassengerApp/></PhoneMockup>
              <div style={{ maxWidth: mob ? "100%" : 400 }}>
                <h3 style={{ fontSize: mob ? 20 : 26, fontWeight: 800, marginBottom: 16, fontFamily: F.headline }}>Passengers know exactly when the bus arrives</h3>
                <p style={{ fontSize: mob ? 13 : 15, lineHeight: 1.7, color: C.black, marginBottom: 20 }}>Kigali's Tap & Go system was a great start. Yango Transit takes it further — real-time GPS tracking of every bus, predictive arrival times, and seamless mobile money integration with MTN MoMo and Airtel Money.</p>
                {["Real-time arrival predictions at every Kigali stop", "Pay via MTN MoMo, Airtel Money, or Safaribus card", "Multi-modal planner: bus + moto-taxi + walking routes", "Kinyarwanda, English & French interface support"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: C.black }}>
                    <span style={{ background: "#FFF0ED", color: C.red, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i+1}</span>{f}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div style={{ display: "flex", flexDirection: mob ? "column-reverse" : "row", alignItems: "center", gap: mob ? 24 : 60 }}>
              <div style={{ maxWidth: mob ? "100%" : 400 }}>
                <h3 style={{ fontSize: mob ? 20 : 26, fontWeight: 800, marginBottom: 16, fontFamily: F.headline }}>Drivers navigate, the app handles ticketing</h3>
                <p style={{ fontSize: mob ? 13 : 15, lineHeight: 1.7, color: C.black, marginBottom: 20 }}>With 18+ bus operators in Kigali, standardized digital tools are essential. Yango Transit gives every driver navigation, scheduling, and automated fare collection — ready for BRT corridors.</p>
                {["Turn-by-turn route navigation with live traffic", "Automatic passenger counting via sensors", "Schedule adherence alerts & announcements", "Digital trip logging — no paper manifests"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: C.black }}>
                    <span style={{ background: "#E8F0FE", color: C.blue, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i+1}</span>{f}
                  </div>
                ))}
              </div>
              <PhoneMockup label="Driver Console · Simulation"><DriverApp/></PhoneMockup>
            </div>
          )}
          {activeTab === 2 && (
            <div style={{ display: "flex", flexDirection: mob ? "column" : "row", alignItems: "center", gap: mob ? 24 : 40 }}>
              <PhoneMockup label="Operator Dashboard · Simulation"><OperatorDashboard/></PhoneMockup>
              <div style={{ maxWidth: mob ? "100%" : 420 }}>
                <h3 style={{ fontSize: mob ? 20 : 26, fontWeight: 800, marginBottom: 16, fontFamily: F.headline }}>Create & optimize routes with AI insights</h3>
                <p style={{ fontSize: mob ? 13 : 15, lineHeight: 1.7, color: C.black, marginBottom: 20 }}>Whether you're managing a fleet of 20 buses or planning the entire Kigali network, operators get AI insights aligned with RURA standards and City of Kigali transport targets.</p>
                {["AI detects low-ridership periods and suggests changes", "Overcrowding alerts with express bus recommendations", "Underserved area detection → new route proposals", "One-click route changes or simulate-first mode", "Dynamic adjustments based on real-time demand"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: C.black }}>
                    <span style={{ background: "#FFF0ED", color: C.red, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i+1}</span>{f}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
              <TabletMockup label="City Operations Dashboard · Simulation"><CityDashboard/></TabletMockup>
              <div style={{ maxWidth: 700, textAlign: "center" }}>
                <h3 style={{ fontSize: mob ? 20 : 26, fontWeight: 800, marginBottom: 12, fontFamily: F.headline }}>Full transparency. Zero fraud. Taxable revenue.</h3>
                <p style={{ fontSize: mob ? 13 : 15, lineHeight: 1.7, color: C.black }}>Every fare digitally recorded, every bus GPS-tracked, every route optimized. Drivers and fleet operators cannot cheat or skim. Transport quality is controlled through measurable metrics.</p>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ANALYTICS */}
      <Section bg="white" id="analytics">
        <div style={{ textAlign: "center", marginBottom: mob ? 28 : 48 }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? 26 : 40, fontWeight: 900, margin: "0 0 12px" }}>Data-driven <span style={{ color: C.red }}>decisions.</span></h2>
          <p style={{ fontSize: mob ? 14 : 17, color: C.muted, maxWidth: 680, margin: "0 auto" }}>
            The whole project — platform, analytics and route design — aligned with the Rwanda Transport Sector Strategic Plan 2024–2029, Vision 2050, the Kigali City Master Plan, and the World Bank RUMI project framework.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFF8E1", border: "1px solid #F5D87A", color: "#8B6A00", padding: "6px 14px", borderRadius: '1rem', fontSize: mob ? 11 : 12, fontWeight: 600, marginTop: 14 }}>
            <span style={{ fontSize: 12 }}>⚙</span>
            <span>The charts below are mockups illustrating the analytics. Real production dashboards are shown further down in "Platform in Action".</span>
          </div>
        </div>
        <SpeedMapDemo/>
        <FareEvasionDemo/>
        <AccessibilityDemo/>
      </Section>

      {/* ROUTE DESIGN METHODOLOGY */}
      <Section bg={C.body} id="methodology">
        <RouteDesignMethodology />
      </Section>

      {/* ANTI-FRAUD / REVENUE CONTROL */}
      <Section bg={C.black} id="transparency" style={{ color: "white" }}>
        <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? 28 : 60, alignItems: mob ? "flex-start" : "center", marginBottom: mob ? 32 : 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.red, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>REVENUE CONTROL</div>
            <h2 style={{ fontFamily: F.headline, fontSize: mob ? 26 : 38, fontWeight: 900, color: "white", margin: "0 0 20px" }}>Close the leakage.<br/>Every fare captured.<br/>Every bus tracked.</h2>
            <p style={{ fontSize: mob ? 14 : 16, lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
              Rwanda ended transport subsidies in 2024 — operational efficiency and fare revenue are now the main funding source for the city's public transport. The platform turns every passenger interaction into a tracked, auditable data point, and tells inspectors exactly where to go next.
            </p>
          </div>
          <div style={{ flex: 1, width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12 }}>
              {[
                { title: "Digital Fare Collection", desc: "Every payment logged with timestamp, route, vehicle ID." },
                { title: "GPS Fleet Tracking", desc: "Real-time location — no ghost buses, no route deviations." },
                { title: "Automated Reporting", desc: "Revenue reports generated for RURA, Ecofleet and MININFRA." },
                { title: "Dynamic Routes", desc: "Adjust routes in real-time based on demand or events." },
                { title: "Inspector Targeting", desc: "AI-ranked leakage zones sent to inspectors' phones." },
                { title: "Tamper-Proof Records", desc: "Boardings, payments and trips can't be retro-edited." },
              ].map((f, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: '1.875rem', padding: "20px 16px" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.5, color: "rgba(255,255,255,0.5)" }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How fare-evasion tracking actually works */}
        <div style={{ background: "#0f0f0f", borderRadius: '1.875rem', padding: mob ? "24px 20px" : "36px 40px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
            <div style={{ width: 4, height: 28, background: C.red, borderRadius: 2 }} />
            <h3 style={{ fontSize: mob ? 18 : 22, fontWeight: 900, margin: 0, fontFamily: F.headline, color: "white", textTransform: "uppercase", letterSpacing: "0.02em" }}>How Fare-Evasion Tracking Works</h3>
          </div>
          <p style={{ fontSize: mob ? 13 : 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 24, maxWidth: 820 }}>
            In cash-based systems, fare-evasion is invisible until it's too late. On the Yango platform, every app-open, route-search and payment is logged. By comparing app-activity against actual fares paid, the system shows a live leakage heatmap — and tells inspectors exactly where to go.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(4, 1fr)", gap: mob ? 12 : 14 }}>
            {[
              { num: "01", title: "Log every app interaction", desc: "The citizen app logs when it opens, which route is searched, and which bus the user tracks. This is the 'intent to travel' signal." },
              { num: "02", title: "Log every payment", desc: "Tap & Go, MoMo, Airtel Money, USSD and QR payments all land in the same ledger — timestamped and geo-stamped." },
              { num: "03", title: "Calibrate with inspectors", desc: "Human inspectors spot-check a sample of routes. Their ground-truth anchors the statistical model — intent-to-pay ratio is locked in." },
              { num: "04", title: "Auto-target the worst zones", desc: "Wherever the intent-to-pay ratio diverges, the system flags the zone. Inspectors' apps show the top leakage hotspots for the day." },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: '1rem', padding: mob ? "14px 14px" : "18px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 11, color: C.red, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 6 }}>{s.num}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "white", marginBottom: 6, fontFamily: F.headline }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: `${C.red}15`, border: `1px solid ${C.red}40`, borderRadius: '1rem', padding: mob ? "14px 16px" : "16px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ color: C.red, fontSize: 18, fontWeight: 900, flexShrink: 0 }}>→</div>
            <div style={{ fontSize: mob ? 12 : 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
              <strong style={{ color: "white" }}>Outcome:</strong> inspectors stop playing whack-a-mole. Each dispatch is data-driven. In comparable deployments, closing just the top 30% of leakage zones captured roughly <span style={{ color: C.red, fontWeight: 700 }}>30% of the recoverable revenue gap</span> within the first 90 days.
            </div>
          </div>
        </div>
      </Section>

      {/* PLATFORM IN ACTION — real screencasts + real dashboards */}
      <Section bg={C.black} id="platform" style={{ color: "white" }}>
        <div style={{ textAlign: "center", marginBottom: mob ? 28 : 48 }}>
          <div style={{ display: "inline-block", background: `${C.red}20`, border: `1px solid ${C.red}40`, color: C.red, padding: "6px 16px", borderRadius: '1.875rem', fontSize: mob ? 11 : 13, fontWeight: 600, marginBottom: 16 }}>
            LIVE PRODUCT · REAL SCREENCASTS
          </div>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? 26 : 40, fontWeight: 900, margin: "0 0 12px", color: "white" }}>
            Platform <span style={{ color: C.red }}>in action.</span>
          </h2>
          <p style={{ fontSize: mob ? 14 : 17, color: "rgba(255,255,255,0.55)", maxWidth: 680, margin: "0 auto" }}>
            Real interfaces running in production across our markets — route planning, live navigation, traffic intelligence, and operator dashboards. Deployed today in Tashkent (Uzbekistan), Yaroslavl, Yerevan and others.
          </p>
        </div>

        {/* Grid of 4 demo cards with real videos */}
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 18 : 24, marginBottom: mob ? 28 : 48 }}>

          {/* Card 1 — Citizen app (two phones side by side) */}
          <div style={{ background: "#1a1a1a", borderRadius: '1.875rem', overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", padding: mob ? "18px 12px 0" : "28px 16px 0", background: `linear-gradient(180deg, ${C.red}12 0%, transparent 100%)` }}>
              <div style={{ width: mob ? 130 : 160, borderRadius: 20, overflow: "hidden", background: "#000", padding: 3, flexShrink: 0 }}>
                <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 18, display: "block" }}
                  poster="https://res.cloudinary.com/dc99897dw/video/upload/so_1,f_jpg,w_400,q_auto/IMG_4799_kzkmkx.jpg">
                  <source src="https://res.cloudinary.com/dc99897dw/video/upload/f_mp4,q_auto,w_400,ac_none,e_accelerate:250/IMG_4799_kzkmkx.mp4" type="video/mp4" />
                </video>
              </div>
              <div style={{ width: mob ? 130 : 160, borderRadius: 20, overflow: "hidden", background: "#000", padding: 3, flexShrink: 0 }}>
                <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 18, display: "block" }}
                  poster="https://res.cloudinary.com/dc99897dw/video/upload/so_1,f_jpg,w_400,q_auto/IMG_4800_ltvopm.jpg">
                  <source src="https://res.cloudinary.com/dc99897dw/video/upload/f_mp4,q_auto,w_400,ac_none,e_accelerate:250/IMG_4800_ltvopm.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div style={{ padding: mob ? "18px" : "22px 26px" }}>
              <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 900, margin: "0 0 8px", fontFamily: F.headline, textTransform: "uppercase", letterSpacing: "0.02em", color: "white" }}>Citizen Mobile App</h3>
              <p style={{ fontSize: mob ? 12 : 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.55, margin: 0 }}>Multi-modal route planning, live bus tracking, and contactless fare payments — a single white-label app ready to deploy under Kigali's brand.</p>
              <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(252,63,29,0.15)", color: C.red, padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Citizens</span>
                <span style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600, letterSpacing: "0.04em" }}>Live — Tashkent deployment</span>
              </div>
            </div>
          </div>

          {/* Card 2 — Smart traffic signals (one phone) */}
          <div style={{ background: "#1a1a1a", borderRadius: '1.875rem', overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "center", padding: mob ? "18px 12px 14px" : "28px 16px 14px", background: `linear-gradient(180deg, ${C.red}12 0%, transparent 100%)` }}>
              <div style={{ width: mob ? 150 : 180, borderRadius: 20, overflow: "hidden", background: "#000", padding: 3 }}>
                <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 18, display: "block" }}
                  poster="https://res.cloudinary.com/dc99897dw/video/upload/so_1,f_jpg,w_400,q_auto/iOS_Traffic_Lights_ywbdsj.jpg">
                  <source src="https://res.cloudinary.com/dc99897dw/video/upload/f_mp4,q_auto,w_400,ac_none,e_accelerate:200/iOS_Traffic_Lights_ywbdsj.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div style={{ padding: mob ? "18px" : "22px 26px" }}>
              <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 900, margin: "0 0 8px", fontFamily: F.headline, textTransform: "uppercase", letterSpacing: "0.02em", color: "white" }}>Smart Traffic Signals</h3>
              <p style={{ fontSize: mob ? 12 : 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.55, margin: 0 }}>Traffic-light countdown timers integrated directly into Yango Maps — drivers see exactly how many seconds until the light changes, reducing stop-and-go driving on Kigali's arterials.</p>
              <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(252,63,29,0.15)", color: C.red, padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>City + Citizens</span>
                <span style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600, letterSpacing: "0.04em" }}>Live — Tashkent deployment</span>
              </div>
            </div>
          </div>

          {/* Card 3 — CarPlay / in-vehicle */}
          <div style={{ background: "#1a1a1a", borderRadius: '1.875rem', overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ padding: mob ? "18px 18px 0" : "24px 24px 0" }}>
              <div style={{ background: "#000", borderRadius: 14, overflow: "hidden", border: "3px solid #333" }}>
                <video autoPlay muted loop playsInline style={{ width: "100%", display: "block" }}
                  poster="https://res.cloudinary.com/dc99897dw/video/upload/so_1,f_jpg,w_800,q_auto/CarPlay_Traffic_Lights_l5uzje.jpg">
                  <source src="https://res.cloudinary.com/dc99897dw/video/upload/f_mp4,q_auto,w_800,ac_none,e_accelerate:200/CarPlay_Traffic_Lights_l5uzje.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div style={{ padding: mob ? "18px" : "22px 26px" }}>
              <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 900, margin: "0 0 8px", fontFamily: F.headline, textTransform: "uppercase", letterSpacing: "0.02em", color: "white" }}>CarPlay & In-Vehicle</h3>
              <p style={{ fontSize: mob ? 12 : 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.55, margin: 0 }}>Apple CarPlay and Android Auto with live signal countdown. Connected-vehicle integration for bus operators, taxi fleets, and Kigali's future BRT corridors.</p>
              <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(252,63,29,0.15)", color: C.red, padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Carriers + Citizens</span>
                <span style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600, letterSpacing: "0.04em" }}>Live — Tashkent deployment</span>
              </div>
            </div>
          </div>

          {/* Card 4 — Operations Dashboard (admin screen recording) */}
          <div style={{ background: "#1a1a1a", borderRadius: '1.875rem', overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ padding: mob ? "18px 18px 0" : "24px 24px 0" }}>
              <div style={{ background: "#151520", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
                <div style={{ height: 26, background: "#0d0d18", display: "flex", alignItems: "center", padding: "0 10px", gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF5F57" }} />
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#FFBD2E" }} />
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28CA41" }} />
                  <span style={{ marginLeft: 8, fontSize: 9, color: "rgba(255,255,255,0.3)" }}>admin.city-of-kigali.gov — Carrier Operations</span>
                </div>
                <video autoPlay muted loop playsInline style={{ width: "100%", display: "block" }}
                  poster="https://res.cloudinary.com/dc99897dw/video/upload/so_1,f_jpg,w_800,q_auto/Screen_Recording_2026-02-12_at_1.11.13_PM_khhntc.jpg">
                  <source src="https://res.cloudinary.com/dc99897dw/video/upload/f_mp4,q_auto,w_800,ac_none/Screen_Recording_2026-02-12_at_1.11.13_PM_khhntc.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div style={{ padding: mob ? "18px" : "22px 26px" }}>
              <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 900, margin: "0 0 8px", fontFamily: F.headline, textTransform: "uppercase", letterSpacing: "0.02em", color: "white" }}>Operations Dashboard</h3>
              <p style={{ fontSize: mob ? 12 : 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.55, margin: 0 }}>The same dashboard engine powers fleet dispatching, route management, and automated KPI reporting — demonstrated here on an operator workflow. Ready to integrate with Ecofleet Solutions and MININFRA.</p>
              <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(252,63,29,0.15)", color: C.red, padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Carriers + City</span>
                <span style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600, letterSpacing: "0.04em" }}>Production platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real city dashboards */}
        <div style={{ marginTop: mob ? 32 : 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ width: 4, height: 28, background: C.red, borderRadius: 2 }} />
            <h3 style={{ fontSize: mob ? 18 : 22, fontWeight: 900, margin: 0, fontFamily: F.headline, color: "white", textTransform: "uppercase", letterSpacing: "0.02em" }}>Real City Dashboards</h3>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Live screens from production deployments — not mockups</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 16 : 20 }}>

            <div style={{ background: "#141414", borderRadius: '1.25rem', overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
              <img src="https://res.cloudinary.com/dc99897dw/image/upload/w_1200,q_auto,f_auto/yango-tech/demos/rwanda-city/schedule-optimization-yaroslavl.jpg"
                alt="Schedule optimisation dashboard — Yaroslavl deployment"
                style={{ width: "100%", display: "block" }}
                loading="lazy" />
              <div style={{ padding: mob ? "16px 18px" : "18px 22px" }}>
                <div style={{ fontSize: 10, color: C.red, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Schedule Optimisation</div>
                <h4 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 6px", fontFamily: F.headline, color: "white" }}>Timeline of planned runs — live vehicle & passenger flow</h4>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.55, margin: 0 }}>Real screen from Yaroslavl (1,327 vehicle-hours/day, 105 vehicles). Operators see exactly where buses bunch, where gaps open, and which stops are over- or under-served.</p>
              </div>
            </div>

            <div style={{ background: "#141414", borderRadius: '1.25rem', overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
              <img src="https://res.cloudinary.com/dc99897dw/image/upload/w_1200,q_auto,f_auto/yango-tech/demos/rwanda-city/public-transport-accessibility.jpg"
                alt="Accessibility analysis dashboard — under-served neighbourhoods highlighted"
                style={{ width: "100%", display: "block" }}
                loading="lazy" />
              <div style={{ padding: mob ? "16px 18px" : "18px 22px" }}>
                <div style={{ fontSize: 10, color: C.red, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Accessibility Analysis</div>
                <h4 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 6px", fontFamily: F.headline, color: "white" }}>Coverage mapped against population density</h4>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.55, margin: 0 }}>Pink zones = residents, green/yellow = routes and speed. Where residents exist without a nearby line, the city extends a route. Where a corridor is over-served, a bus redeploys to where it's needed.</p>
              </div>
            </div>

            <div style={{ background: "#141414", borderRadius: '1.25rem', overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", gridColumn: mob ? "auto" : "1 / -1" }}>
              <img src="https://res.cloudinary.com/dc99897dw/image/upload/w_1600,q_auto,f_auto/yango-tech/demos/rwanda-city/fare-evasion-tracking.jpg"
                alt="Daily passenger flow and fare evasion rate — live dashboard"
                style={{ width: "100%", display: "block" }}
                loading="lazy" />
              <div style={{ padding: mob ? "16px 18px" : "20px 26px" }}>
                <div style={{ fontSize: 10, color: C.red, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Fare Evasion & Revenue Control</div>
                <h4 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 8px", fontFamily: F.headline, color: "white" }}>Daily boardings · alightings · payments · leakage rate</h4>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>
                  Blue bars: people who boarded. Grey: people who alighted. Red: fares paid. Orange line: % non-paying passengers. The gap between boardings and payments is the revenue leakage — typically 20-35% in cash-based systems. Closing it is worth roughly <span style={{ color: C.red, fontWeight: 700 }}>$115M/year</span> for a city of Kigali's size.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 platform modules — kept but compressed */}
        <div style={{ marginTop: mob ? 32 : 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 4, height: 28, background: C.blue, borderRadius: 2 }} />
            <h3 style={{ fontSize: mob ? 18 : 22, fontWeight: 900, margin: 0, fontFamily: F.headline, color: "white", textTransform: "uppercase", letterSpacing: "0.02em" }}>Four modules, one system</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16 }}>
            {[
              { num: "01", title: "Analytics & Optimisation", color: C.red, items: ["Origin-destination trip matrix", "Route optimisation based on real demand", "Decision support for transport engineers", "Accessibility, speed & safety mapping"] },
              { num: "02", title: "Central Dispatching", color: C.blue, items: ["Operational control across all 18 operators", "Real-time schedule monitoring", "Dynamic route adjustments", "Fleet allocation optimisation"] },
              { num: "03", title: "On-Board Equipment", color: C.green, items: ["GPS tracking and telemetry (Step 1)", "Optional IR passenger counters (Step 2)", "Driver behaviour monitoring", "Road condition monitoring"] },
              { num: "04", title: "Inspection & Revenue Control", color: C.amber, items: ["AI-powered inspector route planning", "Fare evasion heat mapping", "Revenue leakage detection", "Automated compliance reporting"] },
            ].map((m, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: '1.25rem', padding: mob ? "18px 16px" : "22px 20px", borderLeft: `3px solid ${m.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontFamily: F.body, fontSize: 14, fontWeight: 700, color: m.color, letterSpacing: "0.08em" }}>{m.num}</span>
                  <h4 style={{ fontSize: mob ? 14 : 16, fontWeight: 800, margin: 0, fontFamily: F.headline, color: "white", textTransform: "uppercase", letterSpacing: "0.02em" }}>{m.title}</h4>
                </div>
                {m.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, display: "flex", gap: 8, lineHeight: 1.5 }}>
                    <span style={{ color: m.color, fontWeight: 700 }}>→</span> {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* IMPACT */}
      <Section bg="white" id="impact">
        <div style={{ textAlign: "center", marginBottom: mob ? 28 : 48 }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? 26 : 40, fontWeight: 900, margin: "0 0 12px" }}>Proven <span style={{ color: C.red }}>impact</span></h2>
          <p style={{ fontSize: mob ? 14 : 17, color: C.muted, maxWidth: 600, margin: "0 auto" }}>Proven results from live deployments — ready to scale across Kigali and Rwanda's secondary cities.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4, 1fr)", gap: mob ? 12 : 20, marginBottom: mob ? 28 : 48 }}>
          {[
            { value: 30, suffix: "%", label: "Increase in Fare Revenue", desc: "Potential for Kigali through AI-optimized operations" },
            { value: 115, prefix: "+$", suffix: "M", label: "Additional Revenue / Year", desc: "Scalable across Kigali and secondary cities" },
            { value: 40, suffix: "%", label: "Faster Decision Making", desc: "With real-time data gathering & analysis" },
            { value: 15, suffix: "%", label: "Travel Time Reduction", desc: "Through optimized routing & scheduling" },
          ].map((m, i) => (
            <div key={i} style={{ background: C.body, borderRadius: '1.875rem', padding: mob ? "20px 12px" : "32px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.red }}/>
              <div style={{ fontFamily: F.headline, fontSize: mob ? 32 : 48, fontWeight: 900, color: C.red, lineHeight: 1 }}>
                <Counter end={m.value} prefix={m.prefix || "+"} suffix={m.suffix}/>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.black, marginTop: 8, marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.4 }}>{m.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: C.black, borderRadius: '1.875rem', padding: mob ? "24px 20px" : "40px 36px", display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? 24 : 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.red, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>CASE STUDY</div>
            <h3 style={{ fontSize: 28, fontWeight: 800, color: "white", margin: "0 0 16px", fontFamily: F.headline }}>Yerevan, Armenia</h3>
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
            <div style={{ background: "rgba(252,63,29,0.1)", border: "1px solid rgba(252,63,29,0.25)", borderRadius: '1.875rem', padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: C.red, fontFamily: F.headline, lineHeight: 1 }}>~+$115M</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>estimated additional revenue per year</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: '1.875rem', padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: "white", fontFamily: F.headline, lineHeight: 1 }}>+30%</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>growth in paid passenger trips</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: '1.875rem', padding: "16px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>Preliminary estimate based on route optimization, schedule improvements, and more efficient fare inspection</div>
            </div>
          </div>
        </div>
      </Section>

      {/* IMPLEMENTATION + PPP */}
      <Section bg={C.body}>
        <div style={{ textAlign: "center", marginBottom: mob ? 28 : 48 }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? 26 : 40, fontWeight: 900, margin: "0 0 12px" }}>How we <span style={{ color: C.red }}>deliver</span></h2>
          <p style={{ fontSize: mob ? 14 : 17, color: C.muted, maxWidth: 600, margin: "0 auto" }}>Flexible partnership models designed for government and transport authorities.</p>
        </div>
        <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? 20 : 0, maxWidth: 900, margin: "0 auto", position: "relative" }}>
          {!mob && <div style={{ position: "absolute", top: 32, left: "10%", right: "10%", height: 3, background: C.border, zIndex: 0 }}/>}
          {[
            { month: "Month 1–2", title: "Assessment & Design", desc: "City mapping, demand analysis, system architecture" },
            { month: "Month 3–4", title: "Deployment", desc: "Equipment, app rollout, operator training" },
            { month: "Month 5–6", title: "Go-Live & Tuning", desc: "Optimization, route refinements, scaling" },
            { month: "Month 7+", title: "Full Operations", desc: "Ongoing optimization, expansion, support" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px",
                background: i === 3 ? C.red : "white", border: `3px solid ${i === 3 ? C.red : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 20, color: i === 3 ? "white" : C.black,
                fontFamily: F.headline,
              }}>{i+1}</div>
              <div style={{ fontSize: 12, color: C.red, fontWeight: 700, marginBottom: 6 }}>{s.month}</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6, fontFamily: F.headline }}>{s.title}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.4, padding: "0 8px" }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: mob ? 28 : 48, background: "white", borderRadius: '1.875rem', padding: mob ? "24px 20px" : "36px 40px", maxWidth: 880, margin: `${mob ? 28 : 48}px auto 0`, border: `2px solid ${C.red}20` }}>
          <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? 16 : 36, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontFamily: F.headline, fontSize: mob ? 40 : 56, fontWeight: 900, color: C.red, lineHeight: 1 }}>+$115M</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Annual revenue potential</div>
            </div>
            <div>
              <div style={{ fontSize: mob ? 17 : 19, fontWeight: 800, color: C.black, marginBottom: 8, fontFamily: F.headline }}>A new revenue stream — not a cost centre</div>
              <p style={{ fontSize: mob ? 13 : 14, color: C.black, lineHeight: 1.7, margin: "0 0 12px" }}>
                Rwanda's infrastructure budget already allocates <strong>$430M</strong> in FY2025/26, with <strong>$100M</strong> ring-fenced for the World Bank's Rwanda Urban Mobility Improvement (RUMI) project. Yango City Transit doesn't need a subsidy — the digitised fare stream and recovered leakage fund the platform, then return a net positive to the Treasury.
              </p>
              <p style={{ fontSize: mob ? 12 : 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>
                Yango Tech can partner with MININFRA, City of Kigali, RURA, RTDA and Ecofleet Solutions under a concession, licence or turn-key model — whichever fits Rwanda's existing procurement frameworks and aligns with the RUMI project timeline.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* TECH BACKBONE */}
      <Section bg="white">
        <div style={{ textAlign: "center", marginBottom: mob ? 28 : 48 }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? 26 : 40, fontWeight: 900, margin: "0 0 12px" }}>Built on <span style={{ color: C.red }}>proven technology</span></h2>
          <p style={{ fontSize: mob ? 14 : 17, color: C.muted, maxWidth: 600, margin: "0 auto" }}>Battle-tested infrastructure powering ride-hailing, logistics, and navigation for millions daily.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
          {[
            { title: "Yango Maps", desc: "HD mapping with 25% better geocoding and 16% better routing than competitors. On-premise available.", stat: "~30% lower cost" },
            { title: "RouteQ Dispatch", desc: "AI-powered route optimization handling 1M+ daily orders in peak. Proven 15% efficiency boost.", stat: "430+ clients" },
            { title: "AI & ML Engine", desc: "60+ services powered by proprietary AI — computer vision, predictive analytics, demand forecasting.", stat: "10+ B2B products" },
            { title: "Cloud Infrastructure", desc: "Full-stack cloud with on-premise options. ~30% TCO savings vs AWS/GCP. Data sovereignty guaranteed.", stat: "99.9% SLA" },
            { title: "White-Label Apps", desc: "Production-ready passenger, driver, and operator apps. Customizable branding. iOS, Android, web.", stat: "Rapid deployment" },
            { title: "On-Premise Security", desc: "All systems deployable on-premise for full data sovereignty. No external cloud dependency.", stat: "Full control" },
          ].map((t, i) => (
            <div key={i} style={{ background: C.body, borderRadius: '1.875rem', padding: "24px 20px", transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <h4 style={{ fontSize: 17, fontWeight: 900, margin: "0 0 8px", fontFamily: F.headline, textTransform: 'uppercase', letterSpacing: 'calc(1em / 50)' }}>{t.title}</h4>
              <p style={{ fontSize: 13, color: C.black, lineHeight: 1.5, margin: "0 0 12px" }}>{t.desc}</p>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.red, background: "#FFF0ED", display: "inline-block", padding: "4px 10px", borderRadius: 6 }}>{t.stat}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section style={{ background: C.red, padding: mob ? "48px 0" : "80px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: F.headline, fontSize: mob ? 28 : 44, fontWeight: 900, color: "white", margin: "0 0 16px" }}>Ready to accelerate Rwanda's smart mobility?</h2>
          <p style={{ fontSize: mob ? 15 : 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: "0 0 32px" }}>Let's discuss how Yango City Transit can complement Kigali's existing smart city investments and scale Rwanda's transport vision. We start with a free assessment.</p>
          <a href="https://tech.yango.com/" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: "white", color: C.red, padding: mob ? "14px 32px" : "16px 48px", borderRadius: '1.5rem', fontWeight: 800,
            fontSize: mob ? 15 : 17, textDecoration: "none", fontFamily: F.headline, cursor: "pointer",
            minHeight: 48,
          }}>Get in Touch →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.black, padding: "40px 0 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 16 }}>
            <img src="https://avatars.mds.yandex.net/get-lpc/14837328/21641dca-3288-4eeb-8d99-81f8cb31a763/orig" alt="Yango Tech" style={{ height: 26, width: "auto", filter: "invert(1)" }} />
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>Prepared for the City of Kigali, MININFRA and Ecofleet Solutions — building on the Tap&nbsp;&amp;&nbsp;Go foundation.</p>
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 Yango Tech. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
