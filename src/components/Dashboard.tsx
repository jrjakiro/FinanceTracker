import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import type { Transaction } from '../types';

interface DashboardProps {
  transactions: Transaction[];
}

export function Dashboard({ transactions }: DashboardProps) {
  const { settings } = useSettings();
  const { symbol } = settings.currency;

  const totalBalance = transactions.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0
  );

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const chartData = transactions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc: any[], curr) => {
      const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
      return [...acc, {
        date: new Date(curr.date).toLocaleDateString(),
        balance: curr.type === 'income' 
          ? lastBalance + curr.amount 
          : lastBalance - curr.amount
      }];
    }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <Wallet className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {symbol}{totalBalance.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {symbol}{totalIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <TrendingDown className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {symbol}{totalExpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Balance History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                formatter={(value) => `${symbol}${Number(value).toFixed(2)}`}
                contentStyle={{
                  backgroundColor: settings.theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  borderColor: '#374151',
                  color: settings.theme === 'dark' ? '#FFFFFF' : '#000000',
                }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#3b82f6"
                fill="#93c5fd"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}