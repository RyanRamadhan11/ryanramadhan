/* src/app/components/Navbar/Navbar.tsx */

"use client";

import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { ThemeToggleButton } from "../ThemeToggleButton";

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        // Breakpoint disamakan dengan CSS
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
            {/* [DIUBAH] Ukuran logo diperbesar menjadi 60x60px */}
            <Image
              src="/images/logo-ryns.png"
              alt="Ryan Ramadhan Logo"
              width={100}
              height={100}
              priority
              className={styles.brandLogoImage}
            />
          </Link>
        </div>

        <div className={styles.navContainer}>
          <ul
            className={`${styles.navList} ${isMenuOpen ? styles.menuOpen : ""}`}
          >
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
                className={pathname === "/portofolio" ? styles.active : ""}
              >
                Portofolio
              </Link>
            </li>

            {/* [DIHAPUS] Menu "Service" dihilangkan dari daftar */}

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

            <li className={`${styles.navItem} ${styles.themeToggleMobile}`}>
              <p>Switch Theme</p>
              <ThemeToggleButton />
            </li>
          </ul>

          <div className={styles.themeToggleDesktop}>
            <ThemeToggleButton />
          </div>

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
    </nav>
  );
};

export default Navbar;
