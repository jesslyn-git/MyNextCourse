import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { z } from "zod";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { createSecretKey } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const secretKey = createSecretKey(JWT_SECRET, "utf-8");

export type LoginType = {
  email: string;
  password: string;
};

export type User = {
  name: string;
  username: string;
  email: string;
  password: string;
};

const UserValidation = z.object({
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .min(1, "Username is required")
    .refine((s) => !s.includes(" "), "No Spaces!"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});
export default class UserModel {
  static async getCollection() {
    const db = await getDb();

    const collection = db.collection<User>("users");

    return collection;
  }

  static async findAll() {
    try {
      const collection = await this.getCollection();
      const users = await collection.find().toArray();
      return users;
    } catch (error) {
      console.log("🚀 ~ UserModel ~ findAll ~ error:", error);
      throw new Error("Failed to fetch users");
    }
  }

  static async findById(id: ObjectId) {
    try {
      const collection = await this.getCollection();

      const user = await collection.findOne({ _id: id });

      return user;
    } catch (error) {
      console.log("🚀 ~ UserModel ~ findById ~ error:", error);
      throw new Error("User not found");
    }
  }

  static async insertOne(payload: User) {
    try {
      UserValidation.parse(payload);

      const collection = await this.getCollection();
      // Check for duplicate email or username
      const existingUser = await collection.findOne({
        $or: [{ email: payload.email }, { username: payload.username }],
      });

      if (existingUser) {
        throw new Error("Email or Username already exists");
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      const newUser = { ...payload, password: hashedPassword };

      await collection.insertOne(newUser);
      return { message: "User has been created successfully" };
    } catch (error) {
      console.log("🚀 ~ UserModel ~ insertOne ~ error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create user"
      );
    }
  }

  static async login(
    payload: LoginType
  ): Promise<{ token: string; name: string }> {
    const loginValidation = z.object({
      email: z.string().email(),
      password: z.string().min(5),
    });

    loginValidation.parse(payload);

    const collection = await this.getCollection();

    const user = await collection.findOne({ email: payload.email });
    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = bcrypt.compareSync(payload.password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const encodedSecret = new TextEncoder().encode(JWT_SECRET);

    const token = await new SignJWT({
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(encodedSecret);

    console.log("🚀 ~ UserModel ~ login ~ token:", token);
    const name = user.name;
    return { token, name };
  }
}
