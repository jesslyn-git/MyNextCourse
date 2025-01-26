"use server";
import dotenv from "dotenv";
dotenv.config();
// async function => server action => eksekusi di server
export async function searchCourses(title: string) {
  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  const resp = await fetch(`${BASE_URL}/api/courses/${title}`, {
    method: "GET",
  });
  const data = await resp.json();

  return data;
}
