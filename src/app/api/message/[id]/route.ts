import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/MongoConnect";
import ContactMessage from "@/libs/models/contactMessage";

export async function PUT(request: NextRequest, URLParams: { params: { id: string } }) {
  try {
    const body = await request.json();
    const id = URLParams.params.id;

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
