// src/app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ryanKnowledge } from "../../../data/knowledge";

// Fungsi untuk generate balasan berdasarkan keyword
function generateReply(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Keyword: 'siapa kamu' / 'ini siapa'
  if (
    lowerMessage.includes("siapa kamu") ||
    lowerMessage.includes("ini siapa")
  ) {
    return "Saya adalah asisten bot yang dirancang untuk membantu Anda mengenal Ryan Ramadhan dan portofolionya.";
  }

  // Keyword: 'siapa ryan' / 'tentang ryan'
  if (
    lowerMessage.includes("siapa ryan") ||
    lowerMessage.includes("tentang ryan")
  ) {
    return `${ryanKnowledge.fullName} adalah seorang ${ryanKnowledge.title}. ${ryanKnowledge.bio}`;
  }

  // Keyword: 'pengalaman'
  if (lowerMessage.includes("pengalaman")) {
    return `Ryan memiliki ${ryanKnowledge.experience}.`;
  }

  // Keyword: 'proyek' / 'project'
  if (lowerMessage.includes("proyek") || lowerMessage.includes("project")) {
    return `Ryan telah menyelesaikan ${ryanKnowledge.projects}. Anda bisa melihat beberapa di antaranya di halaman portofolio.`;
  }

  // Keyword: 'teknologi' / 'tech'
  if (
    lowerMessage.includes("teknologi") ||
    lowerMessage.includes("tech stack")
  ) {
    const tech = ryanKnowledge.techStack.join(", ");
    return `Teknologi yang sering digunakan Ryan antara lain: ${tech}.`;
  }

  // Keyword: 'kontak' / 'contact'
  if (lowerMessage.includes("kontak") || lowerMessage.includes("contact")) {
    return 'Anda bisa menghubungi Ryan melalui form kontak di halaman "Contact" atau klik tombol "Let\'s Connect".';
  }

  // Keyword: 'terima kasih'
  if (
    lowerMessage.includes("terima kasih") ||
    lowerMessage.includes("makasih")
  ) {
    return "Sama-sama! Senang bisa membantu.";
  }

  // Keyword: 'resume' / 'cv'
  if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
    return 'Tentu, Anda bisa mengunduh CV Ryan di halaman "Resume".';
  }

  // Default fallback
  return "Maaf, saya belum mengerti pertanyaan itu. Bisa Anda coba tanyakan hal lain tentang Ryan?";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    // Generate balasan
    const reply = generateReply(message);

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("API Chat Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
