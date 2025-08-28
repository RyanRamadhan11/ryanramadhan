import { NextResponse } from "next/server";
import amqp from "amqplib";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Validasi input sederhana
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // 2. Kirim pesan ke RabbitMQ
    const rabbitmqUrl = process.env.RABBITMQ_URL; // "amqp://user:password@localhost"
    if (!rabbitmqUrl) {
      throw new Error("RABBITMQ_URL is not defined in environment variables.");
    }

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    const queue = "contact_messages";

    await channel.assertQueue(queue, { durable: true }); // durable: true agar pesan tidak hilang jika RabbitMQ restart

    // Kirim pesan sebagai Buffer (format string JSON)
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(body)), {
      persistent: true, // persistent: true agar pesan disimpan di disk
    });

    console.log(" [x] Sent '%s'", JSON.stringify(body));

    // Tutup koneksi setelah beberapa saat
    setTimeout(() => {
      connection.close();
    }, 500);

    return NextResponse.json(
      { message: "Message received and queued successfully!" },
      { status: 202 } // 202 Accepted, karena proses belum selesai (masih di queue)
    );
  } catch (error) {
    console.error("Failed to send message to RabbitMQ:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
