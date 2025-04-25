"use client";
import React, { useState } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  return (
    <nav className="bg-black border-b border-yellow-900/20 font-['Inter',_system-ui,_sans-serif] tracking-tight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          
         
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="flex items-center justify-center space-x-12">
              <a
                href="/"
                className="text-white hover:text-yellow-400 text-base font-light transition-all duration-200"
              >
                Home
              </a>
              <a
                href="/"
                className="text-white hover:text-yellow-400 text-base font-light transition-all duration-200"
              >
                Markets
              </a>
              <a
                href="/"
                className="text-white hover:text-yellow-400 text-base font-light transition-all duration-200"
              >
                Trading
              </a>
              <a
                href="/"
                className="text-white hover:text-yellow-400 text-base font-light transition-all duration-200"
              >
                Wallet
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end space-x-3">
            <a
              href="/login"
              className="text-white hover:text-yellow-400 text-base font-light px-3 py-1 transition-all duration-200"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-black text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-black text-base font-light px-4 py-1.5 rounded-md transition-all duration-200"
            >
              Sign Up
            </a>
          </div>
  

          <div className="md:hidden flex items-center justify-end col-span-2">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
              onClick={toggleNavbar}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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


      {isClick && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-sm">
          <a
            href="/"
            className="block text-white hover:text-yellow-400 px-3 py-2 text-base font-light transition-all duration-200"
          >
            Home
          </a>
          <a
            href="/"
            className="block text-white hover:text-yellow-400 px-3 py-2 text-base font-light transition-all duration-200"
          >
            Markets
          </a>
          <a
            href="/"
            className="block text-white hover:text-yellow-400 px-3 py-2 text-base font-light transition-all duration-200"
          >
            Trading
          </a>
          <a
            href="/"
            className="block text-white hover:text-yellow-400 px-3 py-2 text-base font-light transition-all duration-200"
          >
            Wallet
          </a>
          <div className="pt-4 pb-2 border-t border-yellow-900/20 flex flex-col space-y-2">
            <a
              href="/login"
              className="text-white hover:text-yellow-400 px-3 py-2 text-base font-light transition-all duration-200"
            >
              Login
            </a>
            <a
              href="/signup"
              className="mx-3 bg-black text-yellow-400 border border-yellow-400 text-center hover:bg-yellow-400 hover:text-black py-2 text-base font-light rounded-md transition-all duration-200"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;