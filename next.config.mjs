/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "flagcdn.com" }],
  },
  allowedDevOrigins: [
    "10.125.1.28",
    "192.168.0.104",
  ],
};

export default nextConfig;
