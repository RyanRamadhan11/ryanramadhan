//
// 📁 src/components/PortofolioSection/PortofolioSection.tsx
// (Versi Final dengan Judul Center, Dropdown Tahun, & Cursor Pointer)
//
"use client";

import React, { FC, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Slider from "react-slick";

import { BsArrowUpRightCircle } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";

import { portofolios, techIconMap, iconColors } from "@/data/portfolioData";

import styles from "./PortofolioSection.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Category =
  | "All"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "UI/UX"
  | "Desktop"
  | "Automation";

// --- Komponen Judul Animasi (Tidak Berubah) ---
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

const ITEMS_PER_PAGE = 6;

const filterCategories: Category[] = [
  "All",
  "Frontend",
  "Backend",
  "Mobile",
  "UI/UX",
  "Desktop",
  "Automation",
];

// --- Komponen Panah Carousel (Tidak Berubah) ---
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
const NextArrow = (props: ArrowProps) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ${styles.slickArrow} ${styles.slickNext}`}
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
};
const PrevArrow = (props: ArrowProps) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ${styles.slickArrow} ${styles.slickPrev}`}
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
};

const PortofolioSection: FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [activeYear, setActiveYear] = useState<number | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);

  const yearFilterOptions: (number | "All")[] = useMemo(() => {
    const years = [...new Set(portofolios.map((p) => p.year))];
    years.sort((a, b) => b - a);
    return ["All", ...years];
  }, []);

  const filteredPortofolios = useMemo(() => {
    let filtered = portofolios;

    if (activeFilter !== "All") {
      filtered = filtered.filter((p) => p.category === activeFilter);
    }

    if (activeYear !== "All") {
      filtered = filtered.filter((p) => p.year === activeYear);
    }

    return filtered;
  }, [activeFilter, activeYear]);

  const totalPages = Math.ceil(filteredPortofolios.length / ITEMS_PER_PAGE);
  const paginatedPortofolios = filteredPortofolios.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterClick = (category: Category) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  // --- PERUBAHAN 1: Handler baru untuk dropdown tahun ---
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    // Nilai dari <select> selalu string, jadi kita konversi jika itu bukan "All"
    const newYear = value === "All" ? "All" : Number(value);
    setActiveYear(newYear);
    setCurrentPage(1);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: styles.customDotsContainer,
    customPaging: (_i: number) => <div className={styles.customPagingDot} />,
  };

  return (
    <section id="portofolio" className={styles.portofolioSection}>
      <div className="page-container">
        {/* --- PERUBAHAN 2: Wrapper div untuk menengahkan judul --- */}
        <div className={styles.titleContainer}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedTitle text="My Portofolio" />
          </motion.div>
        </div>

        {/* --- Filter Kategori --- */}
        <div className={styles.filterWrapper}>
          <div className={styles.filterContainer}>
            {filterCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilterClick(category)}
                className={`${styles.filterButton} ${
                  activeFilter === category ? styles.active : ""
                }`}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* --- PERUBAHAN 3: UI untuk Filter Tahun diubah menjadi Dropdown --- */}
          <div className={styles.dropdownWrapper}>
            <select
              id="year-filter"
              className={styles.yearDropdown}
              value={activeYear}
              onChange={handleYearChange}
            >
              {yearFilterOptions.map((year) => (
                <option key={year} value={year}>
                  {year === "All" ? "All Years" : year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div className={styles.portofolioGrid} layout>
            {paginatedPortofolios.map((portofolio) => (
              <motion.div
                key={`${portofolio.id}-${portofolio.title}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={styles.cardWrapper}
              >
                <div className={styles.portofolioCard}>
                  <Slider {...sliderSettings} className={styles.carousel}>
                    {portofolio.imageUrls.map((url, index) => (
                      <div key={index} className={styles.imageContainer}>
                        <Image
                          src={url}
                          alt={`${portofolio.title} - view ${index + 1}`}
                          fill
                          className={styles.carouselImage}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </Slider>

                  <div className={styles.portofolioContent}>
                    <div className={styles.header}>
                      <div className={styles.metaInfo}>
                        <span className={styles.categoryTag}>
                          {portofolio.category}
                        </span>
                        <span className={styles.yearTag}>
                          <FaCalendarAlt /> {portofolio.year}
                        </span>
                      </div>
                      <h3>{portofolio.title}</h3>
                    </div>

                    <p>{portofolio.description_short}</p>

                    <div className={styles.technologies}>
                      {portofolio.technologies.map((tech) => {
                        const Icon = techIconMap[tech] || "span";
                        return (
                          <div
                            key={tech}
                            className={styles.techIcon}
                            title={tech}
                          >
                            <Icon
                              style={{ color: iconColors[tech] || "#a0a0a0" }}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className={styles.portofolioLinks}>
                      <Link
                        href={`/portofolio/${portofolio.id}`}
                        className={styles.detailLink}
                        title="Lihat Detail"
                      >
                        <span>View Detail</span>
                        <BsArrowUpRightCircle />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {paginatedPortofolios.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.noResults}
          >
            <p>Oops! No projects found for this filter combination.</p>
          </motion.div>
        )}

        {totalPages > 1 && (
          <motion.div
            className={styles.paginationContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortofolioSection;
