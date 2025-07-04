'use client';

import Navbar from '../components/Navbar';

export default function ProfileLayout({ children }) {
  return (
    <main className="main">
      <Navbar />
      {children}
    </main>
  );
}