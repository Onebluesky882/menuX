export type Menu = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = Menu & { amount: number };

const useCart = () => {
  const addCart = (cart: CartItem[], menu: Menu): CartItem[] => {
    // exist menu ?
    const exist = cart.find(item => item.id === menu.id);
    if (exist) {
      return cart.map(m =>
        m.id === menu.id ? { ...m, amount: m.amount + 1 } : m
      );
    } else {
      return [...cart, { ...menu, amount: 1 }];
    }
  };
  return { addCart };
};

export default useCart;
