"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  productId: string;
  userId: string;
};

export default function AddWishlistButton({ productId, userId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!userId) {
      toast.error("You need to log in first!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add to wishlist");
      }

      toast.success("✅ Added to Wishlist!");
    } catch (error: any) {
      toast.error(`❌ ${error.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleAdd} disabled={loading}>
        {loading ? "Adding..." : "Add to Wishlist"}
      </button>
    </div>
  );
}
