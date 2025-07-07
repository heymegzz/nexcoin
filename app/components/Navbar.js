"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import "../styles/profile.css";
import "../styles/profile-menu.css";

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const profileMenuRef = useRef(null);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <Link href="/blog" className="navbar-link">
                Blog
              </Link>
            </div>
          </div>

          <div className="navbar-auth">
            {user ? (
              <div className="profile-menu" ref={profileMenuRef}>
                <button onClick={toggleProfileMenu} className="profile-button">
                  <span>{user.displayName || 'Profile'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`profile-dropdown ${showProfileMenu ? 'open' : ''}`}>
                  <div className="profile-info">
                    <div className="profile-name">{user.displayName || 'User'}</div>
                    <div className="profile-email">{user.email}</div>
                  </div>
                  <Link href="/profile" className="profile-menu-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </Link>
                  <div className="profile-menu-item" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="navbar-login">
                  Login
                </Link>
                <button onClick={handleSignUp} className="navbar-signup-btn">
                  Sign Up
                </button>
              </>
            )}
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
        <Link href="/blog" className="navbar-mobile-link">
          Blog
        </Link>
        {user ? (
          <div className="profile-mobile">
            <div className="profile-info">
              <div className="profile-name">{user.displayName || 'User'}</div>
              <div className="profile-email">{user.email}</div>
            </div>
            <Link href="/profile" className="profile-menu-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </Link>
            <div className="profile-menu-item" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </div>
          </div>
        ) : (
          <div className="navbar-mobile-auth">
            <Link href="/login" className="navbar-mobile-login">
              Login
            </Link>
            <button onClick={handleSignUp} className="navbar-mobile-signup-btn">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;