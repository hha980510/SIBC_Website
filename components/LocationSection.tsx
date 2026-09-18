"use client";

import { MapPin, Navigation, ParkingSquare } from "lucide-react";
import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site-config";

export default function LocationSection() {
  const mapSrc = `https://www.google.com/maps?q=${siteConfig.address.mapsQuery}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.address.mapsQuery}`;

  return (
    <section id="location" className="relative py-24 sm:py-32 bg-ocean-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-accent eyebrow uppercase text-ocean-500 text-xs">
            Location
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-navy-900 font-semibold">
            Visit Us
          </h2>
          <p className="mt-5 text-navy-700/75 text-base sm:text-lg">
            We&rsquo;d love to welcome you in person — come visit anytime.
          </p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-5 gap-6 lg:gap-10">
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-[2rem] overflow-hidden card-shadow ring-1 ring-navy-900/5 h-[360px] sm:h-[440px]">
              <iframe
                title="Church location map"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-2">
            <div className="h-full rounded-[2rem] bg-navy-950 p-8 sm:p-10 text-white flex flex-col justify-between card-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gold-500/15 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="mt-6 font-display text-xl">
                  {siteConfig.churchName}
                </h3>
                <p className="mt-3 text-ocean-100/80 leading-relaxed">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                </p>

                <div className="mt-8 flex gap-4 items-start text-ocean-100/70 text-sm">
                  <ParkingSquare className="w-5 h-5 shrink-0 text-gold-400/80" />
                  <p>On-site parking is available.</p>
                </div>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold px-6 py-3.5 text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
