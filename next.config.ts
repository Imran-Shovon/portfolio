import type { NextConfig } from "next";

// Images uploaded in the admin dashboard are served by the content API (`/uploads/...`) in
// development, and by Vercel Blob (or Cloudinary) in production.
const api = new URL(process.env.CONTENT_API_URL ?? "http://localhost:4000/api/v1");
const isLocalApi = ["localhost", "127.0.0.1", "::1"].includes(api.hostname);

const nextConfig: NextConfig = {
  // Pages are prerendered from the content API at build time. A free Render instance can take
  // ~30-60s to wake up, which would exceed the default 60s per page.
  staticPageGenerationTimeout: 180,
  images: {
    remotePatterns: [
      {
        protocol: api.protocol.replace(":", "") as "http" | "https",
        hostname: api.hostname,
        port: api.port,
        pathname: "/uploads/**",
      },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
    // Next 16 refuses to optimize images from local IPs; allow it only when the API runs locally.
    dangerouslyAllowLocalIP: isLocalApi,
  },
};

export default nextConfig;
