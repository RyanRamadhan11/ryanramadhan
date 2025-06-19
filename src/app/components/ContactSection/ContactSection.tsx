// src/components/ContactSection/ContactSection.tsx
"use client";
import React, { FC } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub, FiTwitter } from "react-icons/fi"; // Impor ikon
import styles from "./ContactSection.module.css"; // Buat file ini

const ContactSection: FC = () => {
  return (
    <section id="contact" className={styles.contactSection}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={styles.description}
      >
        Tertarik untuk berkolaborasi atau hanya ingin menyapa? Jangan ragu untuk
        menghubungi saya melalui platform di bawah ini.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={styles.contactLinks}
      >
        <a href="mailto:your.email@example.com" className={styles.contactLink}>
          <FiMail /> your.email@example.com
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactLink}
        >
          <FiLinkedin /> LinkedIn
        </a>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactLink}
        >
          <FiGithub /> GitHub
        </a>
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactLink}
        >
          <FiTwitter /> Twitter
        </a>
        {/* Tambahkan link media sosial lain jika ada */}
      </motion.div>

      {/* Contoh form kontak sederhana (butuh backend atau layanan pihak ketiga) */}
      {/*
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={styles.contactForm}
      >
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows={5} required></textarea>
        <button type="submit">Send Message</button>
      </motion.form>
      */}
    </section>
  );
};

export default ContactSection;
