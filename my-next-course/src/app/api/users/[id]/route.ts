import UserModel from "@/db/models/UserModel"
import { ObjectId } from "mongodb"

type Params = {
  params: Promise<{ id: string }>
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params

    const userId = new ObjectId(id)
    const user = await UserModel.findById(userId)

    if (!user) {
      return Response.json({ message: "Data not found" }, { status: 404 })
    }

    return Response.json(user, { status: 200 })
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
