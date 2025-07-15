// 📁 src/app/portofolio/[id]/page.tsx

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";

// --- IMPOR SWIPER ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

// --- IMPOR CSS SWIPER ---
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  getPortfolioById,
  techIconMap,
  iconColors,
} from "@/data/portfolioData";

import { FaArrowLeft, FaLightbulb } from "react-icons/fa";
import { FiExternalLink, FiGithub, FiAlertTriangle } from "react-icons/fi";
import { BsBox, BsCodeSlash } from "react-icons/bs";

import styles from "./PortfolioDetail.module.css";

const PortfolioDetailPage: React.FC = () => {
  const params = useParams();
  const idString = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = parseInt(idString || "", 10);

  if (isNaN(id)) {
    notFound();
  }

  const portofolio = getPortfolioById(id);

  if (!portofolio) {
    notFound();
  }

  const {
    title,
    description,
    technologies,
    imageUrls,
    liveUrl,
    githubUrl,
    keyFeatures,
    challenges,
  } = portofolio;

  return (
    <motion.div
      className={styles.detailContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container">
        <header className={styles.header}>
          <Link href="/portofolio" className={styles.backButton}>
            <FaArrowLeft /> Back
          </Link>
          <div className={styles.breadcrumbs}>
            Projects <span className={styles.separator}>/</span>{" "}
            <span className={styles.current}>{title}</span>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <div className={styles.infoBoxes}>
              <div className={styles.infoBox}>
                <BsCodeSlash className={styles.infoBoxIcon} />
                <div>
                  <span className={styles.infoBoxValue}>
                    {technologies.length}
                  </span>
                  <span className={styles.infoBoxLabel}>Total Teknologi</span>
                </div>
              </div>
              {keyFeatures && keyFeatures.length > 0 && (
                <div className={styles.infoBox}>
                  <BsBox className={styles.infoBoxIcon} />
                  <div>
                    <span className={styles.infoBoxValue}>
                      {keyFeatures.length}
                    </span>
                    <span className={styles.infoBoxLabel}>Fitur Utama</span>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.actionButtons}>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.button} ${styles.liveDemo}`}
                >
                  <FiExternalLink /> Live Demo
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.button} ${styles.github}`}
                >
                  <FiGithub /> GitHub
                </a>
              )}
            </div>
            <div className={styles.techSection}>
              <h3 className={styles.techTitle}>Technologies Used</h3>
              <div className={styles.techGrid}>
                {technologies.map((tech) => {
                  const Icon = techIconMap[tech] || "span";
                  return (
                    <div key={tech} className={styles.techItem} title={tech}>
                      <Icon style={{ color: iconColors[tech] || "#a0a0a0" }} />
                      <span>{tech}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {challenges && (
              <motion.div
                className={styles.challengesSection}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className={styles.challengesTitle}>
                  Challenges & Solution
                </h3>
                <div className={styles.challengeBlock}>
                  <div className={styles.challengeHeader}>
                    <FiAlertTriangle className={styles.challengeIcon} />
                    <span>The Challenge</span>
                  </div>
                  <p>{challenges.problem}</p>
                </div>
                <div className={styles.challengeBlock}>
                  <div className={styles.challengeHeader}>
                    <FaLightbulb className={styles.solutionIcon} />
                    <span>The Solution</span>
                  </div>
                  <p>{challenges.solution}</p>
                </div>
              </motion.div>
            )}
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.previewContainer}>
              {/* --- CAROUSEL --- */}
              {imageUrls.length > 1 ? (
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  className={styles.swiperContainer}
                >
                  {imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={url}
                        alt={`${title} preview ${index + 1}`}
                        fill
                        className={styles.previewImage}
                        priority={index === 0}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                // Fallback gambar tunggal jika hanya ada satu
                <Image
                  src={imageUrls[0]}
                  alt={`${title} preview`}
                  fill
                  className={styles.previewImage}
                  priority
                />
              )}
            </div>

            {keyFeatures && keyFeatures.length > 0 && (
              <div className={styles.featuresSection}>
                <h3 className={styles.featuresTitle}>Key Features</h3>
                <ul className={styles.featuresList}>
                  {keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default PortfolioDetailPage;
