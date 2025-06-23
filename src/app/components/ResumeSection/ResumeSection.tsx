"use client";

import React, { FC, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import styles from "./ResumeSection.module.css";

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

// --- Tipe Data & Kategori ---
type Category = "All" | "Education" | "Experience";

interface ResumeItem {
  id: number;
  type: "Education" | "Experience";
  title: string;
  institution: string;
  duration: string;
  description: string;
  logoUrl?: string; // Opsional: URL logo perusahaan/sekolah
}

// --- Data Resume ---
const resumeData: ResumeItem[] = [
  {
    id: 1,
    type: "Experience",
    title: "Software Engineer",
    institution: "PT. Visi Bima Jati",
    duration: "Feb 2023 - Present",
    description:
      "Developed and maintained various web applications using Laravel, React, and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
  },
  {
    id: 2,
    type: "Experience",
    title: "IT Support (Internship)",
    institution: "PT. Bukit Asam Tbk",
    duration: "Sep 2022 - Dec 2022",
    description:
      "Provided technical support, managed network infrastructure, and assisted in troubleshooting hardware and software issues.",
  },
  {
    id: 3,
    type: "Education",
    title: "Diploma in Informatics Engineering",
    institution: "Singaperbangsa Karawang University",
    duration: "2019 - 2022",
    description:
      "Focused on software development, database management, and web technologies, graduating with a GPA of 3.82.",
  },
  {
    id: 4,
    type: "Education",
    title: "Vocational High School - Computer Networking",
    institution: "SMK Negeri 1 Karawang",
    duration: "2016 - 2019",
    description:
      "Gained foundational skills in computer networking, hardware assembly, and basic programming principles.",
  },
];

const filterCategories: Category[] = ["All", "Education", "Experience"];

const ResumeSection: FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filteredData = resumeData.filter((item) => {
    if (activeFilter === "All") return true;
    return item.type === activeFilter;
  });

  return (
    <section id="resume" className={styles.resumeSection}>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionTitle}
        >
          <AnimatedTitle text="My Resume" />
          <p>
            A glimpse into my professional journey and educational background.
          </p>
        </motion.div>

        {/* --- Filter Buttons --- */}
        <div className={styles.filterContainer}>
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`${styles.filterButton} ${
                activeFilter === category ? styles.active : ""
              }`}
            >
              {activeFilter === category && (
                <motion.div
                  layoutId="activeResumePill"
                  className={styles.activePill}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={styles.filterButtonText}>{category}</span>
            </button>
          ))}
        </div>

        {/* --- Timeline --- */}
        <div className={styles.timelineContainer}>
          <AnimatePresence>
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className={`${styles.timelineItem} ${
                  index % 2 === 0 ? styles.left : styles.right
                }`}
              >
                <div className={styles.timelineIcon}>
                  {item.type === "Education" ? (
                    <FaGraduationCap />
                  ) : (
                    <FaBriefcase />
                  )}
                </div>
                <div className={styles.timelineContent}>
                  <span className={styles.duration}>{item.duration}</span>
                  <h3>{item.title}</h3>
                  <h4>{item.institution}</h4>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
