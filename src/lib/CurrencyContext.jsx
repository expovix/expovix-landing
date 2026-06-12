import { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext(null);

export const CURRENCIES = [
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', rate: 1 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 0.98 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.267 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.245 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.210 },
  { code: 'KWD', symbol: 'KWD', name: 'Kuwaiti Dinar', rate: 0.082 },
  { code: 'QAR', symbol: 'QAR', name: 'Qatari Riyal', rate: 0.972 },
  { code: 'BHD', symbol: 'BHD', name: 'Bahraini Dinar', rate: 0.101 },
];

export function CurrencyProvider({ children }) {
  const [currencyCode, setCurrencyCode] = useState('SAR');

  const currency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];

  const convert = (amountInSAR) => {
    if (!amountInSAR) return 0;
    return amountInSAR * currency.rate;
  };

  const format = (amountInSAR, opts = {}) => {
    const converted = convert(amountInSAR);
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: opts.decimals ?? 0,
      maximumFractionDigits: opts.decimals ?? 0,
    }).format(converted);
    return `${currency.symbol} ${formatted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currencyCode, setCurrencyCode, currency, convert, format, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
