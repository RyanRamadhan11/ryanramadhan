// 📁 src/data/portfolioData.ts
// (Versi Final dengan nama gambar masonry)

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
  year: number;
  category: Omit<Category, "All">;
  description_short: string;
  description: string;
  challenges?: {
    problem: string;
    solution: string;
  };
  technologies: string[];
  imageUrls: string[]; // Ini yang akan kita ubah
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
    imageUrls: ["/images/masonry/masonry-portfolio-1.jpg"], // Perubahan
    liveUrl: "https://demo-autochat.com",
    githubUrl: "https://github.com/user/autochat-discord",
    keyFeatures: [
      "Kustomisasi konten pesan sesuai kebutuhan.",
      "Pengiriman pesan ke banyak channel sekaligus.",
      "Pengaturan interval waktu tunda antar pesan.",
      "Berjalan non-stop untuk memastikan pengiriman berkelanjutan.",
    ],
    challenges: {
      problem:
        "Menangani rate limiting dari API Discord yang bisa memblokir bot jika terlalu agresif, serta memastikan program berjalan 24/7 dengan biaya rendah.",
      solution:
        "Mengimplementasikan logika 'exponential backoff' untuk jeda dinamis antar pesan. Untuk hosting, saya memanfaatkan cloud functions (Firebase) yang berjalan serverless, sehingga hanya aktif saat dibutuhkan dan sangat efisien.",
    },
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
    technologies: ["Next.js", "Redux", "TypeScript", "Tailwind CSS"],
    imageUrls: ["/images/masonry/masonry-portfolio-2.jpg"], // Perubahan
    liveUrl: "https://demo-ecommerce.com",
    githubUrl: "https://github.com/user/ecommerce-platform",
    keyFeatures: [
      "Otentikasi pengguna (Login & Register).",
      "Manajemen produk untuk admin.",
      "Keranjang belanja dan proses checkout.",
      "Integrasi dengan payment gateway.",
    ],
    challenges: {
      problem:
        "Mengelola state global yang kompleks (keranjang, login, data produk) di seluruh aplikasi menjadi tantangan, terutama saat harus sinkron antara client dan server.",
      solution:
        "Menggunakan Redux Toolkit dengan createSlice untuk manajemen state yang terstruktur. Untuk sinkronisasi, data awal di-fetch melalui server-side rendering (SSR) Next.js untuk memastikan konsistensi saat halaman pertama kali dimuat.",
    },
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
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    imageUrls: [
      "/images/masonry/masonry-portfolio-3.jpg",
      "/images/masonry/masonry-portfolio-8.jpg",
    ], // Perubahan
    liveUrl: "https://demo-landing.com",
    githubUrl: "https://github.com/user/interactive-landing-page",
    keyFeatures: [
      "Desain fully responsive.",
      "Animasi on-scroll dengan Framer Motion.",
      "Optimasi kecepatan loading.",
      "Call-to-Action (CTA) yang jelas.",
    ],
    challenges: {
      problem:
        "Menjaga performa website tetap optimal (terutama First Contentful Paint) meskipun menggunakan banyak animasi kompleks yang berpotensi membebani browser.",
      solution:
        "Saya mengoptimalkan animasi dengan hanya menjalankannya saat elemen masuk ke viewport menggunakan 'whileInView'. Selain itu, saya lebih banyak menganimasikan properti 'transform' dan 'opacity' yang lebih efisien di-render oleh GPU.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-4.jpg"], // Perubahan
    liveUrl: "https://demo-compro.com",
    githubUrl: "https://github.com/user/company-profile-v3",
    keyFeatures: [
      "Antarmuka modern dan bersih.",
      "Terintegrasi dengan Headless CMS.",
      "Dibangun dengan TypeScript untuk type safety.",
      "Struktur komponen yang modular.",
    ],
    challenges: {
      problem:
        "Memastikan proses pengambilan data dari Headless CMS secepat mungkin dan mendesain komponen yang fleksibel namun tetap kokoh agar konten dari tim non-teknis tidak merusak layout.",
      solution:
        "Data di-fetch pada sisi server (SSR) atau di-generate saat build (SSG) untuk kecepatan. Komponen dirancang dengan validasi data yang ketat menggunakan TypeScript, serta memberikan fallback jika ada konten yang hilang atau tidak sesuai format.",
    },
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
    technologies: ["React", "Redux", "CSS"],
    imageUrls: [
      "/images/masonry/masonry-portfolio-5.jpg",
      "/images/masonry/masonry-portfolio-6.jpg",
    ], // Perubahan
    liveUrl: "https://demo-dashboard.com",
    githubUrl: "https://github.com/user/analytics-dashboard",
    keyFeatures: [
      "Visualisasi data real-time.",
      "Grafik dan chart yang interaktif.",
      "Manajemen state dengan Redux.",
      "Layout admin yang responsif.",
    ],
    challenges: {
      problem:
        "Merender ulang grafik dengan dataset besar secara efisien tanpa membuat UI menjadi lambat atau tidak responsif setiap kali ada data baru masuk.",
      solution:
        "Menggunakan teknik 'memoization' dengan React.memo pada komponen grafik. Selain itu, proses transformasi data yang berat dilakukan di dalam Redux selector yang juga di-memoize, sehingga kalkulasi tidak diulang jika data input tidak berubah.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-6.jpg"], // Perubahan
    liveUrl: "https://demo-streaming.com",
    githubUrl: "https://github.com/user/streaming-web-app",
    keyFeatures: [
      "Pencarian dan filter film.",
      "Halaman detail untuk setiap film.",
      "Desain antarmuka mirip Netflix.",
      "Lazy loading untuk gambar dan data.",
    ],
    challenges: {
      problem:
        "Menampilkan ribuan poster film dalam grid tanpa memperlambat waktu muat awal halaman dan menyebabkan jank (lag) saat scrolling.",
      solution:
        "Menerapkan 'virtualized list' atau 'infinite scroll' yang hanya me-render item yang terlihat di layar. Setiap gambar poster juga menggunakan 'lazy loading' dan placeholder blur untuk pengalaman yang lebih mulus.",
    },
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
    technologies: ["Next.js", "CSS Modules"],
    imageUrls: [
      "/images/masonry/masonry-portfolio-7.jpg",
      "/images/masonry/masonry-portfolio-1.jpg",
    ], // Perubahan
    liveUrl: "https://demo-blog.com",
    githubUrl: "https://github.com/user/personal-blog",
    keyFeatures: [
      "Performa sangat cepat (Static Site Generation).",
      "SEO-friendly.",
      "Sistem routing berbasis file.",
      "Mudah di-deploy di platform Jamstack.",
    ],
    challenges: {
      problem:
        "Bagaimana cara menampilkan data dinamis atau melakukan update pada konten tanpa harus me-rebuild seluruh situs setiap saat?",
      solution:
        "Menggunakan fitur Incremental Static Regeneration (ISR) dari Next.js. Ini memungkinkan halaman statis untuk diperbarui secara otomatis di background setelah interval waktu tertentu, menggabungkan kecepatan statis dengan kesegaran data dinamis.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-2.jpg"], // Perubahan
    liveUrl: "https://demo-hotel.com",
    githubUrl: "https://github.com/user/hotel-reservation",
    keyFeatures: [
      "Pencarian hotel berdasarkan lokasi dan tanggal.",
      "Integrasi Firebase untuk database real-time.",
      "Otentikasi pengguna via Firebase Auth.",
      "Formulir pemesanan yang aman.",
    ],
    challenges: {
      problem:
        "Memastikan ketersediaan kamar ditampilkan secara real-time kepada semua pengguna untuk menghindari double-booking, terutama saat ada banyak pengguna yang melihat kamar yang sama.",
      solution:
        "Memanfaatkan Realtime Database dari Firebase. Saya men-subscribe perubahan data ketersediaan kamar secara langsung, sehingga setiap kali ada pemesanan, UI pada semua klien yang terhubung akan diperbarui secara otomatis tanpa perlu me-refresh halaman.",
    },
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
    technologies: ["React", "CSS"],
    imageUrls: [
      "/images/masonry/masonry-portfolio-8.jpg",
      "/images/masonry/masonry-portfolio-9.jpg",
    ], // Perubahan
    liveUrl: "https://demo-trello.com",
    githubUrl: "https://github.com/user/trello-clone",
    keyFeatures: [
      "Fungsionalitas Drag-and-drop.",
      "Pembuatan card, list, dan board.",
      "State management di sisi klien.",
      "Antarmuka yang intuitif.",
    ],
    challenges: {
      problem:
        "Mengelola state yang kompleks dari operasi drag-and-drop (memindahkan card antar list, mengubah urutan) dengan cara yang efisien dan tanpa bug.",
      solution:
        "Menggunakan library 'react-beautiful-dnd' yang menyediakan abstraksi tingkat tinggi untuk drag-and-drop. Semua logika pembaruan state diisolasi dalam satu fungsi reducer untuk memastikan perubahan state yang dapat diprediksi dan mudah di-debug.",
    },
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
    imageUrls: [
      "/images/masonry/masonry-portfolio-9.jpg",
      "/images/masonry/masonry-portfolio-3.jpg",
    ], // Perubahan
    liveUrl: "https://demo-chat-app.com",
    githubUrl: "https://github.com/user/realtime-chat-app",
    keyFeatures: [
      "Komunikasi real-time via WebSockets.",
      "Dukungan untuk chat pribadi dan grup (rooms).",
      "Event-based communication.",
      "Skalabilitas untuk banyak koneksi.",
    ],
    challenges: {
      problem:
        "Menangani ribuan koneksi WebSocket secara bersamaan pada satu server Node.js yang bersifat single-threaded, yang dapat menyebabkan bottleneck.",
      solution:
        "Menggunakan Node.js Cluster Module untuk menjalankan beberapa proses server pada core CPU yang berbeda. Untuk sinkronisasi antar proses, saya mengimplementasikan Redis Adapter untuk Socket.IO, sehingga pesan dapat di-broadcast ke semua klien terlepas dari proses mana mereka terhubung.",
    },
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
    imageUrls: [
      "/images/masonry/masonry-portfolio-7.jpg",
      "/images/masonry/masonry-portfolio-3.jpg",
    ], // Perubahan
    githubUrl: "https://github.com/user/employee-management-system",
    keyFeatures: [
      "Endpoint CRUD untuk data karyawan.",
      "Sistem absensi dan rekapitulasi.",
      "Logika perhitungan penggajian.",
      "Arsitektur RESTful yang terstruktur.",
    ],
    challenges: {
      problem:
        "Mendesain skema database yang fleksibel di MongoDB untuk menyimpan data karyawan yang bisa memiliki atribut berbeda-beda (misal: data keluarga, sertifikasi) tanpa mengorbankan performa query.",
      solution:
        "Memanfaatkan sifat schemaless dari MongoDB. Data umum disimpan di level atas dokumen, sedangkan data yang bervariasi disimpan dalam embedded document atau array di dalam dokumen karyawan. Indexing diterapkan pada field yang sering di-query untuk menjaga kecepatan pencarian.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-3.jpg"], // Perubahan
    githubUrl: "https://github.com/user/elearning-api",
    keyFeatures: [
      "Manajemen kursus dan materi.",
      "Manajemen pengguna dan role.",
      "Pelacakan progres belajar.",
      "Endpoint yang aman dan terproteksi.",
    ],
    challenges: {
      problem:
        "Merancang query database yang efisien untuk mengambil data kursus beserta progres setiap pengguna (misalnya, video mana yang sudah ditonton) tanpa menyebabkan N+1 query problem.",
      solution:
        "Menggunakan Aggregation Pipeline di MongoDB. Saya membuat pipeline yang dapat menggabungkan data dari koleksi 'courses', 'users', dan 'userProgress' dalam satu query tunggal di sisi database, sehingga mengurangi latensi dan beban pada server aplikasi.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-1.jpg"], // Perubahan
    githubUrl: "https://github.com/user/jwt-auth-server",
    keyFeatures: [
      "Penerbitan JSON Web Token (JWT).",
      "Middleware untuk verifikasi token.",
      "Endpoint untuk registrasi dan login.",
      "Dapat diintegrasikan dengan berbagai layanan.",
    ],
    challenges: {
      problem:
        "Bagaimana cara menangani token yang sudah tidak valid (misalnya setelah pengguna logout atau ganti password) sebelum masa expired-nya habis? JWT pada dasarnya stateless.",
      solution:
        "Mengimplementasikan sistem 'token blocklist' menggunakan cache cepat seperti Redis. Saat pengguna logout, JWT ID-nya dimasukkan ke dalam blocklist. Middleware verifikasi kemudian akan mengecek token tidak hanya keabsahannya, tetapi juga keberadaannya di blocklist Redis.",
    },
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
    imageUrls: ["/images/portfolio/masonry/masonry-portfolio-2.jpg"], // Perubahan
    githubUrl: "https://github.com/user/warehouse-sync",
    keyFeatures: [
      "Proses berjalan di background.",
      "Penjadwalan tugas (Cron job).",
      "Memastikan konsistensi data.",
      "Logging dan error handling.",
    ],
    challenges: {
      problem:
        "Menangani potensi 'race condition' dan 'data inconsistency' jika ada dua proses sinkronisasi yang berjalan bersamaan atau jika ada transaksi penjualan saat sinkronisasi sedang berlangsung.",
      solution:
        "Menerapkan mekanisme 'locking' pada data yang sedang disinkronisasi. Sebelum proses dimulai, sebuah 'lock' akan dibuat di database atau sistem cache. Proses lain tidak akan bisa berjalan sampai 'lock' tersebut dilepas, sehingga memastikan integritas data.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-3.jpg"], // Perubahan
    githubUrl: "https://github.com/user/payment-gateway-api",
    keyFeatures: [
      "Integrasi dengan payment provider.",
      "Penanganan callback dan notifikasi pembayaran.",
      "Keamanan transaksi.",
      "Endpoint untuk membuat dan mengecek status pembayaran.",
    ],
    challenges: {
      problem:
        "Menangani notifikasi pembayaran (callback/webhook) dari payment gateway yang bisa datang kapan saja dan harus diproses secara andal, bahkan jika server sedang down.",
      solution:
        "Menggunakan sistem antrian (Queue) bawaan Laravel dengan driver Redis. Saat webhook diterima, request tidak langsung diproses, tetapi dimasukkan ke dalam antrian sebagai sebuah 'job'. Worker terpisah akan memproses job ini secara asinkron, dengan mekanisme 'retry' jika terjadi kegagalan.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-1.jpg"], // Perubahan
    githubUrl: "https://github.com/user/telegram-notifier-bot",
    keyFeatures: [
      "Pengiriman pesan ke user atau grup.",
      "Integrasi dengan API Telegram.",
      "Dapat dipicu oleh event dari sistem lain.",
      "Format pesan yang kaya (Markdown, tombol).",
    ],
    challenges: {
      problem:
        "Menghindari pembatasan pengiriman (rate limiting) dari API Telegram saat bot harus mengirim notifikasi dalam jumlah besar dalam waktu singkat (misal: notifikasi ke ribuan pengguna).",
      solution:
        "Menerapkan mekanisme antrian pesan (message queue) sederhana. Pesan yang akan dikirim tidak langsung ditembakkan ke API, melainkan dimasukkan ke antrian dan dikirim secara bertahap dengan jeda waktu yang terkontrol untuk tetap berada di bawah ambang batas rate limit.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-2.jpg"], // Perubahan
    liveUrl: "https://www.figma.com/proto/your-prototype-link",
    githubUrl: "https://github.com/user/figma-design-system",
    keyFeatures: [
      "User flow dan wireframing.",
      "Desain sistem dan komponen library.",
      "Prototipe interaktif high-fidelity.",
      "Kolaborasi tim desainer & developer.",
    ],
    challenges: {
      problem:
        "Menciptakan design system yang konsisten dan mudah digunakan oleh developer, serta memastikan alur pengguna (user flow) seintuitif mungkin untuk berbagai skenario booking yang kompleks.",
      solution:
        "Mengembangkan component library yang terdokumentasi dengan baik di Figma, lengkap dengan varian dan status (hover, disabled, dll). Melakukan usability testing pada prototipe dengan pengguna target untuk mengidentifikasi dan memperbaiki masalah pada alur pengguna sejak dini.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-3.jpg"], // Perubahan
    githubUrl: "https://github.com/user/flutter-restaurant-app",
    keyFeatures: [
      "Satu basis kode untuk iOS & Android.",
      "Menu digital dengan gambar.",
      "Sistem pemesanan online.",
      "Fitur reservasi meja.",
    ],
    challenges: {
      problem:
        "Menjaga konsistensi state di berbagai layar yang kompleks (misalnya, data pesanan di keranjang harus update di halaman menu dan halaman checkout) dan memastikan performa UI tetap mulus.",
      solution:
        "Menerapkan arsitektur state management BLoC (Business Logic Component) untuk memisahkan UI dari logika bisnis. Ini memungkinkan state dapat diakses secara global dan efisien, serta mengoptimalkan rebuild widget Flutter agar hanya me-render bagian yang benar-benar berubah.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-1.jpg"], // Perubahan
    githubUrl: "https://github.com/user/java-pos-desktop",
    keyFeatures: [
      "Manajemen inventaris barang.",
      "Pencatatan transaksi penjualan.",
      "Pembuatan laporan penjualan.",
      "Dapat berjalan offline.",
    ],
    challenges: {
      problem:
        "Memastikan aplikasi tetap responsif dan tidak 'freeze' saat melakukan operasi yang memakan waktu, seperti men-generate laporan penjualan bulanan dari puluhan ribu data transaksi.",
      solution:
        "Menggunakan 'multithreading'. Operasi yang berat dijalankan pada thread terpisah (background thread) menggunakan Java SwingWorker, sehingga UI utama (Event Dispatch Thread) tetap bebas dan responsif. Progress bar juga ditampilkan untuk memberi feedback kepada pengguna.",
    },
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
    imageUrls: ["/images/masonry/masonry-portfolio-2.jpg"], // Perubahan
    githubUrl: "https://github.com/user/android-recipe-app",
    keyFeatures: [
      "Database resep lokal dengan Room.",
      "Fitur pencarian resep.",
      "Simpan resep favorit.",
      "Dibangun dengan arsitektur modern (MVVM).",
    ],
    challenges: {
      problem:
        "Mengelola database lokal secara efisien dan memastikan UI secara otomatis diperbarui ketika data di database berubah (misalnya, saat pengguna menambahkan resep ke favorit).",
      solution:
        "Menggunakan kombinasi Room Persistence Library dan LiveData. Room menyediakan abstraksi di atas SQLite, sedangkan LiveData adalah 'observable data holder' yang life-cycle-aware. UI akan secara otomatis meng-observe perubahan data dari database dan memperbarui dirinya sendiri tanpa perlu kode manual.",
    },
  },
];

export const getPortfolioById = (id: number): Portofolio | undefined => {
  return portofolios.find((p) => p.id === id);
};
