// src/app/contact/page.tsx
// "use client"; // Jika ContactSection interaktif

import ContactSection from "../components/ContactSection/ContactSection";

export default function ContactPage() {
  return <ContactSection />;
}

// Opsional: Untuk metadata SEO di App Router
export const metadata = {
  title: "Contact Me - Ryan Ramadhan",
  description:
    "Get in touch with Ryan Ramadhan for collaborations or inquiries.",
};
