import { NextResponse } from "next/server";
import connectDatabase from "@/database/database";
import User from "@/database/models/user";

export async function GET() {
  try {
    await connectDatabase();

    // ✅ Include _id for deletion purposes
    const users = await User.find().select("fullName email _id").lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
