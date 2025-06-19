// src/components/HeroSection/HeroSection.tsx
"use client"; // Pastikan ini ada karena kita pakai Hooks dan Framer Motion

import React, { FC, useState, useEffect } from "react";
import Image from "next/image"; // Menggunakan Image dari Next.js
import { motion } from "framer-motion"; // Menggunakan motion dari Framer Motion
import Link from "next/link"; // Menggunakan Link dari Next.js
import styles from "./HeroSection.module.css"; // Menggunakan CSS Modules

// Teks yang akan dianimasikan untuk peran
const roles = [
  "Software Engineer",
  "Web Developer",
  "Fullstack Developer",
  "Tech Enthusiast",
];

const HeroSection: FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100; // Kecepatan mengetik (ms per karakter)
  const deletingSpeed = 70; // Kecepatan menghapus (ms per karakter)
  const delayAfterTyping = 1500; // Jeda setelah selesai mengetik (ms)
  const delayAfterDeleting = 700; // Jeda setelah selesai menghapus (ms)

  // Efek untuk animasi mengetik teks
  useEffect(() => {
    let typer: NodeJS.Timeout;
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];

      if (isDeleting) {
        // Logika menghapus teks
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false); // Berhenti menghapus
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length); // Pindah ke peran berikutnya
          typer = setTimeout(handleTyping, delayAfterDeleting); // Jeda sebelum mulai mengetik lagi
        } else {
          typer = setTimeout(handleTyping, deletingSpeed); // Teruskan menghapus
        }
      } else {
        // Logika mengetik teks
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText === fullText) {
          setIsDeleting(true); // Mulai menghapus setelah selesai mengetik
          typer = setTimeout(handleTyping, delayAfterTyping); // Jeda lalu mulai menghapus
        } else {
          typer = setTimeout(handleTyping, typingSpeed); // Teruskan mengetik
        }
      }
    };

    // Mulai animasi setelah komponen mount
    typer = setTimeout(handleTyping, typingSpeed);

    // Cleanup function untuk membersihkan timer saat komponen di-unmount
    return () => clearTimeout(typer);
  }, [
    displayedText,
    isDeleting,
    currentRoleIndex,
    roles,
    typingSpeed,
    deletingSpeed,
    delayAfterTyping,
    delayAfterDeleting,
  ]);

  return (
    <section className={styles.hero}>
      {/* Background Animasi: Dibuat dengan pseudo-element di CSS */}

      <div className={styles.heroContent}>
        {/* Judul utama dengan animasi Framer Motion */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hello, I'm
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }} /* sedikit delay */
        >
          <span className={styles.highlight}>Ryan Ramadhan</span>.
        </motion.h1>

        {/* NEW: Paragraf pertama untuk teks statis */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.fixedRoleIntro} /* Kelas baru untuk teks statis */
        >
          Crafting digital experiences
        </motion.p>

        {/* NEW: Paragraf kedua untuk teks animasi dan kursor */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }} /* Sedikit delay dari fixedRoleIntro */
          className={
            styles.animatedRoleLine
          } /* Kelas baru untuk baris animasi */
        >
          as a <span className={styles.animatedRole}>{displayedText}</span>
          <span className={styles.cursor}>|</span> {/* Kursor mengetik */}
        </motion.p>

        {/* Tagline dengan animasi */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.tagline}
        >
          Building innovative solutions, one line of code at a time.
        </motion.p>

        {/* Experience and Projects Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={styles.experienceStats}
        >
          {/* Item Projects */}
          <div className={styles.statItem}>
            <p className={styles.statDescription}>Projects</p>
            <span className={styles.statNumber}>25+</span>
          </div>
          {/* Item Pengalaman */}
          <div className={styles.statItem}>
            <p className={styles.statDescription}>Experience</p>
            <span className={styles.statNumber}>3+ Tahun</span>
          </div>
        </motion.div>

        {/* Tombol Call to Action dengan animasi */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className={styles.callToAction}
        >
          <Link href="/projects" className={styles.button}>
            Explore My Projects
          </Link>
          <Link href="/contact" className={styles.buttonSecondary}>
            Let's Connect
          </Link>
        </motion.div>

        {/* Ikon Sosial Media dengan animasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className={styles.socialIcons}
        >
          {/* Menggunakan Bootstrap Icons (bi) */}
          <a
            href="https://github.com/ryanmaramdh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/ryanramadhan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://instagram.com/ryanramadhan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://medium.com/@ryanramadhan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
          >
            <i className="bi bi-medium"></i>
          </a>
        </motion.div>
      </div>

      {/* Kontainer Foto Profil Baru dengan Efek Jendela ala IDE/MacBook */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        style={{
          marginRight: "1rem",
        }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0, delay: 0.8 }}
        className={styles.profileImageWrapper}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 50px rgba(0, 218, 198, 0.9)",
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      >
        {/* Titik-titik Merah, Kuning, Hijau ala kontrol jendela macOS/Linux */}
        <div className={styles.windowControls}>
          <span className={`${styles.dot} ${styles.red}`}></span>
          <span className={`${styles.dot} ${styles.yellow}`}></span>
          <span className={`${styles.dot} ${styles.green}`}></span>
        </div>

        {/* Gambar Profil */}
        <Image
          src="/images/ryan.jpg" // GANTI DENGAN PATH GAMBAR PROFIL ANDA DI public/img/
          alt="Ryan Ramadhan Profile Picture"
          width={400} // Sesuaikan lebar gambar profil Anda
          height={400} // Sesuaikan tinggi gambar profil Anda (disarankan square)
          className={styles.profileImage}
          priority // Prioritaskan pemuatan gambar ini
        />

        {/* Logo di pojok kanan atas (di dalam bingkai foto) */}
        <div className={styles.macbookLogo}>
          <i className={`bi bi-code-slash ${styles.logoIcon}`}></i>{" "}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
