// src/app/layout.tsx
"use client";

// Import CSS
import "../css/main.css";
import "./globals.css";

// Import Font & Komponen
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Preloader from "./components/Preloader/Preloader"; // <-- [BARU] Impor Preloader
import { usePathname } from "next/navigation";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavAndFooter = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader /> {/* <-- [BARU] Panggil Preloader di sini */}
          {!hideNavAndFooter && <Navbar />}
          <main style={{ minHeight: "80vh" }}>{children}</main>
          {!hideNavAndFooter && <Footer />}
        </ThemeProvider>

        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
