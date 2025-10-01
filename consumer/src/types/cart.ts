export type Menu = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = Menu & { amount: number };
