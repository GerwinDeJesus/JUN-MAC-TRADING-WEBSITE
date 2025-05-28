import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/MongoConnect";
import ContactMessage from "@/libs/models/contactMessage";

export async function GET() {
  try {
    await connectMongoDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
