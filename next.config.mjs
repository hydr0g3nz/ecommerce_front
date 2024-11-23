/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Enables Next.js standalone output
  experimental: {
    serverActions: true, // Enable if you're using server actions
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nike.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "hydr0g3nz.xyz",
      },
    ],
  },
};

export default nextConfig;
