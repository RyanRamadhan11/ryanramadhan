/* src/components/HeroSection/HeroSection.tsx */

"use client";

import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiLink } from "react-icons/fi";
import {
  SiNextdotjs,
  SiSpring,
  SiLaravel,
  SiReact,
  SiDotnet,
} from "react-icons/si";
import styles from "./HeroSection.module.css";
import Background3D from "./Background3D";

const roles = [
  "Software Engineer",
  "Web Developer",
  "Fullstack Developer",
  "Tech Enthusiast",
];

const frameworks = [
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "React JS", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Spring Boot", icon: SiSpring, color: "#6DB33F" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: ".NET", icon: SiDotnet, color: "#512BD4" },
];

interface AnimatedStatCardProps {
  value: number;
  label: string;
  suffix?: string;
}

const AnimatedStatCard: FC<AnimatedStatCardProps> = ({
  value,
  label,
  suffix = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <motion.div
      className={styles.statCard}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={styles.statCardNumber}>
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <p className={styles.statCardDescription}>{label}</p>
    </motion.div>
  );
};

const HeroSection: FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 100,
      deletingSpeed = 70,
      delayAfterTyping = 1500,
      delayAfterDeleting = 700;

    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];
      if (isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText === fullText) {
          setIsDeleting(true);
        }
      }
    };

    const timeoutSpeed = isDeleting
      ? displayedText === roles[currentRoleIndex]
        ? delayAfterTyping
        : deletingSpeed
      : displayedText === ""
        ? delayAfterDeleting
        : typingSpeed;

    const typer = setTimeout(handleTyping, timeoutSpeed);
    return () => clearTimeout(typer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const heroRef = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      x.set(event.clientX - (rect.left + rect.width / 2));
      y.set(event.clientY - (rect.top + rect.height / 2));
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Background3D />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          {/* Greeting badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.greetingBadge}>
              <span className={styles.wave}>&#128075;</span>
              Hello, I&apos;m
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className={styles.highlight}>Ryan Ramadhan</span>.
          </motion.h1>

          {/* Role typing */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className={styles.roleLine}
          >
            Crafting digital experiences as a
            <br />
            <span className={styles.animatedRole}>{displayedText}</span>
            <span className={styles.cursor}>|</span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={styles.tagline}
          >
            Building innovative solutions, one line of code at a time.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className={styles.statsContainer}
          >
            <AnimatedStatCard
              value={25}
              suffix="+"
              label="Projects Completed"
            />
            <AnimatedStatCard
              value={3}
              suffix="+ Years"
              label="Experience"
            />
          </motion.div>

          {/* Framework highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className={styles.frameworkHighlight}
          >
            <h4 className={styles.highlightTitle}>Tech Stack</h4>
            <div className={styles.frameworkIcons}>
              {frameworks.map((fw) => (
                <div
                  key={fw.name}
                  className={styles.frameworkIconWrapper}
                  title={fw.name}
                  style={{ "--icon-color": fw.color } as React.CSSProperties}
                >
                  <fw.icon className={styles.frameworkIcon} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className={styles.callToAction}
          >
            <Link href="/portofolio" className={styles.button}>
              Explore My Projects <FiArrowRight />
            </Link>
            <Link href="/contact" className={styles.buttonSecondary}>
              Let&apos;s Connect <FiLink />
            </Link>
          </motion.div>
        </div>

        {/* Profile Image with 3D tilt */}
        <motion.div
          className={styles.profileImageWrapper}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div
            className={styles.windowControls}
            style={{ transform: "translateZ(40px)" }}
          >
            <span className={`${styles.dot} ${styles.red}`} />
            <span className={`${styles.dot} ${styles.yellow}`} />
            <span className={`${styles.dot} ${styles.green}`} />
          </div>

          <Image
            src="/images/ryan.jpg"
            alt="Ryan Ramadhan Profile Picture"
            width={400}
            height={400}
            className={styles.profileImage}
            priority
            style={{ transform: "translateZ(20px)" }}
          />

          <div
            className={styles.macbookLogo}
            style={{ transform: "translateZ(40px)" }}
          >
            <i className="bi bi-code-slash" />
          </div>

          {/* Available for work badge */}
          <div
            className={styles.statusBadge}
            style={{ transform: "translateZ(30px)" }}
          >
            <span className={styles.statusDot} />
            Available for work
          </div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className={styles.scrollMouse}>
          <div className={styles.scrollDot} />
        </div>
        <span className={styles.scrollText}>Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
