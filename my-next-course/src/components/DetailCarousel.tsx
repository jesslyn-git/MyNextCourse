"use client";

import Image from "next/image";
import { Carousel } from "@material-tailwind/react";

interface DetailCarouselProps {
  product: {
    _id: string;
    images: string[];
    title: string;
  };
}

export default function DetailCarousel({ product }: DetailCarouselProps) {
  if (!product?.images || product.images.length === 0) {
    return <p>No images available</p>; // ✅ Prevents crashes if no images
  }

  return (
    <Carousel
      className="rounded-xl w-full max-w-screen-lg"
      style={{
        height: "400px",
        position: "relative",
        zIndex: 0,
      }}
      loop // ✅ Enables infinite looping
      autoplay // ✅ Auto-scrolls images
    >
      {product.images.map((imgSrc: string, index: number) => (
        <div key={index} className="w-full h-full flex justify-center">
          <Image
            src={imgSrc}
            alt={`${product.title} image ${index + 1}`}
            width={800} // ✅ Bigger image size for better resolution
            height={500}
            className="rounded-md object-cover w-full h-full" // ✅ Ensures proper scaling
            priority={index === 0} // ✅ Optimize first image load
          />
        </div>
      ))}
    </Carousel>
  );
}
