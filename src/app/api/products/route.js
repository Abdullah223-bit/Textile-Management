import connectDatabase from "@/database/database";
import product from "@/database/models/product";
import { NextResponse } from "next/server";

// 🔹 GET: Fetch all products
export async function GET() {
  await connectDatabase();
  try {
    const products = await product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

// 🔹 POST: Create a new product
export async function POST(req) {
  await connectDatabase();
  try {
    const { itemName, itemDescription, purchasePrice, salePrice, itemImage } = await req.json();

    if (!itemName || purchasePrice === undefined || salePrice === undefined) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newProduct = await product.create({
      itemName,
      itemDescription,
      purchasePrice: Number(purchasePrice),
      salePrice: Number(salePrice),
      itemImage,
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "Failed to create product" }, { status: 500 });
  }
}

// 🔹 PUT: Update an existing product by ID (via body.id)
export async function PUT(req) {
  await connectDatabase();
  try {
    const { id, itemName, itemDescription, purchasePrice, salePrice, itemImage } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
    }

    const updatedProduct = await product.findByIdAndUpdate(
      id,
      {
        itemName,
        itemDescription,
        purchasePrice: Number(purchasePrice),
        salePrice: Number(salePrice),
        itemImage,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}

// 🔹 DELETE: Delete a product by ID (via body.id)
export async function DELETE(req) {
  await connectDatabase();
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
    }

    const deleted = await product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
