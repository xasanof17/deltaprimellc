import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    console.log("[v0] 📧 Sending driver application email...");

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      cdl,
      experience,
      position,
      startDate,
      hearAbout,
      message,
    } = body;

    // Format position label
    const positionLabels: Record<string, string> = {
      "company-driver": "Company Driver",
      "lease-to-own": "Lease to Own",
      "owner-operator": "Owner Operator",
    };

    // Format hear about label
    const hearAboutLabels: Record<string, string> = {
      "one-of-our-drivers": "One of our drivers",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      "job-board": "Job Board",
      "google-search": "Google Search",
      referral: "Referral",
      other: "Other",
    };

    // Format start date
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    // Create beautiful HTML email template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Driver Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; text-align: center;">
                🚛 New Driver Application
              </h1>
              <p style="margin: 10px 0 0; color: #E0E7FF; font-size: 14px; text-align: center;">
                Received on ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </td>
          </tr>

          <!-- Personal Information -->
          <tr>
            <td style="padding: 30px 40px;">
              <h2 style="margin: 0 0 20px; color: #1E3A8A; font-size: 20px; font-weight: 600; border-bottom: 2px solid #FFA500; padding-bottom: 10px;">
                👤 Personal Information
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px; width: 140px; vertical-align: top;">
                    <strong>Full Name:</strong>
                  </td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    ${firstName} ${lastName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px; vertical-align: top;">
                    <strong>Email:</strong>
                  </td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    <a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px; vertical-align: top;">
                    <strong>Phone:</strong>
                  </td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    <a href="tel:${countryCode}${phone}" style="color: #2563EB; text-decoration: none;">${countryCode} ${phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CDL & Experience -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1E3A8A; font-size: 20px; font-weight: 600; border-bottom: 2px solid #FFA500; padding-bottom: 10px;">
                📋 CDL & Experience
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px; width: 140px; vertical-align: top;">
                    <strong>CDL Number:</strong>
                  </td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    <span style="font-family: 'Courier New', monospace; background-color: #F3F4F6; padding: 4px 8px; border-radius: 4px; font-weight: 600;">
                      ${cdl}
                    </span>
                    <a href="https://tpr.fmcsa.dot.gov/check" target="_blank" style="margin-left: 10px; color: #2563EB; text-decoration: none; font-size: 12px;">
                      Verify CDL →
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px; vertical-align: top;">
                    <strong>Experience:</strong>
                  </td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    ${experience} ${Number.parseInt(experience) === 1 ? "year" : "years"}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Position & Availability -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1E3A8A; font-size: 20px; font-weight: 600; border-bottom: 2px solid #FFA500; padding-bottom: 10px;">
                💼 Position & Availability
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px; width: 140px; vertical-align: top;">
                    <strong>Position:</strong>
                  </td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    <span style="background-color: #FFF7ED; color: #FFA500; padding: 4px 12px; border-radius: 12px; font-weight: 600; font-size: 13px;">
                      ${positionLabels[position] || position}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px; vertical-align: top;">
                    <strong>Start Date:</strong>
                  </td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    ${formatDate(startDate)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px; vertical-align: top;">
                    <strong>Heard About Us:</strong>
                  </td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    ${hearAboutLabels[hearAbout] || hearAbout}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            message
              ? `
          <!-- Additional Information -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1E3A8A; font-size: 20px; font-weight: 600; border-bottom: 2px solid #FFA500; padding-bottom: 10px;">
                💬 Additional Information
              </h2>
              <div style="padding: 15px; background-color: #F9FAFB; border-left: 4px solid #FFA500; border-radius: 4px;">
                <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${message}
                </p>
              </div>
            </td>
          </tr>
          `
              : ""
          }

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #F9FAFB; border-radius: 0 0 8px 8px; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0 0 10px; color: #6B7280; font-size: 13px; text-align: center;">
                <strong>Next Steps:</strong> Review the application and contact the candidate within 48 hours.
              </p>
              <p style="margin: 0; color: #9CA3AF; font-size: 12px; text-align: center;">
                Delta Prime LLC | Global Logistics | Tech Enabled | On Time Every Time
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Plain text fallback
    const textContent = `
New Driver Application

Personal Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${countryCode} ${phone}

CDL & Experience:
- CDL Number: ${cdl}
- Experience: ${experience} years

Position & Availability:
- Position: ${positionLabels[position] || position}
- Start Date: ${formatDate(startDate)}
- Heard About Us: ${hearAboutLabels[hearAbout] || hearAbout}

${message ? `Additional Information:\n${message}` : ""}

---
Delta Prime LLC | Global Logistics | Tech Enabled | On Time Every Time
    `;

    // Send email using Gmail SMTP
    await sendEmail({
      to: process.env.SMTP_USER || "xasanof17@gmail.com", // Send to your Gmail
      subject: `New Driver Application from ${firstName} ${lastName}`,
      html: htmlContent,
      text: textContent,
      replyTo: email,
    });

    console.log("[v0] ✅ Driver application email sent successfully!");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[v0] ❌ Error in send-driver-application API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
