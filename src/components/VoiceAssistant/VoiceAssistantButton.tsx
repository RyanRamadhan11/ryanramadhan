"use client";

// Ini ngasih tahu TypeScript kalau 'window' itu punya
// properti SpeechRecognition & webkitSpeechRecognition
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition?: any;
  }
}

import { useState, useRef, useEffect, useCallback } from "react";
// Import icons yang kita butuhkan
import { Phone, Loader2, PhoneOff, AlertTriangle } from "lucide-react";

// Import CSS Module yang tadi kita buat
import styles from "./VoiceAssistantButton.module.css";

// Tipe untuk state panggilan
type CallState = "idle" | "connecting" | "in-progress" | "error";
type ErrorMessage = string | null;

export default function VoiceAssistantButton() {
  const [callState, setCallState] = useState<CallState>("idle");
  const [errorMsg, setErrorMsg] = useState<ErrorMessage>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any | null>(null);

  const synthRef = useRef<SpeechSynthesis | null>(null);

  const welcomeMessage =
    "Selamat datang di web portolio Ryan Ramadhan. Saya bot. Apakah ada yang bisa saya bantu?";

  // --- Logika (Speak, Process, Setup) ---
  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID"; // Set bahasa Indonesia

    utterance.onend = () => {
      console.log("Bot finished speaking, starting recognition...");
      setCallState((currentState) => {
        if (currentState === "in-progress" && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error("Recognition already started.", e);
          }
        }
        return currentState;
      });
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      setErrorMsg("Error sintesis voice.");
      setCallState("error");
    };

    synthRef.current.speak(utterance);
  }, []);

  const processSpeech = useCallback(
    async (transcript: string) => {
      console.log("User said:", transcript);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript }),
        });

        if (!response.ok) {
          throw new Error("API response not ok");
        }

        const data = await response.json();
        speak(data.reply);
      } catch (error) {
        console.error("Error processing speech:", error);
        speak("Maaf, terjadi kesalahan. Silakan coba lagi.");
      }
    },
    [speak]
  );

  const setupSpeechRecognition = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser.");
      setErrorMsg("Speech API tidak didukung browser ini.");
      setCallState("error");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.interimResults = false;
    recognition.continuous = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      processSpeech(transcript);
    };

    recognition.onspeechend = () => {
      console.log("User speech ended.");
      recognition.stop();
    };

    recognition.onend = () => {
      console.log("Recognition service ended.");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);

      // JANGAN set error jika itu 'no-speech' (user diam)
      // ATAU 'aborted' (karena kita klik end call manual)
      if (event.error === "no-speech" || event.error === "aborted") {
        console.log("Recognition stopped or aborted, not a fatal error.");
        return;
      }

      // Hanya set error jika itu error beneran (cth: 'not-allowed', 'network')
      setErrorMsg(`Error mikrofon: ${event.error}`);
      setCallState("error");
    };

    recognitionRef.current = recognition;
  }, [processSpeech]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.speechSynthesis) {
        console.error("Speech Synthesis not supported in this browser.");
        setErrorMsg("Speech Synthesis tidak didukung.");
        setCallState("error");
        return;
      }

      synthRef.current = window.speechSynthesis;
      setupSpeechRecognition();
    }

    return () => {
      synthRef.current?.cancel();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (recognitionRef.current as any)?.stop();
    };
  }, [setupSpeechRecognition]);

  const handleButtonClick = () => {
    if (callState === "idle") {
      if (synthRef.current) {
        synthRef.current.cancel();
        // "Primer" untuk "bangunin" speech synthesis di beberapa browser
        const primer = new SpeechSynthesisUtterance(" ");
        primer.volume = 0;
        synthRef.current.speak(primer);
      } else {
        setErrorMsg("Speech synthesis tidak siap.");
        setCallState("error");
        return;
      }

      setCallState("connecting");

      setTimeout(() => {
        setCallState("in-progress");
        speak(welcomeMessage);
      }, 1500); // Waktu 'connecting'
    } else if (callState === "in-progress") {
      setCallState("idle");
      synthRef.current?.cancel();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (recognitionRef.current as any)?.stop();
    }
  };

  return (
    <>
      {(() => {
        switch (callState) {
          case "connecting":
            return (
              <div
                className={`${styles.voiceButton} ${styles.connectingState}`}
              >
                <div
                  className={`${styles.iconWrapper} ${styles.connectingIcon}`}
                >
                  <Loader2 className={`${styles.spinner} h-6 w-6`} />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.textMain}>Connecting...</p>
                  <p className={styles.textSub}>Please wait</p>
                </div>
              </div>
            );

          case "in-progress":
            return (
              <button
                onClick={handleButtonClick}
                className={`${styles.voiceButton} ${styles.inProgressState}`}
              >
                <div
                  className={`${styles.iconWrapper} ${styles.inProgressIcon}`}
                >
                  {/* Ini dia icon dengan animasi getar "vibratingIcon" */}
                  <PhoneOff className={`${styles.vibratingIcon} h-5 w-5`} />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.textMain}>Call in progress</p>
                  <p className={styles.textSub}>Click to end call</p>
                </div>
              </button>
            );

          case "error":
            return (
              <div className={`${styles.voiceButton} ${styles.errorState}`}>
                <div className={`${styles.iconWrapper} ${styles.errorIcon}`}>
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className={styles.textWrapper}>
                  <p className={`${styles.textMain} ${styles.errorTextMain}`}>
                    Call Error
                  </p>
                  <p className={styles.textSub}>
                    {errorMsg || "Terjadi error. Coba refresh."}
                  </p>
                </div>
              </div>
            );

          case "idle":
          default:
            return (
              <button
                onClick={handleButtonClick}
                className={`${styles.voiceButton} ${styles.idleState}`}
              >
                <div className={`${styles.iconWrapper} ${styles.idleIcon}`}>
                  <Phone className="h-5 w-5" />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.textMain}>Need Help?</p>
                  <p className={styles.textSub}>Talk with our AI assistant</p>
                </div>
              </button>
            );
        }
      })()}
    </>
  );
}
