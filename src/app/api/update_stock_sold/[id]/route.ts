// src/app/api/edit_product/[id]/route.ts

import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const id = params.id;

    const { name, category, stock, price, description } = body;

    await connectMongoDB();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, stock, price, description },
      { new: true }
    );

    return NextResponse.json({ msg: "Product updated", data: updatedProduct });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Failed to update product", error }, { status: 500 });
  }
}
