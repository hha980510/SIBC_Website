"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, CheckCircle2, Loader2 } from "lucide-react";
import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "loading" | "success" | "error";

export default function BibleSeminar() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Something went wrong on our end.");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("We couldn't submit your RSVP. Please try again in a moment.");
    }
  }

  return (
    <section
      id="seminar"
      className="relative py-24 sm:py-32 bg-navy-950 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 hero-gradient opacity-10" />
      <div className="pointer-events-none absolute top-1/4 -left-32 w-[420px] h-[420px] rounded-full bg-ocean-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 -right-32 w-[420px] h-[420px] rounded-full bg-gold-500/15 blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-accent eyebrow uppercase text-gold-400 text-xs">
            {siteConfig.seminar.title}
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-white font-semibold">
            {siteConfig.seminar.subtitle}
          </h2>
          <p className="mt-5 text-ocean-100/75 text-base sm:text-lg leading-relaxed">
            {siteConfig.seminar.description}
          </p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="rounded-[2rem] bg-white/5 ring-1 ring-white/10 backdrop-blur-sm p-8 sm:p-10 h-full">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-gold-500/15 flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-gold-400" />
                  </span>
                  <div>
                    <p className="text-ocean-100/60 text-xs uppercase tracking-widest">
                      Date &amp; Time
                    </p>
                    <p className="mt-1 text-white font-medium">
                      {siteConfig.seminar.dateLabel}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-gold-500/15 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold-400" />
                  </span>
                  <div>
                    <p className="text-ocean-100/60 text-xs uppercase tracking-widest">
                      Location
                    </p>
                    <p className="mt-1 text-white font-medium">
                      {siteConfig.seminar.location}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-gold-500/15 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gold-400" />
                  </span>
                  <div>
                    <p className="text-ocean-100/60 text-xs uppercase tracking-widest">
                      Who Can Attend
                    </p>
                    <p className="mt-1 text-white font-medium">
                      Open to everyone — members and guests welcome
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <div className="relative rounded-[2rem] bg-white p-8 sm:p-10 card-shadow overflow-hidden">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <CheckCircle2 className="w-14 h-14 text-ocean-500" />
                  <h3 className="mt-6 font-display text-2xl text-navy-900">
                    Your RSVP has been received
                  </h3>
                  <p className="mt-3 text-navy-700/70">
                    Thank you for signing up. We&rsquo;ll be in touch soon
                    with more details about the seminar.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-sm text-ocean-600 underline underline-offset-4"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="text-sm text-navy-800 font-medium">
                      Full Name <span className="text-gold-600">*</span>
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      className="mt-2 w-full rounded-xl border border-navy-900/10 bg-ocean-50 px-4 py-3 text-navy-900 placeholder:text-navy-900/30 focus:outline-none focus:ring-2 focus:ring-ocean-400 transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-navy-800 font-medium">
                      Phone <span className="text-gold-600">*</span>
                    </label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="(618) 000-0000"
                      className="mt-2 w-full rounded-xl border border-navy-900/10 bg-ocean-50 px-4 py-3 text-navy-900 placeholder:text-navy-900/30 focus:outline-none focus:ring-2 focus:ring-ocean-400 transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-navy-800 font-medium">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      className="mt-2 w-full rounded-xl border border-navy-900/10 bg-ocean-50 px-4 py-3 text-navy-900 placeholder:text-navy-900/30 focus:outline-none focus:ring-2 focus:ring-ocean-400 transition-shadow"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-navy-800 font-medium">
                      Number of Guests
                    </label>
                    <input
                      name="guests"
                      type="number"
                      min={1}
                      defaultValue={1}
                      className="mt-2 w-full sm:w-40 rounded-xl border border-navy-900/10 bg-ocean-50 px-4 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-ocean-400 transition-shadow"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-navy-800 font-medium">
                      Message (optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Any questions or notes you'd like to share."
                      className="mt-2 w-full rounded-xl border border-navy-900/10 bg-ocean-50 px-4 py-3 text-navy-900 placeholder:text-navy-900/30 focus:outline-none focus:ring-2 focus:ring-ocean-400 transition-shadow resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="sm:col-span-2 text-sm text-red-500">{errorMsg}</p>
                  )}

                  <div className="sm:col-span-2 mt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 hover:bg-navy-800 disabled:opacity-60 text-white font-semibold px-8 py-3.5 text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-[0_14px_40px_-14px_rgba(15,34,66,0.6)]"
                    >
                      {status === "loading" && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      Submit RSVP
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
