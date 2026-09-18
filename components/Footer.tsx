import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-navy-950 text-white pt-20 pb-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-gradient opacity-[0.06]" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="relative w-11 h-11 rounded-xl overflow-hidden ring-1 ring-white/15">
                <Image
                  src="/images/logo-mark.png"
                  alt={`${siteConfig.churchName} logo`}
                  fill
                  sizes="44px"
                  className="object-cover scale-125"
                />
              </span>
              <div className="leading-tight">
                <p className="font-display font-semibold">
                  {siteConfig.churchName}
                </p>
                <p className="font-accent text-[11px] tracking-[0.16em] uppercase text-ocean-200/70">
                  {siteConfig.orgName}
                </p>
              </div>
            </div>
            <p className="mt-6 text-ocean-100/60 text-sm leading-relaxed max-w-xs">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <p className="font-accent text-xs tracking-[0.2em] uppercase text-ocean-200/60">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ocean-100/75">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" />
                <span>{siteConfig.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-gold-400" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-gold-400" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-accent text-xs tracking-[0.2em] uppercase text-ocean-200/60">
              Menu
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ocean-100/75">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#worship" className="hover:text-white transition-colors">Worship</a></li>
              <li><a href="#ministries" className="hover:text-white transition-colors">Ministries</a></li>
              <li><a href="#seminar" className="hover:text-white transition-colors">Seminar RSVP</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">Location</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ocean-100/50">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.churchName}. All
            rights reserved.
          </p>
          <p className="font-accent italic">
            {siteConfig.verse.ref} &mdash; {siteConfig.verse.text}
          </p>
        </div>
      </div>
    </footer>
  );
}
