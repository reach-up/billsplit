type People = {
  name: string;
};

type BillItem = {
  name: string;
  price: number;
};

export type BillForm = {
  restaurantName?: string;
  date?: Date;
  billItems: BillItem[];
  subTotal?: Number;
  tax?: Number;
  tip?: Number;
  people: People[];
  splitEvenly?: boolean;
};
