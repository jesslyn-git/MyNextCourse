import { Db, MongoClient } from "mongodb";
import { dummyCourses } from "@/data/dummyCourses";

const uri = "mongodb://localhost:27017";
let db: Db;
let client: MongoClient;

async function seedDatabase() {
  const collection = db.collection("courses");
  const existingCourseCount = await collection.countDocuments();

  if (existingCourseCount === 0) {
    console.log("No courses found. Seeding database...");
    await collection.insertMany(dummyCourses);
    console.log("Dummy courses inserted successfully!");
  }
}

export function connect() {
  client = new MongoClient(uri);

  console.log("Connected successfully to server");
  db = client.db("my-next-course");
}

export async function getDb() {
  if (!db) {
    connect();
    await seedDatabase();
  }

  return db;
}
