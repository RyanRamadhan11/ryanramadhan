// src/app/projects/page.tsx
// HAPUS BARIS INI: "use client";

import PortofolioSection from "../components/PortofolioSection/PortofolioSection";

export default function ProjectsPage() {
  return <PortofolioSection />;
}

// Ini akan berfungsi dengan baik karena page.tsx sekarang adalah Server Component
export const metadata = {
  title: "My Projects - Ryan Ramadhan",
  description: "Showcasing programming projects by Ryan Ramadhan.",
};
