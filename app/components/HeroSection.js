"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchCoins } from "../utils/api";
import CoinsList from "./CoinsList";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    try {
      const data = await searchCoins(value);
      setSearchResults(data.coins ? data.coins.slice(0, 20) : []);
      console.log("Search results:", data); // Debug search results
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      navigateToCoin(searchResults[0].id);
    }
  };

  const navigateToCoin = (coinId) => {
    router.push(`/coin/${coinId}`);
    setShowResults(false);
    setQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-dots"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-headline">Track All Your Wallets & Exchanges From One Place</h1>
          <p className="hero-subheadline">
            Connect your entire portfolio to track, buy, swap, and stake your assets.
          </p>
          <div className="hero-buttons">
            <a href="/signup" className="hero-btn hero-btn-primary">Get Started</a>
          </div>
        </div>
        
        <div className="hero-search" ref={searchRef}>
          <div className="hero-search-container">
            <svg className="hero-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 19L14.65 14.65M14.65 14.65C16.0583 13.2416 16.9167 11.3166 16.9167 9.16666C16.9167 4.86666 13.4333 1.41666 9.08333 1.41666C4.76667 1.41666 1.25 4.86666 1.25 9.16666C1.25 13.4667 4.76667 16.9167 9.08333 16.9167C11.2333 16.9167 13.1583 16.0583 14.5667 14.65H14.65Z" 
              stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search for any cryptocurrency..." 
              className="hero-search-input"
              value={query}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
            {isSearching && (
              <div className="hero-search-loading">
                <div className="search-spinner"></div>
              </div>
            )}
          </div>
          
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((coin) => (
                <div 
                  key={coin.id} 
                  className="search-result-item"
                  onClick={() => navigateToCoin(coin.id)}
                >
                  {coin.thumb ? (
                    <img 
                      src={coin.thumb} 
                      alt={coin.name} 
                      className="search-result-icon" 
                    />
                  ) : (
                    <div className="search-result-icon-placeholder"></div>
                  )}
                  <div className="search-result-info">
                    <span className="search-result-name">{coin.name}</span>
                    <span className="search-result-symbol">{coin.symbol}</span>
                  </div>
                  <div className="search-result-action">
                    View Details →
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showResults && query.trim().length >= 2 && searchResults.length === 0 && !isSearching && (
            <div className="search-results">
              <div className="search-no-results">
                No cryptocurrencies found matching "{query}"
              </div>
            </div>
          )}
        </div>
        
        <div className="coins-list-section">
          <CoinsList />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 