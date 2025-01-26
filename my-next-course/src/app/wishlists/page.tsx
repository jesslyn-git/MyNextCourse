"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "./styles.module.css";

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
      console.log("Ada di handle remove");

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
    return (
      <p className={styles.loginPrompt}>Please login to view your wishlist.</p>
    );
  }

  if (loading) {
    return <p className={styles.loadingText}>Loading wishlist...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Wishlists</h1>
      {wishlist.length === 0 ? (
        <p className={styles.loginPrompt}>Your wishlist is empty.</p>
      ) : (
        <div className={styles.wishlistGrid}>
          {wishlist.map((item) => (
            <div key={item.product._id} className={styles.wishlistCard}>
              <img src={item.product.thumbnail} alt={item.product.title} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.product.title}</h3>
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(item.product._id)}
                  >
                    ❌ Remove
                  </button>
                  <button
                    className={styles.viewButton}
                    onClick={() =>
                      router.push(`/products/${item.product.slug}`)
                    }
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
