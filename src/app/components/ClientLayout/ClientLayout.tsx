"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ThemeProvider } from "../ThemeProvider";
import Preloader from "../Preloader/Preloader";
import { CommandPalette } from "../CommandPalette/CommandPalette"; // <-- 1. Import komponen baru

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavAndFooter = pathname === "/login" || pathname === "/register";
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false); // <-- 2. Tambahkan state untuk palette

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // 3. Tambahkan listener untuk keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* 4. Render Command Palette di sini */}
      <CommandPalette open={open} setOpen={setOpen} />

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
