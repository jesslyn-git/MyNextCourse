import "../styles/page.css";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import BannerCarousel from "@/components/homepage/BannerCarousel";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import ScrollButton from "@/components/homepage/ScrollButton";

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <Container>
          <Row className="align-items-center">
            {/* Text Section */}
            <Col md={6} className="hero-text-column">
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
            </Col>
          </Row>
        </Container>
        <Container>
          {/* Image Section */}
          <Col md={6} className="hero-image-column text-center">
            <Image
              src="/images/heroImg.png"
              alt="Hero Image"
              width={350}
              height={350}
              className="hero-image image-fluid"
              priority
            />
          </Col>
        </Container>
      </div>
      <div className="">
        <BannerCarousel />
      </div>
      <FeaturedSection />
    </>
  );
};
export default Hero;
