"use client";
import React, { useState, useEffect, use } from 'react';
import { getCoinDetails } from '../../utils/api';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function CoinDetailPage({ params }) {
  
  const resolvedParams = use(params);
  const coinId = resolvedParams.id;
  
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const data = await getCoinDetails(coinId);
        setCoin(data);
      } catch (err) {
        setError('Failed to load coin data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  if (loading) {
    return (
      <main className="main">
        <Navbar />
        <div className="coin-detail-loading">
          <div className="coin-detail-spinner"></div>
          <p>Loading cryptocurrency data...</p>
        </div>
      </main>
    );
  }

  if (error || !coin) {
    return (
      <main className="main">
        <Navbar />
        <div className="coin-detail-error">
          <h2>Error</h2>
          <p>{error || 'Failed to load coin data.'}</p>
          <Link href="/" className="coin-detail-back-link">
            Return to Homepage
          </Link>
        </div>
      </main>
    );
  }


  const formatNumber = (num) => {
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    } else {
      return `$${num.toLocaleString()}`;
    }
  };


  const formatPercentage = (percentage) => {
    if (!percentage) return 'N/A';
    const value = percentage.toFixed(2);
    const isPositive = percentage >= 0;
    return (
      <span className={`percentage-change ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : ''}{value}%
      </span>
    );
  };

  return (
    <main className="main">
      <Navbar />
      <div className="coin-detail-container">
        <div className="coin-detail-header">
          <Link href="/" className="coin-detail-back">
            ← Back to Home
          </Link>
          <div className="coin-detail-title">
            <img 
              src={coin.image.large} 
              alt={coin.name} 
              className="coin-detail-icon" 
            />
            <h1>{coin.name} <span className="coin-detail-symbol">{coin.symbol.toUpperCase()}</span></h1>
          </div>
          <div className="coin-detail-price">
            <h2>${coin.market_data.current_price.usd.toLocaleString()}</h2>
            {formatPercentage(coin.market_data.price_change_percentage_24h)}
          </div>
        </div>

        <div className="coin-detail-grid">
          <div className="coin-detail-card">
            <h3>Market Cap</h3>
            <p>{formatNumber(coin.market_data.market_cap.usd)}</p>
          </div>
          <div className="coin-detail-card">
            <h3>24h Trading Volume</h3>
            <p>{formatNumber(coin.market_data.total_volume.usd)}</p>
          </div>
          <div className="coin-detail-card">
            <h3>Circulating Supply</h3>
            <p>{coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</p>
          </div>
          <div className="coin-detail-card">
            <h3>Total Supply</h3>
            <p>{coin.market_data.total_supply ? coin.market_data.total_supply.toLocaleString() : 'Unlimited'} {coin.symbol.toUpperCase()}</p>
          </div>
        </div>

        <div className="coin-detail-content">
          <div className="coin-detail-about">
            <h3>About {coin.name}</h3>
            <div 
              className="coin-detail-description" 
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
            />
          </div>

          <div className="coin-detail-stats">
            <h3>Price Statistics</h3>
            <div className="coin-detail-stat-row">
              <span>Price Change (24h)</span>
              <span>{formatPercentage(coin.market_data.price_change_percentage_24h)}</span>
            </div>
            <div className="coin-detail-stat-row">
              <span>Price Change (7d)</span>
              <span>{formatPercentage(coin.market_data.price_change_percentage_7d)}</span>
            </div>
            <div className="coin-detail-stat-row">
              <span>Price Change (30d)</span>
              <span>{formatPercentage(coin.market_data.price_change_percentage_30d)}</span>
            </div>
            <div className="coin-detail-stat-row">
              <span>All-Time High</span>
              <span>${coin.market_data.ath.usd.toLocaleString()}</span>
            </div>
            <div className="coin-detail-stat-row">
              <span>All-Time Low</span>
              <span>${coin.market_data.atl.usd.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 