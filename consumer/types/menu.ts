export type Menu = {
  id: string;
  name: string;
  price: string; // ถ้า backend ส่งมาเป็น string เช่น "35.00"
  available: boolean;
  shopId: string;
};

export type MenuImage = {
  imageUrl: string;
};

//one
export type MenuOption = {
  id: string;
  label: string;
  price: number;
};
// many
export type MenuOptions = {
  id: string;
  name: string;
  images: MenuImage[];
  menuOptions: MenuOption[];
};
