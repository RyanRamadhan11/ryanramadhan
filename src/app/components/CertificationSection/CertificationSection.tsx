"use client";

import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiXCircle } from "react-icons/fi";
import {
  FaTrophy,
  FaChevronLeft,
  FaChevronRight,
  FaQuestionCircle,
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
  DiGit, // DiCss3 diimpor dari sini
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

// CSS untuk Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Tipe Data untuk Sertifikat
interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  technologies: string[];
  credentialUrl?: string;
}

// --- Mapping & Warna Ikon Teknologi ---
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
  "CSS Modules": DiCss3, // [FIX] Menggunakan DiCss3 yang benar
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
  "Next.js": "#000000",
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

// --- DATA SERTIFIKAT ---
const certificationsData: Certification[] = [
  {
    id: 1,
    title: "Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "Issued Nov 2022",
    imageUrl: "/images/profile.jpg",
    technologies: ["HTML5", "CSS", "Javascript"],
    credentialUrl: "https://www.dicoding.com/certificates/N9ZO52KLJPG5",
  },
  {
    id: 2,
    title: "Cloud Practitioner Essentials",
    issuer: "AWS Skill Builder",
    date: "Issued Oct 2022",
    imageUrl: "/images/profile.jpg",
    technologies: ["Docker", "Linux"],
  },
  {
    id: 3,
    title: "Dasar-Dasar Keamanan Siber",
    issuer: "Cisco Networking Academy",
    date: "Issued Jan 2023",
    imageUrl: "/images/profile.jpg",
    technologies: ["Git"],
  },
  {
    id: 4,
    title: "Full-Stack Web Developer",
    issuer: "Codecademy",
    date: "Issued May 2023",
    imageUrl: "/images/profile.jpg",
    technologies: ["React", "Node.js", "Express"],
  },
  {
    id: 5,
    title: "Belajar JavaScript Lanjutan",
    issuer: "Dicoding Indonesia",
    date: "Issued Jun 2023",
    imageUrl: "/images/profile.jpg",
    technologies: ["Javascript", "Node.js"],
  },
  {
    id: 6,
    title: "Manajemen Proyek Scrum",
    issuer: "Coursera",
    date: "Issued Jul 2023",
    imageUrl: "/images/profile.jpg",
    technologies: [],
  },
  {
    id: 7,
    title: "Desain UI/UX Fundamental",
    issuer: "Skilvul",
    date: "Issued Aug 2023",
    imageUrl: "/images/profile.jpg",
    technologies: ["Figma"],
  },
];

const ITEMS_PER_PAGE = 6;

const CertificationSection: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"Newest" | "Oldest">("Newest");

  const sortedCertifications = [...certificationsData].sort((a, b) => {
    if (sortBy === "Newest") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  const totalPages = Math.ceil(sortedCertifications.length / ITEMS_PER_PAGE);
  const paginatedCertifications = sortedCertifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <section id="certifications" className={styles.certificationSection}>
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.sectionTitle}
          >
            <h2>My Certifications</h2>
            <p>
              A collection of my professional certifications and qualifications.
            </p>
          </motion.div>

          <div className={styles.certificationGrid}>
            <AnimatePresence>
              {paginatedCertifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={styles.cardWrapper}
                >
                  <div className={styles.certificationCard}>
                    <motion.div
                      className={styles.imageContainer}
                      onClick={() => setSelectedImage(cert.imageUrl)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        src={cert.imageUrl}
                        alt={`Certificate for ${cert.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div className={styles.imageOverlay}>
                        <span>Click to Enlarge</span>
                      </div>
                    </motion.div>
                    <div className={styles.cardContent}>
                      <span className={styles.issuer}>
                        <FaTrophy /> {cert.issuer}
                      </span>
                      <h3>{cert.title}</h3>
                      <div className={styles.technologies}>
                        {cert.technologies.map((tech) => {
                          const Icon = techIconMap[tech] || FaQuestionCircle;
                          return (
                            <div
                              key={tech}
                              className={styles.techIcon}
                              title={tech}
                            >
                              <Icon
                                style={{ color: iconColors[tech] || "#bbb" }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className={styles.cardFooter}>
                        <span className={styles.date}>{cert.date}</span>
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
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <motion.div
              className={styles.controlsContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.navButton}
                >
                  <FaChevronLeft />
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`${styles.pageButton} ${
                      currentPage === number ? styles.activePage : ""
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.navButton}
                >
                  <FaChevronRight />
                </button>
              </div>
              <div className={styles.sortContainer}>
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "Newest" | "Oldest")
                  }
                  className={styles.sortSelect}
                >
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal/Lightbox */}
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
