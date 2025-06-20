// src/app/resume/page.tsx

import ResumeSection from "../components/ResumeSection/ResumeSection";
import type { Metadata } from "next";

// Opsional: Untuk metadata SEO
export const metadata: Metadata = {
  title: "Resume - Ryan Ramadhan",
  description:
    "Explore the professional journey, skills, and educational background of Ryan Ramadhan, a passionate software developer.",
};

// Nama fungsi diubah agar lebih sesuai
export default function ResumePage() {
  return <ResumeSection />;
}
