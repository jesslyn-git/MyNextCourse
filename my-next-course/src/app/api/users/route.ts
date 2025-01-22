import UserModel, { User } from "@/db/models/UserModel"
import { z } from "zod";

export async function GET() {
  const users = await UserModel.findAll()

  return Response.json(users)
}

export async function POST(req: Request) {
  try {
    const body: User = await req.json()

    const message = await UserModel.insertOne(body)

    return Response.json({ message }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.issues, "ini err")
      return Response.json({ message: "Bad Request" }, { status: 400 })
    } else {
      return Response.json({ message: "Internal server err" }, { status: 500 })
    }

  }
}
