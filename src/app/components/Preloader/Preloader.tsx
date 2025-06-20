"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Durasi preloader ditampilkan (2.5 detik)

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.preloader}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className={styles.logoContainer}>
            <Image
              src="/images/logo-ryns.png" // Pastikan path logo benar
              alt="Ryan Ramadhan Logo"
              width={120}
              height={120}
              priority
            />
            <div className={styles.typingContainer}>
              <span className={styles.typingText}></span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
