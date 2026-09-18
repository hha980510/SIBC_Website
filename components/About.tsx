"use client";

import { BookOpen, HandHeart, Globe2 } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site-config";

const values = [
  {
    icon: BookOpen,
    title: "The Word",
    desc: "Standing firmly on Scripture as the foundation for how we live.",
  },
  {
    icon: HandHeart,
    title: "Prayer",
    desc: "A community drawing close to God through earnest, united prayer.",
  },
  {
    icon: Globe2,
    title: "Missions",
    desc: "Carrying the Word of Life to the ends of the earth.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="font-accent eyebrow uppercase text-ocean-500 text-xs">
              About Us
            </span>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-navy-900 font-semibold text-balance">
              Welcome to {siteConfig.churchName}
            </h2>
            <p className="mt-6 text-navy-700/80 text-base sm:text-lg leading-relaxed">
              {siteConfig.churchName} carries the vision of{" "}
              {siteConfig.orgName}, sharing the Word of Life and growing
              together as a faith community across every generation.
              Whether this is your first time visiting or you&rsquo;ve been
              with us for years, you are warmly welcome here.
            </p>
            <p className="mt-4 text-navy-700/80 text-base sm:text-lg leading-relaxed">
              Through the Word, prayer, fellowship, and service, we long to
              see every person built up in Christ — reaching our community
              and the nations with a heart for missions.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] hero-gradient opacity-20 blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden card-shadow ring-1 ring-navy-900/5 aspect-[4/3]">
                <Image
                  src="/images/logo-full.jpg"
                  alt={siteConfig.churchName}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 sm:mt-28 grid sm:grid-cols-3 gap-6 sm:gap-8">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.12}>
              <div className="group h-full rounded-3xl bg-ocean-50 hover:bg-navy-900 border border-navy-900/5 p-8 transition-colors duration-500 card-shadow">
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-gold-500 flex items-center justify-center transition-colors duration-500 shadow-sm">
                  <v.icon className="w-6 h-6 text-ocean-600 group-hover:text-navy-950 transition-colors duration-500" />
                </div>
                <h3 className="mt-6 font-display text-xl text-navy-900 group-hover:text-white transition-colors duration-500">
                  {v.title}
                </h3>
                <p className="mt-3 text-navy-700/75 group-hover:text-ocean-100/80 text-sm leading-relaxed transition-colors duration-500">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
