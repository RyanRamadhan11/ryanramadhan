import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function GET() {
  try {
    // Path ke file CV
    const filePath = path.join(
      process.cwd(),
      "public/pdf/CV_RyanRamadhan_SoftwareEnginner.pdf"
    );
    const fileBuffer = fs.readFileSync(filePath);

    // Kirim notif ke Telegram
    const message = `📥 Someone just downloaded your CV!\n⏰ ${new Date().toLocaleString()}`;
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    );

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
