import React from 'react';
import { format } from 'date-fns';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  const { settings } = useSettings();
  const { symbol } = settings.currency;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Transactions</h2>
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              {transaction.type === 'income' ? (
                <ArrowUpCircle className="w-6 h-6 text-green-500 dark:text-green-400" />
              ) : (
                <ArrowDownCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
              )}
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{transaction.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className={`font-semibold ${
                transaction.type === 'income' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}{symbol}{Math.abs(transaction.amount).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(transaction.date), 'MMM d, yyyy')}
              </p>
              <button
                onClick={() => onDeleteTransaction(transaction.id)}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}