import connectDatabase from "@/database/database";
import product from "@/database/models/product";
import { NextResponse } from "next/server";

// 🔹 GET a single product by ID
export async function GET(req, context) {
  const { id } = context.params;
  await connectDatabase();

  try {
    if (!id) {
      return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
    }

    const singleProduct = await product.findById(id);
    if (!singleProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(singleProduct);
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}

// 🔹 PUT update a product by ID
export async function PUT(req, context) {
  const { id } = context.params;
  const { itemName, itemDescription, purchasePrice, salePrice, itemImage } = await req.json();
  await connectDatabase();

  try {
    if (!id) {
      return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
    }

    if (
      !itemName?.trim() ||
      !itemDescription?.trim() ||
      isNaN(Number(purchasePrice)) ||
      isNaN(Number(salePrice))
    ) {
      return NextResponse.json({ message: "Invalid product data" }, { status: 400 });
    }

    const updatedProduct = await product.findByIdAndUpdate(
      id,
      {
        itemName: itemName.trim(),
        itemDescription: itemDescription.trim(),
        purchasePrice: Number(purchasePrice),
        salePrice: Number(salePrice),
        itemImage,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}

// 🔹 DELETE a product by ID
export async function DELETE(req, context) {
  const { id } = context.params;
  await connectDatabase();

  try {
    if (!id) {
      return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
    }

    const deleted = await product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
