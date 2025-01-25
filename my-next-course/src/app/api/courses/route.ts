import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/config/mongodb";

export async function GET(req: NextRequest) {
  try {
    // console.log("in the API ");

    const db = await getDb();
    const collection = db.collection("courses");

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const searchQuery = searchParams.get("search") || "";

    const filter = searchQuery
      ? { title: { $regex: searchQuery, $options: "i" } }
      : {};

    const courses = await collection
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // console.log("🚀 ~ GET ~ courses:", courses);
    return NextResponse.json({
      courses,
      page,
      hasMore: courses.length === limit,
    });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
