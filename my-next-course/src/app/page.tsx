import "../styles/page.css";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import CardComponent from "@/components/Card";
import BannerCarousel from "@/components/homepage/BannerCarousel";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import ScrollButton from "@/components/homepage/ScrollButton";

const Hero = ({ scrollToProductList }) => {
  return (
    <>
      <div className="hero-container">
        <Container>
          <Row className="align-items-start">
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
          <Col md={6} className="hero-image-column">
            <Image
              src="/images/heroImg.png"
              alt="Hero Image"
              width={200}
              height={200}
              className="hero-image"
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
