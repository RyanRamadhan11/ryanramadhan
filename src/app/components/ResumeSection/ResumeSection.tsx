"use client";

import React, { FC, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import styles from "./ResumeSection.module.css";

// --- Animated Title Component ---
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

// --- Data Types & Categories ---
type Category = "All" | "Education" | "Experience";

interface ResumeItem {
  id: number;
  type: "Education" | "Experience";
  title: string;
  institution: string;
  duration: string;
  description: string[]; // Mengubah deskripsi menjadi array of strings untuk bullet points
}

// --- Refined Resume Data ---
const resumeData: ResumeItem[] = [
  {
    id: 1,
    type: "Experience",
    title: "Software Engineering Team Lead",
    institution: "PT. Mekanika Digital Pratama",
    duration: "Jun 2024 - Present",
    description: [
      "Led a team of developers in designing and deploying scalable web solutions.",
      "Architected and developed key features using Laravel, React, .NET, and Node.js.",
      "Conducted code reviews and mentored junior engineers to maintain high code quality.",
    ],
  },
  {
    id: 2,
    type: "Experience",
    title: "Fullstack Developer",
    institution: "PT. Enigmacamp",
    duration: "Nov 2023 - May 2024",
    description: [
      "Completed an intensive, project-based training focused on enterprise-level development.",
      "Built and deployed several full-stack applications using Java Spring Boot and React.",
      "Practiced Agile methodologies, including sprint planning and daily stand-ups.",
    ],
  },
  {
    id: 3,
    type: "Experience",
    title: "Freelance Fullstack Developer",
    institution: "Self-Employed",
    duration: "Jan 2023 - Present",
    description: [
      "Developed custom web solutions for various clients, from landing pages to e-commerce sites.",
      "Managed the full project lifecycle: from client consultation to final deployment.",
      "Specialized in creating responsive and performant applications with Laravel and React.",
    ],
  },
  {
    id: 4,
    type: "Experience",
    title: "Fullstack Web Developer",
    institution: "PT. Nurul Fikri Cipta Inovasi",
    duration: "Aug 2022 - Jan 2023",
    description: [
      "Developed and maintained modules for educational web platforms using Laravel.",
      "Implemented new features and optimized database queries to improve performance.",
      "Collaborated with the UI/UX team to integrate front-end designs using Blade templates.",
    ],
  },
  {
    id: 5,
    type: "Experience",
    title: "Fullstack Web Developer",
    institution: "PT. Lentera Benderang",
    duration: "Feb 2022 - Jun 2022",
    description: [
      "Contributed to building a company's core product with the Laravel framework.",
      "Developed and integrated RESTful APIs for mobile and web client consumption.",
      "Assisted in troubleshooting, bug fixing, and maintaining existing codebases.",
    ],
  },
  {
    id: 6,
    type: "Education",
    title: "Bachelor's Degree in Informatics Engineering",
    institution: "Singaperbangsa Karawang University",
    duration: "2019 - 2023",
    description: [
      "Graduated with a GPA of 3.97.",
      "Focused on software development, database management, and web technologies.",
      "Completed a final project on developing a web-based inventory management system.",
    ],
  },
  {
    id: 7,
    type: "Education",
    title: "High School Diploma, Science Major",
    institution: "SMA Negeri 1 Cilamaya",
    duration: "2016 - 2019",
    description: [
      "Focused on core subjects in Mathematics and Natural Sciences.",
      "Gained foundational knowledge in basic programming and computer logic.",
    ],
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
                key={item.id} // Key sekarang unik dan benar
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
                  <ul className={styles.descriptionList}>
                    {item.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
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
