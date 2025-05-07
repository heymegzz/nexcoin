"use client";
import React, { useState, useEffect } from 'react';
import { fetchTopCoins } from '../utils/api';
import Link from 'next/link';

const CoinsList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopCoins = async () => {
      try {
        setLoading(true);
        const data = await fetchTopCoins();
        setCoins(data);
      } catch (err) {
        setError('Failed to load coins. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTopCoins();
  }, []);

  if (loading) {
    return (
      <div className="coins-loading">
        <div className="coins-loading-spinner"></div>
        <p>Loading top cryptocurrencies...</p>
      </div>
    );
  }

  if (error) {
    return <div className="coins-error">{error}</div>;
  }

  return (
    <div className="coins-list-container">
      <h2 className="coins-list-title">Top Cryptocurrencies</h2>
      <div className="coins-list">
        {coins.map((coin) => (
          <Link href={`/coin/${coin.id}`} key={coin.id} className="coin-card">
            <div className="coin-card-content">
              <div className="coin-icon-wrapper">
                <img src={coin.image} alt={coin.name} className="coin-icon" />
              </div>
              <div className="coin-info">
                <h3 className="coin-name">{coin.name} <span className="coin-symbol">{coin.symbol.toUpperCase()}</span></h3>
                <p className="coin-price">${coin.current_price.toLocaleString()}</p>
              </div>
              <div className="coin-stats">
                <p className={`coin-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                  {coin.price_change_percentage_24h >= 0 ? '↑' : '↓'} 
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </p>
                <p className="coin-market-cap">
                  <span className="stat-label">Market Cap:</span> ${formatMarketCap(coin.market_cap)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

function formatMarketCap(marketCap) {
  if (marketCap >= 1_000_000_000) {
    return `${(marketCap / 1_000_000_000).toFixed(1)}B`;
  } else if (marketCap >= 1_000_000) {
    return `${(marketCap / 1_000_000).toFixed(1)}M`;
  } else {
    return marketCap.toLocaleString();
  }
}

export default CoinsList; 