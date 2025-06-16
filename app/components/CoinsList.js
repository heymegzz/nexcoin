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

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `${(marketCap / 1e6).toFixed(2)}M`;
    }
    return marketCap.toLocaleString();
  };

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
      <div className="coins-grid">
        {coins.map((coin) => (
          <Link href={`/coin/${coin.id}`} key={coin.id} className="coin-item">
            <div className="coin-info-container">
              <div className="coin-main-info">
                <img src={coin.image} alt={coin.name} className="coin-icon" />
                <div className="coin-name-wrapper">
                  <span className="coin-name">{coin.name}</span>
                  <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                </div>
              </div>

              <div className="coin-details">
                <div className="coin-price-info">
                  <span className="coin-price">
                    ${new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(coin.current_price)}
                  </span>
                  <div className={`coin-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                    {coin.price_change_percentage_24h >= 0 ? '↑' : '↓'}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>

                <div className="market-cap-info">
                  <span className="market-cap-label">MARKET CAP</span>
                  <span className="market-cap-value">${formatMarketCap(coin.market_cap)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinsList;