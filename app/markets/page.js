"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SparklineChart from '../components/SparklineChart';
import { fetchTopCoins } from '../utils/api';

const dummyNews = [
  {
    id: 1,
    title: "Bitcoin Surges Past $45,000 as Institutional Interest Grows",
    source: "Crypto Daily",
    time: "2 hours ago",
    tag: "Bitcoin"
  },
  {
    id: 2,
    title: "Ethereum 2.0 Upgrade Shows Promising Results in Latest Testnet",
    source: "BlockNews",
    time: "3 hours ago",
    tag: "Ethereum"
  },
  {
    id: 3,
    title: "Major Bank Announces Cryptocurrency Trading Platform",
    source: "Finance Weekly",
    time: "5 hours ago",
    tag: "Industry"
  },
  {
    id: 4,
    title: "New DeFi Protocol Gains Traction with Innovative Yield Strategy",
    source: "DeFi Pulse",
    time: "6 hours ago",
    tag: "DeFi"
  },
  {
    id: 5,
    title: "Solana Network Achieves New Milestone in Transaction Speed",
    source: "Crypto Insider",
    time: "8 hours ago",
    tag: "Solana"
  },
  {
    id: 6,
    title: "Regulatory Framework for Crypto Assets Proposed by G20 Nations",
    source: "Global Finance",
    time: "12 hours ago",
    tag: "Regulation"
  }
];

const Market = () => {
  const [currency, setCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState('desc');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      const data = await fetchTopCoins(100); 
      setCoins(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Failed to load market data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  useEffect(() => {
    let intervalId;
    if (autoRefresh) {
      intervalId = setInterval(fetchMarketData, 60000); 
    }
    return () => clearInterval(intervalId);
  }, [autoRefresh]);


  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const sortedCoins = [...filteredCoins].sort((a, b) => {
    const multiplier = sortOrder === 'desc' ? -1 : 1;
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
  
    if (sortBy === 'market_cap') {
      aValue = a.market_cap;
      bValue = b.market_cap;
    } else if (sortBy === 'volume_24h') {
      aValue = a.total_volume;
      bValue = b.total_volume;
    } else if (sortBy === 'price') {
      aValue = a.current_price;
      bValue = b.current_price;
    } else if (sortBy === 'price_change_24h') {
      aValue = a.price_change_percentage_24h;
      bValue = b.price_change_percentage_24h;
    }

    return (aValue - bValue) * multiplier;
  });


  const totalMarketCap = coins.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
  const total24hVolume = coins.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
  const btcDominance = coins.length > 0 ? ((coins[0].market_cap || 0) / totalMarketCap * 100) : 0;
  const ethDominance = coins.length > 1 ? ((coins[1].market_cap || 0) / totalMarketCap * 100) : 0;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading market data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchMarketData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="market-content">
   
      <div className="market-stats-banner">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Market Cap</span>
              <span className="stat-value">
                {currency === 'USD' 
                  ? `$${(totalMarketCap / 1e12).toFixed(2)}T` 
                  : `₹${((totalMarketCap * 83) / 1e12).toFixed(2)}T`}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">
                {currency === 'USD' 
                  ? `$${(total24hVolume / 1e9).toFixed(2)}B`
                  : `₹${((total24hVolume * 83) / 1e9).toFixed(2)}B`}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">BTC Dominance</span>
              <span className="stat-value">{btcDominance.toFixed(1)}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">ETH Dominance</span>
              <span className="stat-value">{ethDominance.toFixed(1)}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Coins</span>
              <span className="stat-value">{coins.length}</span>
            </div>
          </div>
        </div>
      </div>

     
      <div className="market-controls">
        <div className="container">
          <div className="controls-wrapper">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search coins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filters-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="market_cap">Market Cap</option>
                <option value="price">Price</option>
                <option value="volume_24h">Volume (24h)</option>
                <option value="price_change_24h">Price Change (24h)</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="sort-select"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
              <button
                className={`currency-toggle ${currency === 'USD' ? 'active' : ''}`}
                onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
              >
                {currency}
              </button>
              <button
                className={`auto-refresh-toggle ${autoRefresh ? 'active' : ''}`}
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                {autoRefresh ? 'Auto-refresh On' : 'Auto-refresh Off'}
              </button>
            </div>
          </div>
          {autoRefresh && (
            <div className="last-updated">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      <div className="market-categories">
        <div className="container">
          <div className="categories-grid">
            <div className="category-section">
              <h3>Top Gainers (24h)</h3>
              <div className="category-coins">
                {sortedCoins
                  .filter(coin => (coin.price_change_percentage_24h || 0) > 0)
                  .slice(0, 3)
                  .map(coin => (
                    <div key={coin.id} className="mini-coin-card">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={24}
                        height={24}
                      />
                      <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                      <span className="price-change positive">
                        +{coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="category-section">
              <h3>Top Losers (24h)</h3>
              <div className="category-coins">
                {sortedCoins
                  .filter(coin => (coin.price_change_percentage_24h || 0) < 0)
                  .slice(0, 3)
                  .map(coin => (
                    <div key={coin.id} className="mini-coin-card">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={24}
                        height={24}
                      />
                      <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                      <span className="price-change negative">
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="category-section">
              <h3>Recently Added</h3>
              <div className="category-coins">
                {sortedCoins.slice(-3).map(coin => (
                  <div key={coin.id} className="mini-coin-card">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={24}
                      height={24}
                    />
                    <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                    <span className="new-tag">NEW</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="market-table-container">
        <div className="container">
          <div className="table-wrapper">
            <table className="market-table">
              <thead>
                <tr>
                  <th className="mobile-visible">#</th>
                  <th className="mobile-visible">Coin</th>
                  <th className="mobile-visible">Price</th>
                  <th className="mobile-visible">24h Change</th>
                  <th className="tablet-visible">24h Volume</th>
                  <th className="tablet-visible">Market Cap</th>
                  <th className="desktop-visible">Last 7 Days</th>
                  <th className="mobile-visible">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedCoins.map((coin, index) => (
                  <tr key={coin.id}>
                    <td className="mobile-visible">{index + 1}</td>
                    <td className="mobile-visible">
                      <div className="coin-info">
                        <Image
                          src={coin.image}
                          alt={coin.name}
                          width={24}
                          height={24}
                        />
                        <div className="coin-name-wrapper">
                          <span className="coin-name">{coin.name}</span>
                          <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="mobile-visible price-column">
                      {currency === 'USD' 
                        ? `$${(coin.current_price || 0).toLocaleString()}`
                        : `₹${((coin.current_price || 0) * 83).toLocaleString()}`}
                    </td>
                    <td className="mobile-visible">
                      <span className={`price-change ${(coin.price_change_percentage_24h || 0) >= 0 ? 'positive' : 'negative'}`}>
                        {(coin.price_change_percentage_24h || 0) >= 0 ? '+' : ''}{(coin.price_change_percentage_24h || 0).toFixed(2)}%
                      </span>
                    </td>
                    <td className="tablet-visible">
                      {currency === 'USD'
                        ? `$${(coin.total_volume || 0).toLocaleString()}`
                        : `₹${((coin.total_volume || 0) * 83).toLocaleString()}`}
                    </td>
                    <td className="tablet-visible">
                      {currency === 'USD'
                        ? `$${(coin.market_cap || 0).toLocaleString()}`
                        : `₹${((coin.market_cap || 0) * 83).toLocaleString()}`}
                    </td>
                    <td className="desktop-visible">
                      <SparklineChart
                        data={coin.sparkline_in_7d?.price || []}
                        positive={(coin.price_change_percentage_7d || 0) >= 0}
                      />
                    </td>
                    <td className="mobile-visible">
                      <button className="trade-button">Trade</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    
      <div className="news-feed-section">
        <div className="container">
          <h2 className="news-feed-title">Latest Crypto News</h2>
          <div className="news-grid">
            {dummyNews.map(news => (
              <div key={news.id} className="news-card">
                <div className="news-tag">{news.tag}</div>
                <h3 className="news-title">{news.title}</h3>
                <div className="news-meta">
                  <span className="news-source">{news.source}</span>
                  <span className="news-time">{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;