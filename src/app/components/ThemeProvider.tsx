// src/app/components/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react"; // Import ComponentProps dari React

// Kita gunakan cara yang lebih aman untuk mendapatkan Tipe Props
// Ini akan mengambil tipe props langsung dari komponennya, jadi akan selalu update
type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
