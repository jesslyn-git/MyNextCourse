"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const resp = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include", // ✅ Allows cookies to be stored from the API response
    });

    if (!resp.ok) {
      const data = await resp.json();
      console.log(data, "<<<< Login error");
      toast.error("Invalid email or password");
      return;
    }

    const data = await resp.json();
    console.log("Login berhasil");

    toast.success("Login success!");

    router.push("/");
  }

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
