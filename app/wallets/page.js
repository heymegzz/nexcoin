'use client';

import { useState } from 'react';
import { FaCopy, FaRedo, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

function TransactionModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-100 p-8 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-6 text-white">{type === 'deposit' ? 'Deposit' : 'Withdraw'}</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
            <input 
              type="number" 
              className="w-full p-3 bg-dark-200 rounded-lg border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Token</label>
            <select className="w-full p-3 bg-dark-200 rounded-lg border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
          {type === 'withdraw' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
              <input 
                type="text" 
                className="w-full p-3 bg-dark-200 rounded-lg border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter wallet address"
              />
            </div>
          )}
          <div className="flex justify-end space-x-4 mt-8">
            <button 
              onClick={onClose} 
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Wallet Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-lg font-medium text-gray-200 mb-2">USD Balance</h3>
            <p className="text-3xl font-bold">${balance.usd.toLocaleString()}</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-lg font-medium text-gray-200 mb-2">BTC Balance</h3>
            <p className="text-3xl font-bold">{balance.btc} BTC</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-lg font-medium text-gray-200 mb-2">ETH Balance</h3>
            <p className="text-3xl font-bold">{balance.eth} ETH</p>
          </motion.div>
        </div>

        <div className="bg-dark-100 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col space-y-6">
            <div className="w-full">
              <h3 className="text-xl font-bold mb-4">Wallet Address</h3>
              <div className="flex items-center space-x-3">
                <input 
                  type="text" 
                  value={walletAddress} 
                  readOnly 
                  className="flex-1 p-3 bg-dark-200 rounded-lg border border-gray-600 text-sm font-mono"
                />
                <button 
                  onClick={copyToClipboard}
                  className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  title="Copy address"
                >
                  <FaCopy className="w-5 h-5" />
                </button>
                <button 
                  onClick={regenerateAddress}
                  className="p-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  title="Generate new address"
                >
                  <FaRedo className="w-5 h-5" />
                </button>
              </div>
              {copySuccess && (
                <p className="text-green-500 text-sm mt-2">Address copied to clipboard!</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setShowDepositModal(true)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors w-full"
              >
                <FaArrowDown className="w-4 h-4" />
                <span>Deposit</span>
              </button>
              <button 
                onClick={() => setShowWithdrawModal(true)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors w-full"
              >
                <FaArrowUp className="w-4 h-4" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-dark-100 rounded-lg p-6 shadow-lg overflow-hidden">
          <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="text-left text-gray-300">
                  <th className="py-4 px-6 font-medium">Date</th>
                  <th className="py-4 px-6 font-medium">Token</th>
                  <th className="py-4 px-6 font-medium">Amount</th>
                  <th className="py-4 px-6 font-medium">Type</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {dummyTransactions.map((tx, index) => (
                  <tr key={index} className="hover:bg-dark-200 transition-colors">
                    <td className="py-4 px-6">{tx.date}</td>
                    <td className="py-4 px-6">{tx.token}</td>
                    <td className="py-4 px-6">{tx.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        tx.type === 'receive' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        tx.status === 'completed' ? 'bg-blue-900 text-blue-200' : 'bg-yellow-900 text-yellow-200'
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