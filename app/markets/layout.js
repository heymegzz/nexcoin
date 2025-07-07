"use client";

import Navbar from '../components/Navbar';

export default function MarketLayout({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  );
}