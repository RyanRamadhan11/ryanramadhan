"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "./components/ThemeProvider";
import Preloader from "./components/Preloader/Preloader"; // Ganti nama import
import "./globals.css";
import "../css/main.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavAndFooter = pathname === "/login" || pathname === "/register";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Durasi preloader disesuaikan dengan animasi loading bar
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3200); // 3.2 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatePresence>
            {isLoading && (
              <motion.div
                key="preloader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Preloader />
              </motion.div>
            )}
          </AnimatePresence>

          {!isLoading && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {!hideNavAndFooter && <Navbar />}
              <main style={{ minHeight: "80vh" }}>{children}</main>
              {!hideNavAndFooter && <Footer />}
            </motion.div>
          )}
        </ThemeProvider>

        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
