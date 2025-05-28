import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    await connectMongoDB();

    const { id } = context.params;
    const body = await request.json();
    const { addStock } = body;

    if (typeof addStock !== "number" || addStock <= 0) {
      return NextResponse.json({ error: "Invalid addStock value" }, { status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    product.stock += addStock;
    await product.save();

    return NextResponse.json({
      msg: "Stock updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
