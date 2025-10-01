"use client";

import { useEffect, useState } from "react";
import { menuApi } from "../api/menu.api";
import { shopApi } from "../api/shop.api";

type MenuItem = {
  id: string;
  name: string;
  price: string;
  available: boolean;
  shopId: string;
};

const ShopMenu = ({ shopId }: { shopId: string }) => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [shop, setShop] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await menuApi.getMenuByShopId(shopId);
        setMenus(res.data.data);
      } catch (error) {
        console.error("Failed to fetch menus", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchShopId = async () => {
      try {
        const res = await shopApi.getShopBtId(shopId);
        setShop(res.data.data);
      } catch (error) {
        console.error("Failed to fetch menus", error);
      }
    };
    fetchShopId();
    fetchMenus();
  }, [shopId]);

  if (loading) return <p>กำลังโหลด...</p>;

  if (!menus.length) return <p>ไม่มีเมนูในร้านนี้</p>;

  return (
    <>
      <h1 className="text-xl font-bold mb-4">เมนูร้าน {shop?.name}</h1>
      <div className="grid grid-cols-2 gap-4">
        {menus.map(menu => (
          <div
            key={menu.id}
            className="border rounded-lg p-3 shadow hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold">{menu.name}</h2>
            <p className="text-gray-500">฿{menu.price}</p>
            <p
              className={`text-sm mt-1 ${
                menu.available ? "text-green-600" : "text-red-500"
              }`}
            >
              {menu.available ? "พร้อมขาย" : "หมด"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShopMenu;
