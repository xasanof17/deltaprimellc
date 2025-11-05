import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    console.log("[v0] 📧 Sending quote request email...")

    const body = await request.json()
    const {
      companyName,
      contactName,
      email,
      phone,
      countryCode,
      origin,
      destination,
      cargoDetails,
      originCoords,
      destinationCoords,
    } = body

    // Calculate distance if coordinates are provided
    let distance = "N/A"
    if (originCoords && destinationCoords) {
      const R = 3958.8 // Earth's radius in miles
      const lat1 = (originCoords.lat * Math.PI) / 180
      const lat2 = (destinationCoords.lat * Math.PI) / 180
      const dLat = ((destinationCoords.lat - originCoords.lat) * Math.PI) / 180
      const dLng = ((destinationCoords.lng - originCoords.lng) * Math.PI) / 180

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distanceValue = R * c
      distance = `${distanceValue.toFixed(0)} miles`
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Shipping Quote Request</title>
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
                🚚 New Shipping Quote Request
              </h1>
              <p style="margin: 10px 0 0; color: #E0E7FF; font-size: 14px; text-align: center;">
                Received on ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </td>
          </tr>

          <!-- Company Information -->
          <tr>
            <td style="padding: 30px 40px;">
              <h2 style="margin: 0 0 20px; color: #1E3A8A; font-size: 20px; font-weight: 600; border-bottom: 2px solid #FFA500; padding-bottom: 10px;">
                📋 Company Information
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px; width: 140px; vertical-align: top;">
                    <strong>Company Name:</strong>
                  </td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    ${companyName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px; vertical-align: top;">
                    <strong>Contact Person:</strong>
                  </td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    ${contactName}
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

          <!-- Shipping Route -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1E3A8A; font-size: 20px; font-weight: 600; border-bottom: 2px solid #FFA500; padding-bottom: 10px;">
                📍 Shipping Route
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px; background-color: #EFF6FF; border-radius: 6px; margin-bottom: 10px;">
                    <div style="color: #1E3A8A; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                      🔵 PICKUP LOCATION
                    </div>
                    <div style="color: #111827; font-size: 15px; font-weight: 500;">
                      ${origin}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; text-align: center;">
                    <div style="color: #6B7280; font-size: 24px;">↓</div>
                    <div style="color: #6B7280; font-size: 13px; font-weight: 600;">
                      ${distance}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #FFF7ED; border-radius: 6px;">
                    <div style="color: #FFA500; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                      🟠 DELIVERY LOCATION
                    </div>
                    <div style="color: #111827; font-size: 15px; font-weight: 500;">
                      ${destination}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Cargo Details -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1E3A8A; font-size: 20px; font-weight: 600; border-bottom: 2px solid #FFA500; padding-bottom: 10px;">
                📦 Cargo Details
              </h2>
              <div style="padding: 15px; background-color: #F9FAFB; border-left: 4px solid #FFA500; border-radius: 4px;">
                <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${cargoDetails}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #F9FAFB; border-radius: 0 0 8px 8px; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0 0 10px; color: #6B7280; font-size: 13px; text-align: center;">
                <strong>Next Steps:</strong> Review the quote request and respond to the customer within 24 hours.
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
    `

    // Plain text fallback
    const textContent = `
New Shipping Quote Request

Company Information:
- Company: ${companyName}
- Contact: ${contactName}
- Email: ${email}
- Phone: ${countryCode} ${phone}

Shipping Route:
- Origin: ${origin}
- Destination: ${destination}
- Distance: ${distance}

Cargo Details:
${cargoDetails}

---
Delta Prime LLC | Global Logistics | Tech Enabled | On Time Every Time
    `

    await sendEmail({
      to: process.env.SMTP_USER || "xasanof17@gmail.com", // Send to your Gmail
      subject: `New Shipping Quote Request from ${companyName}`,
      html: htmlContent,
      text: textContent,
      replyTo: email,
    })

    console.log("[v0] ✅ Quote email sent successfully!")

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] ❌ Error in send-quote API:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
