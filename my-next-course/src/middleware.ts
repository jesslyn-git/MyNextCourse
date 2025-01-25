import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/wishlists")) {
    try {
    } catch (error) {
      console.log("🚀 ~ middleware ~ error:", error);
    }
    const token = request.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode("rahasia");
    const { payload } = await jwtVerify(token, secret);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload._id);
    requestHeaders.set("x-user-email", payload.email);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    return response;
  }
}
