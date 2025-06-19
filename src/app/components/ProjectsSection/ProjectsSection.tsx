// src/components/ProjectsSection/ProjectsSection.tsx
"use client";

import React, { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi"; // Impor ikon dari react-icons
import styles from "./ProjectsSection.module.css"; // Buat file ini

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Website",
    description:
      "Full-stack e-commerce platform with user authentication, product management, and payment gateway integration.",
    technologies: ["Next.js", "Node.js", "Express", "MongoDB", "Redux"],
    imageUrl: "/images/profile.jpg", // Pastikan gambar ada di public/images/
    liveUrl: "https://ecommerce-demo.vercel.app/",
    githubUrl: "https://github.com/yourusername/ecommerce-repo",
  },
  {
    id: 2,
    title: "Real-time Chat Application",
    description:
      "A real-time chat application built with WebSockets, offering private and group messaging.",
    technologies: ["React", "Socket.IO", "Firebase"],
    imageUrl: "/images/profile.jpg",
    liveUrl: "https://chat-app-demo.netlify.app/",
    githubUrl: "https://github.com/yourusername/chat-app-repo",
  },
  // Tambahkan proyek lain di sini
  {
    id: 3,
    title: "Portfolio Website V2",
    description:
      "This very website! Built to showcase my skills and projects using modern web technologies.",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "CSS Modules"],
    imageUrl: "/images/profile.jpg",
    liveUrl: "https://yourwebsite.com",
    githubUrl: "https://github.com/yourusername/portfolio-repo",
  },
];

const ProjectsSection: FC = () => {
  return (
    <section id="projects" className={styles.projectsSection}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: project.id * 0.1 }}
            className={styles.projectCard}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={400}
              height={250}
              layout="responsive"
              objectFit="cover"
              className={styles.projectImage}
            />
            <div className={styles.projectContent}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.technologies}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.projectLinks}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    <FiGithub /> GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
