"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardComponent from "@/components/Card";
import { on } from "events";

export default function ProductPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   console.log(document.cookie, ">>> ini cookie");

  // ✅ Check login status using cookies
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Fetch Products (Supports Pagination & Search)
  const fetchProducts = async (currentPage: number, reset = false) => {
    try {
      console.log("trying to fetch");

      const res = await fetch(
        `/api/courses?page=${currentPage}&limit=6&search=${searchQuery}`,
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
  };

  // ✅ Debounce Search (Prevents API Overload)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts(1, true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // ✅ Add to Wishlist
  const handleAddToWishlist = async (productId: string) => {
    if (!isLoggedIn) {
      toast.error("Please login to add to wishlist");
      return;
    }

    try {
      const res = await fetch("/api/wishlists", {
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
    <div className="container">
      <h1>Product Listings</h1>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* ✅ Infinite Scroll Pagination */}
      <InfiniteScroll
        dataLength={products.length}
        next={() => fetchProducts(page)}
        hasMore={hasMore}
        loader={<h4>Loading more products...</h4>}
      >
        <div className="product-grid">
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
