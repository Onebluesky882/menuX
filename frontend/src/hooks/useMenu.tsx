import { menuApi } from "@/Api/menu.api";
import { useState } from "react";
type Menu = {
  id: string;
  available: boolean;
  name: string;
  price: string;
  shopId: string;
};
type Options = {
  label: string;
  price: string;
};
type Images = {
  id: string;
  url: string;
};
type MenuPreview = {
  id: string;
  name: string;
  option: Options[];
  images: Images[];
  available?: boolean | undefined;
  menuId?: string | null | undefined;
};
const useMenu = () => {
  const [menus, setMenus] = useState<Menu[] | null>(null);
  const [menuPreview, setMenuPreview] = useState<MenuPreview[] | null>(null);

  const getAllMenu = async (shopId: string) => {
    const res = await menuApi.getAll(shopId);
    if (res.data) {
      setMenus(res.data.data); // <-- this is what you want
    }
  };
  const getMenusWithShopId = async (shopId: string) => {
    const res = await menuApi.getMenuPreviews(shopId);

    // Debug ทีละขั้น
    console.log("Step 1 - res:", !!res);
    console.log("Step 2 - res.data:", !!res?.data);
    console.log("Step 3 - res.data.data:", res?.data);
    console.log("Step 4 - is array:", Array.isArray(res?.data?.data));

    if (res.data) {
      const data = res.data;
      console.log("Menu data:", data); // ดูข้อมูลตรงนี้
      setMenuPreview(data); // <-- this is what you want
      return data;
    }
  };

  return { getAllMenu, menus, getMenusWithShopId, menuPreview };
};
export default useMenu;
