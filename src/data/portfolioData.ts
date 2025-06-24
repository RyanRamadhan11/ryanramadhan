//
// 📁 src/data/portfolioData.ts
// (Versi Final dengan keyFeatures dan year ditambahkan ke semua item)
//

import { motion } from "framer-motion";
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
  SiTailwindcss,
} from "react-icons/si";
import { FaPython } from "react-icons/fa";

// --- Tipe Data & Kategori ---
export type Category =
  | "All"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "UI/UX"
  | "Desktop"
  | "Automation";

export interface Portofolio {
  id: number;
  title: string;
  year: number; // Properti tahun ditambahkan di sini
  category: Omit<Category, "All">;
  description_short: string;
  description: string;
  technologies: string[];
  imageUrls: string[];
  liveUrl?: string;
  githubUrl?: string;
  keyFeatures?: string[];
}

// --- Mapping Teknologi ke Ikon ---
export const techIconMap: { [key: string]: React.ElementType } = {
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
  Python: FaPython,
  "Tailwind CSS": SiTailwindcss,
  CSS: SiCss3,
};

// --- Konstanta Warna untuk Ikon ---
export const iconColors: { [key: string]: string } = {
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
  Python: "#3776AB",
  "Tailwind CSS": "#06B6D4",
  CSS: "#264de4",
};

// --- Data Portofolio Lengkap ---
export const portofolios: Portofolio[] = [
  {
    id: 20,
    title: "AutoChat-Discord",
    year: 2024,
    category: "Automation",
    description_short:
      "Solusi otomatisasi untuk mengirim pesan terjadwal ke saluran Discord, berjalan 24/7 tanpa intervensi manual.",
    description:
      "AutoChat adalah solusi otomatisasi untuk mengirim pesan ke saluran Discord secara terjadwal. Pengguna dapat menentukan saluran tujuan, isi pesan, dan interval penundaan pengiriman pesan. Program ini berjalan 24/7, memungkinkan pengiriman pesan otomatis tanpa intervensi manual, sehingga memudahkan promosi atau komunikasi di Discord secara efisien.",
    technologies: ["React", "Python", "Firebase", "Tailwind CSS", "CSS"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
    keyFeatures: [
      "Kustomisasi konten pesan sesuai kebutuhan.",
      "Pengiriman pesan ke banyak channel sekaligus.",
      "Pengaturan interval waktu tunda antar pesan.",
      "Berjalan non-stop untuk memastikan pengiriman berkelanjutan.",
    ],
  },
  {
    id: 1,
    title: "Platform E-commerce",
    year: 2023,
    category: "Frontend",
    description_short:
      "Platform e-commerce dengan otentikasi, manajemen produk, dan integrasi payment gateway.",
    description:
      "Sebuah platform e-commerce yang lengkap dibangun dengan Next.js untuk performa server-side rendering. Dilengkapi dengan manajemen state menggunakan Redux Toolkit, sistem otentikasi pengguna, halaman manajemen produk untuk admin, dan integrasi penuh dengan payment gateway populer.",
    technologies: ["Next.js", "Redux", "TypeScript"],
    imageUrls: ["/images/profile.jpg", "/images/profile2.jpg"],
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
    keyFeatures: [
      "Otentikasi pengguna (Login & Register).",
      "Manajemen produk untuk admin.",
      "Keranjang belanja dan proses checkout.",
      "Integrasi dengan payment gateway.",
    ],
  },
  {
    id: 2,
    title: "Landing Page Interaktif",
    year: 2023,
    category: "Frontend",
    description_short:
      "Landing page produk dengan animasi Framer Motion yang memukau dan menarik perhatian pengunjung.",
    description:
      "Landing page produk yang dirancang untuk memberikan pengalaman pengguna yang tak terlupakan. Menggunakan Framer Motion untuk menciptakan animasi yang halus dan interaktif saat pengguna scroll, memberikan kesan modern dan profesional.",
    technologies: ["Next.js", "Framer Motion"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://demo.com",
    keyFeatures: [
      "Desain fully responsive.",
      "Animasi on-scroll dengan Framer Motion.",
      "Optimasi kecepatan loading.",
      "Call-to-Action (CTA) yang jelas.",
    ],
  },
  {
    id: 3,
    title: "Company Profile V3",
    year: 2022,
    category: "Frontend",
    description_short:
      "Website company profile modern yang dibangun dengan React, TypeScript, dan dilengkapi CMS terintegrasi.",
    description:
      "Versi ketiga dari website company profile yang didesain ulang sepenuhnya. Dibangun menggunakan React dan TypeScript untuk skalabilitas, serta dihubungkan dengan Headless CMS untuk memudahkan tim non-teknis memperbarui konten seperti berita, karier, dan informasi perusahaan.",
    technologies: ["React", "TypeScript", "CSS Modules"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
    keyFeatures: [
      "Antarmuka modern dan bersih.",
      "Terintegrasi dengan Headless CMS.",
      "Dibangun dengan TypeScript untuk type safety.",
      "Struktur komponen yang modular.",
    ],
  },
  {
    id: 4,
    title: "Dashboard Analitik",
    year: 2023,
    category: "Frontend",
    description_short:
      "Dashboard admin untuk visualisasi data penjualan secara real-time dengan grafik interaktif.",
    description:
      "Dashboard admin untuk visualisasi data penjualan secara real-time. Menggunakan chart library untuk menampilkan data dalam bentuk grafik yang interaktif dan mudah dipahami.",
    technologies: ["React", "Redux"],
    imageUrls: ["/images/profile.jpg", "/images/profile.jpg"],
    liveUrl: "https://demo.com",
    keyFeatures: [
      "Visualisasi data real-time.",
      "Grafik dan chart yang interaktif.",
      "Manajemen state dengan Redux.",
      "Layout admin yang responsif.",
    ],
  },
  {
    id: 5,
    title: "Aplikasi Web Streaming",
    year: 2022,
    category: "Frontend",
    description_short:
      "Klien web untuk layanan streaming film, dengan antarmuka yang mirip seperti Netflix.",
    description:
      "Klien web untuk layanan streaming film, mirip Netflix. Pengguna dapat menelusuri film berdasarkan genre, melihat detail, dan menonton trailer.",
    technologies: ["Next.js", "TypeScript"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
    keyFeatures: [
      "Pencarian dan filter film.",
      "Halaman detail untuk setiap film.",
      "Desain antarmuka mirip Netflix.",
      "Lazy loading untuk gambar dan data.",
    ],
  },
  {
    id: 6,
    title: "Blog Pribadi",
    year: 2021,
    category: "Frontend",
    description_short:
      "Blog personal dengan sistem render statis (SSG) dari Next.js untuk kecepatan maksimal dan SEO-friendly.",
    description:
      "Blog personal dengan sistem render statis untuk kecepatan maksimal. Setiap postingan di-generate sebagai halaman HTML statis saat build, memastikan waktu muat yang sangat cepat.",
    technologies: ["Next.js"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://demo.com",
    keyFeatures: [
      "Performa sangat cepat (Static Site Generation).",
      "SEO-friendly.",
      "Sistem routing berbasis file.",
      "Mudah di-deploy di platform Jamstack.",
    ],
  },
  {
    id: 7,
    title: "Web App Reservasi Hotel",
    year: 2023,
    category: "Frontend",
    description_short:
      "Aplikasi untuk pencarian, pemfilteran, dan pemesanan kamar hotel, terhubung dengan Firebase.",
    description:
      "Aplikasi pencarian dan pemesanan kamar hotel. Menggunakan Firebase sebagai backend untuk otentikasi pengguna dan database real-time untuk ketersediaan kamar.",
    technologies: ["React", "Firebase"],
    imageUrls: ["/images/profile.jpg", "/images/profile.jpg"],
    githubUrl: "https://github.com",
    keyFeatures: [
      "Pencarian hotel berdasarkan lokasi dan tanggal.",
      "Integrasi Firebase untuk database real-time.",
      "Otentikasi pengguna via Firebase Auth.",
      "Formulir pemesanan yang aman.",
    ],
  },
  {
    id: 8,
    title: "Clone Trello Board",
    year: 2022,
    category: "Frontend",
    description_short:
      "Aplikasi papan kanban dengan fungsionalitas drag-and-drop untuk manajemen tugas.",
    description:
      "Aplikasi papan kanban dengan fungsionalitas drag-and-drop. Pengguna dapat membuat board, list, dan card, serta memindahkannya antar list seperti pada Trello.",
    technologies: ["React"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://demo.com",
    keyFeatures: [
      "Fungsionalitas Drag-and-drop.",
      "Pembuatan card, list, dan board.",
      "State management di sisi klien.",
      "Antarmuka yang intuitif.",
    ],
  },
  {
    id: 9,
    title: "Aplikasi Chat Real-time",
    year: 2023,
    category: "Backend",
    description_short:
      "Backend untuk aplikasi chat dengan WebSockets untuk pesan pribadi dan grup.",
    description:
      "Aplikasi chat dengan WebSockets untuk pesan pribadi dan grup. Server dibangun dengan Node.js dan Socket.IO untuk komunikasi dua arah secara real-time.",
    technologies: ["Node.js", "Socket.IO", "Express"],
    imageUrls: ["/images/profile.jpg", "/images/profile.jpg"],
    liveUrl: "https://demo.com",
    keyFeatures: [
      "Komunikasi real-time via WebSockets.",
      "Dukungan untuk chat pribadi dan grup (rooms).",
      "Event-based communication.",
      "Skalabilitas untuk banyak koneksi.",
    ],
  },
  {
    id: 10,
    title: "Sistem Manajemen Karyawan",
    year: 2022,
    category: "Backend",
    description_short:
      "RESTful API untuk manajemen data karyawan, absensi, dan penggajian.",
    description:
      "RESTful API untuk manajemen data karyawan, absensi, dan penggajian. Dibuat dengan Laravel dan terhubung ke database MongoDB untuk fleksibilitas skema data.",
    technologies: ["Laravel", "PHP", "MongoDB"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
    keyFeatures: [
      "Endpoint CRUD untuk data karyawan.",
      "Sistem absensi dan rekapitulasi.",
      "Logika perhitungan penggajian.",
      "Arsitektur RESTful yang terstruktur.",
    ],
  },
  {
    id: 11,
    title: "API E-Learning",
    year: 2021,
    category: "Backend",
    description_short:
      "REST API untuk platform e-learning dengan manajemen kursus, materi, dan progres user.",
    description:
      "REST API untuk platform e-learning dengan manajemen kursus dan user. Menyediakan endpoint untuk CRUD kursus, materi, kuis, dan melacak progres belajar pengguna.",
    technologies: ["Node.js", "Express", "MongoDB"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
    keyFeatures: [
      "Manajemen kursus dan materi.",
      "Manajemen pengguna dan role.",
      "Pelacakan progres belajar.",
      "Endpoint yang aman dan terproteksi.",
    ],
  },
  {
    id: 12,
    title: "Server Otentikasi JWT",
    year: 2022,
    category: "Backend",
    description_short:
      "Microservice terpisah untuk menangani otentikasi dan otorisasi user menggunakan JWT.",
    description:
      "Microservice terpisah untuk handle otentikasi dan otorisasi user. Menerbitkan JSON Web Tokens (JWT) saat login dan memverifikasinya pada setiap request yang membutuhkan proteksi.",
    technologies: ["Node.js", "Express"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
    keyFeatures: [
      "Penerbitan JSON Web Token (JWT).",
      "Middleware untuk verifikasi token.",
      "Endpoint untuk registrasi dan login.",
      "Dapat diintegrasikan dengan berbagai layanan.",
    ],
  },
  {
    id: 13,
    title: "Sinkronisasi Data Gudang",
    year: 2021,
    category: "Backend",
    description_short:
      "Layanan background job untuk sinkronisasi stok barang antar gudang secara periodik.",
    description:
      "Layanan background job untuk sinkronisasi stok barang antar gudang. Dibangun dengan Java dan berjalan sebagai cron job untuk memastikan data stok selalu konsisten di berbagai lokasi.",
    technologies: ["Java"],
    imageUrls: ["/images/profile.jpg"],
    keyFeatures: [
      "Proses berjalan di background.",
      "Penjadwalan tugas (Cron job).",
      "Memastikan konsistensi data.",
      "Logging dan error handling.",
    ],
  },
  {
    id: 14,
    title: "API Payment Gateway",
    year: 2023,
    category: "Backend",
    description_short:
      "API untuk memproses pembayaran dari berbagai metode, seperti kartu kredit dan virtual account.",
    description:
      "API untuk memproses pembayaran dari berbagai metode. Berfungsi sebagai jembatan antara aplikasi utama dan penyedia layanan payment gateway pihak ketiga.",
    technologies: ["Laravel", "PHP"],
    imageUrls: ["/images/profile.jpg", "/images/profile.jpg"],
    githubUrl: "https://github.com",
    keyFeatures: [
      "Integrasi dengan payment provider.",
      "Penanganan callback dan notifikasi pembayaran.",
      "Keamanan transaksi.",
      "Endpoint untuk membuat dan mengecek status pembayaran.",
    ],
  },
  {
    id: 15,
    title: "Bot Notifikasi Telegram",
    year: 2024,
    category: "Backend",
    description_short:
      "Bot untuk mengirim notifikasi penting dari sistem ke grup atau user Telegram.",
    description:
      "Bot untuk mengirim notifikasi penting dari sistem ke grup Telegram. Berguna untuk alert monitoring, laporan harian, atau notifikasi event penting lainnya secara real-time.",
    technologies: ["Node.js"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
    keyFeatures: [
      "Pengiriman pesan ke user atau grup.",
      "Integrasi dengan API Telegram.",
      "Dapat dipicu oleh event dari sistem lain.",
      "Format pesan yang kaya (Markdown, tombol).",
    ],
  },
  {
    id: 16,
    title: "Desain UI Aplikasi Mobile",
    year: 2023,
    category: "UI/UX",
    description_short:
      "Prototipe dan desain UI/UX high-fidelity untuk aplikasi travel booking di Figma.",
    description:
      "Prototipe dan desain UI/UX untuk aplikasi travel booking. Proses desain meliputi user flow, wireframing, hingga pembuatan prototipe interaktif high-fidelity menggunakan Figma.",
    technologies: ["Figma"],
    imageUrls: ["/images/profile.jpg"],
    liveUrl: "https://figma.com",
    keyFeatures: [
      "User flow dan wireframing.",
      "Desain sistem dan komponen library.",
      "Prototipe interaktif high-fidelity.",
      "Kolaborasi tim desainer & developer.",
    ],
  },
  {
    id: 17,
    title: "Aplikasi Mobile Restoran",
    year: 2024,
    category: "Mobile",
    description_short:
      "Aplikasi cross-platform (iOS & Android) untuk memesan makanan dan reservasi meja.",
    description:
      "Aplikasi cross-platform untuk memesan makanan dan reservasi meja. Dibangun dengan Flutter, memungkinkan satu basis kode untuk berjalan di iOS dan Android.",
    technologies: ["Flutter", "Firebase"],
    imageUrls: ["/images/profile.jpg"],
    githubUrl: "https://github.com",
    keyFeatures: [
      "Satu basis kode untuk iOS & Android.",
      "Menu digital dengan gambar.",
      "Sistem pemesanan online.",
      "Fitur reservasi meja.",
    ],
  },
  {
    id: 18,
    title: "Aplikasi Kasir Desktop",
    year: 2021,
    category: "Desktop",
    description_short:
      "Aplikasi Point of Sale (POS) berbasis desktop untuk toko retail, dibuat dengan Java Swing.",
    description:
      "Aplikasi Point of Sale (POS) berbasis desktop untuk toko retail. Memiliki fitur manajemen inventaris, pencatatan transaksi, dan laporan penjualan. Dibuat dengan Java Swing untuk kompatibilitas lintas platform (Windows, macOS, Linux).",
    technologies: ["Java"],
    imageUrls: ["/images/profile.jpg"],
    keyFeatures: [
      "Manajemen inventaris barang.",
      "Pencatatan transaksi penjualan.",
      "Pembuatan laporan penjualan.",
      "Dapat berjalan offline.",
    ],
  },
  {
    id: 19,
    title: "Aplikasi Resep Makanan",
    year: 2022,
    category: "Mobile",
    description_short:
      "Aplikasi mobile berbasis Android native dengan koleksi resep yang bisa dicari dan disimpan.",
    description:
      "Aplikasi mobile berbasis Android native dengan koleksi resep. Dibuat menggunakan Kotlin dan komponen arsitektur Android modern (ViewModel, LiveData, Room).",
    technologies: ["Kotlin", "Android"],
    imageUrls: ["/images/profile.jpg", "/images/profile.jpg"],
    githubUrl: "https://github.com",
    keyFeatures: [
      "Database resep lokal dengan Room.",
      "Fitur pencarian resep.",
      "Simpan resep favorit.",
      "Dibangun dengan arsitektur modern (MVVM).",
    ],
  },
];

export const getPortfolioById = (id: number): Portofolio | undefined => {
  return portofolios.find((p) => p.id === id);
};
