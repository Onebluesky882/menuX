import { menuApi } from "@/Api/menu.api";
import { useState } from "react";

const useMenu = () => {
  const [menus, setMenus] = useState([]);
  const getAllMenu = async (shopId: string) => {
    const res = await menuApi.getAll(shopId);
    if (res) {
      const menuItems = res.data;

      setMenus(menuItems);
    }
  };
  return { getAllMenu, menus };
};
export default useMenu;
