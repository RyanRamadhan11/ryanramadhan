// src/components/Footer/Footer.tsx
import React, { FC } from "react";
import styles from "./Footer.module.css";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Social Media Icons */}
        <div className={styles.socialLinks}>
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
