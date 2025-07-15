import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "profile.line-scdn.net",
        pathname: "**", // allow all paths
      },
      {
        protocol: "https",
        hostname: "pub-2646aee0b232413d96760d797459863a.r2.dev",
        pathname: "**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
