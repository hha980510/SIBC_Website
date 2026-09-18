"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const markY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden hero-gradient"
    >
      {/* organic floating light blobs */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-ocean-100/40 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl animate-float" />
        <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] rounded-full bg-gold-400/20 blur-3xl animate-float-slow" />
      </motion.div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-accent eyebrow uppercase text-ocean-50/90 text-[11px] sm:text-xs mb-6"
        >
          {siteConfig.orgName}
        </motion.p>

        <motion.div
          style={{ y: markY, scale: markScale, rotate: markRotate }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative w-32 h-32 sm:w-40 sm:h-40 mb-8 animate-float"
        >
          <div className="absolute inset-0 rounded-full bg-white/25 blur-2xl scale-90" />
          <Image
            src="/images/logo-mark.png"
            alt="Life Word Mission logo"
            fill
            sizes="160px"
            className="object-contain rounded-3xl shadow-[0_20px_60px_-15px_rgba(8,21,43,0.6)]"
            priority
          />
        </motion.div>

        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-white text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-balance drop-shadow-[0_4px_30px_rgba(8,21,43,0.35)]"
          >
            {siteConfig.churchName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-white/90 text-lg sm:text-xl font-light"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#seminar"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#seminar")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold px-7 py-3.5 text-sm tracking-wide shadow-[0_14px_40px_-10px_rgba(201,162,39,0.8)] transition-all duration-300 hover:-translate-y-0.5"
            >
              RSVP for Bible Seminar
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full border border-white/50 text-white font-medium px-7 py-3.5 text-sm tracking-wide hover:bg-white/10 transition-all duration-300"
            >
              About Us
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/80"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
