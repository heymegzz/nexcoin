"use client";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MarketsLayout({ children }) {
  return (
    <main className="main">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
} 