import { BillForm } from "./types";

export const getTotal = (bill: BillForm): number => {
  let total = 0;
  // sum all bill items + tip + tax
  const billItems = bill?.billItems || [];
  billItems.forEach((item) => {
    total += Number(item.price) || 0;
  });
  const tip = Number(bill.tip) || 0;
  const tax = Number(bill.tax) || 0;

  console.log("total", total + tip + tax);

  return total + tip + tax;
};
