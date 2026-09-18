import { Redis } from "@upstash/redis";

// Lazily constructed so that `next build` and local `next dev` (without
// Upstash env vars set) don't crash at import time. Vercel will have
// UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN set once the Upstash
// integration is connected.
let cached: Redis | null = null;

export function getRedis(): Redis {
  if (cached) return cached;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN. Add them in your Vercel project's Environment Variables (or .env.local for local dev)."
    );
  }

  cached = new Redis({ url, token });
  return cached;
}

export const RSVP_LIST_KEY = "rsvp:submissions";

export type RsvpRecord = {
  id: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  message: string;
  createdAt: string; // ISO timestamp
};
