import nodemailer from "nodemailer";

// Create reusable transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  try {
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: `"Delta Prime LLC" <${process.env.SMTP_USER}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      text,
      html,
      replyTo,
    });

    console.log("[v0] ✅ Email sent successfully! Message ID:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("[v0] ❌ Failed to send email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
