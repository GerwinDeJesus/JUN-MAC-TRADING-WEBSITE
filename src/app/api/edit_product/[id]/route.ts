import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import SoldProduct from "@/libs/models/SoldProduct";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    const {
      name,
      category,
      stock,
      price,
      description,
      sold,
      soldQty,
      expectedRestockDate,
    } = body;

    await connectMongoDB();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        stock,
        price,
        description,
        sold,
        expectedRestockDate,
      },
      { new: true }
    );

    if (soldQty && soldQty > 0) {
      await SoldProduct.create({
        productId: id,
        name,
        quantity: soldQty,
      });
    }

    return NextResponse.json({
      msg: "Product Updated Successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Edit Product Error:", error);
    return NextResponse.json(
      {
        msg: "Something went wrong",
        error: error instanceof Error ? error.message : error,
      },
      { status: 400 }
    );
  }
}
