import { menuApi } from "@/Api/menu.api";
import { useState } from "react";
type Menu = {
  id: string;
  available: boolean;
  name: string;
  price: string;
  shopId: string;
};
const useMenu = () => {
  const [menus, setMenus] = useState<Menu[] | null>(null);
  const getAllMenu = async (shopId: string) => {
    const res = await menuApi.getAll(shopId);
    if (res.data) {
      setMenus(res.data.data); // <-- this is what you want
    }
  };
  return { getAllMenu, menus };
};
export default useMenu;
