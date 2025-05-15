type People = {
  id: string;
  name: string;
};

import Decimal from "decimal.js";

type BillItem = {
  name: string;
  price: Decimal;
  assignedTo?: string[];
};

export type BillForm = {
  restaurantName?: string;
  date?: Date;
  billItems: BillItem[];
  subTotal?: Decimal;
  tax?: Decimal;
  tip?: Decimal;
  people: People[];
  splitEvenly?: boolean;
};
