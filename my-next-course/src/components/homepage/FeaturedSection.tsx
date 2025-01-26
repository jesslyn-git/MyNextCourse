import ExploreAllButton from "../ExploreAllButton";
import CourseModel from "@/db/models/CourseModel";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedSection() {
  const products = await CourseModel.findAll();

  // ✅ Randomly select 5 products from the full list
  const featuredProducts = products
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, 5); // Take first 5 after shuffling
  return (
    <div
      className="flex flex-col bg-white w-screen mx-auto"
      style={{ backgroundColor: "lightblue" }}
      id="featured-courses"
    >
      {/* Heading */}
      <h1 className="flex py-5 lg:px-20 md:px-10 px-5 font-bold text-4xl text-gray-800 text-center">
        Featured Courses
      </h1>
      {/* Scrollable Card Section */}
      <div className="overflow-x-auto pb-10 hide-scroll-bar snap-x snap-mandatory w-2/3 mx-auto">
        <div className="flex flex-nowrap gap-6 px-5">
          {featuredProducts.map((product, index) => (
            <div key={index} className="snap-start w-1/4 min-w-[300px]">
              <Link
                href={`/products/${product.slug}`}
                className="snap-start w-1/4 min-w-[300px] cursor-pointer"
              >
                <div className="w-full h-64 overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    priority={index === 0} // ✅ Optimize first image load
                  />
                </div>
                <p className="text-lg font-semibold text-center mt-2">
                  {product.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* "See All" Button  */}

      <div className="flex justify-center mt-4 pb-8">
        <ExploreAllButton />
      </div>
    </div>
  );
}
