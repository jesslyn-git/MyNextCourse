import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };

    const resp = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const data = await resp.json();

      console.log(data, "<<<< ini errr");

      return;
    }

    const data = await resp.json();
    const cookieStore = await cookies();
    cookieStore.set("access_token", data.token);

    redirect("/user");
  }

  return (
    <div>
      <h1>LoginPage</h1>

      <form action={handleLogin}>
        <label>Email</label>
        <input name="email" />
        <br />
        <label>Password</label>
        <input name="password" />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
