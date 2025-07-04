'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import '../styles/profile.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [portfolio, setPortfolio] = useState({});
  const [tradeHistory, setTradeHistory] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Load trading portfolio and history
    const savedPortfolio = localStorage.getItem('portfolio');
    const savedTrades = localStorage.getItem('tradeHistory');
    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
    if (savedTrades) setTradeHistory(JSON.parse(savedTrades));

    // Load wallet transactions
    // This would be replaced with real API calls in production
    const walletData = localStorage.getItem('walletTransactions');
    if (walletData) setWalletTransactions(JSON.parse(walletData));

    setLoading(false);
  }, [user, router]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile data...</p>
      </div>
    );
  }

  const calculateTotalValue = () => {
    return Object.entries(portfolio).reduce((total, [_, data]) => {
      return total + (data.totalInvestment || 0);
    }, 0);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-welcome">
          <h1>Welcome, {user.displayName || user.email.split('@')[0]}</h1>
          <p className="profile-subtitle">Manage your crypto portfolio and track your investments</p>
        </div>
        <div className="profile-actions">
          <button className="profile-action-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Funds
          </button>
        </div>
      </div>

      <div className="profile-dashboard">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
            </div>
            <div className="profile-info-card">
              <h3>{user.displayName || user.email.split('@')[0]}</h3>
              <p>{user.email}</p>
              <div className="profile-membership">
                <span className="membership-badge">Basic Member</span>
              </div>
            </div>
          </div>
          
          <div className="profile-nav">
            <a href="#portfolio" className="profile-nav-item active">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Portfolio
            </a>
            <a href="#transactions" className="profile-nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Transactions
            </a>
            <a href="#wallet" className="profile-nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Wallet
            </a>
            <a href="#favorites" className="profile-nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Favorites
            </a>
          </div>
        </div>
        
        <div className="profile-content">
          <section id="portfolio" className="portfolio-section">
            <div className="section-header">
              <h2>Portfolio Summary</h2>
              <div className="portfolio-value">
                <span className="value-label">Total Value</span>
                <span className="value-amount">${calculateTotalValue().toLocaleString()}</span>
              </div>
            </div>
            
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
            
            <div className="holdings-container">
              <div className="section-subheader">
                <h3>Your Holdings</h3>
                <button className="refresh-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
              
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
                    <button className="add-holding-btn">Add Your First Coin</button>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section id="transactions" className="transactions-section">
            <div className="section-header">
              <h2>Trading History</h2>
              <div className="transaction-filters">
                <select className="transaction-filter">
                  <option>All Types</option>
                  <option>Buy</option>
                  <option>Sell</option>
                </select>
              </div>
            </div>
            
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
                  <p>No trading history available</p>
                </div>
              )}
            </div>
          </section>

          <section id="wallet" className="wallet-section">
            <div className="section-header">
              <h2>Wallet Transactions</h2>
            </div>
            
            <div className="transactions-list">
              {walletTransactions.length > 0 ? (
                walletTransactions.map((tx, index) => (
                  <div key={index} className="transaction-item">
                    <div className="transaction-icon">
                      <div className={`tx-type ${tx.type}`}>{tx.type === 'deposit' ? '↓' : '↑'}</div>
                    </div>
                    <div className="tx-details">
                      <div className="tx-primary">
                        <span className="tx-action">{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</span>
                        <span className="coin">{tx.token}</span>
                      </div>
                      <div className="tx-secondary">
                        <span className="date">{tx.date}</span>
                        <span className="status">{tx.status}</span>
                      </div>
                    </div>
                    <div className="tx-amount">
                      <span className="amount">{tx.amount}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No wallet transactions available</p>
                  <button className="add-transaction-btn">Add Funds</button>
                </div>
              )}
            </div>
          </section>

          <section id="favorites" className="favorites-section">
            <div className="section-header">
              <h2>Favorites</h2>
              <button className="add-favorite-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Favorite
              </button>
            </div>
            
            <div className="favorites-list">
              <div className="empty-state">
                <p>Add your favorite coins to track them easily</p>
                <button className="add-favorite-btn">Add Your First Favorite</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}