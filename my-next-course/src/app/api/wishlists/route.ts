import { NextRequest, NextResponse } from "next/server";
import WishlistModel from "@/db/models/WishlistModel";
import { getDb } from "@/db/config/mongodb";

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const existingItem = await WishlistModel.findByUserId(userId, productId);
    console.log("🚀 ~ POST ~ existingItem:", existingItem);

    if (existingItem) {
      return NextResponse.json(
        { error: "Product is already in wishlist" },
        { status: 400 }
      );
    }

    console.log("masih kesini");

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
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const wishlist = await db
      .collection("wishlists")
      .aggregate([
        { $match: { userId } }, // ✅ Match only user's wishlist
        {
          $addFields: {
            productIdObj: { $toObjectId: "$productId" },
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "productIdObj",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
      ])
      .toArray();
    console.log("🚀 ~ GET ~ wishlist:", wishlist);

    return NextResponse.json({ wishlist });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json(
      { error: "Failed to load wishlist" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    await db
      .collection("wishlists")
      .deleteOne({ userId, productId: params.productId });

    return NextResponse.json({ message: "Wishlist item removed" });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json(
      { error: "Failed to remove wishlist item" },
      { status: 500 }
    );
  }
}
