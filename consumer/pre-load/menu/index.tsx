"use client";

import { useEffect } from "react";
import {
  CartCard,
  Categories,
  ShopSections,
} from "../../components/menu/MenuCard";
import useMenu from "../../hooks/useMenu";

// ---------- MAIN PAGE ----------
const ShopPage = ({ shopId }: { shopId: string }) => {
  const { fetchShopMenus, menus } = useMenu();

  useEffect(() => {
    fetchShopMenus(shopId);
  }, [shopId]);

  const categories = [
    { id: 1, name: "🍚 อาหารจานเดียว" },
    { id: 2, name: "🍲 ต้ม/แกง" },
    { id: 3, name: "🥤 เครื่องดื่ม" },
    { id: 4, name: "🍰 ของหวาน" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      {/* Header ร้าน */}
      <ShopSections />

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Sidebar Category */}
        <Categories
          categories={categories}
          onClick={id => console.log("เลือกหมวด", id)}
        />

        {/* Section Menu */}
        {/* <MenuCard menus={menus} onClick={id => console.log("เลือกเมนู", id)} /> */}
      </div>

      {/* ตะกร้าสั่งซื้อ */}
      <div className="mt-6">
        <CartCard cart={[]} />
      </div>
    </div>
  );
};

export default ShopPage;
