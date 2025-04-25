import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
      </div>
    </main>
  );
}