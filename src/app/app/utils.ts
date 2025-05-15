import { BillForm } from "./types";
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
  return nanoid(4);
};
