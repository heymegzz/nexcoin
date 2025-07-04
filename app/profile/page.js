'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { searchCoins } from '../utils/api';
import '../styles/profile.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [portfolio, setPortfolio] = useState({});
  const [tradeHistory, setTradeHistory] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCoinList, setShowCoinList] = useState(false);
  const [availableCoins, setAvailableCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Load data from localStorage
    const loadData = () => {
      const savedPortfolio = localStorage.getItem('portfolio');
      const savedTrades = localStorage.getItem('tradeHistory');
      const savedFavorites = localStorage.getItem('favorites');
      
      if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
      if (savedTrades) setTradeHistory(JSON.parse(savedTrades));
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      
      setLoading(false);
    };

    loadData();
  }, [user, router]);

  const searchAvailableCoins = async (query) => {
    if (!query.trim()) {
      setAvailableCoins([]);
      return;
    }
    
    setSearching(true);
    try {
      const result = await searchCoins(query);
      setAvailableCoins(result.coins);
    } catch (error) {
      console.error('Error searching coins:', error);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchAvailableCoins(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const calculateTotalValue = () => {
    return Object.entries(portfolio).reduce((total, [_, data]) => {
      return total + (data.totalInvestment || 0);
    }, 0);
  };

  const addToFavorites = (coin) => {
    const newFavorites = [...favorites, coin];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setShowCoinList(false);
    setSearchQuery('');
  };

  const removeFromFavorites = (coinId) => {
    const newFavorites = favorites.filter(coin => coin.id !== coinId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* User Info Section */}
      <section className="user-info-section">
        <div className="profile-avatar">
          {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
        </div>
        <div className="user-details">
          <h1>{user.displayName || user.email.split('@')[0]}</h1>
          <p>{user.email}</p>
          <span className="membership-badge">Basic Member</span>
        </div>
      </section>

      {/* Portfolio Summary Section */}
      <section className="portfolio-summary-section">
        <h2>Portfolio Summary</h2>
        <div className="portfolio-stats">
          <div className="stat">
            <span className="label">Total Assets</span>
            <span className="value">{Object.keys(portfolio).length}</span>
          </div>
          <div className="stat">
            <span className="label">Total Value</span>
            <span className="value">${calculateTotalValue().toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">24h Change</span>
            <span className="value change-positive">+2.4%</span>
          </div>
        </div>
      </section>

      {/* Holdings Section */}
      <section className="holdings-section">
        <h2>Your Holdings</h2>
        <div className="holdings-list">
          {Object.entries(portfolio).length > 0 ? (
            Object.entries(portfolio).map(([symbol, data]) => (
              <div key={symbol} className="holding-item">
                <div className="holding-icon">{symbol.charAt(0)}</div>
                <div className="holding-details">
                  <div className="holding-name">
                    <span className="coin-name">{symbol}</span>
                    <span className="coin-amount">{data.quantity.toFixed(4)}</span>
                  </div>
                  <div className="holding-value">
                    <span className="value">${data.totalInvestment.toLocaleString()}</span>
                    <span className="avg-price">Avg: ${data.averagePrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>You don't have any holdings yet</p>
              <button onClick={() => router.push('/markets')} className="action-button">Start Trading</button>
            </div>
          )}
        </div>
      </section>

      {/* Recent Transactions Section */}
      <section className="transactions-section">
        <h2>Recent Transactions</h2>
        <div className="transactions-list">
          {tradeHistory.length > 0 ? (
            tradeHistory.map((tx) => (
              <div key={tx.id} className="transaction-item">
                <div className="transaction-icon">
                  <div className={`tx-type ${tx.type}`}>{tx.type === 'buy' ? '↓' : '↑'}</div>
                </div>
                <div className="tx-details">
                  <div className="tx-primary">
                    <span className="tx-action">{tx.type === 'buy' ? 'Bought' : 'Sold'}</span>
                    <span className="coin">{tx.coin}</span>
                  </div>
                  <div className="tx-secondary">
                    <span className="date">{new Date(tx.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                <div className="tx-amount">
                  <span className="amount">{tx.quantity}</span>
                  <span className="value">${tx.amount.toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No transactions yet</p>
              <button onClick={() => router.push('/trading')} className="action-button">Start Trading</button>
            </div>
          )}
        </div>
      </section>

      {/* Favorites Section */}
      <section className="favorites-section">
        <div className="section-header">
          <h2>Favorite Coins</h2>
          <button onClick={() => setShowCoinList(true)} className="add-favorite-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Favorite
          </button>
        </div>
        
        {showCoinList && (
          <div className="coin-list-overlay">
            <div className="coin-list">
              <h3>Add Favorite Coins</h3>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search coins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="available-coins-list">
                {searching ? (
                  <div className="searching-state">Searching...</div>
                ) : availableCoins.length > 0 ? (
                  availableCoins.map(coin => (
                    <div key={coin.id} className="coin-list-item" onClick={() => addToFavorites(coin)}>
                      <div className="coin-list-item-info">
                        {coin.thumb && (
                          <img src={coin.thumb} alt={coin.name} className="coin-thumb" />
                        )}
                        <div className="coin-details">
                          <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                          <span className="coin-name">{coin.name}</span>
                        </div>
                      </div>
                      <button className="add-coin-btn">Add</button>
                    </div>
                  ))
                ) : searchQuery ? (
                  <div className="no-results">No coins found</div>
                ) : (
                  <div className="search-prompt">Start typing to search coins</div>
                )}
              </div>
              
              <button className="close-btn" onClick={() => {
                setShowCoinList(false);
                setSearchQuery('');
              }}>Close</button>
            </div>
          </div>
        )}

        <div className="favorites-list">
          {favorites.length > 0 ? (
            favorites.map(coin => (
              <div key={coin.id} className="favorite-item">
                <div className="favorite-info">
                  {coin.thumb && (
                    <img src={coin.thumb} alt={coin.name} className="favorite-thumb" />
                  )}
                  <div className="favorite-details">
                    <span className="favorite-symbol">{coin.symbol.toUpperCase()}</span>
                    <span className="favorite-name">{coin.name}</span>
                  </div>
                </div>
                <button className="remove-favorite" onClick={() => removeFromFavorites(coin.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Add your favorite coins to track them easily</p>
              <button onClick={() => setShowCoinList(true)} className="action-button">Add Your First Favorite</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}