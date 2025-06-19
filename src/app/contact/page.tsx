// src/app/contact/page.tsx
// "use client"; // Jika ContactSection interaktif

import ContactSection from "../components/ContactSection/ContactSection";

export default function ContactPage() {
  return <ContactSection />;
}

// Opsional: Untuk metadata SEO di App Router
export const metadata = {
  title: "Contact Me - Your Name",
  description: "Get in touch with Your Name for collaborations or inquiries.",
};
