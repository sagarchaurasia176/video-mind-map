"use client";

import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <HeroSection/>
      <Footer />
    </div>
  );
}
