import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { z } from "zod";

export type Wishlist = {
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};

const WishlistValidation = z.object({
  userId: z.string().min(1, "User ID is required"),
  productId: z.string().min(1, "Product ID is required"),
});

export default class WishlistModel {
  static async getCollection() {
    const db = await getDb();

    const collection = db.collection<Wishlist>("wishlists");

    return collection;
  }

  static async findAll() {
    const collection = await this.getCollection();
    const wishlists = await collection.find().toArray();
    return wishlists;
  }

  static async findByUserId(userId: string, productId: string) {
    const collection = await this.getCollection();

    const wishlist = await collection.findOne({ userId, productId });

    return wishlist;
  }

  static async insertOne(payload: Wishlist) {
    WishlistValidation.parse(payload);

    const collection = await this.getCollection();
    await collection.insertOne(payload);

    return "Wishlist has been added";
  }

  static async deleteOne(id: ObjectId) {
    const collection = await this.getCollection();

    await collection.deleteOne({ _id: id });

    return "Wishlist has been deleted";
  }
}
