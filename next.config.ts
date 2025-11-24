import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "res.cloudinary.com",
      "static.nike.com",
      "png.pngtree.com",
      "static.vecteezy.com",
    ],
  },
};

export default nextConfig;
