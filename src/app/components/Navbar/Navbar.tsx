// src/components/Navbar/Navbar.tsx
"use client";

import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { ThemeToggleButton } from "../ThemeToggleButton"; // <-- PERUBAHAN 1: Import tombol tema

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContentWrapper}>
        <div className={styles.brand}>
          <Link
            href="/"
            className={`${styles.logo} logo d-flex align-items-center me-auto me-xl-0`}
            onClick={handleNavLinkClick}
          >
            <Image
              src="/images/logo-rr.png"
              alt="Ryan Ramadhan Logo"
              width={50}
              height={50}
              priority
              className={styles.brandLogoImage}
            />
          </Link>
        </div>

        {/* --- PERUBAHAN 2: Buat wrapper untuk navigasi dan tombol tema desktop --- */}
        <div className={styles.navContainer}>
          {/* Navigasi utama */}
          <ul
            className={`${styles.navList} ${isMenuOpen ? styles.menuOpen : ""}`}
          >
            {/* ... link-link navigasi Anda ... */}
            <li className={styles.navItem}>
              <Link
                href="/"
                onClick={handleNavLinkClick}
                className={pathname === "/" ? styles.active : ""}
              >
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/about"
                onClick={handleNavLinkClick}
                className={pathname === "/about" ? styles.active : ""}
              >
                About Me
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/resume"
                onClick={handleNavLinkClick}
                className={pathname === "/resume" ? styles.active : ""}
              >
                Resume
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/portofolio"
                onClick={handleNavLinkClick}
                className={pathname === "/projects" ? styles.active : ""}
              >
                Portofolio
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/service"
                onClick={handleNavLinkClick}
                className={pathname === "/service" ? styles.active : ""}
              >
                Service
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/certification"
                onClick={handleNavLinkClick}
                className={pathname === "/certification" ? styles.active : ""}
              >
                Certification
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/contact"
                onClick={handleNavLinkClick}
                className={pathname === "/contact" ? styles.active : ""}
              >
                Contact
              </Link>
            </li>

            {/* --- PERUBAHAN 3: Tambahkan tombol tema KHUSUS untuk tampilan mobile di dalam menu --- */}
            <li className={`${styles.navItem} ${styles.themeToggleMobile}`}>
              <p>Switch Theme</p>
              <ThemeToggleButton />
            </li>
          </ul>

          {/* --- PERUBAHAN 4: Tambahkan tombol tema KHUSUS untuk tampilan desktop --- */}
          <div className={styles.themeToggleDesktop}>
            <ThemeToggleButton />
          </div>

          {/* Hamburger icon untuk mobile */}
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
