import React from "react";
import LandingNavbar from "../components/Home/LandingNavbar";
import HeroSection from "../components/Home/HeroSection";

function HomePage() {
  return (
    <div className="relative">
      <LandingNavbar />
      <HeroSection />
    </div>
  );
}

export default HomePage;