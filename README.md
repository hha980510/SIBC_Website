# Southern Illinois Church Website

Website for Southern Illinois Church, part of Life Word Mission U.S.
Conference. Built with Next.js (App Router), Tailwind CSS v4, Framer Motion,
and Lenis smooth scroll, and ready to deploy on Vercel out of the box.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to preview.

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

## Bible Seminar RSVP email notifications (optional)

By default, RSVP submissions are just logged on the server. If you'd like
an email every time someone signs up, sign up for a free
[Resend](https://resend.com) account, then add these to your Vercel
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
4. (Optional) Add the RSVP email environment variables above.
5. To connect a custom domain, use the Domains tab in your Vercel project.

## Project structure

```
app/                 Routes, layout, global styles, RSVP API route
components/           Section components (Hero, About, ServiceTimes ...)
lib/site-config.ts    Church info (most edits happen here)
public/images/         Logo images
```
