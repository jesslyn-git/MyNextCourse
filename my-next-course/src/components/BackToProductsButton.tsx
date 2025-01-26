import Link from "next/link";

export default function BackToProductsButton() {
  return (
    <Link
      href="/products"
      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      Back to Products
    </Link>
  );
}
