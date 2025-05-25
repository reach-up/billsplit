type People = {
  id: string;
  name: string;
};

import Decimal from "decimal.js";

type BillItem = {
  id: string;
  name: string;
  price: Decimal;
  assignedTo?: string[];
};

export type Currency = {
  code: string; // e.g., 'USD', 'EUR', 'GBP'
  symbol: string; // e.g., '$', '€', '£'
  name: string; // e.g., 'US Dollar', 'Euro', 'British Pound'
};

export const CURRENCIES: Currency[] = [
  // Major global currencies
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  
  // African currencies
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
  { code: 'MAD', symbol: 'DH', name: 'Moroccan Dirham' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi' },
  { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
  { code: 'DZD', symbol: 'DA', name: 'Algerian Dinar' },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },
  { code: 'TND', symbol: 'DT', name: 'Tunisian Dinar' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
  { code: 'RWF', symbol: 'RF', name: 'Rwandan Franc' },
  
  // Other global currencies
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
];

export type BillForm = {
  businessName?: string;
  date?: Date;
  billItems: BillItem[];
  subTotal?: Decimal;
  tax?: Decimal;
  tip?: Decimal;
  people: People[];
  splitEvenly?: boolean;
  currency?: Currency; // New field for currency
};
