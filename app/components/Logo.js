"use client";
import React, { useState, useEffect, useRef } from "react";

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [animate, setAnimate] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1500);
    
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1500);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="flex items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={logoRef}
    >
      <div className="relative">
        <div className={`relative h-12 w-12 flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <div className={`absolute inset-0 bg-black rounded-xl transition-all duration-500 ${isHovered || animate ? 'rotate-45' : 'rotate-0'}`}></div>
          <div className={`absolute inset-0.5 bg-black border border-yellow-500/30 rounded-lg transition-all duration-500 ${isHovered || animate ? 'rotate-45 scale-95' : 'rotate-0 scale-100'}`}></div>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <path 
              d={`M20,${isHovered || animate ? 80 : 50} Q40,${isHovered || animate ? 20 : 60} 50,${isHovered || animate ? 40 : 50} T80,${isHovered || animate ? 20 : 40}`} 
              stroke="#EAB308" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="100"
              strokeDashoffset={isHovered || animate ? "0" : "100"}
              className="transition-all duration-1000"
            />
            <circle 
              cx="20" 
              cy={isHovered || animate ? "80" : "50"} 
              r="3" 
              fill="#EAB308" 
              className="transition-all duration-1000"
            />
            <circle 
              cx="50" 
              cy={isHovered || animate ? "40" : "50"} 
              r="2" 
              fill="#EAB308" 
              className={`opacity-0 transition-all duration-1000 ${isHovered || animate ? 'opacity-100 delay-300' : ''}`}
            />
            <circle 
              cx="80" 
              cy={isHovered || animate ? "20" : "40"} 
              r="3" 
              fill="#EAB308" 
              className={`opacity-0 transition-all duration-1000 ${isHovered || animate ? 'opacity-100 delay-600' : ''}`}
            />
          </svg>
          <div className={`relative h-6 w-6 bg-yellow-500 transform transition-all duration-700 ${isHovered || animate ? 'rotate-[225deg]' : 'rotate-45'} z-10`}>
            <div className="absolute inset-0.5 bg-black"></div>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered || animate ? 'opacity-100 rotate-[135deg]' : 'opacity-90 rotate-[315deg]'}`}>
              <span className="text-xs font-bold text-yellow-400">N</span>
            </div>
          </div>
          <div 
            className={`absolute h-full w-full rounded-full border border-yellow-500/20 transition-all duration-700 ${isHovered || animate ? 'scale-90 rotate-90' : 'scale-80 rotate-0'}`}
          ></div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          100% { background-position: -100% 0%; }
        }
      `}</style>
    </div>
  );
};

export default Logo;