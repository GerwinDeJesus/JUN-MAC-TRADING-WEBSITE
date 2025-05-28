import { connectMongoDB } from "@/libs/MongoConnect";
import ContactMessage from "@/libs/models/contactMessage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    await connectMongoDB();

    const updatedMessage = await ContactMessage.findByIdAndUpdate(id, body, { new: true });

    if (!updatedMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({
      msg: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}
