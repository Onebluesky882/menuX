import { useState } from "react";
import { shopApi } from "../api/shop.api";
import { Shop } from "../types/shop";

const useShop = () => {
  const [shop, setShop] = useState<Shop>();

  const fetchShop = async (shopId: string) => {
    const res = await shopApi.getShopBtId(shopId);
    if (res?.data.data) {
      setShop(res.data.data);
    }
  };

  return { shop, fetchShop };
};
export default useShop;
