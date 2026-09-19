"use client";

import { Compass, Users2, Shield, Heart } from "lucide-react";
import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site-config";

const icons = [Compass, Users2, Shield, Heart];

export default function Ministries() {
  return (
    <section id="ministries" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <div className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-ocean-100/60 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-accent eyebrow uppercase text-ocean-500 text-xs">
            Ministries
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-navy-900 font-semibold">
            Ministries
          </h2>
          <p className="mt-5 text-navy-700/75 text-base sm:text-lg">
            Growing together through ministries for every generation and need.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.ministries.map((m, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={m.title} delay={i * 0.08}>
                <div className="group relative h-full rounded-3xl p-8 bg-ocean-50 hover:bg-gradient-to-br hover:from-navy-800 hover:to-navy-950 ring-1 ring-navy-900/5 transition-all duration-500 overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-ocean-600" />
                    </div>
                    <h3 className="mt-6 font-display text-xl text-navy-900 group-hover:text-white transition-colors duration-500">
                      {m.title}
                    </h3>
                    <p className="mt-3 text-navy-700/75 group-hover:text-ocean-100/80 text-sm leading-relaxed transition-colors duration-500">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
