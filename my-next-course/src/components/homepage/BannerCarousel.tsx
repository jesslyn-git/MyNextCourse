"use client";
import Image from "next/image";
import { Row } from "react-bootstrap";
import { Carousel } from "@material-tailwind/react";

export default function BannerCarousel() {
  return (
    <div className="bg-gray-400 py-8">
      <div>
        <h1 className="flex py-5 lg:px-20 md:px-10 px-5 font-bold text-4xl text-gray-800 text-center">
          What&apos;s On:
        </h1>
      </div>
      <Row>
        <div className="flex justify-center items-center">
          <Carousel
            className="rounded-xl w-full max-w-screen-lg"
            style={{
              height: "400px",
              position: "relative",
              zIndex: 0,
            }}
          >
            <div className="flex items-center justify-center h-full">
              <Image
                src="/banner/1.png"
                alt="image 1"
                className="w-full h-full object-cover"
                width={1200}
                height={400}
                priority
              />
            </div>
            <div className="flex items-center justify-center h-full">
              <Image
                src="/banner/2.png"
                alt="image 2"
                className="w-full h-full object-cover"
                width={1200}
                height={400}
                priority
              />
            </div>
            <div className="flex items-center justify-center h-full">
              <Image
                src="/banner/3.png"
                alt="image 3"
                className="w-full h-full object-cover"
                width={1200}
                height={400}
                priority
              />
            </div>
            <div className="flex items-center justify-center h-full">
              <Image
                src="/banner/1.png"
                alt="image 1"
                className="w-full h-full object-cover"
                width={1200}
                height={400}
                priority
              />
            </div>
            <div className="flex items-center justify-center h-full">
              <Image
                src="/banner/2.png"
                alt="image 2"
                className="w-full h-full object-cover"
                width={1200}
                height={400}
                priority
              />
            </div>
            <div className="flex items-center justify-center h-full">
              <Image
                src="/banner/3.png"
                alt="image 3"
                className="w-full h-full object-cover"
                width={1200}
                height={400}
                priority
              />
            </div>
          </Carousel>
        </div>
      </Row>
    </div>
  );
}
