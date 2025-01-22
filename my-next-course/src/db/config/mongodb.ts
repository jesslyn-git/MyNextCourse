import { Db, MongoClient } from "mongodb";
import { dummyCourses } from "@/data/dummyCourses";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
console.log("🚀 ~ uri:", uri);
const dbName = process.env.DB_NAME || "my-next-course";
console.log("🚀 ~ dbName:", dbName);

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connected successfully to MongoDB server");
  }

  if (!db) {
    db = client.db(dbName);
    await seedDatabase(); // Ensure database seeding happens only once
  }

  return db;
}

async function seedDatabase() {
  if (!db) return;

  const collection = db.collection("courses");
  const existingCourseCount = await collection.countDocuments();

  if (existingCourseCount === 0) {
    console.log("⚡ No courses found. Seeding database...");
    await collection.insertMany(dummyCourses);
    console.log("✅ Dummy courses inserted successfully!");
  }
}

export async function getDb(): Promise<Db> {
  return connect();
}
