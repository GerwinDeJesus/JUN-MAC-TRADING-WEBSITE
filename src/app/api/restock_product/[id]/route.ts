import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectMongoDB();

  const { id } = params;
  const { addStock } = await req.json();

  if (typeof addStock !== "number" || addStock <= 0) {
    return new Response("Invalid addStock value", { status: 400 });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    product.stock += addStock;
    await product.save();

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
