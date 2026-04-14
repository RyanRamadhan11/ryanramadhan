"use client";

import { FC, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import styles from "./Preloader.module.css";

const statusMessages = [
  "Initializing...",
  "Loading assets...",
  "Preparing UI...",
  "Almost ready...",
];

const Preloader: FC = () => {
  const [statusIndex, setStatusIndex] = useState(0);

  // Animated percentage counter
  const progress = useMotionValue(0);
  const percentage = useTransform(progress, (v) => `${Math.round(v)}%`);
  const [percentText, setPercentText] = useState("0%");

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 2.2,
      ease: "easeInOut",
      delay: 0.6,
    });

    const unsub = percentage.on("change", (v) => setPercentText(v));

    return () => {
      controls.stop();
      unsub();
    };
  }, [progress, percentage]);

  // Cycling status messages
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) =>
        prev < statusMessages.length - 1 ? prev + 1 : prev
      );
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.preloader}>
      {/* Background orbs */}
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />

      {/* Corner decorations */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />

      <div className={styles.contentWrapper}>
        {/* Logo with orbit rings */}
        <motion.div
          className={styles.logoArea}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.orbitRing} />
          <div className={styles.orbitRing2} />
          <Image
            src="/images/logo-ryns.png"
            alt="Ryan Ramadhan Logo"
            width={90}
            height={90}
            priority
            className={styles.logo}
          />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className={styles.nameText}>Ryan Ramadhan</p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className={styles.subtitleText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Software Engineer
        </motion.p>

        {/* Loading section */}
        <motion.div
          className={styles.loaderContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className={styles.loaderInfo}>
            <span className={styles.statusText}>
              {statusMessages[statusIndex]}
            </span>
            <span className={styles.percentage}>{percentText}</span>
          </div>
          <div className={styles.loadingBarContainer}>
            <motion.div
              className={styles.loadingBar}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.6 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Preloader;
