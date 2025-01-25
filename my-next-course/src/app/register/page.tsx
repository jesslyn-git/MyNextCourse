"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const resp = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!resp.ok) {
      console.error("Registration failed");
      return;
    }

    router.push("/login");
  }

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <label>Username</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
