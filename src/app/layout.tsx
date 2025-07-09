// 📁 src/app/layout.tsx (Benar - Server Component)

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ClientLayout } from "./components/ClientLayout/ClientLayout";
import "./globals.css";
import "../css/main.css";

const inter = Inter({ subsets: ["latin"] });

// --- DI SINI TEMPAT YANG BENAR UNTUK METADATA ---
export const metadata: Metadata = {
  title: {
    template: "%s | Ryan Ramadhan",
    default: "Ryan Ramadhan - Software Engineer",
  },
  description:
    "Explore the portfolio of Ryan Ramadhan, a passionate Full Stack Developer specializing in building modern and scalable web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Semua logika client (preloader, theme, dll) ada di dalam komponen ini */}
        <ClientLayout>{children}</ClientLayout>

        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
