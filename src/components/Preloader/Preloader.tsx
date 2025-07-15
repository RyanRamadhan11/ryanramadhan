"use client";

import React, { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Preloader.module.css";

const Preloader: FC = () => {
  const [currentTime, setCurrentTime] = useState("");

  // Efek untuk mengupdate jam digital setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval saat komponen unmount
  }, []);

  return (
    <div className={styles.preloader}>
      <div className={styles.contentWrapper}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="/images/logo-ryns.png"
            alt="Ryan Ramadhan Logo"
            width={100}
            height={100}
            priority
            className={styles.logo}
          />
        </motion.div>

        <motion.p
          className={styles.welcomeText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Welcome to my Website
        </motion.p>

        <div className={styles.loaderContainer}>
          <div className={styles.loaderInfo}>
            <span>System Boot...</span>
            <span className={styles.clock}>{currentTime}</span>
          </div>
          <div className={styles.loadingBarContainer}>
            <motion.div
              className={styles.loadingBar}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear", delay: 0.8 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
