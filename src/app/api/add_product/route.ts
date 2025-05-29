import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      imgSrc,
      fileKey,
      name,
      category,
      sold,
      stock,
      price,
      description,
      expectedRestockDate,
    } = body;

    // Basic validation
    if (!name || !category || stock === undefined || price === undefined) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );
    }

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
    console.error("Add Product Error:", error);
    return NextResponse.json(
      {
        msg: "Something went wrong while adding the product",
      },
      { status: 400 }
    );
  }
}
