import React, { useState } from 'react';
import { LayoutDashboard, Receipt, Settings as SettingsIcon } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { Settings } from './components/Settings';
import { SettingsProvider } from './contexts/SettingsContext';
import type { Transaction } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions([
      ...transactions,
      { ...newTransaction, id: Math.random().toString(36).substr(2, 9) },
    ]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">FinanceTracker</h1>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'transactions'
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <Receipt className="w-5 h-5" />
                  <span>Transactions</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <SettingsIcon className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </div>

              <div className="mt-8">
                <AddTransaction onAddTransaction={handleAddTransaction} />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'dashboard' && (
                <Dashboard transactions={transactions} />
              )}
              {activeTab === 'transactions' && (
                <TransactionList
                  transactions={transactions}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              )}
              {activeTab === 'settings' && <Settings />}
            </div>
          </div>
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;