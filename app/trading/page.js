'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { fetchTopCoins } from '../utils/api';
import '../styles/trading.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Trading = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ type: '', details: {} });
  const [tradeHistory, setTradeHistory] = useState([]);
  const [portfolio, setPortfolio] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const marketData = await fetchTopCoins(50); 
        setCoins(marketData);
        setSelectedCoin(marketData[0]); 
        setError(null);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to load market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();


    const savedTrades = localStorage.getItem('tradeHistory');
    const savedPortfolio = localStorage.getItem('portfolio');
    if (savedTrades) setTradeHistory(JSON.parse(savedTrades));
    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
  }, []);

  const generateChartData = () => {
    if (!selectedCoin) return null;

    const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const basePrice = selectedCoin.current_price;
    const volatility = 0.05; // 5% volatility
    let currentPrice = basePrice;
    
    const data = labels.map(() => {
      const change = (Math.random() - 0.5) * volatility;
      currentPrice = currentPrice * (1 + change);
      return currentPrice;
    });

    return {
      labels,
      datasets: [
        {
          label: `${selectedCoin.symbol.toUpperCase()} Price (USD)`,
          data,
          borderColor: '#ffd700',
          backgroundColor: 'rgba(255, 215, 0, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#ffd700',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
            weight: 500
          },
          padding: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffd700',
        titleFont: {
          size: 16,
          weight: 600
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
        borderColor: 'rgba(255, 215, 0, 0.3)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 12
          },
          callback: (value) => `$${value.toLocaleString()}`
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 12
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear'
      }
    }
  };

  const executeTrade = (type) => {
    if (!amount || !quantity || !selectedCoin) {
      alert('Please enter both amount and quantity');
      return;
    }

    const trade = {
      id: Date.now(),
      type,
      coin: selectedCoin.symbol.toUpperCase(),
      price: selectedCoin.current_price,
      amount: parseFloat(amount),
      quantity: parseFloat(quantity),
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [trade, ...tradeHistory];
    setTradeHistory(updatedHistory);
    localStorage.setItem('tradeHistory', JSON.stringify(updatedHistory));

    const updatedPortfolio = { ...portfolio };
    const coinKey = selectedCoin.symbol.toUpperCase();
    
    if (!updatedPortfolio[coinKey]) {
      updatedPortfolio[coinKey] = {
        quantity: 0,
        averagePrice: 0,
        totalInvestment: 0,
      };
    }

    if (type === 'buy') {
      updatedPortfolio[coinKey].quantity += parseFloat(quantity);
      updatedPortfolio[coinKey].totalInvestment += parseFloat(amount);
      updatedPortfolio[coinKey].averagePrice = 
        updatedPortfolio[coinKey].totalInvestment / updatedPortfolio[coinKey].quantity;
    } else {
      updatedPortfolio[coinKey].quantity -= parseFloat(quantity);
      updatedPortfolio[coinKey].totalInvestment -= parseFloat(amount);
      if (updatedPortfolio[coinKey].quantity <= 0) {
        delete updatedPortfolio[coinKey];
      } else {
        updatedPortfolio[coinKey].averagePrice = 
          updatedPortfolio[coinKey].totalInvestment / updatedPortfolio[coinKey].quantity;
      }
    }

    setPortfolio(updatedPortfolio);
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));

    setModalData({ type, details: trade });
    setShowModal(true);

    setAmount('');
    setQuantity('');
  };

  const calculateTotalValue = () => {
    return Object.entries(portfolio).reduce((total, [symbol, data]) => {
      const coin = coins.find(c => c.symbol.toUpperCase() === symbol);
      return total + (coin?.current_price * data.quantity || 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading trading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="trading-page">
      <div className="container">
        <div className="chart-section">
          <Line data={generateChartData()} options={chartOptions} />
        </div>

        <div className="trading-section">
          <div className="trading-form">
            <select 
              value={selectedCoin?.id || ''}
              onChange={(e) => setSelectedCoin(coins.find(c => c.id === e.target.value))}
              className="coin-select"
            >
              {coins.map(coin => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </option>
              ))}
            </select>

            <div className="form-group">
              <label>Amount (USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="form-input"
              />
            </div>

            <div className="trading-buttons">
              <button 
                className="buy-button"
                onClick={() => executeTrade('buy')}
              >
                Buy
              </button>
              <button 
                className="sell-button"
                onClick={() => executeTrade('sell')}
              >
                Sell
              </button>
            </div>
          </div>

          <div className="portfolio-summary">
            <h2>Portfolio Summary</h2>
            <div className="portfolio-total">
              <span>Total Value:</span>
              <span>${calculateTotalValue().toLocaleString()}</span>
            </div>
            <div className="portfolio-grid">
              {Object.entries(portfolio).map(([symbol, data]) => {
                const coin = coins.find(c => c.symbol.toUpperCase() === symbol);
                if (!coin) return null;
                return (
                  <div key={symbol} className="portfolio-item">
                    <div className="coin-info">
                      <span className="coin-symbol">{symbol}</span>
                      <span className="coin-quantity">{data.quantity.toFixed(4)}</span>
                    </div>
                    <div className="coin-value">
                      <span className="label">Avg. Price:</span>
                      <span>${data.averagePrice.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="trade-history">
          <h2>Trade History</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Quantity</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map(trade => (
                  <tr key={trade.id}>
                    <td className={trade.type}>{trade.type.toUpperCase()}</td>
                    <td>{trade.coin}</td>
                    <td>${trade.price.toLocaleString()}</td>
                    <td>${trade.amount.toLocaleString()}</td>
                    <td>{trade.quantity}</td>
                    <td>{new Date(trade.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Trade Confirmation</h3>
            <p>Your {modalData.type.toUpperCase()} order has been executed:</p>
            <div className="modal-details">
              <div>Coin: {modalData.details.coin}</div>
              <div>Price: ${modalData.details.price.toLocaleString()}</div>
              <div>Amount: ${modalData.details.amount.toLocaleString()}</div>
              <div>Quantity: {modalData.details.quantity}</div>
            </div>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trading;