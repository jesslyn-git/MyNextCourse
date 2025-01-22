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
  static getCollection() {
    const db = getDb();

    const collection = db.collection<Wishlist>("wishlists");

    return collection;
  }

  static async findAll() {
    const collection = this.getCollection();
    const wishlists = await collection.find().toArray();
    return wishlists;
  }

  static async findById(id: ObjectId) {
    const collection = this.getCollection();

    const wishlist = await collection.findOne({ _id: id });

    return wishlist;
  }

  static async insertOne(payload: Wishlist) {
    WishlistValidation.parse(payload);

    const collection = this.getCollection();
    await collection.insertOne(payload);

    return "Wishlist has been added";
  }

  static async deleteOne(id: ObjectId) {
    const collection = this.getCollection();

    await collection.deleteOne({ _id: id });

    return "Wishlist has been deleted";
  }
}
