import { getDb } from "@/db/config/mongodb";
import { notFound } from "next/navigation";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import styles from "./page.module.css";
import DetailCarousel from "@/components/DetailCarousel";
import BackToProductsButton from "@/components/BackToProductsButton";
import type { Metadata } from "next";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const db = await getDb();
  const product = await db.collection("courses").findOne({ slug: params.slug });

  return {
    title: product?.title || "Product Not Found",
    description: product?.description || "Product details not available",
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: product?.thumbnail ? [product.thumbnail] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product?.title,
      description: product?.description,
      images: product?.thumbnail ? [product.thumbnail] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = params;
  const db = await getDb();
  const product = await db.collection("courses").findOne({ slug });

  if (!product) return notFound();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>

      {product.images?.length > 0 ? (
        <DetailCarousel product={{ ...product, _id: product._id.toString() }} /> // ✅ Convert `_id` to string
      ) : (
        <p>No images available</p>
      )}

      <p className={styles.description}>{product.description}</p>
      <p className={styles.category}>Category: {product.category}</p>
      <p className={styles.price}>Price: ${product.price.toFixed(2)}</p>

      <div className={styles.tags}>
        {product.tags?.length > 0 && (
          <div className={styles.tags}>
            <div className={styles.tagsList}>
              {product.tags.map((tag: string, index: number) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <AddToWishlistButton productId={product._id.toString()} />
        <BackToProductsButton />
      </div>
    </div>
  );
}
