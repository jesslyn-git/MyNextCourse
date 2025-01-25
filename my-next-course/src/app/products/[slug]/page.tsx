import { getDb } from "@/db/config/mongodb";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToWishlistButton from "@/components/AddToWishlistButton";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const db = await getDb();
  const product = await db.collection("courses").findOne({ slug });

  if (!product) return notFound();

  return (
    <div className="container">
      <h1>{product.title}</h1>

      {/* ✅ Show all images */}
      <div className="product-images">
        {product.images.map((img: string, index: number) => (
          <Image
            key={index}
            src={img}
            alt={product.title}
            width={500}
            height={300}
            className="product-image"
          />
        ))}
      </div>

      <p className="description">{product.description}</p>
      <p className="category">Category: {product.category}</p>
      <p className="price">Price: ${product.price.toFixed(2)}</p>
      <p className="tags">Tags: {product.tags.join(", ")}</p>

      {/* ✅ Add to Wishlist Button (Client Component) */}
      <AddToWishlistButton productId={product._id.toString()} />
    </div>
  );
}
