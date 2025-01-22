import UserModel from "@/db/models/UserModel";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.headers.get("x-user-id") as string
  const userId = new ObjectId(id)

  const user = await UserModel.findById(userId)

  return Response.json(user)
}
