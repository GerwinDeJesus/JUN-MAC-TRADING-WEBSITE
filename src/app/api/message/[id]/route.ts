import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/MongoConnect";
import ContactMessage from "@/libs/models/contactMessage";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const deletedMessage = await ContactMessage.findByIdAndDelete(params.id);

    if (!deletedMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
