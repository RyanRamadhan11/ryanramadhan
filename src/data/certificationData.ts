// 📁 src/data/certificationData.ts

// Definisikan tipe data untuk sertifikasi
export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  technologies: string[];
  credentialUrl?: string;
}

// Ekspor array data sertifikasi
export const certificationsData: Certification[] = [
  {
    id: 1,
    title: "Fullstack Developer Bootcamp",
    issuer: "Enigma Camp",
    date: "2024-03-07",
    imageUrl: "/images/certificate/sertif-11.jpg",
    technologies: [
      "Java",
      "Spring Boot",
      "React",
      "React Native",
      "PostgreSQL",
      "Docker",
      "Git",
      "Linux",
    ],
    credentialUrl:
      "https://drive.google.com/file/d/1mnrdBcbuaUprA3dzi2roEhyIHlkVlpAG/view",
  },
  {
    id: 2,
    title: "Fullstack Web Development",
    issuer: "Kampus Merdeka - Binar Academy",
    date: "2022-07-15",
    imageUrl: "/images/certificate/sertif-3.jpg",
    technologies: [
      "React",
      "Next.js",
      "Express",
      "PostgreSQL",
      "Git",
      "Postman",
      "Bootstrap",
    ],
    credentialUrl:
      "https://drive.google.com/file/d/1hrACsuGgTASxt-AibVQPgxTxQPN4l1bN/view",
  },
  {
    id: 3,
    title: "Competency in Fullstack Development",
    issuer: "PT Nurul Fikri Cipta Inovasi",
    date: "2022-12-31",
    imageUrl: "/images/certificate/sertif-1.jpg",
    technologies: [
      "PHP",
      "Laravel",
      "React",
      "MySQL",
      "Bootstrap",
      "Figma",
      "Javascript",
    ],
    credentialUrl:
      "https://drive.google.com/file/d/1HwAh40LaieCwo0VM1vvEiHM36Jv-Oe33/view",
  },
  {
    id: 4,
    title: "Official Training Completion",
    issuer: "PT Nurul Fikri Cipta Inovasi",
    date: "2022-12-31",
    imageUrl: "/images/certificate/sertif-2.jpg",
    technologies: ["Laravel", "PHP", "MySQL", "Git"],
    credentialUrl:
      "https://drive.google.com/file/d/1ofzEX2MeQ3b7fWRivA0s87K08e7VzOGM/view",
  },
  {
    id: 5,
    title: "Certified Junior Web Developer",
    issuer: "Kominfo - Digital Talent Scholarship",
    date: "2022-08-23",
    imageUrl: "/images/certificate/sertif-4.jpg",
    technologies: ["HTML5", "CSS3", "Javascript", "PHP", "Laravel", "MySQL"],
    credentialUrl:
      "https://drive.google.com/file/d/1vY2ull3GnSdIgdTKP0ecxvZdCgkgY5H-/view",
  },
  {
    id: 6,
    title: "Frontend Development Basics",
    issuer: "Altera Academy",
    date: "2022-08-23",
    imageUrl: "/images/certificate/sertif-5.jpg",
    technologies: [
      "HTML5",
      "CSS3",
      "Javascript",
      "React",
      "Bootstrap",
      "Git",
      "Figma",
    ],
    credentialUrl:
      "https://drive.google.com/file/d/1yZ6U-n3bOhlS3L1tjVeXMPx44rJ_Hq-j/view",
  },
  {
    id: 7,
    title: "Version Control with Git & GitHub",
    issuer: "Dicoding",
    date: "2021-09-06",
    imageUrl: "/images/certificate/sertif-6.jpg",
    technologies: ["Git", "GitHub"],
    credentialUrl: "https://www.dicoding.com/certificates/0LZ036K1NZ65",
  },
  {
    id: 8,
    title: "Certified Secure Computer User (CSCU)",
    issuer: "EC-Council",
    date: "2021-10-04",
    imageUrl: "/images/certificate/sertif-7.jpg",
    technologies: ["Cybersecurity", "Linux"],
    credentialUrl:
      "https://drive.google.com/file/d/13BwL6HmJ83x26EiWLmmY97ZBuxlYKx4b/view",
  },
  {
    id: 9,
    title: "SQL Fundamentals",
    issuer: "Progate",
    date: "2021-09-08",
    imageUrl: "/images/certificate/sertif-8.png",
    technologies: ["MySQL", "PostgreSQL"],
    credentialUrl: "https://progate.com/course_certificate/b1cb891bqz3qwh",
  },
  {
    id: 10,
    title: "Security Awareness Essentials",
    issuer: "Kominfo",
    date: "2021-09-08",
    imageUrl: "/images/certificate/sertif-9.jpg",
    technologies: ["Cybersecurity"],
    credentialUrl:
      "https://drive.google.com/file/d/136IZniCl2qqh30kY2L5MoRP2GqL12Gxs/view",
  },
  {
    id: 11,
    title: "Junior Web Developer National License",
    issuer: "BNSP (National Agency for Professional Certification)",
    date: "2022-10-08",
    imageUrl: "/images/certificate/sertif-10.jpg",
    technologies: ["HTML5", "CSS3", "Javascript", "PHP", "MySQL"],
    credentialUrl:
      "https://drive.google.com/file/d/1fwHp4YaFijjNTCfh1VoX2Ta3AwsC2IiL/view",
  },
  {
    id: 12,
    title: "Cloud Practitioner Essentials",
    issuer: "Dicoding",
    date: "2022-09-08",
    imageUrl: "/images/certificate/sertif-12.jpg",
    technologies: ["AWS"],
    credentialUrl: "https://www.dicoding.com/certificates/NVP71J1ROPR0",
  },
  {
    id: 13,
    title: "Introduction to Java Programming",
    issuer: "Dicoding",
    date: "2022-09-08",
    imageUrl: "/images/certificate/sertif-14.jpg",
    technologies: ["Java"],
    credentialUrl: "https://www.dicoding.com/certificates/4EXG6KD4QZRL",
  },
  {
    id: 14,
    title: "Introduction to C Programming",
    issuer: "Dicoding",
    date: "2022-08-08",
    imageUrl: "/images/certificate/sertif-15.jpg",
    technologies: ["C"],
    credentialUrl: "https://www.dicoding.com/certificates/GRX5KQ603Z0M",
  },
];
