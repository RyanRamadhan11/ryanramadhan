// /src/app/components/CommandPalette/CommandPalette.tsx

"use client";

import React, { useEffect, useCallback } from "react";
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

  //  Bungkus runCommand dengan useCallback
  const runCommand = useCallback(
    (callback: () => void) => {
      setOpen(false);
      callback();
    },
    [setOpen]
  );

  // Hook useEffect untuk shortcut tema
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "l") {
        runCommand(() => setTheme("light"));
      } else if (e.key === "d") {
        runCommand(() => setTheme("dark"));
      } else if (e.key === "s") {
        runCommand(() => setTheme("system"));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // Tambahkan runCommand ke dalam dependency array
  }, [open, runCommand, setTheme]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.commandOverlay}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <div className={styles.dialogWrapper}>
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label="Global Command Menu"
                className={styles.commandDialog}
              >
                <Dialog.Title className={styles.commandP}>
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
                      <kbd className={styles.shortcut}>L</kbd>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => setTheme("dark"))}
                      className={styles.commandItem}
                    >
                      <FaMoon />
                      <span>Dark</span>
                      <kbd className={styles.shortcut}>D</kbd>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => setTheme("system"))}
                      className={styles.commandItem}
                    >
                      <FaLaptop />
                      <span>System</span>
                      <kbd className={styles.shortcut}>S</kbd>
                    </Command.Item>
                  </Command.Group>

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
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
