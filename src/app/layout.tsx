// src/app/layout.tsx
"use client";

// Import CSS

import "../css/main.css";
import "./globals.css";

// Import Font & Komponen
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "./components/Navbar/Navbar"; // Pastikan path ini benar
import Footer from "./components/Footer/Footer"; // Pastikan path ini benar
import { usePathname } from "next/navigation";
import { ThemeProvider } from "./components/ThemeProvider"; // Import Provider Tema

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavAndFooter = pathname === "/login" || pathname === "/register";

  return (
    // Tambahkan `suppressHydrationWarning` untuk next-themes
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Bungkus semua dengan ThemeProvider */}
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {!hideNavAndFooter && <Navbar />}

          <main style={{ minHeight: "80vh" }}>{children}</main>

          {!hideNavAndFooter && <Footer />}
        </ThemeProvider>
        {/* [DIUBAH] Ganti script reCAPTCHA menjadi versi 3 */}
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6Le0R2crAAAAAOhdcFs6zL_lRoyJDO5dC6kRm5VR" // <-- GANTI DENGAN SITE KEY V3 KAMU
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
