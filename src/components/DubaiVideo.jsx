import React from "react";
import { C, F } from "../../yango-city-transit-rwanda.jsx";

const DUBAI_BASE = "https://res.cloudinary.com/dc99897dw/video/upload";
const DUBAI_PUBLIC_ID = "Yango%20Dubai%20Bus%20Integration";

/**
 * DubaiVideo — Amendment 2.
 *
 * Renders the "Yango Dubai Bus Integration" cinematic loop. Used in three places:
 *  - Home: muted, no controls, autoplay loop. Hero proof element.
 *  - Citizens: muted autoplay, no controls. Inline "this is what citizens see".
 *  - Platform: with controls, paused-by-default acceptable. Part of deployment grid.
 *
 * Variants set by `variant` prop: 'hero' | 'inline' | 'platform'.
 */
export function DubaiVideo({ variant = "hero", caption, label, mob = false }) {
  const showControls = variant === "platform";
  // Original asset is a portrait iPhone screen recording — 880 × 1912 (≈ 9:19.5).
  // We deliberately keep that ratio so the citizen-app UI is fully visible, and
  // cap max-width per variant so the portrait video reads as a phone-shaped
  // element rather than dominating the page on desktop.
  const w = variant === "platform" ? 800 : variant === "inline" ? 600 : 720;
  const videoUrl = `${DUBAI_BASE}/f_auto,q_auto,w_${w}/${DUBAI_PUBLIC_ID}.mp4`;
  const posterUrl = `${DUBAI_BASE}/so_0,f_jpg,q_auto,w_${w}/${DUBAI_PUBLIC_ID}.jpg`;
  const maxW = variant === "platform" ? 420 : variant === "inline" ? 340 : 380;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: maxW,
        margin: "0 auto",
        aspectRatio: "880 / 1912",
        borderRadius: variant === "hero" ? "1.875rem" : "1.25rem",
        overflow: "hidden",
        background: C.black,
        position: "relative",
        boxShadow: variant === "hero" ? "0 24px 60px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        controls={showControls}
        poster={posterUrl}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "contain",
        }}
        aria-label={label || "Yango Dubai bus integration — public buses live in the Yango consumer app"}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Tag overlay — top-left */}
      {variant !== "platform" && (
        <div
          style={{
            position: "absolute",
            top: mob ? 12 : 18,
            left: mob ? 12 : 18,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: `1px solid ${C.red}40`,
            color: "white",
            padding: mob ? "5px 10px" : "6px 14px",
            borderRadius: 999,
            fontSize: mob ? 10 : 11,
            fontWeight: 700,
            fontFamily: F.body,
            letterSpacing: "0.1em",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ width: 6, height: 6, background: C.red, borderRadius: "50%", display: "inline-block" }} />
          LIVE IN DUBAI
        </div>
      )}

      {/* Caption — only if explicit */}
      {caption && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: mob ? "20px 14px 14px" : "40px 24px 22px",
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
            color: "white",
            fontFamily: F.body,
            fontSize: mob ? 12 : 14,
            lineHeight: 1.5,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
