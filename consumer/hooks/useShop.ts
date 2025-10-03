import { useState } from "react";
import { shopApi } from "../api/shop.api";
import { Shop } from "../types/shop";

const useShop = () => {
  const [shop, setShop] = useState<Shop>();
  const [allShops, setAllShops] = useState<Shop[]>([]);

  const fetchShopId = async (shopId: string) => {
    const res = await shopApi.getShopBtId(shopId);
    if (res?.data.data) {
      setShop(res.data.data);
    }
  };
  const fetchAllShops = async () => {
    const res = await shopApi.getAllShops();
    if (res.data) {
      setAllShops(res.data.data);
    }
  };
  const activeShops = allShops.filter(shop => shop.active);
  return { shop, fetchShopId, fetchAllShops, allShops, activeShops };
};
export default useShop;
