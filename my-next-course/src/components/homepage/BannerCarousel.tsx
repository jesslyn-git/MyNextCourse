"use client";
import Image from "next/image";
import { Row } from "react-bootstrap";
import { Carousel } from "@material-tailwind/react";

export default function BannerCarousel() {
  return (
    <div style={{ backgroundColor: "grey" }}>
      <div style={{}}>
        <h1
          className="flex py-5 lg:px-20 md:px-10 px-5 font-bold text-4xl text-gray-800 text-center"
          style={{ margin: "0px" }}
        >
          What's On:
        </h1>
      </div>
      <Row>
        <div className="flex justify-center items-center">
          <Carousel
            className="rounded-xl w-full max-w-screen-lg"
            style={{
              height: "300px",
              // marginBottom: "20px",
            }}
          >
            <div className="flex items-center justify-center">
              <Image
                src="/banner/1.png"
                alt="image 1"
                className="mx-auto object-cover"
                width={600}
                height={300}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/banner/2.png"
                alt="image 2"
                className="mx-auto object-cover"
                width={500}
                height={300}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/banner/3.png"
                alt="image 3"
                className="mx-auto object-cover"
                width={500}
                height={300}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/banner/1.png"
                alt="image 1"
                className="mx-auto object-cover"
                width={600}
                height={300}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/banner/2.png"
                alt="image 2"
                className="mx-auto object-cover"
                width={500}
                height={300}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/banner/3.png"
                alt="image 3"
                className="mx-auto object-cover"
                width={500}
                height={300}
              />
            </div>
          </Carousel>
        </div>
      </Row>
    </div>
  );
}
