"use server";

// async function => server action => eksekusi di server
export async function searchCourses(title: string) {
  const resp = await fetch(`http://localhost:3000/api/courses/${title}`, {
    method: "GET",
  });
  const data = await resp.json();

  return data;
}
