"use client";

export type MenuOption = {
  id: string;
  menuId: string;
  label: string;
  price: string;
  available: boolean;
  createdAt: string;
};

export type MenuImage = {
  id: string;
  imageUrl: string;
  createdAt: string;
  type: string;
  shopId: string;
  menuId: string;
  userId: string;
};

export type MenuItem = {
  id: string;
  createdBy: string;
  name: string;
  description: string | null;
  categoryId: string | null;
  price: string;
  available: boolean;
  createdAt: string;
  pageId: string | null;
  shopId: string;
  images: MenuImage[];
  menuOptions: MenuOption[];
};

type CartItem = {
  menuId: string;
  menuName: string;
  basePrice: number;
  selectedOption: MenuOption;
  quantity: number;
  totalPrice: number;
};

import { useEffect, useState } from "react";
import { shopApi } from "../api/shop.api";
import Image from "next/image";
import { menuApi } from "../api/menu.api";

const ShopMenus = ({ shopId }: { shopId: string }) => {
  const [shop, setShop] = useState<any>();
  const [menusOption, setMenusOption] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    setLoading(true);
    const shop = async () => {
      const res = await shopApi.getShopBtId(shopId);
      setShop(res.data.data);
      setLoading(false);
    };
    const getMenuOption = async () => {
      const res = await menuApi.getMenuWithOption(shopId);
      setMenusOption(res.data);
    };

    getMenuOption();
    shop();
  }, [shopId]);

  console.log("cart", cart);

  const handleCart = (optionId: string) => {
    const menu = menusOption.find((menu) =>
      menu.menuOptions.some((option) => option.id === optionId)
    );
    if (!menu) return;

    const selectedOption = menu.menuOptions.find(
      (option) => option.id === optionId
    );
    if (!selectedOption) return;
    const price = Number(selectedOption.price);
    const existing = cart.find(
      (item) =>
        item.menuId === menu.id && item.selectedOption.id === selectedOption.id
    );
    if (existing) {
      const updateCart = cart.map((item) =>
        item.menuId === menu.id && item.selectedOption.id === selectedOption.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: price * (item.quantity + 1),
            }
          : item
      );
      setCart(updateCart);
    } else {
      const newItem: CartItem = {
        menuId: menu.id,
        basePrice: price,
        menuName: menu.name,
        selectedOption,
        quantity: 1,
        totalPrice: price,
      };

      setCart([...cart, newItem]);
    }
  };
  const getTotalOrderPrice = () => {
    return cart.reduce((total, item) => {
      return total + Number(item.selectedOption.price) * item.quantity;
    }, 0);
  };

  const getTotalOrderItems = () => {
    return cart.reduce((total, item) => {
      return total + Number(item.quantity);
    }, 0);
  };

  // send data to store db
  const orderPayload = cart.map((item) => ({}));
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <div>
            <h2>เมนูอาหาร {shop?.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {menusOption.map((menu) => (
                <div
                  key={menu.id}
                  className="bg-white  rounded-2xl shadow-md overflow-hidden touch-manipulation"
                >
                  {menu.images[0] && (
                    <Image
                      src={menu.images[0].imageUrl}
                      alt={menu.name}
                      width={500}
                      height={500}
                      className="w-full h-69 object-contain"
                    />
                  )}
                  <div className="p-4 space-y-2">
                    <h2 className="text-xl  font-semibold text-gray-800">
                      {menu.name}
                    </h2>

                    <div className="mt-2 space-y-1">
                      {menu.menuOptions.map((option) => (
                        <button
                          onClick={() => handleCart(option.id)}
                          key={option.id}
                          className="w-full flex justify-between items-center bg-green-50 hover:bg-green-200 active:bg-green-300 rounded-xl px-4 py-4 text-xl font-medium text-gray-800 shadow-md transition-all duration-150"
                        >
                          <span>{option.label}</span>
                          <span className="text-green-700">
                            {option.price} บาท
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <TotalCard
              cart={cart}
              getTotalOrderPrice={getTotalOrderPrice}
              getTotalOrderItems={getTotalOrderItems}
            />
          </div>
        </div>
      )}
    </>
  );
};

type TotalCardProps = {
  cart: CartItem[];
  getTotalOrderPrice: () => number;
  getTotalOrderItems: () => number;
};
const TotalCard = ({
  cart,
  getTotalOrderPrice,
  getTotalOrderItems,
}: TotalCardProps) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md text-lg font-semibold">
      {cart && (
        <div>
          รวมรายการ {getTotalOrderItems()} รวมทั้งหมด: {getTotalOrderPrice()}{" "}
          บาท
        </div>
      )}
    </div>
  );
};

export default ShopMenus;
