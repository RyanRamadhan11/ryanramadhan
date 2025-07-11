// 📁 src/components/ResumeSection/ResumeSection.tsx
// Versi Lengkap dan Final

"use client";

import React, { FC, useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";
import styles from "./ResumeSection.module.css";
import { resumeData } from "@/data/resumeData";

// --- Animated Title Component (VERSI BARU YANG DIPERBAIKI) ---
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

// [PERBAIKAN UTAMA] Logika diubah untuk memproses per kata, bukan per huruf
const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text }) => {
  const words = text.split(" "); // -> ["My", "Resume"]

  return (
    <motion.div
      variants={titleContainerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      <h2 className={styles.animatedGradientTitle}>
        {words.map((word, wordIndex) => (
          // Bungkus setiap kata dalam span agar bisa diberi spasi
          <span key={wordIndex} className={styles.wordWrapper}>
            {/* Pecah kata menjadi huruf-huruf */}
            {Array.from(word).map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                variants={letterVariants}
                // Beri kelas khusus jika ini adalah huruf pertama dari sebuah kata
                className={letterIndex === 0 ? styles.firstLetter : ""}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </h2>
    </motion.div>
  );
};

// --- Data Types & Categories ---
type Category = "All" | "Education" | "Experience";
const filterCategories: Category[] = ["All", "Education", "Experience"];

const ResumeSection: FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);

  const filteredData = resumeData.filter((item) => {
    if (activeFilter === "All") return true;
    return item.type === activeFilter;
  });

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    resumeData.forEach((item) => {
      if (item.type === "Experience" && item.skills) {
        item.skills.forEach((skill) => skills.add(skill));
      }
    });
    return Array.from(skills).sort();
  }, []);

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

        {/* --- Skill Highlighter --- */}
        <div className={styles.skillHighlighterSection}>
          <h3 className={styles.skillTitle}>
            <FaCode /> Highlight Skills
          </h3>
          <div className={styles.skillContainer}>
            {allSkills.map((skill) => (
              <motion.button
                key={skill}
                className={styles.skillButton}
                onMouseEnter={() => setHighlightedSkill(skill)}
                onMouseLeave={() => setHighlightedSkill(null)}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {skill}
              </motion.button>
            ))}
          </div>
        </div>

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
        <div className={styles.timelineWrapper}>
          <VerticalTimeline className={styles.customTimeline}>
            {filteredData.map((item) => {
              const isEducation = item.type === "Education";
              const icon = isEducation ? <FaGraduationCap /> : <FaBriefcase />;

              const isHighlighted =
                highlightedSkill && item.skills?.includes(highlightedSkill);
              const isDimmed =
                highlightedSkill && !item.skills?.includes(highlightedSkill);

              return (
                <VerticalTimelineElement
                  key={item.id}
                  className={`${styles.timelineCard} ${
                    isDimmed ? styles.dimmed : ""
                  } ${isHighlighted ? styles.highlighted : ""}`}
                  contentStyle={{
                    background: "transparent",
                    boxShadow: "none",
                  }}
                  contentArrowStyle={{ borderRight: "7px solid #374151" }}
                  date={item.duration}
                  iconStyle={{
                    background: isEducation
                      ? "linear-gradient(to top, #c026d3, #a21caf)"
                      : "linear-gradient(to top, #2563eb, #1d4ed8)",
                    color: "#fff",
                    boxShadow: `0 0 25px ${
                      isEducation ? "#c026d3" : "#2563eb"
                    }`,
                  }}
                  icon={icon}
                >
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <h4 className={styles.cardSubtitle}>{item.institution}</h4>
                    <ul className={styles.descriptionList}>
                      {item.description.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
