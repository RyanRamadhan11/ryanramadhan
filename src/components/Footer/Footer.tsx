// src/components/Footer/Footer.tsx

import React, { FC } from "react";
import styles from "./Footer.module.css";

// import ikon yang dibutuhkan dari react-icons
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";

// Buat array untuk data sosial media
const socialLinksData = [
  {
    name: "GitHub",
    href: "https://github.com/RyanRamadhan11",
    icon: SiGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ryan-ramadhan-17118b222/",
    icon: SiLinkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ryanrmdhans/",
    icon: SiInstagram,
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
