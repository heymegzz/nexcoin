'use client';

import { useState } from 'react';
import { FaCopy, FaRedo, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

function TransactionModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="wallet-card max-w-md">
        <h2 className="modal-title">{type === 'deposit' ? 'Deposit' : 'Withdraw'}</h2>
        <div className="modal-content">
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input 
              type="number" 
              className="wallet-input"
              placeholder="Enter amount"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Token</label>
            <select className="wallet-input">
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
          {type === 'withdraw' && (
            <div className="form-group">
              <label className="form-label">Address</label>
              <input 
                type="text" 
                className="wallet-input"
                placeholder="Enter wallet address"
              />
            </div>
          )}
          <div className="modal-actions">
            <button onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button className="btn btn-primary">
              {type === 'deposit' ? 'Generate Address' : 'Withdraw'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletsPage() {
  const [balance, setBalance] = useState({
    usd: 25000.00,
    btc: 0.85,
    eth: 12.5
  });

  const [walletAddress, setWalletAddress] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const dummyTransactions = [
    { date: '2024-03-20', token: 'BTC', amount: 0.05, type: 'receive', status: 'completed' },
    { date: '2024-03-19', token: 'ETH', amount: 2.0, type: 'send', status: 'completed' },
    { date: '2024-03-18', token: 'BTC', amount: 0.03, type: 'receive', status: 'completed' },
    { date: '2024-03-17', token: 'ETH', amount: 1.5, type: 'send', status: 'pending' },
    { date: '2024-03-16', token: 'BTC', amount: 0.02, type: 'receive', status: 'completed' }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const regenerateAddress = () => {
    const newAddress = '0x' + Math.random().toString(36).substring(2, 38);
    setWalletAddress(newAddress);
  };

  return (
    <div className="wallet-container">
      <div className="wallet-content">
        <h1 className="title">Wallet Overview</h1>

        <div className="wallet-grid">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="balance-card balance-card-usd"
          >
            <h3 className="balance-title">USD Balance</h3>
            <p className="balance-amount">${balance.usd.toLocaleString()}</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="balance-card balance-card-btc"
          >
            <h3 className="balance-title">BTC Balance</h3>
            <p className="balance-amount">{balance.btc} BTC</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="balance-card balance-card-eth"
          >
            <h3 className="balance-title">ETH Balance</h3>
            <p className="balance-amount">{balance.eth} ETH</p>
          </motion.div>
        </div>

        <div className="wallet-card wallet-address-section">
          <div>
            <h3 className="subtitle">Wallet Address</h3>
            <div className="wallet-address-container">
              <input 
                type="text" 
                value={walletAddress} 
                readOnly 
                className="wallet-input wallet-address-input"
              />
              <button 
                onClick={copyToClipboard}
                className="action-button copy-button"
                title="Copy address"
              >
                <FaCopy />
              </button>
              <button 
                onClick={regenerateAddress}
                className="action-button regenerate-button"
                title="Generate new address"
              >
                <FaRedo />
              </button>
            </div>
            {copySuccess && (
              <p className="success-message">Address copied to clipboard!</p>
            )}

            <div className="action-buttons-container">
              <button 
                onClick={() => setShowDepositModal(true)}
                className="action-button-primary deposit-button"
              >
                <FaArrowDown />
                <span>Deposit</span>
              </button>
              <button 
                onClick={() => setShowWithdrawModal(true)}
                className="action-button-primary withdraw-button"
              >
                <FaArrowUp />
                <span>Withdraw</span>
              </button>
            </div>
          </div>
        </div>

        <div className="wallet-card">
          <h3 className="subtitle">Recent Transactions</h3>
          <div className="table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Token</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyTransactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.date}</td>
                    <td>{tx.token}</td>
                    <td>{tx.amount}</td>
                    <td>
                      <span className={`status-badge ${
                        tx.type === 'receive' ? 'status-badge-receive' : 'status-badge-send'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${
                        tx.status === 'completed' ? 'status-badge-completed' : 'status-badge-pending'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TransactionModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        type="deposit"
      />
      <TransactionModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        type="withdraw"
      />
    </div>
  );
}

export default WalletsPage;