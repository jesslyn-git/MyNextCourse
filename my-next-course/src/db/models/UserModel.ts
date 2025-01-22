import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { z } from "zod";

export type User = {
  name: string;
  username: string;
  email: string;
  password: string;
};

const UserValidation = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export default class UserModel {
  static getCollecton() {
    const db = getDb();

    const collection = db.collection<User>("users");

    return collection;
  }

  static async findAll() {
    const collection = this.getCollecton();
    const users = await collection.find().toArray();
    return users;
  }

  static async findById(id: ObjectId) {
    const collection = this.getCollecton();

    const user = await collection.findOne({ _id: id });

    return user;
  }

  static async insertOne(payload: User) {
    UserValidation.parse(payload);

    const collection = this.getCollecton();
    await collection.insertOne(payload);

    return "User has been created";
  }
}
