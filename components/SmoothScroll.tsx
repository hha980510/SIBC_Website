"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Lenis re-implements scrolling on top of the browser's native scroll,
    // driven by requestAnimationFrame. On phones this competes with the
    // OS/browser's own touch-scroll momentum and tends to read as
    // stutter rather than smoothness, so we only run it for
    // mouse/trackpad (fine pointer) devices and let touch devices use
    // native scrolling, which is already smooth on its own.
    const isCoarsePointer = window.matchMedia(
      "(pointer: coarse), (max-width: 767px)"
    ).matches;
    if (isCoarsePointer) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
