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

export type MenuImage = { id: string; url: string; menuId: string };

export type Menu = {
  id: string;
  price: number;
  available: boolean;
  name: string;
  image: string[];
  amount: number;
  description?: string;
  category?: string;
  rating?: number;
  prepTime?: string;
  isSpicy?: boolean;
  isPopular?: boolean;
  discount?: number;
};
