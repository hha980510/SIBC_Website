# Southern Illinois Church Website

Website for Southern Illinois Church, part of Life Word Mission U.S.
Conference. Built with Next.js (App Router), Tailwind CSS v4, Framer Motion,
and Lenis smooth scroll, and ready to deploy on Vercel out of the box.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to preview. For the RSVP form and `/admin` to
work locally, copy `.env.example` to `.env.local` and fill in the values
described below.

## Editing content

Nearly all of the site's text (church name, address, service times,
ministries, seminar details, contact info, the featured verse, etc.) lives
in one place:

```
lib/site-config.ts
```

Items marked `TODO` are placeholder examples — please replace them with
your real information before launch.

Logo images live in `public/images/`.

## RSVP storage & the /admin dashboard

Bible Seminar RSVP submissions are saved to the Upstash Redis database
connected to this project. In Vercel, that connection already sets:

| Variable | Description |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | Upstash REST API URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash REST API token |

For local development, copy the same two values into `.env.local` (see
`.env.example`).

Visit `/admin` to see submissions (name, phone, email, guest count,
message, submitted time), plus quick stats and a CSV export button. The
page is protected by a password — set an `ADMIN_PASSWORD` environment
variable (in Vercel, and in `.env.local` for local dev) and use that to
sign in at `/admin`. Signing in sets a 7‑day httpOnly cookie; use the
"Sign Out" button to clear it.

If `ADMIN_PASSWORD` isn't set, `/admin` will show a reminder instead of a
login form. If the Upstash env vars aren't set, `/admin` will still let you
sign in but will show an error where the submissions table would be.

## Bible Seminar RSVP email notifications (optional)

By default, RSVP submissions are saved to Redis (see above) but no email
is sent. If you'd like an email every time someone signs up, sign up for a
free [Resend](https://resend.com) account, then add these to your Vercel
project's Environment Variables:

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | API key from Resend |
| `RSVP_TO_EMAIL` | Where RSVP notifications should be sent |
| `RSVP_FROM_EMAIL` | Sender address (defaults to `onboarding@resend.dev`) |

See `.env.example` — for local development, copy it to `.env.local` and
fill in your values.

## Deploying to Vercel

1. Push this repository to GitHub.
2. On [vercel.com](https://vercel.com), choose New Project and select this
   repository.
3. The Next.js framework preset is detected automatically — no extra
   config needed. Click Deploy.
4. Make sure `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and
   `ADMIN_PASSWORD` are set in the project's Environment Variables (the
   first two are set automatically once the Upstash integration is
   connected). Add the optional Resend variables above too, if wanted.
5. To connect a custom domain, use the Domains tab in your Vercel project.

## Project structure

```
app/                  Routes, layout, global styles
app/api/rsvp/          RSVP form submission API (saves to Redis)
app/admin/              Password-protected RSVP dashboard
components/            Section components (Hero, About, ServiceTimes ...)
lib/site-config.ts     Church info (most edits happen here)
lib/redis.ts            Upstash Redis client helper
lib/admin-auth.ts       /admin password check + session cookie
public/images/          Logo images
```
