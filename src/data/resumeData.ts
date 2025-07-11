// 📁 src/data/resumeData.ts

// Tipe data untuk setiap item di resume
export interface ResumeItem {
  id: number;
  type: "Education" | "Experience";
  title: string;
  institution: string;
  duration: string;
  description: string[];
  skills: string[]; // PERBARUAN: Menambahkan daftar skills
}

// Data resume Anda
export const resumeData: ResumeItem[] = [
  {
    id: 1,
    type: "Experience",
    title: "Software Engineering Team Lead",
    institution: "PT. Mekanika Digital Pratama",
    duration: "Jun 2024 - Present",
    description: [
      "Led a team of developers in designing and deploying scalable web solutions.",
      "Architected and developed key features using Laravel, React, .NET, and Node.js.",
      "Conducted code reviews and mentored junior engineers to maintain high code quality.",
    ],
    skills: [
      "Laravel",
      "React",
      ".NET",
      "Node.js",
      "Team Lead",
      "PHP",
      "MySql",
    ],
  },
  {
    id: 2,
    type: "Experience",
    title: "Fullstack Developer",
    institution: "PT. Enigmacamp",
    duration: "Nov 2023 - May 2024",
    description: [
      "Completed an intensive, project-based training focused on enterprise-level development.",
      "Built and deployed several full-stack applications using Java Spring Boot, React JS and React Native",
      "Practiced Agile methodologies, including sprint planning and daily stand-ups.",
    ],
    skills: [
      "Java",
      "Spring Boot",
      "React JS",
      "React Native",
      "PostgreSQL",
      "Docker",
      "Agile",
    ],
  },
  {
    id: 3,
    type: "Experience",
    title: "Freelance Fullstack Developer",
    institution: "Self-Employed",
    duration: "Jan 2023 - Present",
    description: [
      "Developed custom web solutions for various clients, from landing pages to e-commerce sites.",
      "Managed the full project lifecycle: from client consultation to final deployment.",
      "Specialized in creating responsive and performant applications with Laravel and React.",
    ],
    skills: ["Laravel", "React", "Next.js", "MySQL", "Freelance"],
  },
  {
    id: 4,
    type: "Experience",
    title: "Fullstack Web Developer",
    institution: "PT. Nurul Fikri Cipta Inovasi",
    duration: "Aug 2022 - Jan 2023",
    description: [
      "Developed and maintained modules for educational web platforms using Laravel.",
      "Implemented new features and optimized database queries to improve performance.",
      "Collaborated with the UI/UX team to integrate front-end designs using Blade templates.",
    ],
    skills: ["Laravel", "PHP", "MySQL", "Blade"],
  },
  {
    id: 5,
    type: "Experience",
    title: "Fullstack Web Developer",
    institution: "PT. Lentera Benderang",
    duration: "Feb 2022 - Jun 2022",
    description: [
      "Contributed to building a company's core product with the Laravel framework.",
      "Developed and integrated RESTful APIs for mobile and web client consumption.",
      "Assisted in troubleshooting, bug fixing, and maintaining existing codebases.",
    ],
    skills: ["Laravel", "PHP", "REST API"],
  },
  {
    id: 6,
    type: "Education",
    title: "Bachelor's Degree in Informatics Engineering",
    institution: "Singaperbangsa Karawang University",
    duration: "2019 - 2023",
    description: [
      "Graduated with a GPA of 3.97.",
      "Focused on software development, database management, and web technologies.",
      "Completed a final project on developing a web-based inventory management system.",
    ],
    skills: ["Software Development", "Databases", "Web Technologies"],
  },
  {
    id: 7,
    type: "Education",
    title: "High School Diploma, Science Major",
    institution: "SMA Negeri 1 Cilamaya",
    duration: "2016 - 2019",
    description: [
      "Focused on core subjects in Mathematics and Natural Sciences.",
      "Gained foundational knowledge in basic programming and computer logic.",
    ],
    skills: ["Science", "Mathematics"],
  },
];
