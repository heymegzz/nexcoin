import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import PremiumSection from "./components/PremiumSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="main">
      <Navbar />
      <HeroSection />
      <Features />
      <PremiumSection />
      <Footer />
    </main>
  );
}