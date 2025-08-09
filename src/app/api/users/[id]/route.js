import { NextResponse } from "next/server";
import connectDatabase from "@/database/database";
import User from "@/database/models/user";

export async function DELETE(request, context) {
  try {
    await connectDatabase();

    const userId = context.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
  }
}
