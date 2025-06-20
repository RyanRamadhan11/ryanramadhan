"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";

// Impor ikon dari react-icons
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  DiReact,
  DiNodejs,
  DiMongodb,
  DiJava,
  DiPhp,
  DiLaravel,
  DiAndroid,
  DiApple,
} from "react-icons/di";
import {
  SiNextdotjs,
  SiExpress,
  SiRedux,
  SiSocketdotio,
  SiFirebase,
  SiTypescript,
  SiCss3,
  SiFigma,
  SiFlutter,
  SiKotlin,
} from "react-icons/si";

import styles from "./PortofolioSection.module.css"; // Pastikan nama file sudah diubah

// CSS untuk Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Tipe Data & Kategori ---
type Category = "All" | "Frontend" | "Backend" | "Mobile" | "UI/UX" | "Desktop";

interface Portofolio {
  id: number;
  title: string;
  category: Omit<Category, "All">;
  description: string;
  technologies: string[];
  imageUrls: string[];
  liveUrl?: string;
  githubUrl?: string;
}

// --- Mapping Teknologi ke Ikon ---
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
  "CSS Modules": SiCss3,
  Figma: SiFigma,
  Java: DiJava,
  PHP: DiPhp,
  Laravel: DiLaravel,
  Flutter: SiFlutter,
  Kotlin: SiKotlin,
  Android: DiAndroid,
  Swift: DiApple,
};

// --- Konstanta Warna untuk Ikon ---
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
};

// --- Data Portofolio Lengkap ---
const portofolios: Portofolio[] = [
  // Data tidak diubah, salin dari prompt sebelumnya
  // --- FRONTEND (8 items) ---
  {
    id: 1,
    title: "Platform E-commerce",
    category: "Frontend",
    description:
      "Platform e-commerce dengan otentikasi, manajemen produk, dan integrasi payment gateway.",
    technologies: ["Next.js", "Redux", "TypeScript"],
    imageUrls: [
      "/images/profile.jpg",
      "/images/profile2.jpg",
      "/images/profile.jpg",
    ],
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
  },
  {
    id: 2,
    title: "Landing Page Interaktif",
    category: "Frontend",
    description:
      "Landing page produk dengan animasi Framer Motion yang memukau.",
    technologies: ["Next.js", "Framer Motion"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://demo.com",
  },
  {
    id: 3,
    title: "Company Profile V3",
    category: "Frontend",
    description: "Website company profile modern dengan CMS terintegrasi.",
    technologies: ["React", "TypeScript", "CSS Modules"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
  },
  {
    id: 4,
    title: "Dashboard Analitik",
    category: "Frontend",
    description:
      "Dashboard admin untuk visualisasi data penjualan secara real-time.",
    technologies: ["React", "Redux"],
    imageUrls: ["/images/profile.jpg", "/images/profile.jpg"],
    liveUrl: "https://demo.com",
  },
  {
    id: 5,
    title: "Aplikasi Web Streaming",
    category: "Frontend",
    description: "Klien web untuk layanan streaming film, mirip Netflix.",
    technologies: ["Next.js", "TypeScript"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
  },
  {
    id: 6,
    title: "Blog Pribadi",
    category: "Frontend",
    description:
      "Blog personal dengan sistem render statis untuk kecepatan maksimal.",
    technologies: ["Next.js"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://demo.com",
  },
  {
    id: 7,
    title: "Web App Reservasi Hotel",
    category: "Frontend",
    description: "Aplikasi pencarian dan pemesanan kamar hotel.",
    technologies: ["React", "Firebase"],
    imageUrls: ["/images/profile.jpg", "/images/profile.jpg"],
    githubUrl: "https://github.com",
  },
  {
    id: 8,
    title: "Clone Trello Board",
    category: "Frontend",
    description: "Aplikasi papan kanban dengan fungsionalitas drag-and-drop.",
    technologies: ["React"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://demo.com",
  },
  // --- BACKEND (7 items) ---
  {
    id: 9,
    title: "Aplikasi Chat Real-time",
    category: "Backend",
    description:
      "Aplikasi chat dengan WebSockets untuk pesan pribadi dan grup.",
    technologies: ["Node.js", "Socket.IO", "Express"],
    imageUrls: ["/images/profile.jpg", "/images/profile.jpg"],
    liveUrl: "https://demo.com",
  },
  {
    id: 10,
    title: "Sistem Manajemen Karyawan",
    category: "Backend",
    description:
      "RESTful API untuk manajemen data karyawan, absensi, dan penggajian.",
    technologies: ["Laravel", "PHP", "MongoDB"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
  },
  {
    id: 11,
    title: "API E-Learning",
    category: "Backend",
    description:
      "REST API untuk platform e-learning dengan manajemen kursus dan user.",
    technologies: ["Node.js", "Express", "MongoDB"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
  },
  {
    id: 12,
    title: "Server Otentikasi JWT",
    category: "Backend",
    description:
      "Microservice terpisah untuk handle otentikasi dan otorisasi user.",
    technologies: ["Node.js", "Express"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
  },
  {
    id: 13,
    title: "Sinkronisasi Data Gudang",
    category: "Backend",
    description:
      "Layanan background job untuk sinkronisasi stok barang antar gudang.",
    technologies: ["Java"],
    imageUrls: ["/images/profile.jpg"],
  },
  {
    id: 14,
    title: "API Payment Gateway",
    category: "Backend",
    description: "API untuk memproses pembayaran dari berbagai metode.",
    technologies: ["Laravel", "PHP"],
    imageUrls: ["/images/profile.jpg", "/images/profile.jpg"],
    githubUrl: "https://github.com",
  },
  {
    id: 15,
    title: "Bot Notifikasi Telegram",
    category: "Backend",
    description:
      "Bot untuk mengirim notifikasi penting dari sistem ke grup Telegram.",
    technologies: ["Node.js"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
  },
  // --- KATEGORI LAIN ---
  {
    id: 16,
    title: "Desain UI Aplikasi Mobile",
    category: "UI/UX",
    description: "Prototipe dan desain UI/UX untuk aplikasi travel booking.",
    technologies: ["Figma"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://figma.com",
  },
  {
    id: 17,
    title: "Aplikasi Mobile Restoran",
    category: "Mobile",
    description:
      "Aplikasi cross-platform untuk memesan makanan dan reservasi meja.",
    technologies: ["Flutter", "Firebase"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
  },
  {
    id: 18,
    title: "Aplikasi Kasir Desktop",
    category: "Desktop",
    description:
      "Aplikasi Point of Sale (POS) berbasis desktop untuk toko retail.",
    technologies: ["Java"],
    imageUrls: ["/images/profile.jpg"],
  },
  {
    id: 19,
    title: "Aplikasi Resep Makanan",
    category: "Mobile",
    description:
      "Aplikasi mobile berbasis Android native dengan koleksi resep.",
    technologies: ["Kotlin", "Android"],
    imageUrls: ["/images/profile.jpg", "/images/profile.jpg"],
    githubUrl: "https://github.com",
  },
];

const ITEMS_PER_PAGE = 6;
const filterCategories: Category[] = [
  "All",
  "Frontend",
  "Backend",
  "Mobile",
  "UI/UX",
  "Desktop",
];

// [BARU] Interface untuk props Arrow agar tidak 'any'
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
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPortofolios =
    activeFilter === "All"
      ? portofolios
      : portofolios.filter((p) => p.category === activeFilter);

  const totalPages = Math.ceil(filteredPortofolios.length / ITEMS_PER_PAGE);
  const paginatedPortofolios = filteredPortofolios.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterClick = (category: Category) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   fade: true,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  // };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // [DIUBAH] Slide otomatis setiap 3 detik
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // --- [BARU] Bagian untuk dot navigasi custom ---
    dotsClass: styles.customDotsContainer,
    // [FIX] Tambahkan komentar di bawah ini untuk mematikan error ESLint
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customPaging: (_i: number) => <div className={styles.customPagingDot} />,
    // ---------------------------------------------
  };

  return (
    <section id="portofolio" className={styles.portofolioSection}>
      <div className="page-container">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionTitle}
        >
          My Portofolio
        </motion.h2>

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

        <AnimatePresence mode="wait">
          <motion.div className={styles.portofolioGrid} layout>
            {paginatedPortofolios.map((portofolio) => (
              <motion.div
                key={portofolio.id}
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
                          fill // Menggunakan fill agar responsif di dalam container
                          className={styles.carouselImage} // Class baru untuk animasi
                          style={{ objectFit: "cover" }} // objectFit tetap cover
                        />
                      </div>
                    ))}
                  </Slider>

                  <div className={styles.portofolioContent}>
                    <div className={styles.header}>
                      <span className={styles.categoryTag}>
                        {portofolio.category}
                      </span>
                      <h3>{portofolio.title}</h3>
                    </div>
                    <p>{portofolio.description}</p>
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
                      {portofolio.liveUrl && (
                        <a
                          href={portofolio.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiExternalLink /> Live Demo
                        </a>
                      )}
                      {portofolio.githubUrl && (
                        <a
                          href={portofolio.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiGithub /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

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
