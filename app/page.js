import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import PremiumSection from "./components/PremiumSection";

export default function Home() {
  return (
    <div className="main">
      <HeroSection />
      <Features />
      <PremiumSection />
    </div>
  );
}