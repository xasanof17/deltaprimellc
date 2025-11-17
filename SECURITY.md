# Security Guidelines for Delta Prime LLC Website

## Environment Variables

This project uses several environment variables for different services. Here's how to secure and manage them properly.

### Email Configuration (SMTP)

The project uses SMTP for sending emails via Gmail or other email providers.

**Required Variables:**

- `SMTP_HOST` - Your SMTP server hostname (e.g., smtp.gmail.com)
- `SMTP_PORT` - SMTP port (usually 587 for TLS or 465 for SSL)
- `SMTP_USER` - Your email address
- `SMTP_PASS` - Your email password or app-specific password

**Security Best Practices:**

- ✅ Use app-specific passwords instead of your main email password
- ✅ Store these variables server-side only (no NEXT*PUBLIC* prefix)
- ✅ Never commit these values to version control
- ✅ Rotate passwords regularly
- ❌ Don't expose SMTP credentials to the client

**Gmail Setup:**

1. Enable 2-factor authentication on your Google account
2. Generate an app-specific password at [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Use the app password as your `SMTP_PASS` value

### Resend API

Alternative email service using Resend API.

**Required Variable:**

- `RESEND_API_KEY` - Your Resend API key

**Security Best Practices:**

- ✅ Keep this server-side only
- ✅ Set up domain verification in Resend dashboard
- ✅ Monitor email sending quotas
- ✅ Use separate keys for development and production

**Setup:**

1. Sign up at [Resend](https://resend.com)
2. Verify your domain
3. Generate an API key
4. Add to environment variables

### GraphHopper Routing API (Optional)

Used for route visualization and distance calculations.

**Required Variable:**

- `GRAPH_HOPPER_API_KEY` - Your GraphHopper API key

**Security Best Practices:**

- ✅ Keep this server-side only (accessed via server actions)
- ✅ Set up rate limits in GraphHopper dashboard
- ✅ Monitor API usage to avoid unexpected charges
- ✅ The app automatically falls back to free OSRM routing if not configured

**Setup:**

1. Sign up at [GraphHopper](https://www.graphhopper.com/)
2. Get your API key from the dashboard
3. Add to environment variables
4. Optional: If not provided, the app uses free OSRM routing

### Setting Up Environment Variables

#### Local Development

1. Copy `.env.example` to `.env.local`:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. Add your environment variables:
   \`\`\`env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-specific-password

   RESEND_API_KEY=re_xxxxxxxxxxxxx

   GRAPH_HOPPER_API_KEY=your-graphhopper-key (optional)
   \`\`\`

3. Never commit `.env.local` to version control

#### Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables" (or use the Vars section in the v0 in-chat sidebar)
3. Add each variable with appropriate values
4. Make sure they're available for the correct environments (Production, Preview, Development)

### General Security Best Practices

✅ **Do:**

- Use strong, unique passwords for all services
- Enable 2-factor authentication where available
- Rotate API keys and passwords regularly
- Monitor API usage and set up billing alerts
- Use separate credentials for development and production
- Keep dependencies up to date

❌ **Don't:**

- Commit sensitive credentials to version control
- Share API keys in public channels
- Use the same password across multiple services
- Expose server-side variables to the client (no NEXT*PUBLIC* prefix for sensitive data)
- Ignore security warnings or alerts

### Monitoring

Regularly check:

- Email sending logs and quotas
- API usage dashboards
- Vercel deployment logs
- Security alerts from service providers

### Reporting Security Issues

If you discover a security vulnerability, please email security@deltaprime.com

### Additional Resources

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
