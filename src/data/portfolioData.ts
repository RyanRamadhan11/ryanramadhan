// 📁 src/data/portfolioData.ts
// (Versi Final dengan Ikon Lengkap & Deskripsi Profesional)

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
  DiMysql,
  DiHtml5,
  DiCss3,
  DiBootstrap,
  DiJavascript1,
  DiLinux,
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
  SiTailwindcss,
  SiJquery,
  SiDotnet,
} from "react-icons/si";
import {
  FaPython,
  FaVideo,
  FaDatabase,
  FaMicrochip,
  FaFolderOpen,
} from "react-icons/fa";
import { BsArrowLeftRight, BsStack, BsQrCodeScan } from "react-icons/bs";
import { TbBrandCSharp, TbPlugConnected } from "react-icons/tb"; // <-- Ikon baru
import { FiMonitor } from "react-icons/fi";
import { GrSchedules } from "react-icons/gr"; // <-- Ikon baru

// --- Tipe Data & Kategori ---
export type Category =
  | "All"
  | "Frontend"
  | "Backend"
  | "Fullstack"
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
  "CSS Modules": DiCss3,
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
  CSS: DiCss3,
  MySQL: DiMysql,
  HTML: DiHtml5,
  Javascript: DiJavascript1,
  Bootstrap: DiBootstrap,
  jQuery: SiJquery,
  Ajax: BsArrowLeftRight,
  CCTV: FaVideo,
  MultipleDatabase: BsStack,
  Linux: DiLinux,
  RFID: FaMicrochip,
  FileStorage: FaFolderOpen,
  "C#": TbBrandCSharp,
  ".NET": SiDotnet,
  Socket: SiSocketdotio,
  Desktop: FiMonitor,
  Scanner: BsQrCodeScan,
  MQTT: TbPlugConnected, // <-- Ikon baru ditambahkan
  Cronjob: GrSchedules, // <-- Ikon baru ditambahkan
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
  MySQL: "#00758f",
  HTML: "#e34f26",
  Javascript: "#f7df1e",
  Bootstrap: "#7952b3",
  jQuery: "#0769ad",
  Ajax: "#007fff",
  CCTV: "#e62b1e",
  MultipleDatabase: "#8c52ff",
  Linux: "#FCC624",
  RFID: "#4A90E2",
  FileStorage: "#F5A623",
  "C#": "#9b4f96",
  ".NET": "#512bd4",
  Socket: "#010101",
  Desktop: "#4A90E2",
  Scanner: "#43A047",
  MQTT: "#660066",
  Cronjob: "#5C6BC0",
};

// --- Data Portofolio Lengkap (dengan perbaikan) ---
export const portofolios: Portofolio[] = [
  {
    id: 1,
    title: "Real-Time Production Line Monitoring",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A real-time production line monitoring dashboard for Astra Honda Motor, integrating live data and CCTV feeds to enhance operational oversight.",
    description:
      "Developed a comprehensive web-based dashboard to monitor production line activities at Astra Honda Motor in real-time. The system aggregates data from multiple database sources, displays key performance indicators (KPIs), and integrates seamlessly with the existing CCTV network, providing supervisors with a unified view of the factory floor. The frontend utilizes Ajax and jQuery for dynamic updates without page reloads, ensuring a smooth user experience.",
    technologies: [
      "Laravel",
      "Bootstrap",
      "Firebase",
      "MySQL",
      "MultipleDatabase",
      "jQuery",
      "Ajax",
      "CCTV",
      "Linux",
      "FileStorage",
    ],
    imageUrls: [
      "/images/porto/porto-linemonitoring-1.png",
      "/images/porto/porto-linemonitoring-2.png",
    ],
    liveUrl: "https://demo-autochat.com",
    githubUrl: "https://github.com/user/autochat-discord",
    keyFeatures: [
      "Real-time dashboard displaying production counts, cycle times, and downtime.",
      "Live CCTV feed integration for visual monitoring of specific production lines.",
      "Data aggregation from multiple legacy and modern database systems.",
      "Dynamic UI updates using Ajax for a non-disruptive monitoring experience.",
    ],
    challenges: {
      problem:
        "The primary challenge was integrating and synchronizing data from two different database systems (a legacy SQL Server and a modern MySQL) without causing performance bottlenecks. Additionally, displaying low-latency CCTV streams in a web browser efficiently was a major hurdle.",
      solution:
        "I implemented Laravel's Multiple Database Connections feature to manage data from both sources seamlessly. For the real-time aspect, Firebase Realtime Database was used as a message broker to push live data updates to the frontend. For CCTV, we utilized a streaming protocol (like RTSP to HLS) to embed the video feeds with minimal latency.",
    },
  },
  {
    id: 2,
    title: "EQC Machining NP",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A centralized web platform for End-of-line Quality Control (EQC) in a machining process, featuring master data management and part traceability using RFID.",
    description:
      "This project serves as the central nervous system for the EQC Machining process. It's a web-based application built on Laravel that empowers administrators to manage all master data (parts, models, quality standards). The system provides full traceability of parts via RFID scanning, offers detailed historical data checking, and generates comprehensive production reports. Crucially, it acts as the single source of truth, providing data consumed by other critical factory applications, including the real-time Line Monitoring dashboard and a desktop analysis tool.",
    technologies: [
      "Laravel",
      "RFID",
      "Bootstrap",
      "Linux",
      "Figma",
      "MySQL",
      "FileStorage",
      "jQuery",
      "Ajax",
    ],
    imageUrls: [
      "/images/porto/porto-eqcmachining-2.png",
      "/images/porto/porto-eqcmachining-1.png",
    ],
    liveUrl: "https://demo-autochat.com",
    githubUrl: "https://github.com/user/autochat-discord",
    keyFeatures: [
      "Centralized Master Data management for parts, models, and quality standards.",
      "RFID-based part tracing for complete production history and traceability.",
      "Generation of detailed production and quality control reports.",
      "Acts as a central API hub for other factory applications, ensuring data consistency.",
      "Image upload functionality for documenting part defects.",
    ],
    challenges: {
      problem:
        "The main technical hurdle was to reliably capture data from hardware (RFID readers) within a web application environment and ensure data integrity across multiple connected systems that depend on this master data.",
      solution:
        "A middleware service was developed to listen to the RFID hardware and push data to a dedicated Laravel API endpoint. To maintain data integrity, the system was designed as the single source of truth; all other applications (like Line Monitoring) fetch data exclusively through its robust REST API, centralizing business logic and preventing data conflicts.",
    },
  },
  {
    id: 3,
    title: "Toscast Communicator",
    year: 2023,
    category: "Desktop",
    description_short:
      "A desktop application designed for direct communication with Fanuc CNC machines, enabling program transfer and real-time monitoring.",
    description:
      "Toscast Communicator is a robust desktop application built with C# and the .NET Framework. It provides a crucial bridge between operators and Fanuc-controlled CNC machines. The application facilitates the transfer of machining programs (G-code), retrieves operational data, and monitors machine status in real-time through low-level socket communication, streamlining the manufacturing workflow.",
    technologies: ["C#", ".NET", "Socket", "Desktop"],
    imageUrls: ["/images/porto/toscast-1.png", "/images/porto/toscast-2.png"],
    githubUrl: "https://github.com/user/toscast-communicator",
    keyFeatures: [
      "Direct bi-directional communication with Fanuc CNC machine controllers.",
      "Upload and download of machining programs (G-code).",
      "Real-time machine status monitoring (e.g., running, idle, alarm).",
      "User-friendly interface designed for factory floor operators.",
    ],
    challenges: {
      problem:
        "Establishing a stable and reliable low-level socket connection to the Fanuc machine controller, which uses a proprietary communication protocol, was a significant challenge. The application needed to handle various network conditions and machine states without crashing or losing data.",
      solution:
        "I utilized the .NET System.Net.Sockets library to build a custom communication layer that implements the Fanuc FOCAS protocol. The solution includes robust error handling and asynchronous operations to keep the UI responsive, even during long data transfers or network interruptions, ensuring stable communication.",
    },
  },
  {
    id: 4,
    title: "Cutting Tool Management System",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A web application for monitoring the lifecycle of cutting tools, including transaction history, traceability, and precision offset measurements (Z and X values).",
    description:
      "This system provides a comprehensive solution for managing high-value cutting tools in a precision manufacturing environment. It tracks the entire lifecycle of each tool, from registration to usage transactions and eventual disposal. A key feature is the module for recording and tracking tool offset measurements (Z and X values), which are critical for CNC machine setup and accuracy. The system ensures that operators always use tools with the correct calibration, reducing defects and machine downtime.",
    technologies: [
      "Laravel",
      "Bootstrap",
      "Firebase",
      "MySQL",
      "jQuery",
      "Ajax",
      "Linux",
      "Scanner",
      "FileStorage",
    ],
    imageUrls: [
      "/images/porto/porto-cuttingtool-1.png",
      "/images/porto/porto-cuttingtool-2.png",
      "/images/porto/porto-cuttingtool-3.png",
    ],
    githubUrl: "https://github.com/user/cutting-tool-management",
    keyFeatures: [
      "Complete tool lifecycle tracking and transaction history (check-in/check-out).",
      "Module for inputting and tracking critical Z and X offset values.",
      "QR code scanner integration for quick tool identification and data entry.",
      "Searchable database for tracing the history and current status of any tool.",
    ],
    challenges: {
      problem:
        "The most critical challenge was ensuring the absolute accuracy and integrity of the Z and X offset data. A small error in these values could lead to costly material waste or damage to the CNC machine. The system needed a foolproof way to log and verify these measurements.",
      solution:
        "I designed a two-step verification process for data entry. After an operator inputs the offset values, a supervisor must review and approve the entry before the tool is marked as 'ready for use' in the system. All changes are logged in an immutable audit trail using Firebase, ensuring that there is a permanent record of every measurement and approval, which is crucial for quality control.",
    },
  },
  {
    id: 5,
    title: "Factory Insight",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A web application for monitoring injection molding data, including actual production, rejects, and master data management with QR-based die change transactions.",
    description:
      "Factory Insight is a comprehensive monitoring platform that provides a complete overview of the injection molding production floor. It monitors real-time data for actual part injections and rejects, offering actionable insights to improve efficiency. The system also includes a full CRUD module for master data and a transactional feature for die changes, which is streamlined using QR code scanning.",
    technologies: [
      "Laravel",
      "Bootstrap",
      "Firebase",
      "MySQL",
      "jQuery",
      "Ajax",
      "Linux",
      "Scanner",
      "FileStorage",
    ],
    imageUrls: ["/images/porto/porto-fi-1.png", "/images/porto/porto-fi-2.png"],
    githubUrl: "https://github.com/user/factory-insight",
    keyFeatures: [
      "Real-time monitoring of part injection and reject counts.",
      "Full CRUD (Create, Read, Update, Delete) functionality for master data.",
      "Transactional die change process facilitated by QR code scanning.",
      "Informational dashboards for quick operational overview.",
    ],
    challenges: {
      problem:
        "The key challenge was ensuring the QR code scanning process for die changes was fast, reliable, and seamlessly integrated into the web interface, especially for operators using mobile devices on the noisy and fast-paced factory floor.",
      solution:
        "I developed a responsive, mobile-first web interface for the scanning feature using a robust JavaScript library for camera access and QR code decoding. To ensure speed, the validation logic was offloaded to a dedicated, optimized API endpoint in Laravel. This provided instant feedback to the operator while the full transaction was processed asynchronously in the background.",
    },
  },
  {
    id: 6,
    title: "Digital Checksheet System (WWT)",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A web application to digitize the Waste Water Treatment (WWT) checksheet process at AHM, featuring dynamic form configuration and a digital approval workflow.",
    description:
      "This project replaces a manual, paper-based checksheet system with a fully digital web application. It allows administrators to configure line stations, work schedules, and create dynamic checksheet formats. Operators can input data directly into the system, which is then sent for a multi-level digital approval process. The system uses MQTT for real-time alerts and Laravel's built-in scheduler (Cronjob) for automated tasks like report generation and notifications.",
    technologies: [
      "Laravel",
      "Bootstrap",
      "Firebase",
      "MySQL",
      "jQuery",
      "Ajax",
      "Linux",
      "FileStorage",
      "MQTT",
      "Cronjob",
    ],
    imageUrls: [
      "/images/porto/porto-checksheet-1.png",
      "/images/porto/porto-checksheet-2.png",
    ],
    githubUrl: "https://github.com/user/wwt-checksheet-system",
    keyFeatures: [
      "Dynamic checksheet format configuration by administrators.",
      "Multi-level digital approval workflow (Operator -> Foreman -> Supervisor).",
      "Real-time notifications for pending approvals via MQTT.",
      "Automated daily/weekly report generation using Cronjobs.",
      "Historical data logging and audit trails for compliance.",
    ],
    challenges: {
      problem:
        "Designing a flexible system to accommodate various checksheet formats that frequently change, and ensuring the approval workflow is reliable and cannot be bypassed. Another challenge was delivering timely notifications for required approvals without relying on constant user polling.",
      solution:
        "I created a dynamic form builder module that allows admins to define checksheet fields and rules without changing the code. The approval logic was implemented as a state machine within Laravel, ensuring each step is validated. For notifications, an MQTT broker was integrated to push real-time alerts to supervisors' dashboards when a checksheet requires their attention, triggered by Laravel Events. Scheduled tasks (Cronjobs) were used to handle report aggregation and email summaries, reducing server load during peak hours.",
    },
  },
  {
    id: 6,
    title: "Digital Checksheet System (WWT)",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A web application to digitize the Waste Water Treatment (WWT) checksheet process at AHM, featuring dynamic form configuration and a digital approval workflow.",
    description:
      "This project replaces a manual, paper-based checksheet system with a fully digital web application. It allows administrators to configure line stations, work schedules, and create dynamic checksheet formats. Operators can input data directly into the system, which is then sent for a multi-level digital approval process. The system uses MQTT for real-time alerts and Laravel's built-in scheduler (Cronjob) for automated tasks like report generation and notifications.",
    technologies: [
      "Laravel",
      "Bootstrap",
      "Firebase",
      "MySQL",
      "jQuery",
      "Ajax",
      "Linux",
      "FileStorage",
      "MQTT",
      "Cronjob",
    ],
    imageUrls: [
      "/images/porto/porto-checksheet-1.png",
      "/images/porto/porto-checksheet-2.png",
    ],
    githubUrl: "https://github.com/user/wwt-checksheet-system",
    keyFeatures: [
      "Dynamic checksheet format configuration by administrators.",
      "Multi-level digital approval workflow (Operator -> Foreman -> Supervisor).",
      "Real-time notifications for pending approvals via MQTT.",
      "Automated daily/weekly report generation using Cronjobs.",
      "Historical data logging and audit trails for compliance.",
    ],
    challenges: {
      problem:
        "Designing a flexible system to accommodate various checksheet formats that frequently change, and ensuring the approval workflow is reliable and cannot be bypassed. Another challenge was delivering timely notifications for required approvals without relying on constant user polling.",
      solution:
        "I created a dynamic form builder module that allows admins to define checksheet fields and rules without changing the code. The approval logic was implemented as a state machine within Laravel, ensuring each step is validated. For notifications, an MQTT broker was integrated to push real-time alerts to supervisors' dashboards when a checksheet requires their attention, triggered by Laravel Events. Scheduled tasks (Cronjobs) were used to handle report aggregation and email summaries, reducing server load during peak hours.",
    },
  },
  {
    id: 7,
    title: "Digital Checksheet System (WWT)",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A web application to digitize the Waste Water Treatment (WWT) checksheet process at AHM, featuring dynamic form configuration and a digital approval workflow.",
    description:
      "This project replaces a manual, paper-based checksheet system with a fully digital web application. It allows administrators to configure line stations, work schedules, and create dynamic checksheet formats. Operators can input data directly into the system, which is then sent for a multi-level digital approval process. The system uses MQTT for real-time alerts and Laravel's built-in scheduler (Cronjob) for automated tasks like report generation and notifications.",
    technologies: [
      "Laravel",
      "Bootstrap",
      "Firebase",
      "MySQL",
      "jQuery",
      "Ajax",
      "Linux",
      "FileStorage",
      "MQTT",
      "Cronjob",
    ],
    imageUrls: [
      "/images/porto/porto-checksheet-1.png",
      "/images/porto/porto-checksheet-2.png",
    ],
    githubUrl: "https://github.com/user/wwt-checksheet-system",
    keyFeatures: [
      "Dynamic checksheet format configuration by administrators.",
      "Multi-level digital approval workflow (Operator -> Foreman -> Supervisor).",
      "Real-time notifications for pending approvals via MQTT.",
      "Automated daily/weekly report generation using Cronjobs.",
      "Historical data logging and audit trails for compliance.",
    ],
    challenges: {
      problem:
        "Designing a flexible system to accommodate various checksheet formats that frequently change, and ensuring the approval workflow is reliable and cannot be bypassed. Another challenge was delivering timely notifications for required approvals without relying on constant user polling.",
      solution:
        "I created a dynamic form builder module that allows admins to define checksheet fields and rules without changing the code. The approval logic was implemented as a state machine within Laravel, ensuring each step is validated. For notifications, an MQTT broker was integrated to push real-time alerts to supervisors' dashboards when a checksheet requires their attention, triggered by Laravel Events. Scheduled tasks (Cronjobs) were used to handle report aggregation and email summaries, reducing server load during peak hours.",
    },
  },
];

export const getPortfolioById = (id: number): Portofolio | undefined => {
  return portofolios.find((p) => p.id === id);
};
