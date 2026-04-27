import React, { useEffect, useRef } from "react";

/**
 * FastVideo — drop-in replacement for <video> that plays at 1.5× by default.
 *
 * Why: UI screen recordings at real-time speed often read as static
 * screenshots to viewers who don't realise they're looking at a live demo.
 * A modest speed bump signals interactivity and keeps attention without
 * making the content feel rushed.
 *
 * iOS Safari has a habit of resetting playbackRate at certain points in the
 * video lifecycle, so we re-apply on every relevant event.
 *
 * Usage: <FastVideo autoPlay muted loop playsInline rate={1.5}>...</FastVideo>
 */
export function FastVideo({ rate = 1.5, children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const apply = () => {
      try {
        v.playbackRate = rate;
      } catch {
        // some browsers throw if rate set before metadata loaded — safe to ignore
      }
    };

    apply();
    v.addEventListener("loadedmetadata", apply);
    v.addEventListener("canplay", apply);
    v.addEventListener("play", apply);
    v.addEventListener("ratechange", (e) => {
      // If something else (e.g. user controls) tries to reset rate to 1, snap back.
      if (Math.abs(v.playbackRate - rate) > 0.01 && !v.dataset.userOverride) {
        apply();
      }
    });

    return () => {
      v.removeEventListener("loadedmetadata", apply);
      v.removeEventListener("canplay", apply);
      v.removeEventListener("play", apply);
    };
  }, [rate]);

  return (
    <video ref={ref} {...props}>
      {children}
    </video>
  );
}
