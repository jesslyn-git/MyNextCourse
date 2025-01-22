import { NextRequest, NextResponse } from "next/server";
import WishlistModel from "@/db/models/WishlistModel";

export async function POST(req: NextRequest) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "Missing userId or productId" },
        { status: 400 }
      );
    }

    await WishlistModel.insertOne({
      userId,
      productId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: "Added to Wishlist" }, { status: 201 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { error: "Failed to add to Wishlist" },
      { status: 500 }
    );
  }
}
