import UserModel, { LoginType } from "@/db/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: LoginType = await req.json();

    const { token, name } = await UserModel.login(body);

    const response = NextResponse.json({ token, name });
    response.cookies.set("access_token", token);

    return response;
  } catch (err) {
    console.log(err, "<<<<<");
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
