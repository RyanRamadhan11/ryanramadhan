/*
// 📁 src/components/PortofolioSection/PortofolioSection.tsx
// (Versi Final dengan Firebase Likes, Filter Modern, & Responsif)
*/
"use client";

import React, { FC, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Slider from "react-slick";

// Firebase Imports
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  increment,
  collection,
  Firestore,
} from "firebase/firestore";
// [DIHAPUS] Tidak perlu getAuth dan signInAnonymously lagi

import { BsArrowUpRightCircle } from "react-icons/bs";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaSearch,
  FaHeart, // --- TAMBAHAN BARU: Ikon untuk tombol like ---
} from "react-icons/fa";

import { portofolios, techIconMap, iconColors } from "@/data/portfolioData";

import styles from "./PortofolioSection.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Inisialisasi Firebase (Gantilah dengan konfigurasi Anda) ---
// PENTING: Ganti semua nilai "YOUR_..." dengan kunci asli dari Firebase Console Anda!
const firebaseConfig = {
  apiKey: "AIzaSyB9Gdna1ez-e9JCyRH4HfYBP7KZHPOAYsw",
  authDomain: "profile-ryanramdhan.firebaseapp.com",
  projectId: "profile-ryanramdhan",
  storageBucket: "profile-ryanramdhan.firebasestorage.app",
  messagingSenderId: "1019748072921",
  appId: "1:1019748072921:web:a56062380ec00a8e73edc8",
  measurementId: "G-GDYW5DLC8X",
};

// --- [PERBAIKAN] Fungsi untuk inisialisasi Firebase yang lebih aman ---
const getFirebaseApp = () => {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  } else {
    return getApp();
  }
};

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

// --- [BARU] Komponen untuk animasi loading ---
const LoadingSpinner = () => (
  <motion.div
    className={styles.loadingContainer}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <svg className={styles.loadingSpinner} viewBox="0 0 50 50">
      <circle
        className={styles.spinnerPath}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      ></circle>
    </svg>
  </motion.div>
);

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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [db, setDb] = useState<Firestore | null>(null);
  const [isLoading, setIsLoading] = useState(true); // <-- Tambahkan state loading

  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [likedItems, setLikedItems] = useState<string[]>([]);

  useEffect(() => {
    const app = getFirebaseApp();
    const firestoreDb = getFirestore(app);

    setDb(firestoreDb);

    const localLikedItems = JSON.parse(
      localStorage.getItem("likedPortfolioItems") || "[]"
    );
    setLikedItems(localLikedItems);

    const likesCollectionRef = collection(firestoreDb, "portfolioLikes");
    const unsubscribe = onSnapshot(
      likesCollectionRef,
      (snapshot) => {
        const newLikeCounts: { [key: string]: number } = {};
        snapshot.forEach((doc) => {
          newLikeCounts[doc.id] = doc.data().likes || 0;
        });
        setLikeCounts(newLikeCounts);
        setIsLoading(false); // <-- Set loading ke false setelah data pertama diterima
      },
      (error) => {
        console.error("Error fetching likes:", error);
        setIsLoading(false); // <-- Juga set loading false jika ada error
      }
    );

    return () => unsubscribe();
  }, []);

  const yearFilterOptions: (number | "All")[] = useMemo(() => {
    const years = [...new Set(portofolios.map((p) => p.year))];
    years.sort((a, b) => b - a);
    return ["All", ...years];
  }, []);

  const filteredPortofolios = useMemo(() => {
    let filtered = portofolios;
    const lowercasedQuery = searchQuery.toLowerCase();
    if (lowercasedQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(lowercasedQuery) ||
          p.description_short.toLowerCase().includes(lowercasedQuery)
      );
    }
    if (activeFilter !== "All") {
      filtered = filtered.filter((p) => p.category === activeFilter);
    }
    if (activeYear !== "All") {
      filtered = filtered.filter((p) => p.year === activeYear);
    }
    return filtered;
  }, [activeFilter, activeYear, searchQuery]);

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
    const newYear = value === "All" ? "All" : Number(value);
    setActiveYear(newYear);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // --- [PERBAIKAN] Fungsi handleLikeClick dengan Optimistic Update ---
  const handleLikeClick = async (portfolioId: string) => {
    if (!db) {
      console.error("GAGAL: Firebase belum siap.");
      return;
    }

    if (likedItems.includes(portfolioId)) {
      console.warn("INFO: Item ini sudah pernah di-like.");
      return;
    }

    // 1. Optimistic UI Update
    // Perbarui state secara lokal SEBELUM mengirim ke Firebase
    const newLikedItems = [...likedItems, portfolioId];
    setLikedItems(newLikedItems);
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [portfolioId]: (prevCounts[portfolioId] || 0) + 1,
    }));

    // Simpan ke localStorage
    localStorage.setItem("likedPortfolioItems", JSON.stringify(newLikedItems));

    // 2. Kirim pembaruan ke Firebase di latar belakang
    try {
      const likeDocRef = doc(db, "portfolioLikes", portfolioId);
      await setDoc(likeDocRef, { likes: increment(1) }, { merge: true });
    } catch (error) {
      console.error("GAGAL: Gagal update ke Firestore:", error);
      // Jika gagal, kembalikan state ke semula (rollback)
      setLikedItems(likedItems); // Kembalikan ke array liked sebelumnya
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [portfolioId]: (prevCounts[portfolioId] || 1) - 1,
      }));
      localStorage.setItem("likedPortfolioItems", JSON.stringify(likedItems));
    }
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

        {/* --- UI Filter yang Diperbarui --- */}
        <motion.div
          className={styles.filtersContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              id="search-filter"
              type="text"
              placeholder="Search project..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterContainer}>
              {filterCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleFilterClick(category)}
                  className={`${styles.filterButton} ${
                    activeFilter === category ? styles.active : ""
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className={styles.yearFilterWrapper}>
            <FaCalendarAlt className={styles.yearIcon} />
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
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingSpinner />
          ) : paginatedPortofolios.length > 0 ? (
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

                      {/* --- [PERBAIKAN] Aksi Kartu dengan konversi tipe data --- */}
                      <div className={styles.cardActions}>
                        <button
                          className={`${styles.likeButton} ${
                            likedItems.includes(String(portofolio.id))
                              ? styles.liked
                              : ""
                          }`}
                          onClick={() => handleLikeClick(String(portofolio.id))}
                          aria-label="Like this project"
                        >
                          <FaHeart />
                          <span>{likeCounts[String(portofolio.id)] || 0}</span>
                        </button>
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
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.noResults}
            >
              <p>Oops! No projects found for this filter combination.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {totalPages > 1 && !isLoading && (
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
