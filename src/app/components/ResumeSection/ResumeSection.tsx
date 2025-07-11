// 📁 src/components/ResumeSection/ResumeSection.tsx
// Versi Unggul dengan Efek Highlight & Desain Profesional

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
import { resumeData, ResumeItem } from "@/data/resumeData";

// --- Animated Title Component (tidak berubah) ---
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

// --- Data Types & Categories (tidak berubah) ---
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
      if (item.type === "Experience") {
        item.skills.forEach((skill) => skills.add(skill));
      }
    });
    return Array.from(skills).sort(); // [PERBAIKAN] Urutkan skill agar konsisten
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

        {/* --- Filter Buttons (tidak berubah) --- */}
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

        {/* --- Skill Highlighter (tidak berubah) --- */}
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

        {/* --- Timeline --- */}
        <div className={styles.timelineWrapper}>
          {/* [PERBAIKAN] Hapus prop lineColor agar bisa di-style di CSS dengan gradien */}
          <VerticalTimeline>
            {filteredData.map((item) => {
              const isEducation = item.type === "Education";
              const icon = isEducation ? <FaGraduationCap /> : <FaBriefcase />;

              // [LOGIKA BARU] Tambahkan state 'isHighlighted'
              const isHighlighted =
                highlightedSkill && item.skills?.includes(highlightedSkill);
              const isDimmed =
                highlightedSkill && !item.skills?.includes(highlightedSkill);

              return (
                <VerticalTimelineElement
                  key={item.id}
                  className={`${styles.timelineCard} ${
                    isDimmed ? styles.dimmed : ""
                  } ${isHighlighted ? styles.highlighted : ""}`} // [PERBAIKAN] Terapkan class baru
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
