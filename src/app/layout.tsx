// 📁 src/app/layout.tsx (Disempurnakan)

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ClientLayout } from "@/components/ClientLayout/ClientLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      {/* [WAJIB] Tambahkan link untuk Bootstrap Icons di sini.
        Ini akan membuat ikon matahari dan bulan muncul di tombol tema.
      */}
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        {/* <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        /> */}
      </body>
    </html>
  );
}
