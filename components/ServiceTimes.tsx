"use client";

import { Clock3 } from "lucide-react";
import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site-config";

export default function ServiceTimes() {
  return (
    <section id="worship" className="relative py-24 sm:py-32 bg-ocean-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-accent eyebrow uppercase text-ocean-500 text-xs">
            Worship Schedule
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-navy-900 font-semibold">
            Worship Schedule
          </h2>
          <p className="mt-5 text-navy-700/75 text-base sm:text-lg">
            Join us anytime — come as you are and worship with us.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-white p-8 card-shadow ring-1 ring-navy-900/5 hover:-translate-y-2 transition-transform duration-500">
                <div className="w-11 h-11 rounded-full bg-navy-900 flex items-center justify-center">
                  <Clock3 className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="mt-6 font-display text-lg text-navy-900">
                  {s.name}
                </h3>
                <p className="mt-2 font-accent text-2xl text-ocean-600 font-semibold">
                  {s.time}
                </p>
                <p className="mt-1 text-navy-700/60 text-sm">{s.day}</p>
                <div className="mt-4 h-px bg-navy-900/8" />
                <p className="mt-4 text-navy-700/70 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
