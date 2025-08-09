import connectDatabase from "@/database/database";
import records from "@/database/models/records";
import { NextResponse } from "next/server";

// 🔹 GET: Fetch all records
export async function GET() {
  await connectDatabase();
  try {
    const recordsData = await records.find();
    return NextResponse.json(recordsData);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// 🔹 POST: Create a new record
export async function POST(req) {
  await connectDatabase();
  try {
    const { itemName, itemPrice, itemQuantity, itemTotal, itemType } = await req.json();

    const record = await records.create({
      itemName,
      itemPrice,
      itemQuantity,
      itemTotal,
      itemType,
    });

    return NextResponse.json(record);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// 🔹 DELETE: Delete record(s)
export async function DELETE(req) {
  await connectDatabase();
  try {
    const body = await req.json();

    // Delete all records
    if (body.deleteAll) {
      await records.deleteMany({});
      return NextResponse.json({ message: "All records deleted successfully" }, { status: 200 });
    }

    // Delete one record by ID
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedRecord = await records.findByIdAndDelete(id);
    if (!deletedRecord) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Record deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
