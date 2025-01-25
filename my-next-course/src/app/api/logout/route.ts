import { NextResponse } from "next/server";

export async function POST() {
  // ✅ Remove "access_token" cookie
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("access_token", "", {
    httpOnly: true,
    expires: new Date(0), // ✅ Expire the cookie
    path: "/",
  });

  return response;
}
