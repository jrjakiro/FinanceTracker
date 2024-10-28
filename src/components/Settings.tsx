import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { CURRENCIES } from '../types';

export function Settings() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Currency
            </label>
            <select
              value={settings.currency.code}
              onChange={(e) => {
                const currency = CURRENCIES.find(c => c.code === e.target.value);
                if (currency) {
                  updateSettings({ currency });
                }
              }}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => updateSettings({ theme: 'light' })}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  settings.theme === 'light'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  settings.theme === 'dark'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}