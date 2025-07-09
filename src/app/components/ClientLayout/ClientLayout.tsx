// 📁 src/app/components/ClientLayout.tsx (File Baru - Client Component)

"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ThemeProvider } from "../ThemeProvider";
import Preloader from "../Preloader/Preloader";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavAndFooter = pathname === "/login" || pathname === "/register";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3200); // Durasi preloader

    return () => clearTimeout(timer);
  }, []);

  return (
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
  );
}
