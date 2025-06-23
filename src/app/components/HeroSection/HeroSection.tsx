"use client";

import React, { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
// Ikon untuk Tombol & Framework
import { FiArrowRight, FiLink } from "react-icons/fi";
import {
  SiNextdotjs,
  SiSpring,
  SiLaravel,
  SiBootstrap,
  SiTailwindcss,
} from "react-icons/si";
// Ikon untuk Sosial Media
// import { FaGithub, FaLinkedin, FaInstagram, FaMedium } from "react-icons/fa";
import styles from "./HeroSection.module.css";

// Data untuk teks animasi
const roles = [
  "Software Engineer",
  "Web Developer",
  "Fullstack Developer",
  "Tech Enthusiast",
];

// Data untuk highlight framework, sekarang dengan warna!
const frameworks = [
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Spring Boot", icon: SiSpring, color: "#6DB33F" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
];

// Komponen untuk Kartu Statistik dengan Animasi Angka
interface AnimatedStatCardProps {
  value: number;
  label: string;
  suffix?: string;
}

const AnimatedStatCard: FC<AnimatedStatCardProps> = ({
  value,
  label,
  suffix = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <motion.div
      className={styles.statCard}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={styles.statCardNumber}>
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <p className={styles.statCardDescription}>{label}</p>
    </motion.div>
  );
};

const HeroSection: FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Logika untuk Animasi Mengetik Teks Peran ---
  useEffect(() => {
    const typingSpeed = 100,
      deletingSpeed = 70,
      delayAfterTyping = 1500,
      delayAfterDeleting = 700;

    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];
      if (isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText === fullText) {
          setIsDeleting(true);
        }
      }
    };

    const timeoutSpeed = isDeleting
      ? displayedText === roles[currentRoleIndex]
        ? delayAfterTyping
        : deletingSpeed
      : displayedText === ""
      ? delayAfterDeleting
      : typingSpeed;

    const typer = setTimeout(handleTyping, timeoutSpeed);
    return () => clearTimeout(typer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {/* --- Blok Teks Perkenalan --- */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.hello}>Hello, I&apos;m </span>
          <br />
          <span className={styles.highlight}>Ryan Ramadhan</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.roleLine}
        >
          Crafting digital experiences as a <br />
          <span className={styles.animatedRole}>{displayedText}</span>
          <span className={styles.cursor}>|</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.tagline}
        >
          Building innovative solutions, one line of code at a time.
        </motion.p>

        {/* --- Blok Statistik dengan Kartu Animasi --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.statsContainer}
        >
          <AnimatedStatCard value={25} suffix="+" label="Projects Completed" />
          <AnimatedStatCard
            value={3}
            suffix="+ Years"
            label="Professional Experience"
          />
        </motion.div>

        {/* --- Blok Framework Highlight --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={styles.frameworkHighlight}
        >
          <h4 className={styles.highlightTitle}>My Go-To Tech:</h4>
          <div className={styles.frameworkIcons}>
            {frameworks.map((fw) => (
              <div
                key={fw.name}
                className={styles.frameworkIconWrapper}
                title={fw.name}
                style={{ "--icon-color": fw.color } as React.CSSProperties}
              >
                <fw.icon className={styles.frameworkIcon} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- Blok Tombol Call to Action --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className={styles.callToAction}
        >
          <Link href="/portofolio" className={styles.button}>
            Explore My Projects <FiArrowRight />
          </Link>
          <Link href="/contact" className={styles.buttonSecondary}>
            Let&apos;s Connect <FiLink />
          </Link>
        </motion.div>
      </div>

      {/* --- Blok Foto Profil --- */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0, delay: 0.5 }}
        className={styles.profileImageWrapper}
      >
        <div className={styles.windowControls}>
          <span className={`${styles.dot} ${styles.red}`}></span>
          <span className={`${styles.dot} ${styles.yellow}`}></span>
          <span className={`${styles.dot} ${styles.green}`}></span>
        </div>
        <Image
          src="/images/ryan.jpg"
          alt="Ryan Ramadhan Profile Picture"
          width={400}
          height={400}
          className={styles.profileImage}
          priority
        />
        <div className={styles.macbookLogo}>
          <i className="bi bi-code-slash"></i>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
