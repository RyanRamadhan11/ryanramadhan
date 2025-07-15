"use client";

import React, { FC, useState } from "react";
import { motion, Variants } from "framer-motion";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import styles from "./ContactSection.module.css";

// Deklarasi tipe global untuk window.grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      reset: () => void;
    };
  }
}

// --- Komponen Judul Animasi ---
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

const titleContainerVariants: Variants = {
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

interface AnimatedTitleProps {
  text: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text }) => {
  const letters = Array.from(text);
  return (
    <motion.div
      variants={titleContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <h2 className={styles.animatedGradientTitle}>
        {letters.map((letter, index) => (
          <motion.span key={index} variants={letterVariants}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </h2>
    </motion.div>
  );
};

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mjkregdo", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionTitle}
        >
          <AnimatedTitle text="Get In Touch" />
          <p>
            Interested in collaborating or just want to say hi? Feel free to
            reach out. I&apos;m always open to discussing new projects and
            creative ideas.
          </p>
        </motion.div>

        <div className={styles.contactGrid}>
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Contact Information</h3>
            <p>Fill up the form and I will get back to you within 24 hours.</p>
            <a
              href="mailto:ramadhanryan676@gmail.com"
              className={styles.infoItem}
            >
              <FiMail /> <span>ramadhanryan676@gmail.com</span>
            </a>
            <div className={styles.infoItem}>
              <FiMapPin /> <span>Jakarta, Indonesia</span>
            </div>
            <div className={styles.socialLinks}>
              <a
                href="https://www.linkedin.com/in/ryan-ramadhan-17118b222/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/RyanRamadhan11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/ryanrmdhans/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
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

            <div className={styles.recaptchaWrapper}>
              <div
                className="g-recaptcha"
                data-sitekey="6Lcza2crAAAAAGebnSVAvOyUtff_Y4e2GyoG3InP" // GANTI DENGAN SITE KEY V2 BARU ANDA
              ></div>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
              <FiSend className={styles.sendIcon} />
            </button>

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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
