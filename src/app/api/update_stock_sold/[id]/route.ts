// src/app/api/edit_product/[id]/route.ts

import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ msg: "Product ID is missing" }, { status: 400 });
    }

    const body = await request.json();
    const { name, category, stock, price, description } = body;

    await connectMongoDB();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, stock, price, description },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ msg: "Product updated", data: updatedProduct });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ msg: "Failed to update product", error }, { status: 500 });
  }
}
