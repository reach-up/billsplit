import React, { useState, useEffect } from 'react';
import { Currency, CURRENCIES } from '@/app/app/types';
import { useTheme } from '@/context/ThemeContext';

interface CurrencySelectorProps {
  value: Currency | undefined;
  onChange: (currency: Currency) => void;
  className?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ 
  value, 
  onChange,
  className = '',
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState(CURRENCIES);
  const isDarkMode = theme === 'dark';
  
  // Default to USD if no currency is selected
  useEffect(() => {
    if (!value) {
      onChange(CURRENCIES[0]); // Default to USD
    }
  }, [value, onChange]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCurrencies(
        CURRENCIES.filter(
          currency => 
            currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            currency.code.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCurrencies(CURRENCIES);
    }
  }, [searchTerm]);

  const handleSelect = (currency: Currency) => {
    onChange(currency);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className={`flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md shadow-sm ${isDarkMode ? 'bg-neutral-800 border-neutral-600 text-white' : 'bg-white border-neutral-300 text-neutral-900'} focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{value?.symbol}</span>
          <span className="font-medium">{value?.code}</span>
        </div>
        <svg 
          className={`w-4 h-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute z-10 w-full mt-1 rounded-md shadow-lg border ${isDarkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-200 text-neutral-900'}`}>
          <div className="p-2">
            <input
              type="text"
              placeholder="Search currency..."
              className={`w-full px-3 py-2 text-sm border rounded-md ${isDarkMode ? 'bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400' : 'bg-white border-neutral-300 text-neutral-900'} focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="max-h-60 overflow-auto py-1">
            {filteredCurrencies.map((currency) => {
              const isSelected = value?.code === currency.code;
              return (
                <li 
                  key={currency.code}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors duration-150 flex items-center justify-between ${isSelected 
                    ? isDarkMode ? 'bg-primary-900 text-white' : 'bg-primary-50 text-primary-900' 
                    : ''} ${isDarkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'}`}
                  onClick={() => handleSelect(currency)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{currency.symbol}</span>
                    <span className="font-medium">{currency.code}</span>
                  </div>
                  <span className={isDarkMode ? 'text-neutral-400 text-xs' : 'text-neutral-500 text-xs'}>{currency.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
