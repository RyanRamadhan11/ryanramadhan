// src/app/page.tsx ( halaman root awal tampil)
"use client";

import React from "react";
import HeroSection from "./components/HeroSection/HeroSection";

export default function HomePage() {
  return (
    <>
      {/* Head di App Router pakai <meta> tags di layout.tsx atau generateMetadata */}

      <HeroSection />
    </>
  );
}
