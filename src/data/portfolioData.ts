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
  DiDocker,
  DiPostgresql,
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
  SiVite,
  SiGitlab,
  SiSpringboot,
  SiPostman,
  SiSwagger,
  SiApachemaven,
  SiJunit5,
  SiExpo, // <-- Ikon baru
} from "react-icons/si";
import {
  FaPython,
  FaVideo,
  FaDatabase,
  FaMicrochip,
  FaFolderOpen,
  FaRobot,
  FaTable,
  FaCogs,
  FaServer,
} from "react-icons/fa";
import { BsArrowLeftRight, BsStack, BsQrCodeScan } from "react-icons/bs";
import { TbBrandCSharp, TbPlugConnected } from "react-icons/tb";
import { FiMonitor } from "react-icons/fi";
import { GrSchedules } from "react-icons/gr";

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
  "React Native": DiReact, // Menggunakan ikon React untuk React Native
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
  MQTT: TbPlugConnected,
  Cronjob: GrSchedules,
  Robot: FaRobot,
  PivotTable: FaTable,
  Vite: SiVite,
  GitLab: SiGitlab,
  Docker: DiDocker,
  "Spring Boot": SiSpringboot,
  Postman: SiPostman,
  PostgreSQL: DiPostgresql,
  JPA: FaDatabase,
  Lombok: FaCogs,
  Swagger: SiSwagger,
  Maven: SiApachemaven,
  "REST API": FaServer,
  JUnit: SiJunit5,
  Expo: SiExpo, // <-- Ikon baru ditambahkan
};

// --- Konstanta Warna untuk Ikon ---
export const iconColors: { [key: string]: string } = {
  React: "#61dafb",
  "React Native": "#61dafb",
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
  Robot: "#A4A4A4",
  PivotTable: "#388E3C",
  Vite: "#646CFF",
  GitLab: "#FCA326",
  Docker: "#2496ED",
  "Spring Boot": "#6DB33F",
  Postman: "#FF6C37",
  PostgreSQL: "#336791",
  JPA: "#a865c9",
  Lombok: "#a865c9",
  Swagger: "#85EA2D",
  Maven: "#C71A36",
  "REST API": "#f58220",
  JUnit: "#25A162",
  Expo: "#000020",
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
      "GitLab",
    ],
    imageUrls: [
      "/images/porto/porto-linemonitoring-1.png",
      "/images/porto/porto-linemonitoring-2.png",
    ],
    liveUrl: "https://ryans-portfolio.dev/demo/line-monitoring",
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
      "A centralized web platform for Electronic Quality Control (EQC) in a machining process, featuring master data management and part traceability using RFID.",
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
      "GitLab",
    ],
    imageUrls: [
      "/images/porto/porto-eqcmachining-2.png",
      "/images/porto/porto-eqcmachining-1.png",
    ],
    liveUrl: "https://ryans-portfolio.dev/demo/eqc-machining",
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
    technologies: ["C#", ".NET", "Socket", "Desktop", "GitLab"],
    imageUrls: ["/images/porto/porto-toscast-1.png"],
    liveUrl: "https://ryans-portfolio.dev/demo/toscast",
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
      "GitLab",
    ],
    imageUrls: [
      "/images/porto/porto-cuttingtool-1.png",
      "/images/porto/porto-cuttingtool-2.png",
      "/images/porto/porto-cuttingtool-3.png",
    ],
    liveUrl: "https://ryans-portfolio.dev/demo/cutting-tool",
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
      "GitLab",
    ],
    imageUrls: ["/images/porto/porto-fi-1.png", "/images/porto/porto-fi-2.png"],
    liveUrl: "https://ryans-portfolio.dev/demo/factory-insight",
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
      "GitLab",
    ],
    imageUrls: [
      "/images/porto/porto-checksheet-1.png",
      "/images/porto/porto-checksheet-2.png",
    ],
    liveUrl: "https://ryans-portfolio.dev/demo/checksheet-wwt",
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
    title: "EQC Polymer & Mold Change System",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A centralized web platform for Electronic Quality Control (EQC) in the Astra Honda Motor (AHM) polymer production, featuring mold change management and part traceability using RFID.",
    description:
      "This project is a critical control system for the polymer injection molding line at AHM. It manages the entire EQC process, from master data configuration for parts and molds to real-time part traceability via RFID. A key module is the digital workflow for mold changes, ensuring the correct mold is installed for each production run, thereby minimizing errors and downtime. The system serves as a single source of truth for all polymer and mold-related data, feeding information to other factory applications.",
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
      "GitLab",
    ],
    imageUrls: [
      "/images/porto/porto-eqcpolymer-1.png",
      "/images/porto/porto-eqcpolymer-2.png",
    ],
    liveUrl: "https://ryans-portfolio.dev/demo/eqc-polymer",
    githubUrl: "https://github.com/user/eqc-polymer-system",
    keyFeatures: [
      "Master data management for polymer parts and injection molds.",
      "RFID-based traceability for both parts and molds.",
      "Digital workflow for mold change requests, verification, and approval.",
      "Interlocking with production systems to prevent runs with incorrect molds.",
      "Comprehensive reporting on quality control and mold changeover times.",
    ],
    challenges: {
      problem:
        "In a high-volume polymer production environment like AHM, using the wrong mold can lead to significant financial loss from wasted materials and production halts. The challenge was to create a foolproof system that automates the verification of mold changes, which was previously a manual and error-prone process.",
      solution:
        "The core solution was to implement an RFID-based validation system. Each mold and production order was tagged. Before a machine can start, the system requires an RFID scan of the installed mold. The Laravel backend then verifies this against the scheduled production order. If there's a mismatch, an alert is sent via MQTT and the machine's startup sequence is programmatically halted through an API call, completely preventing incorrect production runs.",
    },
  },
  {
    id: 8,
    title: "Traceability Welding System",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A real-time web application for the Astra Honda Motor (AHM) welding line to monitor robotic welder status and track the quality of each frame body produced.",
    description:
      "This application provides supervisors and engineers at AHM with a live, comprehensive view of the automated welding line. It monitors the operational status of each welding robot and, most importantly, tracks the quality (OK/NG - Not Good) of every motorcycle frame body that passes through the line. The system provides immediate feedback on production quality, enabling rapid response to any issues.",
    technologies: [
      "Laravel",
      "Bootstrap",
      "Linux",
      "Figma",
      "MySQL",
      "Robot",
      "jQuery",
      "Ajax",
      "GitLab",
    ],
    imageUrls: ["/images/porto/porto-tracaebilitywelding-1.png"],
    liveUrl: "https://ryans-portfolio.dev/demo/welding-traceability",
    githubUrl: "https://github.com/user/ahm-welding-traceability",
    keyFeatures: [
      "Real-time monitoring of welding robot statuses (e.g., active, idle, error).",
      "Live tracking of frame body production counts, separated by OK and NG results.",
      "Historical data logging for traceability and quality analysis.",
      "Dashboard with key performance indicators for the welding line.",
    ],
    challenges: {
      problem:
        "The primary difficulty was capturing real-time signals directly from the industrial welding robots' PLCs (Programmable Logic Controllers). These systems often use specialized protocols and are not designed for direct web integration. The data needed to be captured reliably without interfering with the robots' critical operations.",
      solution:
        "I developed a listener service that interfaced with a data aggregator on the factory network, which was already connected to the PLCs. This service would listen for specific signals (e.g., 'weld_cycle_complete', 'quality_check_pass', 'quality_check_fail') and push this data to a Laravel API endpoint. This decoupled approach ensured the web application received real-time data without directly polling the sensitive robotic equipment, maintaining both performance and operational safety.",
    },
  },
  {
    id: 9,
    title: "E-Maintenance Casting System",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A digital maintenance management system for the AHM casting division, featuring machine configuration, role-based reporting, and an interactive Pivot Table for data analysis.",
    description:
      "This web application digitizes the entire maintenance workflow for the casting division at Astra Honda Motor. It allows for detailed machine configuration, management of maintenance schedules, and a robust, role-based system for inputting maintenance reports. A standout feature is the interactive reporting dashboard, which uses a Pivot Table to allow managers to dynamically analyze maintenance data, such as breakdown frequency and spare part consumption, from various angles.",
    technologies: [
      "Laravel",
      "Bootstrap",
      "Linux",
      "Figma",
      "MySQL",
      "jQuery",
      "Ajax",
      "PivotTable",
      "GitLab",
    ],
    imageUrls: [
      "/images/porto/porto-emaincasting-1.png",
      "/images/porto/porto-emaincasting-2.png",
    ],
    liveUrl: "https://ryans-portfolio.dev/demo/e-maintenance",
    githubUrl: "https://github.com/user/ahm-emaintenance-casting",
    keyFeatures: [
      "Configuration module for casting machines and their components.",
      "Role-based access control for submitting and approving maintenance reports.",
      "Digital workflow for both preventive and corrective maintenance tasks.",
      "Interactive Pivot Table for multi-dimensional analysis of maintenance data.",
    ],
    challenges: {
      problem:
        "Generating complex, multi-dimensional maintenance reports (e.g., breakdown frequency per machine vs. shift vs. cause) directly from a large transactional database was slow and resource-intensive, causing the main application to lag.",
      solution:
        "I implemented a data summarization strategy using scheduled jobs (Cronjob) that pre-process raw data into a separate, optimized reporting table. For the frontend, I integrated a powerful JavaScript PivotTable library that allows users to drag-and-drop dimensions and measures, creating custom reports on-the-fly without querying the main database directly, which significantly improved performance and user experience.",
    },
  },
  {
    id: 10,
    title: "Machine Health & Tank Monitoring (WWT)",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A web application for the Astra Honda Motor (AHM) Waste Water Treatment plant to monitor the real-time status and volume levels of various chemical tanks.",
    description:
      "This application provides a critical monitoring dashboard for the WWT plant at AHM. It visualizes the real-time volume levels of multiple chemical tanks, displaying data through an intuitive and color-coded interface. The system is designed to prevent overflows or shortages by providing operators with immediate, at-a-glance information on tank statuses, which is crucial for maintaining operational safety and environmental compliance.",
    technologies: [
      "Laravel",
      "Bootstrap",
      "Linux",
      "Figma",
      "MySQL",
      "jQuery",
      "Ajax",
      "GitLab",
    ],
    imageUrls: ["/images/porto/porto-wwt-1.png"],
    liveUrl: "https://ryans-portfolio.dev/demo/wwt-monitoring",
    githubUrl: "https://github.com/user/ahm-wwt-monitoring",
    keyFeatures: [
      "Real-time visualization of tank volume levels with graphical indicators.",
      "Color-coded status alerts for different levels (e.g., Normal, Warning, Danger).",
      "Historical data logging for trend analysis and consumption reporting.",
      "A clean and simple interface designed for quick interpretation on the plant floor.",
    ],
    challenges: {
      problem:
        "The main challenge was to get real-time, accurate data from the industrial sensors inside the chemical tanks. These sensors often communicate over serial or analog protocols, not directly over a standard IT network, and the data needed to be presented on a web interface with minimal delay.",
      solution:
        "I designed a system where a local IoT gateway device (like a Raspberry Pi or an industrial controller) was connected directly to the tank sensors. This gateway was responsible for reading the raw sensor data, processing it, and then publishing it to a secure API endpoint on the Laravel server. The web frontend then used Ajax polling at a set interval to fetch the latest data from the server and update the dashboard, providing a near real-time view without overloading the network or the sensors.",
    },
  },
  {
    id: 11,
    title: "Machine Health Monitoring (Steel)",
    year: 2024,
    category: "Fullstack",
    description_short:
      "A web application for the Astra Honda Motor (AHM) steel division to monitor real-time machine health, operational status, and temperature.",
    description:
      "This application provides a vital, real-time overview of the health and performance of critical machinery in AHM's steel division. The system continuously monitors key parameters, including operational status (running, idle, stop) and machine temperature, presenting the data in an intuitive dashboard. This enables maintenance teams to proactively address potential issues before they lead to costly downtime, thereby improving overall equipment effectiveness (OEE).",
    technologies: [
      "Laravel",
      "Bootstrap",
      "Linux",
      "Figma",
      "MySQL",
      "jQuery",
      "Ajax",
      "MQTT",
      "GitLab",
    ],
    imageUrls: [
      "/images/porto/porto-steel-1.png",
      "/images/porto/porto-steel-2.png",
      "/images/porto/porto-steel-3.png",
    ],
    liveUrl: "https://ryans-portfolio.dev/demo/machine-health-steel",
    githubUrl: "https://github.com/user/ahm-machine-health",
    keyFeatures: [
      "Live dashboard of machine operational status (Running, Idle, Stopped).",
      "Real-time temperature monitoring with configurable warning and danger thresholds.",
      "Historical data logging for performance analysis and predictive maintenance.",
      "Email/Telegram alerts for critical events like overheating or unexpected stops.",
    ],
    challenges: {
      problem:
        "The primary challenge was collecting data from a diverse range of industrial machines, some of which were older models with no native network connectivity. The data needed to be captured and transmitted to the web server reliably and in real-time.",
      solution:
        "I implemented a hybrid solution using IoT gateways. For modern machines, we tapped into their existing PLCs. For older ones, we retrofitted them with temperature sensors connected to microcontrollers (like ESP32). These devices all published their data to a central MQTT broker. A Laravel backend service subscribed to the MQTT topics, processed the data, and pushed it to the frontend dashboard via WebSockets, ensuring a live, responsive view of the entire factory floor.",
    },
  },
  {
    id: 12,
    title: "Kingkos App",
    year: 2024,
    category: "Frontend",
    description_short:
      "A responsive frontend application for a boarding house rental platform, built with React and Vite for a fast and modern user experience.",
    description:
      "Kingkos App is a modern, responsive frontend for a platform designed to simplify the search and rental of boarding houses (kost). Built using React and powered by the Vite build tool for exceptional development speed and optimized production builds, the application provides a seamless user experience for finding and exploring housing options with comprehensive facility details.",
    technologies: ["React", "Vite", "GitLab", "Linux", "Docker", "Figma"],
    imageUrls: ["/images/porto/porto-kingkos-fr-1.png"],
    liveUrl: "https://ryans-portfolio.dev/demo/kingkos-app",
    githubUrl: "https://github.com/user/kingkos-app",
    keyFeatures: [
      "Fast and interactive user interface built with React.",
      "Advanced search with filters for location, price, and facilities.",
      "Detailed property pages with image galleries and facility lists.",
      "Fully responsive design for optimal viewing on any device.",
    ],
    challenges: {
      problem:
        "One of the main challenges was to ensure the application remained fast and responsive, even when displaying hundreds of property listings with high-resolution images, which could easily slow down the initial load time and scrolling performance.",
      solution:
        "To tackle this, I implemented 'virtualized lists' to only render the items currently visible in the viewport, significantly reducing the number of DOM elements. Additionally, I used lazy loading for all images, with a lightweight placeholder, ensuring that images are only loaded as the user scrolls towards them. This combination drastically improved both the initial page load speed and the overall browsing experience.",
    },
  },
  {
    id: 13,
    title: "Kingkos API",
    year: 2024,
    category: "Backend",
    description_short:
      "A robust RESTful API built with Java and Spring Boot to power the Kingkos boarding house rental platform, handling all data management and business logic.",
    description:
      "This project is the backend engine for the Kingkos platform. Developed using Java and the Spring Boot framework, it provides a secure and scalable RESTful API. It handles all core functionalities, including user authentication, property listings, booking transactions, and data management. The API is designed following best practices for security and performance, serving as a reliable data source for the Kingkos frontend application.",
    technologies: [
      "Java",
      "Spring Boot",
      "JPA",
      "PostgreSQL",
      "REST API",
      "Swagger",
      "JUnit",
      "Maven",
      "Lombok",
      "Docker",
      "GitLab",
      "Firebase",
    ],
    imageUrls: ["/images/porto/porto-kingkos-be-1.png"],
    liveUrl: "https://ryans-portfolio.dev/demo/kingkos-api",
    githubUrl: "https://github.com/user/kingkos-api",
    keyFeatures: [
      "Secure RESTful API endpoints for all application features.",
      "JWT-based user authentication and role-based authorization.",
      "CRUD operations for property listings, user profiles, and bookings.",
      "Integration with Firebase for handling notifications and image storage.",
      "Comprehensive API documentation using Swagger (OpenAPI).",
      "Unit and integration testing with JUnit to ensure reliability.",
    ],
    challenges: {
      problem:
        "Designing a database schema and API endpoints that could efficiently handle complex queries, such as searching for available rooms based on multiple filters (price, location, facilities) while also managing concurrent booking requests without data conflicts.",
      solution:
        "I designed a normalized database schema in PostgreSQL and utilized JPA/Hibernate for efficient data access and query optimization. To handle concurrent bookings, I implemented optimistic locking on the booking-related entities. This prevents double-booking scenarios by ensuring that a transaction will fail if the data has been modified by another user since it was read, thus maintaining data integrity.",
    },
  },
  {
    id: 14,
    title: "Kingkos Mobile",
    year: 2024,
    category: "Mobile",
    description_short:
      "A cross-platform mobile app for finding and booking boarding houses, built with React Native and Expo for a seamless native experience.",
    description:
      "Kingkos Mobile brings the boarding house search to users' fingertips. Developed with React Native, it delivers a high-performance, native-like experience on both iOS and Android from a single codebase. The Expo framework was utilized to streamline development and simplify access to native device features, such as push notifications and maps.",
    technologies: ["React Native", "Expo", "Figma", "GitLab"],
    imageUrls: ["/images/porto/porto-kingkos-mobile-1.png"],
    liveUrl: "https://ryans-portfolio.dev/demo/kingkos-mobile",
    githubUrl: "https://github.com/user/kingkos-mobile",
    keyFeatures: [
      "Cross-platform compatibility for iOS & Android.",
      "Interactive map view for browsing properties.",
      "Push notifications for booking updates and new messages.",
      "Directly connects to the Kingkos REST API for live data.",
    ],
    challenges: {
      problem:
        "Ensuring a smooth and consistent user experience across both iOS and Android, especially when dealing with platform-specific UI conventions and native API integrations like maps and push notifications.",
      solution:
        "I leveraged the Expo managed workflow, which abstracts away much of the platform-specific configuration. For the UI, I created a library of custom, platform-aware components that would render appropriately on each OS. State management was handled with Zustand for its simplicity and performance, ensuring data consistency across all screens.",
    },
  },
];

export const getPortfolioById = (id: number): Portofolio | undefined => {
  return portofolios.find((p) => p.id === id);
};
