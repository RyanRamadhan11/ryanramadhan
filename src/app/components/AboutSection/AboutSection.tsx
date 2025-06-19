// src/components/AboutSection/AboutSection.tsx
"use client";

import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./AboutSection.module.css";

// Icon imports
import {
  DiPhp,
  DiJava,
  DiLaravel,
  DiReact,
  DiNodejs,
  DiWordpress,
  DiDocker,
  DiGit,
  DiLinux,
  DiWindows,
  DiPostgresql,
  DiMysql,
  DiHtml5,
  DiCss3,
  DiBootstrap,
  DiJavascript1,
} from "react-icons/di";
import {
  SiExpress,
  SiDotnet,
  SiSpring,
  SiSwagger,
  SiPostman,
  SiSocketdotio,
} from "react-icons/si";
import { VscPackage, VscSourceControl } from "react-icons/vsc";
import { AiOutlineSync } from "react-icons/ai";
import { BsArrowLeftRight } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";

const masterTechData: { [key: string]: { icon: React.ElementType } } = {
  PHP: { icon: DiPhp },
  Javascript: { icon: DiJavascript1 },
  Java: { icon: DiJava },
  Laravel: { icon: DiLaravel },
  "React.js": { icon: DiReact },
  "React Native": { icon: DiReact },
  "Express.js": { icon: SiExpress },
  "Node.Js": { icon: DiNodejs },
  "Java Spring Boot": { icon: SiSpring },
  ".Net Framework": { icon: SiDotnet },
  Wordpress: { icon: DiWordpress },
  Docker: { icon: DiDocker },
  Git: { icon: DiGit },
  "CI/CD": { icon: AiOutlineSync },
  "Ubuntu/Linux": { icon: DiLinux },
  Windows: { icon: DiWindows },
  Maven: { icon: VscPackage },
  "Swagger API": { icon: SiSwagger },
  Postman: { icon: SiPostman },
  PostgreSQL: { icon: DiPostgresql },
  MySQL: { icon: DiMysql },
  HTML5: { icon: DiHtml5 },
  CSS: { icon: DiCss3 },
  Bootstrap: { icon: DiBootstrap },
  AJAX: { icon: BsArrowLeftRight },
  "REST APIs": { icon: VscSourceControl },
  WebSockets: { icon: SiSocketdotio },
};

const iconColors: { [key: string]: string } = {
  PHP: "#8892be",
  Javascript: "#f7df1e",
  Java: "#f89820",
  Laravel: "#fb503b",
  "React.js": "#61dafb",
  "React Native": "#61dafb",
  "Express.js": "#444444",
  "Node.Js": "#3c873a",
  "Java Spring Boot": "#6db33f",
  ".Net Framework": "#512bd4",
  Wordpress: "#21759b",
  Docker: "#0db7ed",
  Git: "#f1502f",
  "CI/CD": "#03dac6",
  "Ubuntu/Linux": "#e95420",
  Windows: "#0078d7",
  Maven: "#c71a36",
  "Swagger API": "#85ea2d",
  Postman: "#ff6c37",
  PostgreSQL: "#336791",
  MySQL: "#00758f",
  HTML5: "#e34f26",
  CSS: "#264de4",
  Bootstrap: "#563d7c",
  AJAX: "#007fff",
  "REST APIs": "#f58220",
  WebSockets: "#8c52ff",
};

const techStack = [
  {
    category: "Programming Languages",
    skills: ["PHP", "Javascript", "Java"],
    icon: "bi-braces",
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "Laravel",
      "React.js",
      "React Native",
      "Express.js",
      "Node.Js",
      "Java Spring Boot",
      ".Net Framework",
      "Wordpress",
    ],
    icon: "bi-collection",
  },
  {
    category: "Tools & Technologies",
    skills: [
      "Docker",
      "Git",
      "CI/CD",
      "Ubuntu/Linux",
      "Windows",
      "Maven",
      "Swagger API",
      "Postman",
    ],
    icon: "bi-tools",
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL"],
    icon: "bi-hdd-stack",
  },
  {
    category: "Web Technologies",
    skills: ["HTML5", "CSS", "Bootstrap", "AJAX", "REST APIs", "WebSockets"],
    icon: "bi-globe2",
  },
];

const accordionSkills = [
  {
    title: "Backend Development",
    content:
      "Keahlian mendalam dalam membangun sisi server yang kuat dan skalabel...",
    stack: [
      "PHP",
      "Laravel",
      "Java",
      "Java Spring Boot",
      "Node.Js",
      "Express.js",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
    ],
  },
  {
    title: "Frontend Development",
    content:
      "Mampu menciptakan antarmuka pengguna yang responsif, interaktif, dan intuitif...",
    stack: [
      "HTML5",
      "CSS",
      "Javascript",
      "React.js",
      "Bootstrap",
      "AJAX",
      "WebSockets",
    ],
  },
  {
    title: "Mobile & DevOps",
    content: "Berpengalaman dalam aplikasi mobile cross-platform dan DevOps...",
    stack: [
      "React Native",
      "Git",
      "Docker",
      "CI/CD",
      "Ubuntu/Linux",
      "Postman",
      "Swagger API",
    ],
  },
];

const AccordionItem: FC<{
  item: (typeof accordionSkills)[0];
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => (
  <div className={styles.accordionItem}>
    <motion.header
      className={styles.accordionHeader}
      onClick={onClick}
      initial={false}
    >
      <div className={styles.accordionTitle}>{item.title}</div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
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
  </div>
);
const AboutSection: FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const handleAccordionClick = (index: number) =>
    setOpenAccordion(openAccordion === index ? null : index);
  return (
    <main className={styles.main}>
      <section id="about" className={styles.aboutSection}>
        <div className="container">
          <motion.div
            className={`section-title ${styles.sectionTitle}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2>About Me</h2>
          </motion.div>
          <div className="row gy-4 align-items-center">
            <motion.div
              className="col-lg-5"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.imageContainer}>
                <Image
                  src="/images/profile.jpg"
                  className={styles.profileImg}
                  alt="Foto Profil Ryan Ramadhan"
                  width={500}
                  height={500}
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              className="col-lg-7"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.aboutContent}>
                <h3>Software Engineer with a Passion for Problem Solving.</h3>
                <p>
                  Saya adalah lulusan Teknik Informatika dari Universitas
                  Singaperbangsa Karawang dengan pengalaman dua tahun lebih
                  sebagai Software Engineer...
                </p>
                <p>
                  Berpengalaman dalam keseluruhan siklus hidup pengembangan
                  perangkat lunak, termasuk penggunaan Docker, Git, dan CI/CD...
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    href="/Ryan-Ramadhan-CV.pdf"
                    download
                    className={styles.cvButton}
                  >
                    <i className="bi bi-download"></i>Download My CV
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* TECH STACK */}
      <section id="tech-stack" className={styles.techStackSection}>
        <div className="container">
          <motion.div
            className={`section-title ${styles.sectionTitle}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Technical Stack</h2>
            <p>Teknologi dan tools yang saya gunakan...</p>
          </motion.div>
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
                <div className={styles.cardIcon}>
                  <i className={`bi ${category.icon}`}></i>
                </div>
                <h4>{category.category}</h4>
                <div className={styles.techIconGrid}>
                  {category.skills.map((techKey) => {
                    const IconComponent =
                      masterTechData[techKey]?.icon || FaQuestionCircle;
                    return (
                      <div
                        key={techKey}
                        className={styles.techIconItem}
                        title={techKey}
                      >
                        <IconComponent
                          style={{ color: iconColors[techKey] || "#bbb" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS ACCORDION */}
      <section id="skills" className={styles.skillsSection}>
        <div className="container">
          <motion.div
            className={`section-title ${styles.sectionTitle}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Core Competencies</h2>
            <p>Tiga pilar utama keahlian yang saya tawarkan...</p>
          </motion.div>
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
