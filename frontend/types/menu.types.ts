import type { InsertMenu } from "../../backend/dist/src/menus/menu.dto";

export type PartialCreateMenu = Pick<
  InsertMenu,
  | "name"
  | "categoryId"
  | "createdBy"
  | "description"
  | "pageId"
  | "price"
  | "shopId"
  | "available"
>;

export type Menu = {
  id: string;
  name: string;
  available: boolean;
  images: string[];
  menuOptions: MenuOption[];
  amount: number;
};

export type Images = {
  id: string;
  imageUrl: string;
  createdAt: string;
  type: string;
  shopId: string;
  menuId: string;
  userId: string;
};
export type MenuOption = {
  id: string;
  menuId: string;
  label: string;
  price: string;
  available: boolean;
  createdAt: string;
};
