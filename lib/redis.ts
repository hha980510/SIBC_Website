import { Redis } from "@upstash/redis";

// Lazily constructed so that `next build` and local `next dev` (without
// Redis env vars set) don't crash at import time.
//
// The Vercel Marketplace integration for Upstash/Vercel KV names its
// variables KV_REST_API_URL / KV_REST_API_TOKEN rather than the "raw"
// Upstash names (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN), so we
// accept either pair depending on how the store was connected.
let cached: Redis | null = null;

export function getRedis(): Redis {
  if (cached) return cached;

  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Missing Redis REST credentials. Add UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL / KV_REST_API_TOKEN, if connected via the Vercel Marketplace integration) in your Vercel project's Environment Variables, or .env.local for local dev."
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
