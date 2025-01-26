"use client";

import React from "react";
import { Button } from "@material-tailwind/react";

export default function ScrollButton() {
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById("featured-courses");
    featuredSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Button className="primary-button" onClick={scrollToFeatured}>
      Start Your Learning Adventure
    </Button>
  );
}
