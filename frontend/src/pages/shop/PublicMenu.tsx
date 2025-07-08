import { useEffect, useState } from "react";
import useMenu from "@/hooks/useMenu";
import useShop from "@/hooks/useShop";
import { useParams } from "react-router-dom";
import useImages from "@/hooks/useImage";
import ItemCard from "@/components/menu/MenuCard";
import type { Order } from "frontend/types/order.type";
import type { Menu } from "frontend/types/menu.types";

// Public Menu Component
const PublicMenu = () => {
  const [loading, setLoading] = useState(false);
  const { shopId } = useParams<{ shopId: string }>();

  const { selectedShop, setShopById } = useShop();

  const { getAllMenu, menus: menuItems } = useMenu();
  const { menuImage, getMenuImage } = useImages();

  useEffect(() => {
    setLoading(true);
    if (!shopId) return;
    setShopById(shopId ?? "");
    getAllMenu(shopId!);
    getMenuImage(shopId!, "menu");
    setLoading(false);
  }, [shopId]);

  const imageMap = new Map<string, string[]>();
  menuImage.forEach((img) => {
    const list = imageMap.get(img.menuId) ?? [];
    list.push(img.url);
    imageMap.set(img.menuId, list);
  });

  const menuWithImage: Menu[] = (menuItems ?? []).map((menu) => ({
    ...menu,
    price: Number(menu.price),
    image: imageMap.get(menu.id) ?? [],
    amount: 0,
  }));

  const [order, setOrder] = useState<Order[]>([]);

  type OrderInput = Pick<
    Order,
    "id" | "amount" | "price" | "shopId" | "staffId" | "quantity"
  >;
  const handleOrder = (menu: OrderInput) => {
    setOrder((prevOrders) => {
      const existing = prevOrders.find((o) => o.id === menu.id);
      if (existing) {
        return prevOrders.map((order) =>
          order.id === menu.id
            ? { ...order, amount: menu.amount, quantity: menu.quantity }
            : order
        );
      } else {
        return [...prevOrders, menu];
      }
    });
  };

  console.log("order ,", order);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r rounded-2xl from-orange-500 via-pink-500 to-purple-600 shadow-2xl sticky top-0 z-20">
        <div className="max-w-6xl mt-2 mb-5 mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {selectedShop?.name}
              </h1>
              <p className="text-white/90 text-sm">{selectedShop?.address}</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div>loading</div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuWithImage &&
              menuWithImage.map((menu, index) => {
                console.log("menu :", menu);
                return (
                  <ItemCard
                    key={index}
                    onAmountChange={(itemId, amount) => {
                      handleOrder({
                        id: itemId,
                        amount: menu.price * amount,
                        price: menu.price,
                        quantity: amount,
                        shopId: shopId!,
                        staffId: "",
                      });
                    }}
                    item={menu}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicMenu;
