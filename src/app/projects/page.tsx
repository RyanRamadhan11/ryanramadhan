// src/app/projects/page.tsx
// HAPUS BARIS INI: "use client";

import ProjectsSection from "../components/ProjectsSection/ProjectsSection";

export default function ProjectsPage() {
  return <ProjectsSection />;
}

// Ini akan berfungsi dengan baik karena page.tsx sekarang adalah Server Component
export const metadata = {
  title: "My Projects - Your Name",
  description: "Showcasing programming projects by Your Name.",
};
