"use client";

import { useEffect, useState } from "react";
import useMenu from "../hooks/useMenu";
import useShop from "../hooks/useShop";

const ShopMenu = ({ shopId }: { shopId: string }) => {
  const [loading, setLoading] = useState(false);
  const { shop, fetchShop } = useShop();
  const { menus, fetchShopMenus } = useMenu();
  useEffect(() => {
    const loadData = () => {
      try {
        setLoading(true);
        fetchShop(shopId);
        fetchShopMenus(shopId);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [shopId]);

  console.log("menus", menus);
  if (loading) return <p>กำลังโหลด...</p>;

  if (!menus.length) return <p>ไม่มีเมนูในร้านนี้</p>;
  console.log("menus", menus);
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
