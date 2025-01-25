"use client";
import { useRouter } from "next/navigation";

export default function ExploreAllButton() {
  const router = useRouter();
  const handleProducts = () => {
    router.push("/products");
  };
  return (
    <button
      className="text-white bg-blue-700 font-semibold rounded-md py-2 px-4"
      onClick={handleProducts}
    >
      Explore All
    </button>
  );
}
