"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ExploreAllButton from "./ExploreAllButton";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import dotenv from "dotenv";
dotenv.config();

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [user, setUser] = useState<string>("");
  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const checkAuthStatus = () => {
      if (typeof window !== "undefined") {
        const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(isAuthenticated);
        setUser(localStorage.getItem("user") || ""); // ✅ Fetch user safely
      }
    };

    checkAuthStatus();
    window.addEventListener("auth-change", checkAuthStatus);
    return () => window.removeEventListener("auth-change", checkAuthStatus);
  }, [setIsLoggedIn]);

  const handleHome = () => {
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogout = async () => {
    const resp = await fetch(`${BASE_URL}/api/logout`, {
      method: "POST",
    });
    if (resp.ok) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth-change"));
      setIsLoggedIn(false);
      toast.success("Logout success!");
      router.push("/login");
    }
  };

  const handleWishlist = () => {
    router.push("/wishlists");
  };

  return (
    <div className="sticky top-0 left-0 right-0 bg-white py-2 text-sm z-50 shadow-md">
      <div className="lg:block hidden">
        <div className="flex items-center justify-between py-2 px-6">
          <div className="flex items-center justify-between space-x-5">
            <Image
              src="/images/logo.svg"
              alt="Logo Image"
              width={200}
              height={200}
              className="logo-image"
              onClick={handleHome}
              style={{ cursor: "pointer" }}
            />
            <ExploreAllButton />
          </div>
          <div className="flex items-center justify-between space-x-6">
            {isLoggedIn ? (
              <>
                <button> Welcome Back, {user}</button>
                <button onClick={handleWishlist}>Wishlists</button>
                <button className="logOut" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex gap-5 items-center justify-between">
                <p className="text-blue-700 cursor-pointer">
                  <button onClick={handleLogin}>Log In</button>
                </p>
                <button
                  className="text-white bg-blue-700 rounded-md py-2 px-4 font-semibold"
                  onClick={handleRegister}
                >
                  Join for Free
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
