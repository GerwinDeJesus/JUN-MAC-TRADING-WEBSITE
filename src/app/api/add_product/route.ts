import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imgSrc, fileKey, name, category, sold, stock, price, description, expectedRestockDate } = body;

    await connectMongoDB();

    const data = await Product.create({
      imgSrc,
      fileKey,
      name,
      description,
      category,
      stock,
      price,
      sold,
      expectedRestockDate,
    });

    return NextResponse.json({ msg: "Product added Successfully", data });
  } catch (error) {
    return NextResponse.json(
      {
        error,
        msg: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
