import crypto from "node:crypto";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUBJECTS = {
  BOOKING_CREATED: "New booking",
  BOOKING_RESCHEDULED: "Booking rescheduled",
  BOOKING_CANCELLED: "Booking cancelled",
};

function verifySignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  const given = signatureHeader.replace(/^sha256=/, "");
  if (expected.length !== given.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(given));
}

function formatWhen(payload) {
  const start = payload?.startTime || payload?.payload?.startTime;
  const end = payload?.endTime || payload?.payload?.endTime;
  if (!start) return "Unknown time";
  const fmt = (iso) =>
    new Date(iso).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  return end ? `${fmt(start)} → ${fmt(end)}` : fmt(start);
}

function buildEmailHtml(event, body) {
  const p = body.payload || body;
  const attendee = p.attendees?.[0] || {};
  const rows = [
    ["Event", event],
    ["Type", p.eventTitle || p.title || "—"],
    ["When", formatWhen(body)],
    ["Name", attendee.name || "—"],
    ["Email", attendee.email || "—"],
    ["Phone", attendee.phoneNumber || p.responses?.phone?.value || "—"],
    ["Notes", p.additionalNotes || p.responses?.notes?.value || "—"],
    ["Booking ID", p.uid || p.bookingId || "—"],
  ];

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:120px;">${k}</td><td style="padding:8px 12px;color:#111827;font-size:14px;">${String(
          v
        ).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]))}</td></tr>`
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#F3F4F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
      <div style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E5E7EB;">
        <div style="background:#0B132B;padding:24px;">
          <div style="color:#7DD3FC;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;font-weight:600;">Platypus Outdoor Solutions</div>
          <div style="color:#fff;font-size:22px;font-weight:700;margin-top:6px;">${SUBJECTS[event] || event}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
      </div>
      <div style="color:#9CA3AF;font-size:12px;text-align:center;margin-top:16px;">Sent by your website's Cal.com webhook.</div>
    </div>
  </body></html>`;
}

export async function POST(req) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  const rawBody = await req.text();
  const signature = req.headers.get("x-cal-signature-256");

  if (!verifySignature(rawBody, signature, secret)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = body.triggerEvent;
  if (!SUBJECTS[event]) {
    return Response.json({ ok: true, ignored: event });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || "Platypus <onboarding@resend.dev>";

  if (!apiKey || !ownerEmail) {
    console.warn("[cal-webhook] missing RESEND_API_KEY or OWNER_EMAIL", {
      event,
    });
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      subject: `${SUBJECTS[event]} — ${body.payload?.eventTitle || "Cal.com"}`,
      html: buildEmailHtml(event, body),
    });
    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[cal-webhook] email send failed", err);
    return Response.json({ ok: true, delivered: false }, { status: 200 });
  }
}
