"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  Card,
  Input,
  Button,
  Typography,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isLoggedIn);
    };

    window.addEventListener("auth-change", handleAuthChange);

    // Initial check
    handleAuthChange();

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleLogin(e: React.FormEvent) {
    console.log("🚀 ~ handleChange ~ formData:", formData);
    e.preventDefault();

    const resp = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!resp.ok) {
      toast.error("Login failed. Please check your credentials.");
      return;
    }

    const data = await resp.json();
    console.log("🚀 ~ handleLogin ~ data:", data);
    // Store the access token from response
    // localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.name);
    localStorage.setItem("isLoggedIn", "true");
    // Show success message
    toast.success("Successfully logged in!");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
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
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
              type="password"
              label="Password"
              name="password"
              size="lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="gradient" fullWidth>
              Sign In
            </Button>
          </form>

          <Typography variant="small" className="mt-2 text-center">
            <>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-blue-500 hover:text-blue-700"
              >
                Sign up
              </Link>
            </>
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
            <img src="/google.svg" alt="google" className="h-5 w-5" />
            Continue with Google
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
