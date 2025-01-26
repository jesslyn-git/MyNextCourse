import "../styles/page.css";
import Image from "next/image";
import BannerCarousel from "@/components/homepage/BannerCarousel";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import ScrollButton from "@/components/homepage/ScrollButton";

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Section */}
            <div className="w-full md:w-1/2">
              <div className="hero-content">
                <h1 className="hero-title">
                  Discover Your Talent at My Next Course!
                </h1>
                <h2 className="hero-subtitle">
                  My Next Course is a Hub for Upskilling Enthusiasts to learn,
                  learn, and learn.
                </h2>
                <ScrollButton />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full md:w-1/2 text-center">
            <Image
              src="/images/heroImg.png"
              alt="Hero Image"
              width={350}
              height={350}
              className="hero-image image-fluid"
              priority
            />
          </div>
        </div>
      </div>
      <div>
        <BannerCarousel />
      </div>
      <FeaturedSection />
    </>
  );
};
export default Hero;
