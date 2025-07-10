import useMenu from "@/hooks/useMenu";
import useShop from "@/hooks/useShop";
import { useParams } from "react-router-dom";
import useImages from "@/hooks/useImage";
import ItemCard from "@/components/menu/MenuCard";
import type { Menu } from "frontend/types/menu.types";
import { FaCartShopping } from "react-icons/fa6";
import { CartPreview } from "@/components/menu/PreviewCart";
import useOrder, { type OrderInput } from "@/stores/useOrder";
import { useEffect, useMemo, useState } from "react";

const PublicMenu = () => {
  const [loading, setLoading] = useState(false);
  const { shopId } = useParams<{ shopId: string }>();
  const [showCart, setShowCart] = useState(false);
  const { orders, addOrUpdateItem, updateQuantity, removeItem, getTotalPrice } =
    useOrder();
  const { selectedShop, setShopById } = useShop();
  const {
    getAllMenu,
    menus: menuItems,
    getMenusWithShopId,
    menuPreview,
  } = useMenu();
  const { menuImage, getMenuImage } = useImages();

  const [preload, setPreload] = useState(false);

  const imageMap = new Map<string, string[]>();
  menuImage.forEach((img) => {
    const list = imageMap.get(img.menuId) ?? [];
    list.push(img.url);
    imageMap.set(img.menuId, list);
  });

  const menuWithImage: Menu[] = (menuItems ?? []).map((menu) => {
    const existingOrder = orders.find((order) => order.id === menu.id);
    return {
      ...menu,
      price: Number(menu.price),
      image: imageMap.get(menu.id) ?? [],
      amount: existingOrder?.quantity ?? 0,
    };
  });
  console.log("menuPreview :", menuPreview);

  console.log("menuItems :", menuItems);

  const popupCart = () => {
    setShowCart((prev) => !prev);
  };
  const handleOrder = (menu: OrderInput) => {
    addOrUpdateItem(menu);
  };
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const totalItems = useMemo(() => {
    return orders.reduce((total, item) => total + item.quantity, 0);
  }, [orders]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPreload(true);
      if (!shopId) return;

      try {
        await setShopById(shopId ?? "");
        await getAllMenu(shopId!);
        await getMenuImage(shopId!, "menu");
        await getMenusWithShopId(shopId as string);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
        setPreload(false);
      }
    };

    fetchData();
  }, [shopId]);
  useEffect(() => {
    if (totalItems === 0 && showCart) {
      setShowCart(false);
    }
  }, [totalItems, showCart]);
  console.log("menuPreview :", menuPreview);
  return (
    <>
      {preload ? (
        <div className="flex justify-center ">loading...</div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r rounded-2xl from-orange-500 via-pink-500 to-purple-600 shadow-2xl sticky top-0 z-20">
            <div className="max-w-6xl mt-2 mb-5 mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    {selectedShop?.name}
                  </h1>
                  <p className="text-white/90 text-sm">
                    {selectedShop?.address}
                  </p>
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
                  menuWithImage.map((menu) => {
                    return (
                      <ItemCard
                        key={menu.id}
                        onAmountChange={(itemId, amount) => {
                          handleOrder({
                            id: itemId,
                            name: menu.name,
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
          {totalItems > 0 && (
            <div
              onClick={popupCart}
              className="bg-blue-400 w-30 h-30 flex justify-center items-center rounded-full fixed bottom-10 right-5  m-2"
            >
              <span className="font-mono absolute text-red-400 text-3xl rounded-full bg-blue-300/50 w-20 h-20 flex justify-center items-center">
                {totalItems}
              </span>
              <FaCartShopping className="" size={50} color="white" />
            </div>
          )}

          {showCart && (
            <CartPreview
              showCart={showCart}
              setShowCart={setShowCart}
              order={orders}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              totalItems={totalItems}
              totalPrice={getTotalPrice()}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PublicMenu;
