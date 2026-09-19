"use client";

import { useEffect, useState } from "react";

/**
 * True on touch phones/tablets (coarse pointer) or narrow viewports.
 *
 * Used to skip scroll-linked parallax (framer-motion `useTransform`) and
 * the Lenis smooth-scroll library on devices where they tend to fight
 * with native touch scrolling and show up as stutter/jank, rather than
 * as the intended subtle motion.
 */
export function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (max-width: 767px)");
    setIsCoarse(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isCoarse;
}
