import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // Konfigurasi untuk gambar robot 404
      {
        protocol: "http",
        hostname: "googleusercontent.com",
      },
      // Jika kamu punya konfigurasi lain, biarkan saja. Contoh:
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.giphy.com",
      },
    ],
  },
};

export default nextConfig;
