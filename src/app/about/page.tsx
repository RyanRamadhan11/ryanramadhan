// src/app/about/page.tsx

import AboutSection from "../../components/AboutSection/AboutSection";

export default function AboutPage() {
  return <AboutSection />;
}

// Opsional: Untuk metadata SEO di App Router
export const metadata = {
  title: "About Me - Ryan Ramadhan",
  description:
    "Learn more about Ryan Ramadhan, a passionate software developer.",
};
