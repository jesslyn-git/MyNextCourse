export default function RegisterPage() {
  async function handleRegister(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const body = { name, email, password };

    const resp = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json();

    console.log(data, "ini client");
  }

  return (
    <div>
      <h1>RegisterPage</h1>
      <form action={handleRegister}>
        <label>Name</label>
        <input name="name" />
        <br />
        <label>Email</label>
        <input name="email" />
        <br />
        <label>Password</label>
        <input name="password" />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
