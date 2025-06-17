'use client';

import Navbar from '../components/Navbar';

export default function WalletsLayout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}