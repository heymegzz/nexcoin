import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="main">
      <Navbar />
      <HeroSection />
      <div className="main-content">
      </div>
    </main>
  );
}