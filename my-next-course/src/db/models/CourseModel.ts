import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { z } from "zod";

export type Course = {
  title: string;
  slug: string;
  description?: string;
  excerpt?: string;
  category?: string;
  price: number;
  tags?: string[];
  thumbnail: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
};

// const CourseValidation = z.object({
//   title: z.string().min(1, "Title is required"),
//   slug: z.string().min(1, "Slug is required"),
//   price: z.number().positive("Price must be a positive number"),
//   thumbnail: z.string().min(1, "Thumbnail is required"),
// });

export default class CourseModel {
  static getCollection() {
    const db = getDb();

    const collection = db.collection<Course>("courses");

    return collection;
  }

  static async findAll() {
    const collection = this.getCollection();
    const courses = await collection.find().toArray();
    return courses;
  }

  static async findById(id: ObjectId) {
    const collection = this.getCollection();

    const course = await collection.findOne({ _id: id });

    return course;
  }

  static async findByTitle(title: string) {
    const collection = this.getCollection();

    const courses = await collection.findOne({ title });

    return courses;
  }
}
