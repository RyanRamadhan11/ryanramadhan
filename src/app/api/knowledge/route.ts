//src/app/api/knowledge/route.ts
import { NextResponse } from "next/server";

const knowledge = [
  {
    id: 1,
    title: "Profile",
    text: "Nama saya Ryan Ramadhan, seorang frontend developer yang suka Next.js.",
  },
  {
    id: 2,
    title: "Project",
    text: "Project utama saya adalah portfolio dan produk web realtime.",
  },
  {
    id: 3,
    title: "Tech",
    text: "Saya menggunakan React, Next.js, TypeScript, dan Node.js.",
  },
];

export async function GET() {
  return NextResponse.json({ data: knowledge });
}
