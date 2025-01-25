import UserModel, { User } from "@/db/models/UserModel";

export async function POST(req: Request) {
  try {
    const body: User = await req.json();

    await UserModel.insertOne(body);

    return Response.json({ message: "Register berhasil" }, { status: 201 });
  } catch (err) {
    console.log("🚀 ~ POST ~ err:", err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
