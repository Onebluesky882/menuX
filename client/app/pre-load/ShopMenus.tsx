"use client";

// payload map data to db
// redirect to payment  page
// receipt queue with id tack 01 -> 999 with static page [id : 8 number]

import { useEffect, useState } from "react";
import { shopApi } from "../api/shop.api";
import Image from "next/image";
import { menuApi } from "../api/menu.api";
import { CartItem, MenuItem, OrderPayload } from "../types/menuOrder.type";
import { CartIconPreview, CartPreview } from "@/components/menu/CartPreview";
import { TotalCard } from "@/components/menu/TotalCard";
import { ordersApi } from "../api/orders.api";

const ShopMenus = ({ shopId }: { shopId: string }) => {
  const [shop, setShop] = useState<any>();
  const [menusOption, setMenusOption] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [previewCart, setPreviewCart] = useState(false);
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

  const handlePreviewCart = () => {
    try {
      setPreviewCart((prev) => !prev);
    } catch (error) {}
  };

  const handleTotalOrderPrice = () => {
    return cart.reduce((total, item) => {
      return total + Number(item.selectedOption.price) * item.quantity;
    }, 0);
  };
  // send data to store db
  const ordersPayload: OrderPayload[] = cart.map((menu) => ({
    ...menu,

    priceEach: menu.basePrice.toString(),
    shopId: shop.id,
    quantity: menu.quantity.toString(),
    totalPrice: menu.totalPrice.toString(),
  }));

  const handleStoreOrders = async () => {
    try {
      const result = await ordersApi.create(ordersPayload);
      setPreviewCart(false);
      setCart([]);
    } catch (error) {
      console.log("fail", error);
    }
  };
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="">
          <div className="">
            <h2 className="text-center text-3xl p-2 m-2">{shop?.name}</h2>
            <div className="bg-amber-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {menusOption.map((menu) => (
                <div
                  key={menu.id}
                  className="bg-white  rounded-2xl shadow-md overflow-hidden touch-manipulation"
                >
                  <div>
                    {menu.images[0] && (
                      <Image
                        src={menu.images[0].imageUrl}
                        alt={menu.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
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
      <div className=" sticky   bottom-0 ">
        {cart.length > 0 && !previewCart && (
          <CartIconPreview
            getTotalOrderItems={getTotalOrderItems}
            setPreviewCart={handlePreviewCart}
          />
        )}
      </div>

      <div>
        {previewCart && (
          <div>
            {/* 🔹 GLASS BACKDROP OVERLAY */}
            <div
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-xs transition-all"
              onClick={() => setPreviewCart(false)}
            />

            {/* 🔹 CART PREVIEW */}
            <CartPreview
              open={previewCart}
              onOpenChange={setPreviewCart}
              cart={cart}
              totalOrdersPrice={handleTotalOrderPrice}
              handleStoreOrders={handleStoreOrders}
              shopId={""}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default ShopMenus;
