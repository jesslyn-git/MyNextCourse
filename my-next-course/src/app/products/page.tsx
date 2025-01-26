"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardComponent from "@/components/Card";
import styles from "./products.module.css";
import { Course } from "@/db/models/CourseModel";
import dotenv from "dotenv";
dotenv.config();

export default function ProductPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  //   console.log(document.cookie, ">>> ini cookie");

  // ✅ Check login status using cookies
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Fetch Products (Supports Pagination & Search)
  const fetchProducts = useCallback(
    async (currentPage: number, reset = false) => {
      try {
        console.log("trying to fetch");

        const res = await fetch(
          `${BASE_URL}/api/courses?page=${currentPage}&limit=6&search=${searchQuery}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        //   console.log("🚀 ~ fetchProducts ~ res:", res);

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log("🚀 ~ fetchProducts ~ data:", data);

        setProducts((prev) =>
          reset ? data.courses : [...prev, ...data.courses]
        );
        setPage(currentPage + 1);
        setHasMore(data.courses.length > 0);
      } catch (error) {
        console.error("🚀 ~ fetchProducts ~ error:", error);
        toast.error("Error loading products");
      }
    },
    [searchQuery]
  );

  // ✅ Debounce Search (Prevents API Overload)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts(1, true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, fetchProducts]);

  // ✅ Add to Wishlist
  const handleAddToWishlist = async (productId: string) => {
    if (!isLoggedIn) {
      toast.error("Please login to add to wishlist");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/wishlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add to wishlist"); // ✅ Show backend error
      }

      toast.success("✅ Added to Wishlist!");
    } catch (error) {
      console.error("🚀 ~ handleAddToWishlist ~ error:", error);
      toast.error(`❌ ${error.message || "Error adding to wishlist"}`); // ✅ Show exact error message
    }
  };

  return (
    <div className={styles.container}>
      <h1>Product Listings</h1>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className={styles.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* ✅ Infinite Scroll Pagination */}
      <InfiniteScroll
        dataLength={products.length}
        next={() => fetchProducts(page)}
        hasMore={hasMore}
        loader={<h4 className={styles.loader}>Loading more products...</h4>}
      >
        <div className={styles.productGrid}>
          {products.map((product) => (
            <CardComponent
              key={product._id}
              product={product}
              onAddToWishlist={() => handleAddToWishlist(product._id)}
              onSeeDetail={() => router.push(`/products/${product.slug}`)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
