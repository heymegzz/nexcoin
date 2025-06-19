'use client';

import Navbar from '../components/Navbar';
import '../styles/wallet.css';

export default function WalletsLayout({ children }) {
  return (
    <div className="layout wallet-container">
      <Navbar />
      <main className="wallet-content">{children}</main>
    </div>
  );
}