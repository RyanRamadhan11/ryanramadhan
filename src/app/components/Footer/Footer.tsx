// src/components/Footer/Footer.tsx
import React, { FC } from "react";
import styles from "./Footer.module.css";

// 1. Import ikon yang dibutuhkan dari react-icons
import { SiGithub, SiLinkedin, SiInstagram, SiMedium } from "react-icons/si";

// 2. Buat array untuk data sosial media agar lebih rapi
const socialLinksData = [
  {
    name: "GitHub",
    href: "https://github.com/ryanmaramdh",
    icon: SiGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ryanramadhan",
    icon: SiLinkedin,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ryanramadhan",
    icon: SiInstagram,
  },
  {
    name: "Medium",
    href: "https://medium.com/@ryanramadhan",
    icon: SiMedium,
  },
];

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* 3. Render ikon secara dinamis menggunakan map */}
        <div className={styles.socialLinks}>
          {socialLinksData.map((link) => {
            const Icon = link.icon; // Ambil komponen ikon dari data
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                title={link.name} // Tambahkan title untuk tooltip
              >
                <Icon /> {/* Render komponen ikon di sini */}
              </a>
            );
          })}
        </div>

        {/* Motto/Slogan */}
        <p className={styles.motto}>Innovate. Create. Inspire.</p>

        {/* Copyright */}
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Ryan Ramadhan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
