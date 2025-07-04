'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import '../styles/profile.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('portfolio');

  // Dummy data for demonstration
  const portfolioData = {
    totalValue: 45000,
    dailyChange: 2.5,
    holdings: [
      { coin: 'Bitcoin', amount: 0.85, value: 25000 },
      { coin: 'Ethereum', amount: 12.5, value: 15000 },
      { coin: 'Solana', amount: 100, value: 5000 }
    ]
  };

  const transactions = [
    { id: 1, type: 'buy', coin: 'Bitcoin', amount: 0.1, value: 3000, date: '2024-01-15' },
    { id: 2, type: 'sell', coin: 'Ethereum', amount: 2.5, value: 4500, date: '2024-01-14' },
    { id: 3, type: 'buy', coin: 'Solana', amount: 50, value: 2500, date: '2024-01-13' }
  ];

  const favorites = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 29450 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 1850 },
    { id: 'solana', name: 'Solana', symbol: 'SOL', price: 95 }
  ];

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Welcome, {user.email}</h1>
        <div className="profile-tabs">
          <button
            className={`tab ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button
            className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button
            className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
        </div>
      </div>

      <div className="profile-content">
        {activeTab === 'portfolio' && (
          <div className="portfolio-section">
            <div className="portfolio-summary">
              <h2>Portfolio Summary</h2>
              <div className="portfolio-stats">
                <div className="stat">
                  <span className="label">Total Value</span>
                  <span className="value">${portfolioData.totalValue.toLocaleString()}</span>
                </div>
                <div className="stat">
                  <span className="label">24h Change</span>
                  <span className={`value ${portfolioData.dailyChange >= 0 ? 'positive' : 'negative'}`}>
                    {portfolioData.dailyChange}%
                  </span>
                </div>
              </div>
            </div>
            <div className="holdings-list">
              <h3>Your Holdings</h3>
              {portfolioData.holdings.map((holding, index) => (
                <div key={index} className="holding-item">
                  <span className="coin-name">{holding.coin}</span>
                  <span className="amount">{holding.amount}</span>
                  <span className="value">${holding.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-section">
            <h2>Recent Transactions</h2>
            <div className="transactions-list">
              {transactions.map((tx) => (
                <div key={tx.id} className="transaction-item">
                  <div className={`tx-type ${tx.type}`}>{tx.type.toUpperCase()}</div>
                  <div className="tx-details">
                    <span className="coin">{tx.coin}</span>
                    <span className="amount">{tx.amount}</span>
                    <span className="value">${tx.value.toLocaleString()}</span>
                    <span className="date">{tx.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="favorites-section">
            <h2>Favorite Coins</h2>
            <div className="favorites-list">
              {favorites.map((coin) => (
                <div key={coin.id} className="favorite-item">
                  <span className="coin-name">{coin.name}</span>
                  <span className="coin-symbol">{coin.symbol}</span>
                  <span className="coin-price">${coin.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}