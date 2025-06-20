// src/app/certification/page.tsx
import CertificationSection from "../components/CertificationSection/CertificationSection";
import type { Metadata } from "next";

// Opsional: Untuk metadata SEO
export const metadata: Metadata = {
  title: "Certifications - Ryan Ramadhan",
  description:
    "View the official certifications and qualifications achieved by Ryan Ramadhan in software development and various technologies.",
};

export default function CertificationPage() {
  return <CertificationSection />;
}
