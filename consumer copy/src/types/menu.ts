export type Menu = {
  id: string;
  name: string;
  price: string; // ถ้า backend ส่งมาเป็น string เช่น "35.00"
  available: boolean;
  shopId: string;
};
