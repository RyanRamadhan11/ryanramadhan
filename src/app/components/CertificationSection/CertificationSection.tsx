// 📁 src/components/CertificationSection/CertificationSection.tsx
// (Versi Final dengan Ikon Kalender & Peningkatan Lainnya)

"use client";

import React, { FC, useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiXCircle, FiGrid, FiSearch } from "react-icons/fi";
import {
  FaTrophy,
  FaChevronLeft,
  FaChevronRight,
  FaQuestionCircle,
  FaFilter,
  FaFileAlt,
  FaCalendarAlt, // <<<--- IMPORT ICON BARU DI SINI
} from "react-icons/fa";
import {
  DiReact,
  DiNodejs,
  DiMongodb,
  DiJava,
  DiPhp,
  DiLaravel,
  DiAndroid,
  DiApple,
  DiHtml5,
  DiCss3,
  DiJavascript1,
  DiDocker,
  DiLinux,
  DiGit,
} from "react-icons/di";
import {
  SiNextdotjs,
  SiExpress,
  SiRedux,
  SiSocketdotio,
  SiFirebase,
  SiTypescript,
  SiFigma,
  SiFlutter,
  SiKotlin,
} from "react-icons/si";

import styles from "./CertificationSection.module.css";

// --- Tipe Data & Mapping (Tidak ada perubahan) ---
interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  technologies: string[];
  credentialUrl?: string;
}
const techIconMap: { [key: string]: React.ElementType } = {
  React: DiReact,
  "Next.js": SiNextdotjs,
  "Node.js": DiNodejs,
  Express: SiExpress,
  MongoDB: DiMongodb,
  Redux: SiRedux,
  "Socket.IO": SiSocketdotio,
  Firebase: SiFirebase,
  TypeScript: SiTypescript,
  "Framer Motion": motion.div,
  "CSS Modules": DiCss3,
  Figma: SiFigma,
  Java: DiJava,
  PHP: DiPhp,
  Laravel: DiLaravel,
  Flutter: SiFlutter,
  Kotlin: SiKotlin,
  Android: DiAndroid,
  Swift: DiApple,
  HTML5: DiHtml5,
  CSS: DiCss3,
  Javascript: DiJavascript1,
  Docker: DiDocker,
  Linux: DiLinux,
  Git: DiGit,
};
const iconColors: { [key: string]: string } = {
  React: "#61dafb",
  "Next.js": "#ffffff",
  "Node.js": "#3c873a",
  Express: "#444444",
  MongoDB: "#47a248",
  Redux: "#764abc",
  "Socket.IO": "#010101",
  Firebase: "#ffca28",
  TypeScript: "#3178c6",
  "Framer Motion": "#0055ff",
  "CSS Modules": "#264de4",
  Figma: "#f24e1e",
  Java: "#f89820",
  PHP: "#8892be",
  Laravel: "#fb503b",
  Flutter: "#02569b",
  Kotlin: "#7f52ff",
  Android: "#3ddc84",
  Swift: "#f05138",
  HTML5: "#e34f26",
  CSS: "#264de4",
  Javascript: "#f7df1e",
  Docker: "#0db7ed",
  Linux: "#e95420",
  Git: "#f1502f",
};
const certificationsData: Certification[] = [
  {
    id: 1,
    title: "Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "2022-11-01",
    imageUrl: "https://picsum.photos/seed/web-dasar/800/450",
    technologies: ["HTML5", "CSS", "Javascript"],
    credentialUrl: "https://www.dicoding.com/certificates/N9ZO52KLJPG5",
  },
  {
    id: 2,
    title: "Cloud Practitioner Essentials",
    issuer: "AWS Skill Builder",
    date: "2022-10-15",
    imageUrl: "https://picsum.photos/seed/aws-cloud/800/450",
    technologies: ["Docker", "Linux"],
  },
  {
    id: 3,
    title: "Dasar-Dasar Keamanan Siber",
    issuer: "Cisco Networking Academy",
    date: "2023-01-20",
    imageUrl: "https://picsum.photos/seed/cisco-cyber/800/450",
    technologies: ["Git"],
  },
  {
    id: 4,
    title: "Full-Stack Web Developer",
    issuer: "Codecademy",
    date: "2023-05-10",
    imageUrl: "https://picsum.photos/seed/fullstack-web/800/450",
    technologies: ["React", "Node.js", "Express"],
  },
  {
    id: 5,
    title: "Belajar JavaScript Lanjutan",
    issuer: "Dicoding Indonesia",
    date: "2023-06-05",
    imageUrl: "https://picsum.photos/seed/js-lanjutan/800/450",
    technologies: ["Javascript", "Node.js"],
  },
  {
    id: 6,
    title: "Manajemen Proyek Scrum",
    issuer: "Coursera",
    date: "2023-07-30",
    imageUrl: "https://picsum.photos/seed/scrum-project/800/450",
    technologies: [],
  },
  {
    id: 7,
    title: "Desain UI/UX Fundamental",
    issuer: "Skilvul",
    date: "2023-08-15",
    imageUrl: "https://picsum.photos/seed/uiux-design/800/450",
    technologies: ["Figma"],
  },
  {
    id: 8,
    title: "Belajar React untuk Pemula",
    issuer: "BuildWithAngga",
    date: "2023-09-01",
    imageUrl: "https://picsum.photos/seed/react-pemula/800/450",
    technologies: ["React"],
  },
];
const ITEMS_PER_PAGE = 6;

// Varian Animasi
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
const sidebarVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.2, staggerChildren: 0.1 },
  },
};
const sidebarGroupVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

// Komponen Judul Animasi
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
};
const titleContainerVariants: Variants = {
  visible: { transition: { staggerChildren: 0.04 } },
};
interface AnimatedTitleProps {
  text: string;
}
const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text }) => (
  <motion.h2
    className={styles.animatedGradientTitle}
    variants={titleContainerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.8 }}
  >
    {Array.from(text).map((letter, index) => (
      <motion.span key={index} variants={letterVariants}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.h2>
);

const CertificationSection: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"Newest" | "Oldest">("Newest");
  const [activeTechs, setActiveTechs] = useState<string[]>([]);
  const [techSearch, setTechSearch] = useState("");

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    certificationsData.forEach((cert) =>
      cert.technologies.forEach((tech) => techSet.add(tech))
    );
    return Array.from(techSet).sort();
  }, []);

  const displayTechs = useMemo(() => {
    if (!techSearch) return allTechs;
    return allTechs.filter((tech) =>
      tech.toLowerCase().includes(techSearch.toLowerCase())
    );
  }, [allTechs, techSearch]);

  const filteredCertifications = useMemo(() => {
    const techFiltered =
      activeTechs.length === 0
        ? certificationsData
        : certificationsData.filter((cert) =>
            activeTechs.every((activeTech) =>
              cert.technologies.includes(activeTech)
            )
          );
    return [...techFiltered].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortBy === "Newest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  }, [activeTechs, sortBy]);

  const totalPages = Math.ceil(filteredCertifications.length / ITEMS_PER_PAGE);
  const paginatedCertifications = filteredCertifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    const newTotalPages = Math.ceil(
      filteredCertifications.length / ITEMS_PER_PAGE
    );
    if (page >= 1 && page <= (newTotalPages || 1)) {
      setCurrentPage(page);
      document
        .getElementById("certifications")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "Newest" | "Oldest");
    setCurrentPage(1);
  };

  const handleTechFilter = (tech: string) => {
    setActiveTechs((prevTechs) =>
      prevTechs.includes(tech)
        ? prevTechs.filter((t) => t !== tech)
        : [...prevTechs, tech]
    );
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    setActiveTechs([]);
    setCurrentPage(1);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <section id="certifications" className={styles.certificationSection}>
        <div className="page-container">
          <div className={styles.sectionTitle}>
            <AnimatedTitle text="My Certifications" />
            <p>
              A collection of my professional certifications and qualifications.
            </p>
          </div>
          <div className={styles.mainContentLayout}>
            <motion.aside
              className={styles.controlsSidebar}
              variants={sidebarVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className={styles.controlGroup}
                variants={sidebarGroupVariants}
              >
                <h4>
                  <FaFilter /> Sort By
                </h4>
                <div className={styles.selectWrapper}>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={handleSortChange}
                    className={styles.sortSelect}
                  >
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                  </select>
                </div>
              </motion.div>

              <motion.div
                className={styles.controlGroup}
                variants={sidebarGroupVariants}
              >
                <h4>
                  <FiGrid /> Filter by Technology
                </h4>
                <div className={styles.techSearchWrapper}>
                  <FiSearch className={styles.techSearchIcon} />
                  <input
                    type="search"
                    placeholder="Search technology..."
                    className={styles.techSearchInput}
                    value={techSearch}
                    onChange={(e) => setTechSearch(e.target.value)}
                  />
                </div>
                <div className={styles.techFilterContainer}>
                  <motion.button
                    onClick={handleSelectAll}
                    className={`${styles.techFilterButton} ${
                      activeTechs.length === 0 ? styles.activeTech : ""
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    All
                  </motion.button>
                  {displayTechs.map((tech) => (
                    <motion.button
                      key={tech}
                      onClick={() => handleTechFilter(tech)}
                      className={`${styles.techFilterButton} ${
                        activeTechs.includes(tech) ? styles.activeTech : ""
                      }`}
                      whileHover={{ y: -2 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      {tech}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {totalPages > 1 && (
                <motion.div
                  className={styles.controlGroup}
                  variants={sidebarGroupVariants}
                >
                  <h4>
                    <FaFileAlt /> Page
                  </h4>
                  <div className={styles.pagination}>
                    <motion.button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={styles.navButton}
                      aria-label="Previous Page"
                      whileHover={{ scale: currentPage > 1 ? 1.1 : 1 }}
                      whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
                    >
                      {" "}
                      <FaChevronLeft />{" "}
                    </motion.button>
                    {pageNumbers.map((number) => (
                      <motion.button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`${styles.pageButton} ${
                          currentPage === number ? styles.activePage : ""
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {number}
                      </motion.button>
                    ))}
                    <motion.button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={styles.navButton}
                      aria-label="Next Page"
                      whileHover={{ scale: currentPage < totalPages ? 1.1 : 1 }}
                      whileTap={{ scale: currentPage < totalPages ? 0.95 : 1 }}
                    >
                      {" "}
                      <FaChevronRight />{" "}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.aside>

            <div className={styles.gridAndEmptyStateWrapper}>
              <motion.div
                key={`${sortBy}-${activeTechs.join("-")}-${currentPage}`}
                className={styles.certificationGrid}
                variants={gridContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {paginatedCertifications.map((cert) => (
                    <motion.div
                      key={cert.id}
                      className={styles.cardWrapper}
                      variants={gridItemVariants}
                      exit="exit"
                      layout
                    >
                      <motion.div className={styles.certificationCard}>
                        <div
                          className={styles.imageContainer}
                          onClick={() => setSelectedImage(cert.imageUrl)}
                        >
                          <Image
                            src={cert.imageUrl}
                            alt={`Certificate for ${cert.title}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            className={styles.cardImage}
                          />
                          <div className={styles.imageOverlay}>
                            <span>Click to Enlarge</span>
                          </div>
                        </div>
                        <div className={styles.cardContent}>
                          <span className={styles.issuer}>
                            <FaTrophy /> {cert.issuer}
                          </span>
                          <h3>{cert.title}</h3>
                          <div className={styles.technologies}>
                            {cert.technologies.length > 0 ? (
                              cert.technologies.map((tech) => {
                                const Icon =
                                  techIconMap[tech] || FaQuestionCircle;
                                return (
                                  <div
                                    key={tech}
                                    className={styles.techIcon}
                                    title={tech}
                                  >
                                    <Icon
                                      style={{
                                        color: iconColors[tech] || "#bbb",
                                      }}
                                    />
                                  </div>
                                );
                              })
                            ) : (
                              <div className={styles.noTech}>
                                General knowledge
                              </div>
                            )}
                          </div>
                          <div className={styles.cardFooter}>
                            {/* --- PERUBAHAN DI SINI: Menambahkan Ikon Kalender --- */}
                            <span className={styles.date}>
                              <FaCalendarAlt />
                              {new Date(cert.date).toLocaleDateString("en-GB", {
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.credentialLink}
                              >
                                Verify <FiExternalLink />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              {paginatedCertifications.length === 0 && (
                <motion.div
                  className={styles.noResults}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <FaQuestionCircle />
                  <p>No certifications found for this filter.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, y: "-50px" }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged certificate"
                width={1200}
                height={850}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </motion.div>
            <motion.button
              className={styles.closeButton}
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiXCircle />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificationSection;
