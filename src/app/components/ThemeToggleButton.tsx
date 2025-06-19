// src/app/components/ThemeToggleButton.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Tampilkan placeholder atau null untuk menghindari hydration error
    // dan layout shift.
    return <div style={{ width: "24px", height: "44px" }}></div>;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "10px",
        color: "var(--nav-color)", // Warna ikon mengikuti tema navbar
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Toggle Dark Mode"
    >
      <i
        className={resolvedTheme === "dark" ? "bi bi-sun" : "bi bi-moon"}
        style={{ fontSize: "20px", transition: "all .3s ease" }}
      ></i>
    </button>
  );
}
