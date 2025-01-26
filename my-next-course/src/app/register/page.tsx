"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  Input,
  Button,
  Typography,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import Image from "next/image";

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
      toast.error("Registration failed");
      return;
    }
    toast.success("Registration successful");
    router.push("/login");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Register
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-6">
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              name="email"
              size="lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              label="Username"
              name="username"
              size="lg"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              label="Name"
              name="name"
              size="lg"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              label="Password"
              name="password"
              size="lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="gradient" fullWidth>
              Sign Up
            </Button>
          </form>

          <Typography variant="small" className="mt-2 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-blue-500 hover:text-blue-700"
            >
              Sign in
            </Link>
          </Typography>

          <Typography variant="small" className="mt-1 text-center">
            <>
              Continue without login:{" "}
              <Link
                href="/"
                className="font-bold text-blue-500 hover:text-blue-700"
              >
                Explore My Next Course
              </Link>
            </>
          </Typography>

          <div className="flex items-center gap-2 mt-2">
            <div className="h-px flex-1 bg-gray-300"></div>
            <Typography variant="small" color="gray">
              or continue with
            </Typography>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          <Button
            variant="outlined"
            color="blue-gray"
            className="flex items-center justify-center gap-3"
          >
            <Image
              src="/google.svg"
              alt="google"
              className="h-5 w-5"
              width={20}
              height={20}
            />
            Continue with Google
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
