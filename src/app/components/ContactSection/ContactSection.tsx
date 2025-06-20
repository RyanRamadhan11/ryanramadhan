"use client";

import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import styles from "./ContactSection.module.css";

// [DIUBAH] Deklarasi tipe global untuk window.grecaptcha versi 3
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

const ContactSection: FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // [DIUBAH TOTAL] Fungsi handleSubmit untuk reCAPTCHA v3
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    if (!window.grecaptcha) {
      console.error("reCAPTCHA script not loaded");
      setStatus("error");
      return;
    }

    // Menunggu reCAPTCHA siap
    window.grecaptcha.ready(() => {
      // Meminta token dari Google
      window.grecaptcha
        .execute("6Le0R2crAAAAAChdcFs6zL_lRoyJDO5dC6kRm5VR", {
          action: "submit",
        }) // <-- GANTI DENGAN SITE KEY V3 KAMU
        .then(async (token) => {
          // Gabungkan data form dengan token
          const dataWithRecaptcha = {
            ...formData,
            "g-recaptcha-response": token,
          };

          try {
            const response = await fetch("https://formspree.io/f/mjkregdo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dataWithRecaptcha),
            });

            if (response.ok) {
              setStatus("success");
              setFormData({ name: "", email: "", message: "" });
            } else {
              setStatus("error");
            }
          } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
          }
        });
    });
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="page-container">
        {/* ... Judul dan Info Kontak tidak berubah ... */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionTitle}
        >
          {" "}
          <h2>Get In Touch</h2>{" "}
          <p>
            {" "}
            Interested in collaborating or just want to say hi? Feel free to
            reach out. I&apos;m always open to discussing new projects and
            creative ideas.{" "}
          </p>{" "}
        </motion.div>
        <div className={styles.contactGrid}>
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {" "}
            <h3>Contact Information</h3>{" "}
            <p>Fill up the form and I will get back to you within 24 hours.</p>{" "}
            <a
              href="mailto:ramadhanryan676@gmail.com"
              className={styles.infoItem}
            >
              {" "}
              <FiMail /> <span>ramadhanryan676@gmail.com</span>{" "}
            </a>{" "}
            <div className={styles.infoItem}>
              {" "}
              <FiMapPin /> <span>Jakarta, Indonesia</span>{" "}
            </div>{" "}
            <div className={styles.socialLinks}>
              {" "}
              <a
                href="https://linkedin.com/in/ryan-ramadhan-8a49662a2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>{" "}
              <a
                href="https://github.com/ryznox"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>{" "}
              <a
                href="https://instagram.com/ryznox"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>{" "}
            </div>{" "}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={styles.contactForm}
          >
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="email">Your Email</label>
            </div>
            <div className={styles.inputGroup}>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                required
              ></textarea>
              <label htmlFor="message">Your Message</label>
            </div>

            {/* [DIHAPUS] Div untuk placeholder reCAPTCHA v2 sudah tidak diperlukan lagi */}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
              <FiSend className={styles.sendIcon} />
            </button>

            <p className={styles.recaptchaNotice}>
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>

            {status === "success" && (
              <p className={styles.successMessage}>
                Thank you! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className={styles.errorMessage}>
                Oops! Something went wrong. Please try again.
              </p>
            )}
          </motion.form>
          {/* [TAMBAHKAN INI] Teks pemberitahuan pengganti lencana */}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
