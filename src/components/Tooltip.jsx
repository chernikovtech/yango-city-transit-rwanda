import React, { useState, useRef, useEffect } from "react";
import { C, F } from "../../yango-city-transit-rwanda.jsx";

/**
 * Tooltip component — Amendment 4.
 *
 * Renders an inline asterisk that, on hover or keyboard focus, shows a
 * disclaimer about payment-method availability. CSS-only positioning,
 * keyboard accessible (focusable button), screen-reader friendly via
 * aria-describedby.
 *
 * Usage:
 *   Pay via USSD<Asterisk />, MoMo<Asterisk />, Airtel<Asterisk />, QR<Asterisk />
 */
export function Asterisk({
  text = "Payment methods depend on local regulation, telco integrations, and partnership agreements with Tap & Go, MTN, Airtel and BNR. The available methods at launch will be confirmed during the integration phase.",
}) {
  const [open, setOpen] = useState(false);
  const id = useRef("tt-" + Math.random().toString(36).slice(2, 8)).current;

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        aria-label="Payment method availability disclaimer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          margin: 0,
          color: C.red,
          fontFamily: F.body,
          fontSize: "0.85em",
          fontWeight: 700,
          cursor: "help",
          verticalAlign: "super",
          lineHeight: 1,
          textDecoration: "none",
          borderBottom: open ? `1px dotted ${C.red}` : "none",
        }}
      >
        *
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          style={{
            position: "absolute",
            left: 0,
            top: "calc(100% + 6px)",
            zIndex: 100,
            background: C.black,
            color: "white",
            padding: "10px 14px",
            borderRadius: 8,
            fontSize: 12,
            fontFamily: F.body,
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 280,
            minWidth: 240,
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            opacity: 1,
            animation: "tt-fade-in 150ms ease-out",
            whiteSpace: "normal",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          {text}
          <span
            style={{
              position: "absolute",
              top: -5,
              left: 8,
              width: 10,
              height: 10,
              background: C.black,
              transform: "rotate(45deg)",
            }}
          />
        </span>
      )}
      <style>
        {`@keyframes tt-fade-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}
      </style>
    </span>
  );
}

/**
 * Pre-composed payment line with all four asterisks. Reused on Citizens, 
 * Methodology, Revenue Control, and anywhere the platform's day-one payment 
 * methods are listed.
 */
export function PaymentMethodsLine({ size = 14, color }) {
  const c = color || C.black;
  return (
    <span style={{ fontFamily: F.body, fontSize: size, color: c, lineHeight: 1.6 }}>
      Pay via USSD<Asterisk />, MTN MoMo<Asterisk />, Airtel Money<Asterisk />, or QR scan<Asterisk /> — no smartphone required
    </span>
  );
}
