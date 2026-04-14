"use client";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition?: any;
  }
}

import { useState, useRef, useEffect, useCallback } from "react";
import { Phone, Loader2, PhoneOff, AlertTriangle } from "lucide-react";
import styles from "./VoiceAssistantButton.module.css";

type CallState = "idle" | "connecting" | "in-progress" | "error";
type ErrorMessage = string | null;

export default function VoiceAssistantButton() {
  const [callState, setCallState] = useState<CallState>("idle");
  const [errorMsg, setErrorMsg] = useState<ErrorMessage>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const welcomeMessage =
    "Selamat datang di web portofolio Ryan Ramadhan. Saya AI Assistant. Apakah ada yang bisa saya bantu?";

  // --- Logika (Speak, Process, Setup) ---
  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";

    utterance.onend = () => {
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

    utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
      // cancel() triggers "interrupted"/"canceled" — bukan error beneran
      if (e.error === "interrupted" || e.error === "canceled") return;
      console.error("Speech synthesis error:", e.error);
      setErrorMsg("Error sintesis voice.");
      setCallState("error");
    };

    synthRef.current.speak(utterance);
  }, []);

  const processSpeech = useCallback(
    async (transcript: string) => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript }),
        });

        if (!response.ok) throw new Error("API response not ok");

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

    recognition.onspeechend = () => recognition.stop();
    recognition.onend = () => {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      if (event.error === "no-speech" || event.error === "aborted") return;
      setErrorMsg(`Error mikrofon: ${event.error}`);
      setCallState("error");
    };

    recognitionRef.current = recognition;
  }, [processSpeech]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.speechSynthesis) {
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
      }, 1500);
    } else if (callState === "in-progress") {
      setCallState("idle");
      synthRef.current?.cancel();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (recognitionRef.current as any)?.stop();
    }
  };

  return (
    <div className={styles.container}>
      {/* Pulse rings — only visible on idle */}
      {callState === "idle" && (
        <>
          <span className={`${styles.pulseRing} ${styles.ring1}`} />
          <span className={`${styles.pulseRing} ${styles.ring2}`} />
        </>
      )}

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
                  <Loader2 className={`${styles.spinner}`} size={20} />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.textMain}>Connecting...</p>
                  <div className={styles.statusRow}>
                    <span
                      className={`${styles.statusDot} ${styles.statusDotConnecting}`}
                    />
                    <p className={styles.textSub}>Setting up voice</p>
                  </div>
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
                  <PhoneOff className={styles.vibratingIcon} size={18} />
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.statusRow}>
                    <span
                      className={`${styles.statusDot} ${styles.statusDotActive}`}
                    />
                    <p className={styles.textMain}>Call Active</p>
                  </div>
                  <div className={styles.soundWave}>
                    <span className={styles.soundBar} />
                    <span className={styles.soundBar} />
                    <span className={styles.soundBar} />
                    <span className={styles.soundBar} />
                    <span className={styles.soundBar} />
                  </div>
                </div>
              </button>
            );

          case "error":
            return (
              <div className={`${styles.voiceButton} ${styles.errorState}`}>
                <div className={`${styles.iconWrapper} ${styles.errorIcon}`}>
                  <AlertTriangle size={18} />
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
                  <Phone size={20} />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.textMain}>Need Help?</p>
                  <p className={styles.textSub}>Talk with our AI assistant</p>
                </div>
              </button>
            );
        }
      })()}
    </div>
  );
}
