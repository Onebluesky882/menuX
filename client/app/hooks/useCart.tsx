import { create } from "zustand";
import {
  CartItem,
  MenuItem,
  MenuOption,
  OrderPayload,
} from "../types/menuOrder.type";
import { ordersApi } from "../api/orders.api";

type CartStore = {
  cartItems: CartItem[];
  addCart: (item: CartItem) => void;
  clearCart: () => void;

  getTotalOrderPrice: () => number;
  getTotalOrderItems: () => number;
  addMenuOptionToCart: (optionId: string, menusOption: MenuItem[]) => void;
  submitCart: (shopId: string) => Promise<void>;
};

export const useCart = create<CartStore>((set, get) => ({
  cartItems: [],
  addCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),
  clearCart: () => set({ cartItems: [] }),

  getTotalOrderPrice: () => {
    const items = get().cartItems;
    return items.reduce((total, item) => {
      return total + Number(item.selectedOption.price) * item.quantity;
    }, 0);
  },

  getTotalOrderItems: () => {
    const items = get().cartItems;
    return items.reduce((total, item) => {
      return total + Number(item.quantity);
    }, 0);
  },

  submitCart: async (shopId) => {
    const currentCart = get().cartItems;
    const payload: OrderPayload = {
      shopId,
      items: currentCart.map((menu) => ({
        menuId: menu.menuId,
        quantity: menu.quantity,
        priceEach: menu.basePrice,
        totalPrice: menu.totalPrice,
        optionId: menu.optionId,
      })),
    };
    try {
      const res = await ordersApi.create(payload);
      return res.data.data.id;
    } catch (error) {
      console.error("submitCart failed", error);
    }
  },

  addMenuOptionToCart: (optionId, menusOption) => {
    const cartItems = get().cartItems;
    const addCart = get().addCart;

    const menu = menusOption.find((menu) =>
      menu.menuOptions.some((option) => option.id === optionId)
    );

    if (!menu) return;

    const selectedOption = menu.menuOptions.find(
      (option) => option.id === optionId
    );
    if (!selectedOption) return;

    const price = Number(selectedOption.price);

    const existing = cartItems.find(
      (item) =>
        item.menuId === menu.id && item.selectedOption.id === selectedOption.id
    );
    if (existing) {
      const updateItem = {
        ...existing,
        quantity: existing.quantity + 1,
        totalPrice: price * (existing.quantity + 1),
      };
      addCart(updateItem);
    } else {
      const newItem: CartItem = {
        menuId: menu.id,
        basePrice: price,
        menuName: menu.name,
        selectedOption,
        quantity: 1,
        totalPrice: price,
        optionId,
      };
      addCart(newItem);
    }
  },
}));
