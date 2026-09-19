"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { useIsCoarsePointer } from "@/hooks/useIsCoarsePointer";

export default function WelcomeVerse() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // A large blur() layer that also tracks scroll is expensive to
  // repaint on phones; keep it static there instead of parallaxing.
  const isCoarse = useIsCoarsePointer();
  const glowStyle = isCoarse ? undefined : { x: glowX };

  return (
    <section
      ref={ref}
      id="word"
      className="relative py-28 sm:py-36 bg-navy-950 overflow-hidden"
    >
      <motion.div
        style={glowStyle}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-ocean-600/25 blur-[60px] sm:blur-[120px]"
      />
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center"
      >
        <span className="font-accent eyebrow uppercase text-gold-400 text-xs">
          The Word
        </span>
        <p className="mt-8 font-display text-white text-2xl sm:text-3xl lg:text-4xl leading-relaxed sm:leading-relaxed text-balance">
          &ldquo;{siteConfig.verse.text}&rdquo;
        </p>
        <p className="mt-6 text-ocean-200 text-sm sm:text-base tracking-[0.2em] uppercase">
          {siteConfig.verse.ref}
        </p>
        <div className="mt-10 h-px w-16 mx-auto bg-gold-400/60" />
      </motion.div>
    </section>
  );
}
