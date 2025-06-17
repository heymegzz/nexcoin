'use client';
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContextProvider } from './context/AuthContext';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthContextProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}