// src/app/about/page.tsx
// "use client"; // Jika AboutSection interaktif

import AboutSection from "../components/AboutSection/AboutSection";

export default function AboutPage() {
  return <AboutSection />;
}

// Opsional: Untuk metadata SEO di App Router
export const metadata = {
  title: "About Me - Your Name",
  description: "Learn more about Your Name, a passionate software developer.",
};
