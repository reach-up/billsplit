import { BillForm, Currency } from "./types";
import Decimal from "decimal.js";
import { nanoid } from "nanoid";

export const getTotal = (bill: BillForm): Decimal => {
  let total = new Decimal(0);
  // sum all bill items + tip + tax
  const billItems = bill?.billItems || [];
  billItems.forEach((item) => {
    total = total.plus(item.price || 0);
  });
  const tip = bill.tip || new Decimal(0);
  const tax = bill.tax || new Decimal(0);

  const finalTotal = total.plus(tip).plus(tax);

  return finalTotal;
};

export const createId = () => {
  return nanoid();
};

/**
 * Format a price with the appropriate currency symbol
 * @param price - The price to format as a Decimal or number
 * @param currency - The currency to use for formatting
 * @param options - Additional formatting options
 * @returns Formatted price string with currency symbol
 */
export const formatPrice = (
  price: Decimal | number,
  currency?: Currency,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string => {
  // Convert to number for formatting
  const numericValue = price instanceof Decimal ? price.toNumber() : price;

  // Format the number according to locale
  const formattedNumber = numericValue.toLocaleString('en-US', {
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
  });

  // If no currency is provided, return just the formatted number
  if (!currency) {
    return formattedNumber;
  }

  // Return with the currency symbol
  return `${currency.symbol}${formattedNumber}`;
};
