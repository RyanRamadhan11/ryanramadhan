// src/app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ryanKnowledge } from "../../../data/knowledge";

// Fungsi untuk generate balasan berdasarkan keyword
// function generateReply(message: string): string {
//   const lowerMessage = message.toLowerCase();

//   // Keyword: 'siapa kamu' / 'ini siapa'
//   if (
//     lowerMessage.includes("siapa kamu") ||
//     lowerMessage.includes("ini siapa")
//   ) {
//     return "Saya adalah AI Assistant yang dirancang untuk membantu Anda mengenal Ryan Ramadhan dan portofolionya.";
//   }

//   // Keyword: 'siapa ryan' / 'tentang ryan'
//   if (
//     lowerMessage.includes("siapa ryan") ||
//     lowerMessage.includes("tentang ryan")
//   ) {
//     return `${ryanKnowledge.fullName} adalah seorang ${ryanKnowledge.title}. ${ryanKnowledge.bio}`;
//   }

//   // Keyword: 'pengalaman'
//   if (lowerMessage.includes("pengalaman")) {
//     return `Ryan memiliki ${ryanKnowledge.experience}.`;
//   }

//   // Keyword: 'proyek' / 'project'
//   if (lowerMessage.includes("proyek") || lowerMessage.includes("project")) {
//     return `Ryan telah menyelesaikan ${ryanKnowledge.projects}. Anda bisa melihat beberapa di antaranya di halaman portofolio.`;
//   }

//   // Keyword: 'teknologi' / 'tech'
//   if (
//     lowerMessage.includes("teknologi") ||
//     lowerMessage.includes("tech stack")
//   ) {
//     const tech = ryanKnowledge.techStack.join(", ");
//     return `Teknologi yang sering digunakan Ryan antara lain: ${tech}.`;
//   }

//   // Keyword: 'kontak' / 'contact'
//   if (lowerMessage.includes("kontak") || lowerMessage.includes("contact")) {
//     return 'Anda bisa menghubungi Ryan melalui form kontak di halaman "Contact" atau klik tombol "Let\'s Connect".';
//   }

//   // Keyword: 'terima kasih'
//   if (
//     lowerMessage.includes("terima kasih") ||
//     lowerMessage.includes("makasih")
//   ) {
//     return "Sama-sama! Senang bisa membantu.";
//   }

//   // Keyword: 'resume' / 'cv'
//   if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
//     return 'Tentu, Anda bisa mengunduh CV Ryan di halaman "Resume".';
//   }

//   // Default fallback
//   return "Maaf, saya belum mengerti pertanyaan itu. Bisa Anda coba tanyakan hal lain tentang Ryan?";
// }

function generateReply(message: string): string {
  const lowerMessage = message.toLowerCase();
  const k = ryanKnowledge; // Alias biar pendek

  // --- LOGIC PERTANYAAN TENTANG SOSOK RYAN ---
  if (
    lowerMessage.includes("siapa ryan") ||
    lowerMessage.includes("tentang ryan") ||
    lowerMessage.includes("profil")
  ) {
    return `Kenalin, beliau adalah ${k.fullName}, seorang ${k.title} yang sudah berkarir selama ${k.experience}. \n\n${k.bio} Ryan punya prinsip bahwa ${k.philosophy}. Selama karirnya, ia sudah menangani ${k.projects} dengan berbagai tingkat kompleksitas. Ada hal spesifik yang ingin kamu tahu tentang Ryan?`;
  }

  // --- LOGIC TEKNOLOGI & SKILL ---
  if (
    lowerMessage.includes("teknologi") ||
    lowerMessage.includes("tech") ||
    lowerMessage.includes("pakai apa") ||
    lowerMessage.includes("bahasa")
  ) {
    const techList = k.techStack.join(", ");
    return `Dalam membangun produk digital, Ryan sangat mahir menggunakan ${techList}. \n\n${k.recentFocus} Fokus utamanya adalah memastikan aplikasi tidak hanya berjalan lancar, tapi juga scalable dan mudah dikelola di masa depan. Kamu lagi nyari tech stack yang sama untuk proyekmu?`;
  }

  // --- LOGIC PENGALAMAN & PROYEK ---
  if (
    lowerMessage.includes("pengalaman") ||
    lowerMessage.includes("kerja") ||
    lowerMessage.includes("proyek") ||
    lowerMessage.includes("project")
  ) {
    return `Wah, kalau bicara soal jam terbang, Ryan sudah memiliki ${k.experience}. Sepanjang waktu itu, sudah ada ${k.projects} yang berhasil diselesaikan dengan hasil yang memuaskan. \n\nProyek-proyeknya mencakup berbagai bidang, mulai dari aplikasi internal perusahaan hingga platform publik. Kamu bisa cek detail lengkapnya di bagian folder "Portfolio" di web ini, bro!`;
  }

  // --- LOGIC KONTAK & KERJASAMA ---
  if (
    lowerMessage.includes("kontak") ||
    lowerMessage.includes("hubungi") ||
    lowerMessage.includes("hire") ||
    lowerMessage.includes("pesan")
  ) {
    return `Sangat bisa! Ryan selalu terbuka untuk diskusi proyek baru atau sekadar networking. Kamu bisa langsung ke halaman "Contact" buat isi formulir, atau klik tombol "Let's Connect" yang ada di pojok atas. \n\nBiasanya Ryan bakal balas secepat mungkin kalau dia lagi nggak di depan kode. Mau aku kasih tahu cara lain buat kontak dia?`;
  }

  // --- LOGIC SALAM / INTERAKSI ---
  if (
    lowerMessage.includes("halo") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("p")
  ) {
    return `Halo! Selamat datang di dunia digital ${k.firstName}. Aku AI Assistant-nya Ryan. Aku bisa bantu jelasin soal skill, pengalaman, atau proyek-proyek yang pernah Ryan bikin. Ada yang bikin kamu penasaran?`;
  }

  if (
    lowerMessage.includes("terima kasih") ||
    lowerMessage.includes("makasih") ||
    lowerMessage.includes("thanks")
  ) {
    return `Sama-sama! Senang banget bisa bantu kamu kenal lebih dekat sama Ryan. Kalau ada pertanyaan lain nanti, jangan sungkan tanya lagi ya. Have a great day!`;
  }

  // --- DEFAULT FALLBACK (Tetap dibuat informatif) ---
  return `Hmm, aku belum punya info spesifik soal itu. Tapi yang jelas, Ryan itu orangnya sangat passionate soal ${k.techStack[0]} dan ${k.techStack[1]}. \n\nMungkin kamu mau tanya soal pengalamannya selama ${k.experience} atau mau lihat daftar ${k.projects}-nya?`;
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
