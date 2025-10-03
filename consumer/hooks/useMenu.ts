import { useState } from "react";
import { menuApi } from "../api/menu.api";
import { Menu } from "../types/menu";

const useMenu = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  const fetchShopMenus = async (shopId: string) => {
    const res = await menuApi.getMenuByShopId(shopId);
    if (res?.data.data) {
      setMenus(res.data.data);
    }
  };

  return { fetchShopMenus, menus };
};

export default useMenu;
