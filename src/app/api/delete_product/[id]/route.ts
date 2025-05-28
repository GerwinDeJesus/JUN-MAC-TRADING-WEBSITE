import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { msg: "Missing product ID" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { msg: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ msg: "Product Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        msg: "Something went wrong while deleting the product",
        error: (error as Error).message,
      },
      { status: 400 }
    );
  }
}
