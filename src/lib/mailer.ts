import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(email: string, token: string) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  if (!host || !Number.isInteger(port) || !user || !pass || !from) {
    throw new Error("SMTP configuration is incomplete.");
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not configured.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  const resetUrl = new URL(`/admin/reset-password/${encodeURIComponent(token)}`, baseUrl).toString();

  await transporter.sendMail({
    from,
    to: email,
    subject: "Reset your Ad Vibe admin password",
    text: `Use this link within 30 minutes to reset your admin password: ${resetUrl}`,
    html: `<p>Use this link within 30 minutes to reset your admin password:</p><p><a href="${resetUrl}">Reset password</a></p>`,
  });
}
