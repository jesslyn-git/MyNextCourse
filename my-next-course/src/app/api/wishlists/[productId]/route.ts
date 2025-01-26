import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/config/mongodb";

export async function DELETE(
  req: NextRequest,
  { params }: { params?: { productId?: string } } = {}
) {
  try {
    console.log("Ada di API");

    const userId = req.headers.get("x-user-id");
    console.log("🚀 ~ userId:", userId);
    console.log("🚀 ~ productId:", params.productId);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const result = await db
      .collection("wishlists")
      .deleteOne({ userId, productId: params.productId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Wishlist item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Wishlist item removed successfully" });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json(
      { error: "Failed to remove wishlist item" },
      { status: 500 }
    );
  }
}
