# Delta Prime LLC - Logistics & Freight Website

A modern, tech-driven logistics and freight forwarding company website built with Next.js 16, featuring advanced form validation, email verification with Resend, and interactive route visualization with Leaflet.js.

## Features

- **Email Verification**: Professional email verification using Resend API with beautiful HTML templates
- **Interactive Route Visualization**: Leaflet.js map with real OSRM routing between pickup and delivery locations
- **Address Geocoding**: Automatic conversion of addresses to coordinates using OpenStreetMap Nominatim
- **Advanced Form Validation**: Comprehensive regex-based validation for all form fields
- **Country-Based Phone Validation**: Phone input with country code selection and flag icons
- **Address Input**: Manual address entry with coordinate support and current location
- **Real-time Validation**: Validation feedback only after field blur or form submission
- **Responsive Design**: Mobile-first approach with sticky navigation
- **Modal Forms**: Application and quote request forms in accessible modals
- **Custom Scrollbars**: Beautiful branded scrollbars throughout the site

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Resend API key for email verification (sign up at [resend.com](https://resend.com))

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables in the **Vars section** of the v0 in-chat sidebar:
   \`\`\`
   RESEND_API_KEY=re_your_api_key_here
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000)

## Email Verification Setup

The website uses Resend to send verification codes to users before form submission. This prevents fake data submissions.

### Resend Setup (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add the environment variable in the **Vars section** of the v0 sidebar:
   - `RESEND_API_KEY`: re_your_api_key_here

### Development vs Production

**Development Mode:**

- Resend allows sending emails only to your verified email address
- The verification code is displayed directly in the UI for testing
- No domain verification required

**Production Mode:**

- Verify your domain at [resend.com/domains](https://resend.com/domains)
- Update the `from` address in the API route to use your domain (e.g., `noreply@deltaprimellc.com`)
- Send emails to any recipient

### Email Template

The verification emails use beautiful HTML templates matching the Delta Prime LLC brand:

- Deep blue (#1E3A8A) primary color
- Vibrant orange (#FFA500) accent color
- Professional layout with company branding
- Mobile-responsive design
- Security tips and expiration notice

## Form Validation Features

### Shipper Quote Form

- Company name validation
- Contact name validation (letters, spaces, hyphens, apostrophes)
- Email validation (RFC 5322 compliant)
- Country-based phone number validation with flag icons
- Address input with coordinate support and route visualization
- Browser geolocation for current location
- Cargo details validation (minimum 10 characters)
- Email verification before submission

### Driver Application Form

- First/Last name validation
- Email validation with verification
- Country-based phone number with search
- CDL license validation (format: A1234567)
- Years of experience validation
- Validation errors only shown after blur or submit

### Contact Form

- Name validation
- Email validation
- Optional phone number with country code
- Subject and message validation
- Character count display

## Route Visualization

The quote form includes an interactive Leaflet.js map that:

- **Real Road Routing**: Uses OSRM (Open Source Routing Machine) to calculate actual driving routes
- **Interactive Map**: Pan, zoom, and explore the route on OpenStreetMap tiles
- **Distance & Duration**: Displays accurate mileage and estimated driving time
- **Custom Markers**: Blue marker for origin, orange marker for destination
- **Gradient Route Line**: Beautiful blue-to-orange gradient showing the path
- **Address Geocoding**: Automatically converts addresses to coordinates for routing
- **Fallback Support**: Gracefully handles routing errors with straight-line distance

### How It Works

1. User enters origin and destination (addresses or coordinates)
2. Addresses are automatically geocoded to coordinates using Nominatim
3. OSRM API calculates the optimal driving route
4. Leaflet.js renders an interactive map with the route
5. Distance (in miles) and duration (in hours) are displayed below the map

## Address Input Features

The custom `AddressInput` component provides:

- **Manual Address Entry**: Full address input with automatic geocoding
- **Coordinate Input**: Manual latitude/longitude entry
- **Current Location**: Get user's current location via browser geolocation
- **Mode Switching**: Toggle between address and coordinate input
- **Validation**: Real-time coordinate format validation
- **Reverse Geocoding**: Convert coordinates to addresses using OpenStreetMap
- **Auto-geocoding**: Automatically finds coordinates for entered addresses

## Phone Input Features

The `PhoneInput` component includes:

- **Country Selection**: 10+ countries with flag icons
- **Search Functionality**: Filter countries by name or code
- **Auto-formatting**: Format phone numbers based on country
- **Validation**: Country-specific regex patterns
- **Visual Feedback**: Inline validation messages

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Typography**: Geist font family
- **Email**: Resend API
- **Mapping**: Leaflet.js with OpenStreetMap tiles
- **Routing**: OSRM (Open Source Routing Machine)
- **Geocoding**: Nominatim (OpenStreetMap)
- **Analytics**: Vercel Analytics

## Project Structure

\`\`\`
├── app/
│ ├── api/
│ │ └── send-verification/ # Email verification API route (Resend)
│ ├── about/ # About page
│ ├── contact/ # Contact page with form
│ ├── drivers/ # Drivers career page
│ ├── partners/ # Partners page with carousel
│ ├── shippers/ # Shippers services page
│ └── page.tsx # Homepage with video hero
├── components/
│ ├── ui/ # shadcn/ui components
│ ├── address-input.tsx # Address input with geocoding
│ ├── phone-input.tsx # Phone input with country codes
│ ├── email-verification.tsx # Email verification modal
│ ├── route-map.tsx # Leaflet.js route visualization
│ ├── partners-carousel.tsx # Animated partners carousel
│ ├── driver-application-modal.tsx # Driver application form
│ ├── shipper-quote-modal.tsx # Quote request form
│ ├── header.tsx # Navigation header
│ └── footer.tsx # Site footer
└── lib/
├── validation.ts # Validation utilities and regex patterns
└── utils.ts # General utilities
\`\`\`

## Validation Patterns

The project includes comprehensive validation patterns in `lib/validation.ts`:

- Email: RFC 5322 compliant
- Phone: Country-specific formats (US, UK, India, China, etc.)
- CDL License: US format (A1234567)
- Coordinates: Latitude/Longitude validation
- Names: Letters, spaces, hyphens, apostrophes
- Company names: Alphanumeric with special characters

## Custom Scrollbars

The website features beautiful custom scrollbars:

- Deep blue (#1E3A8A) thumb color
- Orange (#FFA500) hover color
- Smooth transitions
- Consistent across all modals and textareas

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Email Verification Not Working

1. Check that `RESEND_API_KEY` is set in the **Vars section** of the v0 sidebar
2. Verify your API key is correct (starts with `re_`)
3. Check the browser console for error messages
4. In development, you can only send to your verified email address
5. For production, verify a domain at [resend.com/domains](https://resend.com/domains)

### Route Visualization Not Showing

1. Ensure both origin and destination have valid coordinates
2. Check browser console for OSRM API errors
3. Verify internet connection (requires external API calls)
4. If routing fails, the map will show a straight line as fallback

### Address Geocoding Issues

1. Enter complete addresses for better geocoding results
2. Check browser console for Nominatim API errors
3. Rate limiting: Nominatim has usage limits for free tier
4. Use coordinates directly if geocoding fails

### Form Validation Issues

- Validation errors only appear after field blur or form submission
- Phone validation is country-specific - select the correct country first
- Coordinates must be in format: latitude, longitude (e.g., 40.7128, -74.0060)

## API Dependencies

This project uses the following free, open-source APIs:

- **OSRM**: Routing calculations (https://router.project-osrm.org)
- **Nominatim**: Address geocoding (https://nominatim.openstreetmap.org)
- **OpenStreetMap**: Map tiles (https://tile.openstreetmap.org)

Note: These are public APIs with rate limits. For production use, consider:

- Self-hosting OSRM
- Using commercial geocoding services
- Implementing caching for repeated requests

## License

Copyright © 2025 Delta Prime LLC. All rights reserved.
