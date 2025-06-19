// src/app/page.tsx (sekarang ini adalah halaman root Anda)
"use client"; // Jika ada interaktivitas klien di komponen ini

import React from "react";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutSection from "./components/AboutSection/AboutSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import ContactSection from "./components/ContactSection/ContactSection";

// Komponen ini akan menggunakan layout.tsx di level app
export default function HomePage() {
  return (
    <>
      {/* Head di App Router pakai <meta> tags di layout.tsx atau generateMetadata */}
      {/* Untuk title halaman spesifik, Anda bisa gunakan `generateMetadata` atau ubah title di HeroSection jika ingin tetap pakai Head */}

      <HeroSection />
      {/* <AboutSection /> */}
      {/* <ProjectsSection /> */}
      {/* <ContactSection /> */}
    </>
  );
}
