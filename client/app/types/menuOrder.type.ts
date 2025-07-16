export type MenuOption = {
  id: string;
  menuId: string;
  label: string;
  price: string;
  available: boolean;
  createdAt: string;
};

export type MenuImage = {
  id: string;
  imageUrl: string;
  createdAt: string;
  type: string;
  shopId: string;
  menuId: string;
  userId: string;
};

export type MenuItem = {
  id: string;
  createdBy: string;
  name: string;
  description: string | null;
  categoryId: string | null;
  price: string;
  available: boolean;
  createdAt: string;
  pageId: string | null;
  shopId: string;
  images: MenuImage[];
  menuOptions: MenuOption[];
};

export type CartItem = {
  menuId: string;
  menuName: string;
  basePrice: number;
  selectedOption: MenuOption;
  quantity: number;
  totalPrice: number;
};

export type OrderPayload = {
  menuId: string;
  quantity: string;
  priceEach: string;
  totalPrice: string;
  shopId: string;
};
