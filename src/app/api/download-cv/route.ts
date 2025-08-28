// app/api/download-cv/route.ts

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sendTelegramMessage } from "@/lib/chat"; // <-- IMPORT FUNGSI DARI LIB

export async function GET() {
  try {
    // Path ke file CV
    const filePath = path.join(
      process.cwd(),
      "public/pdf/CV_RyanRamadhan_SoftwareEnginner.pdf"
    );
    const fileBuffer = fs.readFileSync(filePath);

    // Kirim notif ke Telegram menggunakan fungsi baru
    const message = `📥 *CV Downloaded!*\n\nSomeone just downloaded your CV.\n*Time:* ${new Date().toLocaleString(
      "id-ID",
      { timeZone: "Asia/Jakarta" }
    )}`;

    // Cukup panggil fungsi ini, tidak perlu logic fetch lagi di sini
    await sendTelegramMessage(message);

    // Balikin file CV ke user
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          "attachment; filename=CV_RyanRamadhan_SoftwareEngineer.pdf",
      },
    });
  } catch (err) {
    console.error("Error serving CV:", err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
