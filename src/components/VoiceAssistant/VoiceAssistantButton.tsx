// src/components/VoiceAssistant/VoiceAssistantButton.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Loader2, PhoneOff } from "lucide-react";

// Tipe untuk state panggilan
type CallState = "idle" | "connecting" | "in-progress" | "error";

export function VoiceAssistantButton() {
  const [callState, setCallState] = useState<CallState>("idle");
  const recognitionRef = useRef<any | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Pesan selamat datang sesuai permintaan lu
  const welcomeMessage =
    "Selamat datang di web portolio ryan ramadhan saya bot. apakah ada yang bisa saya bantu ?";

  // Fungsi untuk Text-to-Speech (TTS)
  const speak = (text: string) => {
    if (!synthRef.current) return;

    // Hentikan suara yang sedang diputar (jika ada)
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID"; // Set bahasa ke Indonesia

    // Event ini akan trigger KETIKA bot selesai bicara
    utterance.onend = () => {
      console.log("Bot finished speaking, starting recognition...");
      // Setelah bot selesai bicara, mulai dengarkan user
      if (callState === "in-progress" && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error("Recognition already started.", e);
        }
      }
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      setCallState("error");
    };

    synthRef.current.speak(utterance);
  };

  // Fungsi untuk memproses transkrip suara
  const processSpeech = async (transcript: string) => {
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
      // Bot membalas
      speak(data.reply);
    } catch (error) {
      console.error("Error processing speech:", error);
      speak("Maaf, terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const setupSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser.");
      setCallState("error");
      alert(
        "Browser kamu tidak mendukung Speech Recognition. Coba gunakan Google Chrome atau Microsoft Edge."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.interimResults = false;
    recognition.continuous = false;

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

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event?.error ?? event);
      if ((event && event.error) !== "no-speech") {
        setCallState("error");
      }
    };

    recognitionRef.current = recognition;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.speechSynthesis) {
        console.error("Speech Synthesis not supported in this browser.");
        setCallState("error");
        alert(
          "Browser kamu tidak mendukung Speech Synthesis. Coba gunakan Google Chrome atau Microsoft Edge."
        );
        return;
      }

      synthRef.current = window.speechSynthesis;
      setupSpeechRecognition();
    }

    return () => {
      synthRef.current?.cancel();
      recognitionRef.current?.stop();
    };
  }, [callState]);

  const handleButtonClick = () => {
    if (callState === "idle") {
      setCallState("connecting");

      // Simulasi koneksi
      setTimeout(() => {
        setCallState("in-progress");
        // Mulai panggilan dengan pesan selamat datang
        speak(welcomeMessage);
      }, 1500); // 1.5 detik delay koneksi
    } else if (callState === "in-progress") {
      // End call
      setCallState("idle");
      synthRef.current?.cancel();
      recognitionRef.current?.stop();
    }
  };

  // --- Render UI ---
  // Base style untuk semua button
  const baseStyle =
    "fixed bottom-8 left-8 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border border-white/20 shadow-lg text-white transition-all duration-300";

  // Style untuk background (sedikit transparan dengan blur)
  const backgroundStyle = "bg-gray-900/50 backdrop-blur-md";

  switch (callState) {
    case "connecting":
      return (
        <div className={`${baseStyle} ${backgroundStyle} animate-pulse`}>
          <Loader2 className="h-5 w-5 animate-spin text-red-500" />
          <div>
            <p className="font-semibold">Connecting...</p>
            <p className="text-xs text-gray-300">Please wait</p>
          </div>
        </div>
      );

    case "in-progress":
      return (
        <button
          onClick={handleButtonClick}
          className={`${baseStyle} ${backgroundStyle} hover:bg-gray-800/70`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 p-1">
            <PhoneOff className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-left font-semibold">Call in progress</p>
            <p className="text-left text-xs text-gray-300">End call</p>
          </div>
        </button>
      );

    case "error":
      return (
        <div className={`${baseStyle} bg-red-800/80 backdrop-blur-md`}>
          <p className="text-sm">
            Speech API not supported. Please use Chrome or Edge.
          </p>
        </div>
      );

    case "idle":
    default:
      return (
        <button
          onClick={handleButtonClick}
          className={`${baseStyle} ${backgroundStyle} hover:bg-gray-800/70`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 p-1">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-left font-semibold">Need Help?</p>
            <p className="text-left text-xs text-gray-300">
              Talk with our AI assistant
            </p>
          </div>
        </button>
      );
  }
}
