"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "#about", label: "About" },
  { href: "#worship", label: "Worship" },
  { href: "#ministries", label: "Ministries" },
  { href: "#location", label: "Location" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav-scrolled shadow-[0_8px_30px_-12px_rgba(15,34,66,0.35)]" : "glass-nav"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-[72px]">
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="flex items-center gap-3 group"
        >
          <span
            className={`relative w-10 h-10 rounded-xl overflow-hidden ring-1 bg-gradient-to-br from-navy-800 to-navy-950 transition-colors duration-500 ${
              scrolled ? "ring-navy-800/15" : "ring-white/40"
            }`}
          >
            <Image
              src="/images/logo-mark.png"
              alt={`${siteConfig.churchName} logo`}
              fill
              sizes="40px"
              className="object-contain p-1.5 group-hover:scale-110 transition-transform duration-500"
              priority
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className={`font-display font-semibold text-[15px] sm:text-base transition-colors duration-500 ${
                scrolled ? "text-navy-900" : "text-white"
              }`}
            >
              {siteConfig.churchName}
            </span>
            <span
              className={`font-accent text-[10px] tracking-[0.18em] uppercase transition-colors duration-500 ${
                scrolled ? "text-ocean-500" : "text-ocean-100/80"
              }`}
            >
              {siteConfig.orgName}
            </span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`relative text-[14px] font-medium tracking-wide transition-colors duration-300 hover:text-gold-500 ${
                scrolled ? "text-navy-800" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#seminar"
            onClick={(e) => handleClick(e, "#seminar")}
            className="rounded-full bg-gold-500 hover:bg-gold-600 text-navy-950 text-[13px] font-semibold px-5 py-2.5 tracking-wide transition-all duration-300 shadow-[0_8px_24px_-8px_rgba(201,162,39,0.7)] hover:shadow-[0_10px_30px_-6px_rgba(201,162,39,0.85)] hover:-translate-y-0.5"
          >
            Seminar RSVP
          </a>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-navy-900" : "text-white"
          }`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-navy-900/5"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="py-3 text-navy-800 font-medium border-b border-navy-900/5 last:border-none"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#seminar"
                onClick={(e) => handleClick(e, "#seminar")}
                className="mt-3 text-center rounded-full bg-gold-500 text-navy-950 font-semibold px-5 py-3"
              >
                Seminar RSVP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
