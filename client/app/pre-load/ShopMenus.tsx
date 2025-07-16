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

export type OrderPayload = {
  menuId: string;
  quantity: string;
  priceEach: string;
  totalPrice: string;
  shopId: string;
};

import { FaCartShopping } from "react-icons/fa6";
// payload map data to db
// redirect to payment  page
// receipt queue with id tack 01 -> 999 with static page [id : 8 number]

import { useEffect, useState } from "react";
import { shopApi } from "../api/shop.api";
import Image from "next/image";
import { menuApi } from "../api/menu.api";
import { IoCloseCircle } from "react-icons/io5";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

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
    menuId: menu.menuId,
    priceEach: menu.basePrice.toString(),
    shopId: shop.id,
    quantity: menu.quantity.toString(),
    totalPrice: menu.totalPrice.toString(),
  }));

  console.log("preview card ,", previewCart);
  console.log("ordersPayload ", ordersPayload);

  console.log("cart :", cart);
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
            />
          </div>
        )}
      </div>
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
    <div className="p-4 bg-white  stick bottom-0 rounded-xl shadow-md text-lg font-semibold">
      {cart && (
        <div className="">
          รวมรายการ {getTotalOrderItems()} รวมทั้งหมด: {getTotalOrderPrice()}{" "}
          บาท
        </div>
      )}
    </div>
  );
};

type CartIconPreviewProps = {
  getTotalOrderItems: () => number;
  setPreviewCart: () => void;
};

const CartIconPreview = ({
  getTotalOrderItems,
  setPreviewCart,
}: CartIconPreviewProps) => {
  return (
    <div className="relative flex justify-end p-2  ">
      <div
        onClick={() => setPreviewCart()}
        className="   bg-amber-200   flex justify-center flex-col px-10 py-6 rounded-full "
      >
        <span className="font-extrabold text-2xl  text-center ">
          {getTotalOrderItems()}
        </span>
        <FaCartShopping size={32} />
      </div>
    </div>
  );
};

type CartPreviewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  totalOrdersPrice: () => number;
};

const CartPreview = ({
  cart,
  open,
  onOpenChange,
  totalOrdersPrice,
}: CartPreviewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-50 fixed bottom-0 left-0 right-0 max-h-[70vh] w-full rounded-t-2xl bg-white p-6 shadow-xl border-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <DialogTitle className="text-xl font-bold text-gray-800">
            🛒 ตะกร้าสินค้า
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <IoCloseCircle size={36} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 overflow-y-auto max-h-[40vh] pr-2">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">ไม่มีสินค้าในตะกร้า</p>
          ) : (
            cart.map((menu, index) => (
              <div
                key={`${menu.menuId}-${menu.selectedOption.id}`}
                className="bg-gray-50 border rounded-xl p-4 shadow-sm"
              >
                <div className="text-base font-medium text-gray-700">
                  {index + 1}. {menu.menuName}
                </div>
                <div className="text-sm text-gray-600">
                  {menu.selectedOption.label} x {menu.quantity}
                </div>
                <div className="text-sm text-green-600 font-semibold">
                  {menu.totalPrice.toLocaleString()} บาท
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary & Action */}
        <div className="flex justify-between items-center mt-6 text-lg font-semibold">
          <span className="text-gray-700">รวมทั้งหมด:</span>
          <span className="text-green-600">
            {totalOrdersPrice().toLocaleString()} บาท
          </span>
        </div>

        <Button
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white text-lg py-5 rounded-xl transition-all"
          disabled={cart.length === 0}
        >
          ดำเนินการสั่งซื้อ
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default ShopMenus;
