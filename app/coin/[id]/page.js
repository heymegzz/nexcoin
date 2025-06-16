"use client";
import React, { useState, useEffect } from 'react';
import { getCoinDetails } from '../../utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../styles/coin-detail.css';

export default function CoinDetailPage({ params }) {
  const router = useRouter();
  const coinId = params.id;
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
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading cryptocurrency data...</p>
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Failed to load coin data.'}</p>
        <button onClick={() => router.push('/')} className="back-button">
          Return to Homepage
        </button>
      </div>
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
    <div className="coin-detail-container">
      <button onClick={() => router.push('/')} className="back-button">
        ← Back to Home
      </button>
      
      <div className="coin-header">
        <img 
          src={coin.image.large} 
          alt={coin.name} 
          className="coin-icon" 
        />
        <div className="coin-title">
          <h1 className="coin-name">{coin.name}</h1>
          <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
        </div>
      </div>

      <div className="coin-price-container">
        <div className="coin-price">
          ${coin.market_data.current_price.usd.toLocaleString()}
        </div>
        <div className={`price-change ${coin.market_data.price_change_percentage_24h >= 0 ? 'price-change-positive' : 'price-change-negative'}`}>
          {formatPercentage(coin.market_data.price_change_percentage_24h)}
        </div>
      </div>

      <div className="coin-stats">
        <div className="stat-card">
          <div className="stat-title">Market Cap</div>
          <div className="stat-value">{formatNumber(coin.market_data.market_cap.usd)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">24h Trading Volume</div>
          <div className="stat-value">{formatNumber(coin.market_data.total_volume.usd)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Circulating Supply</div>
          <div className="stat-value">
            {coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Total Supply</div>
          <div className="stat-value">
            {coin.market_data.total_supply ? coin.market_data.total_supply.toLocaleString() : 'Unlimited'} {coin.symbol.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="coin-description">
        <h2 className="description-title">About {coin.name}</h2>
        <div dangerouslySetInnerHTML={{ __html: coin.description.en }} />
      </div>

      <div className="stat-table">
        <h2 className="description-title">Price Statistics</h2>
        {[
          { label: 'Price Change (24h)', value: formatPercentage(coin.market_data.price_change_percentage_24h) },
          { label: 'Price Change (7d)', value: formatPercentage(coin.market_data.price_change_percentage_7d) },
          { label: 'Price Change (30d)', value: formatPercentage(coin.market_data.price_change_percentage_30d) },
          { label: 'All-Time High', value: `$${coin.market_data.ath.usd.toLocaleString()}` },
          { label: 'All-Time Low', value: `$${coin.market_data.atl.usd.toLocaleString()}` }
        ].map(({ label, value }) => (
          <div key={label} className="stat-row">
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 