import type { NextConfig } from "next";

// Images uploaded in the admin dashboard are served by the content API (`/uploads/...`).
const api = new URL(process.env.CONTENT_API_URL ?? "http://localhost:4000/api/v1");
const isLocalApi = ["localhost", "127.0.0.1", "::1"].includes(api.hostname);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: api.protocol.replace(":", "") as "http" | "https",
        hostname: api.hostname,
        port: api.port,
        pathname: "/uploads/**",
      },
    ],
    // Next 16 refuses to optimize images from local IPs; allow it only when the API runs locally.
    dangerouslyAllowLocalIP: isLocalApi,
  },
};

export default nextConfig;
