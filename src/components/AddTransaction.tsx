import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import type { Transaction } from '../types';

interface AddTransactionProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export function AddTransaction({ onAddTransaction }: AddTransactionProps) {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    type: 'expense' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction({
      amount: Number(form.amount),
      category: form.category,
      description: form.description,
      type: form.type,
      date: new Date().toISOString(),
    });
    setForm({ amount: '', category: '', description: '', type: 'expense' });
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <PlusCircle className="w-5 h-5" />
        <span>Add Transaction</span>
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as 'income' | 'expense' })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount ({settings.currency.symbol})
              </label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </form>
      )}
    </div>
  );
}