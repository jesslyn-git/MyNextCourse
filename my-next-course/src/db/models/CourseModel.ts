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

const CourseValidation = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  price: z.number().positive("Price must be a positive number"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  tags: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "Tags must be unique",
    }), // ✅ Ensures unique tags
});

export default class CourseModel {
  static async getCollection() {
    const db = await getDb();

    const collection = db.collection<Course>("courses");

    return collection;
  }

  static async findAll() {
    const collection = await this.getCollection();
    const courses = await collection.find().toArray();
    return courses;
  }

  static async findById(id: ObjectId) {
    const collection = await this.getCollection();

    const course = await collection.findOne({ _id: id });

    return course;
  }

  static async findByTitle(title: string) {
    const collection = await this.getCollection();

    const courses = await collection.findOne({ title });

    return courses;
  }

  static async insertOne(courseData: Course) {
    CourseValidation.parse(courseData); // ✅ Validate input data

    const collection = await this.getCollection();

    // ✅ Check if a course with the same slug already exists
    const existingCourse = await collection.findOne({ slug: courseData.slug });
    if (existingCourse) {
      throw new Error("Slug already exists, please choose another one.");
    }

    // ✅ Insert new course if slug is unique
    await collection.insertOne({
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { message: "Course added successfully" };
  }
}
