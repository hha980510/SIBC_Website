import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RsvpPayload = {
  name?: string;
  phone?: string;
  email?: string;
  guests?: string;
  message?: string;
};

export async function POST(request: Request) {
  let data: RsvpPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (data.name ?? "").toString().trim();
  const phone = (data.phone ?? "").toString().trim();
  const email = (data.email ?? "").toString().trim();
  const guests = (data.guests ?? "1").toString().trim();
  const message = (data.message ?? "").toString().trim();

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------------------
  // Email notifications (optional)
  // Set RESEND_API_KEY, RSVP_TO_EMAIL, and RSVP_FROM_EMAIL in your Vercel
  // project's environment variables to get an email every time someone
  // submits an RSVP. (https://resend.com has a free tier that's plenty.)
  // If these aren't set, submissions are just logged to the console.
  // ---------------------------------------------------------------------
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RSVP_TO_EMAIL = process.env.RSVP_TO_EMAIL;
  const RSVP_FROM_EMAIL = process.env.RSVP_FROM_EMAIL ?? "onboarding@resend.dev";

  if (RESEND_API_KEY && RSVP_TO_EMAIL) {
    try {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: RSVP_FROM_EMAIL,
          to: RSVP_TO_EMAIL,
          reply_to: email || undefined,
          subject: `[Bible Seminar RSVP] ${name}`,
          html: `
            <h2>Bible Seminar RSVP</h2>
            <p><b>Name:</b> ${escapeHtml(name)}</p>
            <p><b>Phone:</b> ${escapeHtml(phone)}</p>
            <p><b>Email:</b> ${escapeHtml(email || "-")}</p>
            <p><b>Guests:</b> ${escapeHtml(guests)}</p>
            <p><b>Message:</b><br/>${escapeHtml(message || "-")}</p>
          `,
        }),
      });

      if (!emailRes.ok) {
        console.error("Resend email failed", await emailRes.text());
      }
    } catch (err) {
      console.error("Resend email error", err);
    }
  } else {
    console.log("[RSVP] New submission (email not configured):", {
      name,
      phone,
      email,
      guests,
      message,
    });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
