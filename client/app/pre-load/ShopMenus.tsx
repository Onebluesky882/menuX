"use client";

import { useEffect, useState } from "react";
import { shopApi } from "../api/shop.api";

const ShopMenus = ({ shopId }: { shopId: string }) => {
  const [menus, setMenus] = useState<any>();
  const [menusOption, setMenusOption] = useState<any>();

  useEffect(() => {
    const getMenuWithShop = async () => {
      const res = await shopApi.getMenuByShopId(shopId);

      setMenus(res.data.data);
    };
    const getMenuOption = async () => {
      const res = await shopApi.getMenuWithOption(shopId);
      console.log("res", res);
      console.log("res.data", res.data);
      setMenusOption(res.data);
    };
    getMenuOption();
    getMenuWithShop();
  }, []);
  return (
    <div>
      {" "}
      {JSON.stringify(menus, null, 2)}
      <div>{JSON.stringify(menusOption, null, 3)}</div>
    </div>
  );
};

const first = () => {};

export default ShopMenus;
