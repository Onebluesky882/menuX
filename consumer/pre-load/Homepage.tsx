"use client";

import { useEffect } from "react";
import { HeadCard } from "../components/homepage/header";
import { SectionShop } from "../components/homepage/section";
import useShop from "../hooks/useShop";

const Homepage = () => {
  const { fetchAllShops, activeShops } = useShop();

  useEffect(() => {
    fetchAllShops();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-5xl mx-auto">
      {/* Header Card */}
      <HeadCard />

      {/* ร้านค้าเปิดบริการ */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
          🍜 ร้านค้าที่เปิดบริการ
        </h2>
        {activeShops.length > 0 ? (
          <SectionShop shops={activeShops} />
        ) : (
          <p className="text-gray-500 text-center py-6">
            😔 ตอนนี้ยังไม่มีร้านเปิดบริการ
          </p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
