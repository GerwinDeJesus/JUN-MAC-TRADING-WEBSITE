import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    await connectMongoDB();

    // Update the product with the data from the request body
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });

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
