"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);
  const router = useRouter();

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/markets', label: 'Markets' },
    { href: '/trading', label: 'Trading' },
    { href: '/learn', label: 'Learn' },
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      
      if (e.target.closest('.navbar-toggle')) {
        return;
      }
    
      if (isClick && (e.target.tagName === 'A' || !e.target.closest('.navbar-mobile'))) {
        setIsClick(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isClick]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-layout">
          <div className="navbar-brand">
            <Link href="/" className="navbar-logo">
              <Logo />
            </Link>
          </div>

       
          <div className="navbar-menu">
            <div className="navbar-menu-items">
              <Link href="/" className="navbar-link">
                Home
              </Link>
              <Link href="/markets" className="navbar-link">
                Markets
              </Link>
              <Link href="/trading" className="navbar-link">
                Trading
              </Link>
              <Link href="/wallet" className="navbar-link">
                Wallet
              </Link>
            </div>
          </div>

          <div className="navbar-auth">
            <Link href="/login" className="navbar-login">
              Login
            </Link>
            <button onClick={handleSignUp} className="navbar-signup-btn">
              Sign Up
            </button>
          </div>
  
          <div className="navbar-mobile-menu-toggle">
            <button
              className="navbar-toggle"
              onClick={toggleNavbar}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="navbar-toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="24"
                height="24"
              >
                {isClick ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`navbar-mobile ${isClick ? 'open' : ''}`}>
        <Link href="/" className="navbar-mobile-link">
          Home
        </Link>
        <Link href="/markets" className="navbar-mobile-link">
          Markets
        </Link>
        <Link href="/trading" className="navbar-mobile-link">
          Trading
        </Link>
        <Link href="/wallet" className="navbar-mobile-link">
          Wallet
        </Link>
        <div className="navbar-mobile-auth">
          <Link href="/login" className="navbar-mobile-login">
            Login
          </Link>
          <button onClick={handleSignUp} className="navbar-mobile-signup-btn">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;