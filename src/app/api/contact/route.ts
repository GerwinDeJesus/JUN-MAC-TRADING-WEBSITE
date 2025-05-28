// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/MongoConnect";
import ContactMessage from "@/libs/models/contactMessage";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    await connectMongoDB();
    await ContactMessage.create({ name, email, message });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
