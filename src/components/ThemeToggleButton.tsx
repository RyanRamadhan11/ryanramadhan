// 📁 src/app/components/ThemeToggleButton.tsx (Upgrade dengan Animasi)

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // [PENTING] Render placeholder atau null saat komponen belum di-mount di client
  // untuk mencegah hydration mismatch.
  if (!mounted) {
    return <div style={{ width: "24px", height: "24px" }} />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "10px",
        color: "var(--nav-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        width: "44px",
        height: "44px",
      }}
      aria-label="Toggle Dark Mode"
    >
      {/* AnimatePresence saat ikon ganti */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.i
          // Key unik untuk setiap ikon agar AnimatePresence bisa mendeteksi perubahan
          key={resolvedTheme}
          className={
            resolvedTheme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill"
          }
          initial={{ y: -20, opacity: 0, scale: 0.8 }} // Posisi awal (dari atas, transparan, kecil)
          animate={{ y: 0, opacity: 1, scale: 1 }} // Posisi akhir (di tengah, terlihat, ukuran normal)
          exit={{ y: 20, opacity: 0, scale: 0.8 }} // Animasi keluar (ke bawah, transparan, kecil)
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ fontSize: "20px", position: "absolute" }} // Posisikan absolut di dalam button
        />
      </AnimatePresence>
    </button>
  );
}
