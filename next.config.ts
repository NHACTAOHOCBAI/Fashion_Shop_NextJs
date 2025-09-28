import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", 'static.nike.com'], // thêm domain Cloudinary vào đây
  },
};

export default nextConfig;
