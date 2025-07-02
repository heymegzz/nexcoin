"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchCoins } from "../utils/api";
import CoinsList from "./CoinsList";
import { useAuth } from "../context/AuthContext";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const { user } = useAuth();

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

  const handleCoinClick = (coinId) => {
    router.push(`/coin/${coinId}`);
    setShowResults(false);
    setQuery("");
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
          {!user && (
            <div className="hero-buttons">
              <a href="/signup" className="hero-btn hero-btn-primary">Get Started</a>
            </div>
          )}
        </div>
        
        <div className="hero-search" ref={searchRef}>
          <div className="hero-search-container">
            <svg className="hero-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 19L14.65 14.65M14.65 14.65C16.0583 13.2416 16.9167 11.3166 16.9167 9.16666C16.9167 4.86666 13.4333 1.41666 9.08333 1.41666C4.76667 1.41666 1.25 4.86666 1.25 9.16666C1.25 13.4667 4.76667 16.9167 9.08333 16.9167C11.2333 16.9167 13.1583 16.0583 14.5667 14.65H14.65Z" 
              stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              type="text" 
              className="hero-search-input"
              value={query}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder="Search for any cryptocurrency..."
            />
          </div>
          
          {showResults && (
            <div className="search-results">
              {isSearching ? (
                <div className="search-loading">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((coin) => (
                  <div
                    key={coin.id}
                    className="search-result-item"
                    onClick={() => handleCoinClick(coin.id)}
                  >
                    <img src={coin.thumb} alt={coin.name} />
                    <div className="search-result-info">
                      <span className="search-result-name">{coin.name}</span>
                      <span className="search-result-symbol">{coin.symbol}</span>
                    </div>
                  </div>
                ))
              ) : query.length >= 2 ? (
                <div className="search-loading">No results found</div>
              ) : null}
            </div>
          )}
        </div>
        
        <CoinsList />
      </div>
    </section>
  );
};

export default HeroSection;