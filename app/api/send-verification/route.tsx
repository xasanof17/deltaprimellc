import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { email, code, type } = await request.json();

    console.log(`[v0] 📧 Attempting to send verification email to: ${email}`);
    console.log(`[v0] 🔢 Code: ${code}`);
    console.log(`[v0] 📋 Type: ${type}`);

    // Check if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("[v0] ❌ RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          error: "Email service not configured",
          details:
            "RESEND_API_KEY environment variable is missing. Please add it in the Vars section.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    // Determine subject based on type
    const subject =
      type === "driver"
        ? "Verify Your Driver Application – Delta Prime LLC"
        : "Verify Your Email – Delta Prime LLC";

    // Plain text fallback
    const textContent = `Your verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.\n\nDelta Prime LLC\nGlobal Logistics | Tech Enabled | On Time Every Time`;

    // HTML email template with brand colors
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                Delta Prime LLC
              </h1>
              <p style="margin: 8px 0 0 0; color: #E0E7FF; font-size: 14px; font-weight: 500;">
                Global Logistics | Tech Enabled
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1E3A8A; font-size: 24px; font-weight: 600;">
                Verify Your Email Address
              </h2>
              
              <p style="margin: 0 0 30px 0; color: #4B5563; font-size: 16px; line-height: 1.6;">
                Thank you for choosing Delta Prime LLC. To complete your ${type === "driver" ? "driver application" : "registration"}, please use the verification code below:
              </p>
              
              <!-- Verification Code Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 30px 0;">
                <tr>
                  <td align="center" style="background-color: #FFF7ED; border: 2px dashed #FFA500; border-radius: 8px; padding: 30px;">
                    <div style="font-size: 36px; font-weight: 700; color: #1E3A8A; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                      ${code}
                    </div>
                    <p style="margin: 12px 0 0 0; color: #92400E; font-size: 13px; font-weight: 500;">
                      This code expires in 10 minutes
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Security Tips -->
              <div style="background-color: #F3F4F6; border-left: 4px solid #FFA500; padding: 16px 20px; margin: 0 0 30px 0; border-radius: 4px;">
                <p style="margin: 0 0 8px 0; color: #1E3A8A; font-size: 14px; font-weight: 600;">
                  🔒 Security Tips:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #4B5563; font-size: 14px; line-height: 1.6;">
                  <li>Never share this code with anyone</li>
                  <li>Delta Prime staff will never ask for your verification code</li>
                  <li>If you didn't request this code, please ignore this email</li>
                </ul>
              </div>
              
              <p style="margin: 0; color: #6B7280; font-size: 14px; line-height: 1.6;">
                Need help? Contact our support team at <a href="mailto:support@deltaprimellc.com" style="color: #FFA500; text-decoration: none; font-weight: 500;">support@deltaprimellc.com</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 30px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0 0 8px 0; color: #1E3A8A; font-size: 16px; font-weight: 600;">
                Delta Prime LLC
              </p>
              <p style="margin: 0 0 16px 0; color: #6B7280; font-size: 13px;">
                On Time Every Time | Trusted Logistics Partner
              </p>
              <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
                © ${new Date().getFullYear()} Delta Prime LLC. All rights reserved.
              </p>
              <p style="margin: 8px 0 0 0; color: #9CA3AF; font-size: 11px;">
                This is an automated message. Please do not reply to this email.
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

    // Send email using Resend
    // Note: In development/testing mode, Resend only allows sending to the verified email address
    // For production, you need to verify a domain at resend.com/domains
    const { data, error } = await resend.emails.send({
      from: "Delta Prime LLC <onboarding@resend.dev>", // Use Resend's default domain for testing
      to: [email],
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("[v0] ❌ Resend error:", error.message);

      // Check if it's the domain verification error
      if (error.message.includes("You can only send testing emails")) {
        return NextResponse.json(
          {
            error: "Email service in testing mode",
            details:
              "For testing, Resend can only send to your verified email address. To send to any email, please verify a domain at resend.com/domains and update the 'from' address.",
            code: code, // Include code in response for development
          },
          { status: 403 },
        );
      }

      return NextResponse.json(
        {
          error: "Failed to send verification email",
          details: error.message,
        },
        { status: 500 },
      );
    }

    console.log(`[v0] ✅ Email sent successfully! Message ID: ${data?.id}`);

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: "Verification email sent successfully",
    });
  } catch (error: any) {
    console.error("[v0] ❌ Unexpected error:", error);
    return NextResponse.json(
      {
        error: "Failed to send verification email",
        details: error.message || "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
