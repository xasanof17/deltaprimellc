/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "flagcdn.com" }],
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://10.125.1.28:3000",
    "10.125.1.28",
  ],
};

export default nextConfig;
