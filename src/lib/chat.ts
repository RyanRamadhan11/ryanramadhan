// lib/chat.ts

// Ambil token dan chat ID dari environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Mengirim pesan teks ke chat Telegram yang sudah ditentukan.
 * @param message - Pesan yang ingin dikirim.
 */
export async function sendTelegramMessage(message: string) {
  // Cek apakah token dan chat ID sudah ada di .env
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error(
      "TELEGRAM_BOT_TOKEN atau TELEGRAM_CHAT_ID tidak ditemukan di .env"
    );
    return; // Hentikan fungsi jika salah satunya tidak ada
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown", // Opsional: agar bisa pakai formatting seperti *bold* atau _italic_
      }),
    });

    if (!response.ok) {
      // Jika respons dari Telegram tidak OK (misal: token salah)
      const errorData = await response.json();
      console.error("Gagal mengirim pesan ke Telegram:", errorData);
    }
  } catch (error) {
    console.error("Terjadi error saat fetch ke API Telegram:", error);
  }
}