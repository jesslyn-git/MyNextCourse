"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function WishlistsPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check if user is logged in (JWT stored in cookies)
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Fetch wishlist data
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await fetch("/api/wishlists", {
          method: "GET",
          credentials: "include", // ✅ Ensures cookies are sent
        });

        if (!res.ok) throw new Error("Failed to fetch wishlist");

        const data = await res.json();
        console.log("🚀 ~ fetchWishlist ~ data:", data);
        setWishlist(data.wishlist);
        console.log("🚀 ~ fetchWishlist ~ wishlists fetched:", wishlist);
      } catch (error) {
        console.log("🚀 ~ fetchWishlist ~ error:", error);
        toast.error("Error loading wishlist");
      } finally {
        setLoading(false);
      }
    }

    if (isLoggedIn) fetchWishlist();
  }, [isLoggedIn]);

  // ✅ Handle remove from wishlist
  const handleRemove = async (productId: string) => {
    try {
      const res = await fetch(`/api/wishlists/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to remove item");

      toast.success("Removed from Wishlist!");
      setWishlist(wishlist.filter((item) => item.product._id !== productId));
    } catch (error) {
      console.log("🚀 ~ handleRemove ~ error:", error);
      toast.error("Error removing item");
    }
  };

  if (!isLoggedIn) {
    return <p>Please login to view your wishlist.</p>;
  }

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  return (
    <div className="container">
      <h1>Your Wishlists</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.product._id} className="wishlist-card">
              <img src={item.product.thumbnail} alt={item.product.title} />
              <h3>{item.product.title}</h3>
              <button onClick={() => handleRemove(item.product._id)}>
                ❌ Remove
              </button>
              <button
                onClick={() => router.push(`/products/${item.product.slug}`)}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
