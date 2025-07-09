import type { Order } from "frontend/types/order.type";
import { create } from "zustand";

export type OrderInput = Pick<
  Order,
  "id" | "name" | "amount" | "price" | "shopId" | "staffId" | "quantity"
>;

type OrderStore = {
  orders: Order[];
  setOrders: (order: Order[]) => void;
  addOrUpdateItem: (menu: OrderInput) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearOrders: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};
const useOrder = create<OrderStore>((set, get) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),

  addOrUpdateItem: (menu: OrderInput) => {
    set((state) => {
      const existing = state.orders.find((order) => order.id === menu.id);
      if (existing) {
        return {
          orders: state.orders.map((order) =>
            order.id === menu.id
              ? { ...order, amount: menu.amount, quantity: menu.quantity }
              : order
          ),
        };
      } else {
        return {
          orders: [...state.orders, menu],
        };
      }
    });
  },
  updateQuantity: (id: string, newQuantity: number) => {
    set((state) => {
      if (newQuantity <= 0) {
        return { orders: state.orders.filter((item) => item.id !== id) };
      }
      return {
        orders: state.orders.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: newQuantity,
                amount: item.price * newQuantity,
              }
            : item
        ),
      };
    });
  },
  removeItem: (id: string) => {
    set((state) => {
      const updatedOrders = state.orders.reduce((acc, item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - 1;
          if (newQuantity > 0) {
            acc.push({
              ...item,
              quantity: newQuantity,
              amount: item.price * newQuantity,
            });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as Order[]);

      return { orders: updatedOrders };
    });
  },
  clearOrders: () => {
    set({ orders: [] });
  },
  getTotalItems: () => {
    const state = get();
    return state.orders.reduce((total, item) => total + item.quantity, 0);
  },
  getTotalPrice: () => {
    const state = get();
    return state.orders.reduce((total, item) => total + item.amount, 0);
  },
}));

export default useOrder;
