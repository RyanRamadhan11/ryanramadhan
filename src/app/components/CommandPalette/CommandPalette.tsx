"use client";

import React from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaCertificate,
  FaEnvelope,
  FaSun,
  FaMoon,
  FaLaptop,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

import styles from "./CommandPalette.module.css";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  setOpen,
}) => {
  const { setTheme } = useTheme();
  const router = useRouter();

  const runCommand = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.commandOverlay}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Dialog Container */}
          <motion.div
            className={styles.dialogWrapper}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Command.Dialog
              open={open}
              onOpenChange={setOpen}
              label="Global Command Menu"
              className={styles.commandDialog}
            >
              {/* Accessible title for screen readers */}
              <Dialog.Title className={styles.commandTitle}>
                Command Palette
              </Dialog.Title>

              <Command.Input
                placeholder="Type a command or search..."
                className={styles.commandInput}
              />

              <Command.List className={styles.commandList}>
                <Command.Empty className={styles.commandEmpty}>
                  No results found.
                </Command.Empty>

                {/* === NAVIGATION === */}
                <Command.Group
                  heading="Navigation"
                  className={styles.commandGroup}
                >
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/"))}
                    className={styles.commandItem}
                  >
                    <FaHome />
                    <span>Home</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/about"))}
                    className={styles.commandItem}
                  >
                    <FaUser />
                    <span>About Me</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/resume"))}
                    className={styles.commandItem}
                  >
                    <FaBriefcase />
                    <span>Resume</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      runCommand(() => router.push("/portofolio"))
                    }
                    className={styles.commandItem}
                  >
                    <FaBriefcase />
                    <span>Portfolio</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      runCommand(() => router.push("/certification"))
                    }
                    className={styles.commandItem}
                  >
                    <FaCertificate />
                    <span>Certifications</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/contact"))}
                    className={styles.commandItem}
                  >
                    <FaEnvelope />
                    <span>Contact</span>
                  </Command.Item>
                </Command.Group>

                {/* === THEME SWITCH === */}
                <Command.Group
                  heading="Switch Theme"
                  className={styles.commandGroup}
                >
                  <Command.Item
                    onSelect={() => runCommand(() => setTheme("light"))}
                    className={styles.commandItem}
                  >
                    <FaSun />
                    <span>Light</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => setTheme("dark"))}
                    className={styles.commandItem}
                  >
                    <FaMoon />
                    <span>Dark</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => setTheme("system"))}
                    className={styles.commandItem}
                  >
                    <FaLaptop />
                    <span>System</span>
                  </Command.Item>
                </Command.Group>

                {/* === SOCIAL MEDIA === */}
                <Command.Group
                  heading="Social Media"
                  className={styles.commandGroup}
                >
                  <Command.Item
                    onSelect={() =>
                      runCommand(() =>
                        window.open(
                          "https://github.com/RyanRamadhan11",
                          "_blank"
                        )
                      )
                    }
                    className={styles.commandItem}
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      runCommand(() =>
                        window.open(
                          "https://www.linkedin.com/in/ryan-ramadhan-17118b222/",
                          "_blank"
                        )
                      )
                    }
                    className={styles.commandItem}
                  >
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      runCommand(() =>
                        window.open(
                          "https://www.instagram.com/ryanrmdhans/",
                          "_blank"
                        )
                      )
                    }
                    className={styles.commandItem}
                  >
                    <FaInstagram />
                    <span>Instagram</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command.Dialog>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
