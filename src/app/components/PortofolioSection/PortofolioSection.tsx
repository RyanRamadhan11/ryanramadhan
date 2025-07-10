// 📁 src/components/PortofolioSection/PortofolioSection.tsx
// (Versi Final dengan Default Urutan Berdasarkan Tahun Terbaru)
"use client";

import React, { FC, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Slider from "react-slick";

import { BsArrowUpRightCircle, BsSearch } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";

import { portofolios, techIconMap, iconColors } from "@/data/portfolioData";

import styles from "./PortofolioSection.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Category = "All" | "Frontend" | "Backend" | "Mobile" | "Desktop";

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
  "Desktop",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const yearFilterOptions: (number | "All")[] = useMemo(() => {
    const years = [...new Set(portofolios.map((p) => p.year))];
    years.sort((a, b) => b - a);
    return ["All", ...years];
  }, []);

  // --- [BARU] Urutkan portofolio berdasarkan tahun (terbaru dulu) sebagai dasar ---
  const sortedPortofolios = useMemo(() => {
    // Buat salinan agar tidak mengubah array asli dan urutkan
    return [...portofolios].sort((a, b) => b.year - a.year);
  }, []); // Hanya dijalankan sekali karena portofolios tidak berubah

  // --- Logika filter terpadu untuk search, kategori, dan tahun ---
  const filteredPortofolios = useMemo(() => {
    // [DIUBAH] Mulai dari data yang sudah diurutkan, bukan data asli
    let filtered = sortedPortofolios;

    // 1. Filter berdasarkan Search Term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description_short
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          p.technologies.some((t) =>
            t.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // 2. Filter berdasarkan Kategori
    if (activeFilter !== "All") {
      filtered = filtered.filter((p) => p.category === activeFilter);
    }

    // 3. Filter berdasarkan Tahun
    if (activeYear !== "All") {
      filtered = filtered.filter((p) => p.year === activeYear);
    }

    return filtered;
  }, [sortedPortofolios, activeFilter, activeYear, searchTerm]); // [DIUBAH] Tambahkan sortedPortofolios sebagai dependency

  const totalPages = Math.ceil(filteredPortofolios.length / ITEMS_PER_PAGE);
  const paginatedPortofolios = filteredPortofolios.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterClick = (category: Category) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setActiveYear(value === "All" ? "All" : Number(value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: styles.customDotsContainer,
    customPaging: (_i: number) => <div className={styles.customPagingDot} />,
  };

  // ... sisa dari return JSX tidak ada perubahan ...
  return (
    <section id="portofolio" className={styles.portofolioSection}>
      <div className="page-container">
        <div className={styles.titleContainer}>
          {/* ... motion.div untuk judul ... */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "circOut" }}
          >
            <AnimatedTitle text="My Portofolio" />
          </motion.div>
        </div>

        {/* --- Panel Kontrol --- */}
        <motion.div
          className={styles.controlsPanel}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* ... filter buttons ... */}
          <div className={styles.filterGroup}>
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterClick(category)}
                className={`${styles.filterButton} ${
                  activeFilter === category ? styles.active : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {/* ... search & year dropdown ... */}
          <div className={styles.searchAndYearContainer}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search project or tech..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <BsSearch className={styles.searchIcon} />
            </div>

            <select
              id="year-filter"
              className={styles.yearDropdown}
              value={activeYear}
              onChange={handleYearChange}
              aria-label="Filter by year"
            >
              {yearFilterOptions.map((year) => (
                <option key={year} value={year}>
                  {year === "All" ? "All Years" : year}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* --- Grid & Cards --- */}
        <AnimatePresence mode="wait">
          <motion.div className={styles.portofolioGrid} layout>
            {paginatedPortofolios.map((portofolio) => (
              <motion.div
                key={`${portofolio.id}-${portofolio.title}`}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={styles.cardWrapper}
                style={
                  {
                    "--glow-color":
                      iconColors[portofolio.technologies[0]] || "#03dac6",
                  } as React.CSSProperties
                }
              >
                {/* ... Card Content ... */}
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
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                      {portofolio.technologies.slice(0, 7).map((tech) => {
                        const Icon = techIconMap[tech] || "span";
                        return (
                          <div
                            key={tech}
                            className={styles.techIcon}
                            title={tech}
                            style={
                              {
                                "--glow-color": iconColors[tech] || "#888",
                              } as React.CSSProperties
                            }
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

        {/* --- No Results & Pagination --- */}
        {filteredPortofolios.length === 0 && (
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
