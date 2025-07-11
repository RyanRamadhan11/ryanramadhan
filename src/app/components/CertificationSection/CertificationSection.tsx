// 📁 src/components/CertificationSection/CertificationSection.tsx
// (Data telah dipisah)

"use client";

import React, { FC, useState, useMemo, useEffect } from "react";
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
  FaCalendarAlt,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import {
  DiReact,
  DiNodejs,
  DiJava,
  DiPhp,
  DiLaravel,
  DiGit,
  DiDocker,
  DiLinux,
  DiBootstrap,
  DiPostgresql,
  DiMysql,
  DiGithubBadge,
  DiAws,
  DiHtml5,
  DiCss3,
  DiJavascript1,
} from "react-icons/di";
import {
  SiNextdotjs,
  SiExpress,
  SiSpringboot,
  SiFigma,
  SiPostman,
  SiC,
} from "react-icons/si";
import { GrCertificate } from "react-icons/gr";

import styles from "./CertificationSection.module.css";
// [BARU] Impor data dan tipe dari file terpisah
import { certificationsData } from "@/data/certificationData";

// --- Hapus 'interface Certification' dan 'const certificationsData' dari sini ---

// --- Mapping Ikon (tidak ada perubahan) ---
const techIconMap: { [key: string]: React.ElementType } = {
  React: DiReact,
  "React Native": DiReact,
  "Next.js": SiNextdotjs,
  "Node.js": DiNodejs,
  Express: SiExpress,
  "Spring Boot": SiSpringboot,
  PostgreSQL: DiPostgresql,
  MySQL: DiMysql,
  Docker: DiDocker,
  Figma: SiFigma,
  Git: DiGit,
  GitHub: DiGithubBadge,
  Linux: DiLinux,
  Java: DiJava,
  PHP: DiPhp,
  Laravel: DiLaravel,
  Bootstrap: DiBootstrap,
  Postman: SiPostman,
  HTML5: DiHtml5,
  CSS3: DiCss3,
  Javascript: DiJavascript1,
  AWS: DiAws,
  Cybersecurity: GrCertificate,
  C: SiC,
};
const iconColors: { [key: string]: string } = {
  React: "#61dafb",
  "React Native": "#61dafb",
  "Next.js": "#ffffff",
  "Node.js": "#3c873a",
  Express: "#444444",
  "Spring Boot": "#6db33f",
  PostgreSQL: "#336791",
  MySQL: "#00758f",
  Docker: "#0db7ed",
  Figma: "#f24e1e",
  Git: "#f1502f",
  GitHub: "#ffffff",
  Linux: "#e95420",
  Java: "#f89820",
  PHP: "#777BB4",
  Laravel: "#fb503b",
  Bootstrap: "#7952b3",
  Postman: "#ff6c37",
  HTML5: "#e34f26",
  CSS3: "#1572b6",
  Javascript: "#f7df1e",
  AWS: "#ff9900",
  C: "#a8b9cc",
  Cybersecurity: "#00aaff",
};

const ITEMS_PER_PAGE = 4;

// ... sisa kode komponen tetap sama persis seperti sebelumnya ...
const generateSlidingPageNumbers = (
  totalPages: number,
  currentPage: number
) => {
  const windowSize = 5;
  if (totalPages <= windowSize) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  let startPage = Math.max(1, currentPage - 2);
  if (startPage + windowSize > totalPages + 1) {
    startPage = totalPages - windowSize + 1;
  }
  const endPage = startPage + windowSize - 1;
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
};

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
    // whileInView="visible"
    animate="visible"
    viewport={{ once: true, amount: 0.8 }}
  >
    {Array.from(text).map((letter, index) => (
      <motion.span key={index} variants={letterVariants}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.h2>
);
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

const SkeletonCard = () => (
  <div className={`${styles.cardWrapper} ${styles.skeletonWrapper}`}>
    <div className={styles.certificationCard}>
      <div
        className={`${styles.imageContainer} ${styles.skeletonElement}`}
      ></div>
      <div className={styles.cardContent}>
        <div
          className={`${styles.skeletonElement} ${styles.skeletonIssuer}`}
        ></div>
        <div
          className={`${styles.skeletonElement} ${styles.skeletonTitle}`}
        ></div>
        <div
          className={`${styles.skeletonElement} ${styles.skeletonTitle} ${styles.skeletonTitleShort}`}
        ></div>
        <div className={styles.technologies}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`${styles.skeletonElement} ${styles.skeletonTechIcon}`}
            ></div>
          ))}
        </div>
        <div className={styles.cardFooter}>
          <div
            className={`${styles.skeletonElement} ${styles.skeletonDate}`}
          ></div>
          <div
            className={`${styles.skeletonElement} ${styles.skeletonLink}`}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

const CertificationSection: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"Newest" | "Oldest">("Newest");
  const [activeTechs, setActiveTechs] = useState<string[]>([]);
  const [techSearch, setTechSearch] = useState("");
  const [pageInput, setPageInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
    if (page >= 1 && page <= totalPages) {
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

  const handleGoToPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput, 10);
    if (!isNaN(pageNum)) {
      handlePageChange(pageNum);
      setPageInput("");
    }
  };

  const pageNumbers = generateSlidingPageNumbers(totalPages, currentPage);

  return (
    <>
      <section id="certifications" className={styles.certificationSection}>
        <div className="page-container">
          <div className={styles.sectionTitle}>
            <div className={styles.titleWrapper}>
              <AnimatedTitle text="My" />
              <AnimatedTitle text="Certifications" />
            </div>
            <p>
              A collection of my professional certifications and qualifications.
            </p>
          </div>
          <div className={styles.mainContentLayout}>
            <motion.aside
              className={styles.controlsSidebar}
              variants={sidebarVariants}
              initial="hidden"
              // whileInView="visible"
              animate="visible"
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
                    onChange={(e) => {
                      setTechSearch(e.target.value);
                      setCurrentPage(1);
                    }}
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
                    <FaFileAlt /> Page Navigation
                  </h4>
                  <div className={styles.pagination}>
                    <motion.button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className={styles.navButton}
                      aria-label="First Page"
                      whileHover={{ scale: currentPage > 1 ? 1.1 : 1 }}
                      whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
                    >
                      <FaAngleDoubleLeft />
                    </motion.button>
                    <motion.button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={styles.navButton}
                      aria-label="Previous Page"
                      whileHover={{ scale: currentPage > 1 ? 1.1 : 1 }}
                      whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
                    >
                      <FaChevronLeft />
                    </motion.button>
                    {pageNumbers.map((page) => (
                      <motion.button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${styles.pageButton} ${
                          currentPage === page ? styles.activePage : ""
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {page}
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
                      <FaChevronRight />
                    </motion.button>
                    <motion.button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className={styles.navButton}
                      aria-label="Last Page"
                      whileHover={{ scale: currentPage < totalPages ? 1.1 : 1 }}
                      whileTap={{ scale: currentPage < totalPages ? 0.95 : 1 }}
                    >
                      <FaAngleDoubleRight />
                    </motion.button>
                  </div>
                  <form
                    onSubmit={handleGoToPage}
                    className={styles.goToPageForm}
                  >
                    <div className={styles.pageInputContainer}>
                      <span>Page</span>
                      <input
                        type="number"
                        value={pageInput}
                        onChange={(e) => setPageInput(e.target.value)}
                        className={styles.paginationInput}
                        min="1"
                        max={totalPages}
                        aria-label="Go to page"
                        placeholder="..."
                      />
                      <span className={styles.totalPagesText}>
                        of {totalPages}
                      </span>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.aside>

            <div className={styles.gridAndEmptyStateWrapper}>
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    className={styles.certificationGrid}
                    variants={gridContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                  >
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                      <SkeletonCard key={`skeleton-${index}`} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {paginatedCertifications.length > 0 ? (
                      <motion.div
                        key={`${sortBy}-${activeTechs.join(
                          "-"
                        )}-${currentPage}`}
                        className={styles.certificationGrid}
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate="visible"
                      >
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
                                  <span className={styles.date}>
                                    <FaCalendarAlt />{" "}
                                    {new Date(cert.date).toLocaleDateString(
                                      "en-GB",
                                      {
                                        month: "long",
                                        year: "numeric",
                                      }
                                    )}
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
                      </motion.div>
                    ) : (
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
                  </motion.div>
                )}
              </AnimatePresence>
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
            <motion.button
              className={styles.closeButton}
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiXCircle />
            </motion.button>
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
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificationSection;
