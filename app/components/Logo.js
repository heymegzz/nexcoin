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
      className="logo"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={logoRef}
    >
      <div className="logo-container">
        <div className={`logo-wrapper ${isHovered ? 'hovered' : ''}`}>
          <div className={`logo-background ${isHovered || animate ? 'rotate' : ''}`}></div>
          <div className={`logo-inner ${isHovered || animate ? 'rotate' : ''}`}></div>
          <svg viewBox="0 0 100 100" className="logo-svg">
            <path 
              d={`M20,${isHovered || animate ? 80 : 50} Q40,${isHovered || animate ? 20 : 60} 50,${isHovered || animate ? 40 : 50} T80,${isHovered || animate ? 20 : 40}`} 
              stroke="#EAB308" 
              strokeWidth="2" 
              fill="none" 
              className={`logo-path ${isHovered || animate ? 'animate' : 'default'}`}
            />
            <circle 
              cx="20" 
              cy={isHovered || animate ? "80" : "50"} 
              r="3" 
              fill="#EAB308" 
              className="logo-circle"
            />
            <circle 
              cx="50" 
              cy={isHovered || animate ? "40" : "50"} 
              r="2" 
              fill="#EAB308" 
              className={`logo-circle delayed ${isHovered || animate ? 'visible delay-300' : ''}`}
            />
            <circle 
              cx="80" 
              cy={isHovered || animate ? "20" : "40"} 
              r="3" 
              fill="#EAB308" 
              className={`logo-circle delayed ${isHovered || animate ? 'visible delay-600' : ''}`}
            />
          </svg>
          <div className={`logo-square ${isHovered || animate ? 'rotate' : ''}`}>
            <div className="logo-square-inner"></div>
            <div className={`logo-letter ${isHovered || animate ? 'rotate' : ''}`}>
              <span className="logo-letter-text">N</span>
            </div>
          </div>
          <div 
            className={`logo-ring ${isHovered || animate ? 'rotate' : ''}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;