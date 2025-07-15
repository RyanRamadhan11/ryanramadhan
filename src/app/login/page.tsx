// pages/login.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./LoginPage.module.css";
import { FaUser, FaLock } from "react-icons/fa";

const loginImageUrl = "/images/ryan.jpg";

export default function LoginPage() {
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2, // Animasi muncul satu per satu
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={styles.pageWrapper}>
      <motion.div
        className={styles.loginContainer}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* --- Bagian Gambar (Kiri) --- */}
        <div className={styles.imageSection}>
          <Image
            src={loginImageUrl}
            alt="Login Visual"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className={styles.imageOverlay}>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              Selamat Datang Kembali!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              Masuk untuk melanjutkan ke dashboard Anda.
            </motion.p>
          </div>
        </div>

        {/* --- Bagian Form (Kanan) --- */}
        <motion.div
          className={styles.formSection}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className={styles.title}>
            Account Login
          </motion.h1>

          <form onSubmit={(e) => e.preventDefault()}>
            <motion.div variants={itemVariants} className={styles.inputGroup}>
              <FaUser className={styles.icon} />
              <input type="text" placeholder="Username or Email" required />
            </motion.div>

            <motion.div variants={itemVariants} className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input type="password" placeholder="Password" required />
            </motion.div>

            <motion.div variants={itemVariants} className={styles.options}>
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
              <Link href="/forgot-password" className={styles.link}>
                Forgot Password?
              </Link>
            </motion.div>

            <motion.button
              type="submit"
              className={styles.loginButton}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 20px rgba(255, 99, 71, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Login Now
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className={styles.separator}>
            <span>Or continue with</span>
          </motion.div>

          {/* Opsi login lain jika ada */}
          {/* <motion.div variants={itemVariants} className={styles.socialLogin}> ... </motion.div> */}

          <motion.p variants={itemVariants} className={styles.signupText}>
            Don&apos;t have an account?{" "}
            <Link href="/register" className={styles.link}>
              Sign Up
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
