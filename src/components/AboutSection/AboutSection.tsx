// src/components/AboutSection/AboutSection.tsx

"use client";

import React, { FC, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useTransform,
  useScroll,
  Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./AboutSection.module.css";

// Impor ikon yang digunakan di komponen ini
import { FaQuestionCircle } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";

// Impor semua data dari file terpisah
import {
  masterTechData,
  iconColors,
  techStack,
  accordionSkills,
} from "@/data/aboutData";

// --- Animated Title Component  ---
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
      animate="visible"
      viewport={{ once: true }}
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

// --- Accordion Component  ---
const AccordionItem: FC<{
  item: (typeof accordionSkills)[0];
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => (
  <motion.div className={styles.accordionItem} whileHover={{ y: -5 }}>
    <motion.header
      className={styles.accordionHeader}
      onClick={onClick}
      initial={false}
    >
      <div className={styles.accordionTitle}>{item.title}</div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <i className="bi bi-chevron-down"></i>
      </motion.div>
    </motion.header>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          className={styles.accordionContent}
        >
          <p>{item.content}</p>
          <div className={styles.stackContainer}>
            {item.stack.map((techKey) => {
              const IconComponent =
                masterTechData[techKey]?.icon || FaQuestionCircle;
              return (
                <div key={techKey} className={styles.stackTag}>
                  <IconComponent
                    style={{ color: iconColors[techKey] || "#bbb" }}
                  />
                  <span>{techKey}</span>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  </motion.div>
);

// --- Main Component ---
const AboutSection: FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const handleAccordionClick = (index: number) =>
    setOpenAccordion(openAccordion === index ? null : index);
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "center center"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentIsInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <main className={styles.main}>
      <section id="about" className={styles.aboutSection} ref={aboutRef}>
        <div className="page-container">
          <div className={`section-title ${styles.sectionTitle}`}>
            <AnimatedTitle text="About Me" />
          </div>
          <div className={styles.aboutLayout}>
            <motion.div
              className={styles.aboutImageWrapper}
              style={{ y: imageY, opacity: imageOpacity }}
            >
              <div className={styles.imageContainer}>
                <Image
                  src="/images/bg-ryan.jpg"
                  className={styles.profileImg}
                  alt="Ryan Ramadhan's Profile Photo"
                  width={500}
                  height={500}
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              ref={contentRef}
              className={styles.aboutContentWrapper}
              initial={{ x: 50, opacity: 0 }}
              animate={contentIsInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className={styles.aboutContent}>
                <h3>Software Engineer with a Passion for Problem Solving.</h3>
                <p>
                  I am a passionate Full Stack Developer dedicated to designing,
                  building, and maintaining responsive and scalable web
                  applications. My expertise spans a variety of technologies,
                  from backend stacks like{" "}
                  <strong>PHP, Laravel, Java, and Node.js</strong>, to frontend
                  frameworks like <strong>React and Next.js</strong>.
                </p>
                <p>
                  I am proficient in managing the entire application development
                  lifecycle to ensure optimal performance and user experience.
                  Committed to continuous learning, I stay updated with the
                  latest technology trends to deliver efficient and innovative
                  solutions.
                </p>
                <motion.div
                  style={{ display: "inline-block" }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(196, 39, 201, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href="/pdf/CV_RyanRamadhan_SoftwareEnginner.pdf"
                    download
                    className={styles.cvButton}
                  >
                    <BsDownload size={20} /> Download My CV
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="tech-stack" className={styles.techStackSection}>
        <div className="page-container">
          <div className={`section-title ${styles.sectionTitle}`}>
            <AnimatedTitle text="Technical Stack" />
            <p>The technologies and tools I use to bring ideas to life.</p>
          </div>
          <div className={styles.techStackGrid}>
            {techStack.map((category, index) => (
              <motion.div
                key={category.category}
                className={styles.techCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.cardHeader}>
                  <i className={`bi ${category.icon} ${styles.cardIcon}`}></i>
                  <h4>{category.category}</h4>
                </div>
                <div className={styles.techIconGrid}>
                  {category.skills.map((techKey) => {
                    const IconComponent =
                      masterTechData[techKey]?.icon || FaQuestionCircle;
                    return (
                      <motion.div
                        key={techKey}
                        className={styles.techIconItem}
                        title={techKey}
                        whileHover={{ scale: 1.25, y: -4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <IconComponent
                          style={{ color: iconColors[techKey] || "#bbb" }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="skills" className={styles.skillsSection}>
        <div className="page-container">
          <div className={`section-title ${styles.sectionTitle}`}>
            <AnimatedTitle text="Core Competencies" />
            <p>Three main pillars of my expertise.</p>
          </div>
          <div className={styles.accordionContainer}>
            {accordionSkills.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openAccordion === index}
                onClick={() => handleAccordionClick(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutSection;
