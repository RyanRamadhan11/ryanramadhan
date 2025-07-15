// src/app/projects/page.tsx

import PortofolioSection from "../../components/PortofolioSection/PortofolioSection";

// Ini akan berfungsi dengan baik karena page.tsx sekarang adalah Server Component
export const metadata = {
  title: "My Projects - Ryan Ramadhan",
  description: "Showcasing programming projects by Ryan Ramadhan.",
};

export default function ProjectsPage() {
  return <PortofolioSection />;
}
