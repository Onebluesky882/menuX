"use client";

import { useEffect, useState } from "react";
import { menuApi } from "../api/menu.api";

const ShopMenu = ({ shopId }: { shopId: string }) => {
  const [menu, setMenu] = useState<any>(null);

  useEffect(() => {
    menuApi.getMenuByShopId(shopId).then(res => {
      console.log("res.data :", res.data.data);
      setMenu(res.data.data);
    });
  }, [shopId]);

  if (!menu) return <p>Loading...</p>;

  return (
    <div>
      <h1>ShopMenu</h1>
      <pre>{JSON.stringify(menu, null, 2)}</pre>
    </div>
  );
};

export default ShopMenu;
