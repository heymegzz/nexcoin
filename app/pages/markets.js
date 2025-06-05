import { useState } from 'react';
import Image from 'next/image';
import { dummyMarketData } from '../data/dummyMarketData';

const Markets = () => {
  const [currency, setCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter coins based on search query
  const filteredCoins = dummyMarketData.coins.filter(coin =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort coins based on selected criteria
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    const multiplier = sortOrder === 'desc' ? -1 : 1;
    return (a[sortBy] - b[sortBy]) * multiplier;
  });

  return (
    <div className="markets-page">
      {/* Market Stats Banner */}
      <div className="market-stats-banner">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Market Cap</span>
              <span className="stat-value">
                {currency === 'USD' ? '$2.45T' : '₹203.4T'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">
                {currency === 'USD' ? '$84.5B' : '₹7.02T'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">BTC Dominance</span>
              <span className="stat-value">48.2%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">ETH Dominance</span>
              <span className="stat-value">18.7%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Coins</span>
              <span className="stat-value">9,482</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="markets-controls">
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
            </div>
          </div>
        </div>
      </div>

      {/* Market Categories */}
      <div className="market-categories">
        <div className="container">
          <div className="categories-grid">
            <div className="category-section">
              <h3>Top Gainers (24h)</h3>
              <div className="category-coins">
                {sortedCoins
                  .filter(coin => coin.price_change_24h > 0)
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
                        +{coin.price_change_24h.toFixed(2)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="category-section">
              <h3>Top Losers (24h)</h3>
              <div className="category-coins">
                {sortedCoins
                  .filter(coin => coin.price_change_24h < 0)
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
                        {coin.price_change_24h.toFixed(2)}%
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

      {/* Markets Table */}
      <div className="markets-table-container">
        <div className="container">
          <div className="table-wrapper">
            <table className="markets-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>24h Volume</th>
                  <th>Market Cap</th>
                  <th>Last 7 Days</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedCoins.map((coin, index) => (
                  <tr key={coin.id}>
                    <td>{index + 1}</td>
                    <td>
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
                    <td>
                      {currency === 'USD' 
                        ? `$${coin.price.toLocaleString()}`
                        : `₹${(coin.price * 83).toLocaleString()}`}
                    </td>
                    <td>
                      <span className={`price-change ${coin.price_change_24h >= 0 ? 'positive' : 'negative'}`}>
                        {coin.price_change_24h >= 0 ? '+' : ''}{coin.price_change_24h.toFixed(2)}%
                      </span>
                    </td>
                    <td>
                      {currency === 'USD'
                        ? `$${coin.volume_24h.toLocaleString()}`
                        : `₹${(coin.volume_24h * 83).toLocaleString()}`}
                    </td>
                    <td>
                      {currency === 'USD'
                        ? `$${coin.market_cap.toLocaleString()}`
                        : `₹${(coin.market_cap * 83).toLocaleString()}`}
                    </td>
                    <td>
                      <div className="sparkline">
                        {/* Placeholder for sparkline chart */}
                        <div 
                          className={`sparkline-trend ${
                            coin.price_change_7d >= 0 ? 'positive' : 'negative'
                          }`}
                        ></div>
                      </div>
                    </td>
                    <td>
                      <button className="trade-button">Trade</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets; 