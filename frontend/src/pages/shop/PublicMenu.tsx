import { useEffect, useState } from "react";
import { ShoppingCart, Filter } from "lucide-react";
import useMenu from "@/hooks/useMenu";
import useShop from "@/hooks/useShop";
import { useParams } from "react-router-dom";
import useImages from "@/hooks/useImage";
import ItemCard from "@/components/menu/MenuCard";
import type { Menu } from "frontend/types/menu.types";

// Public Menu Component
const PublicMenu = () => {
  const { shopId } = useParams<{ shopId: string }>();

  const [showFilters, setShowFilters] = useState(false);

  const { selectedShop, setShopById } = useShop();

  const { getAllMenu, menus: menuItems } = useMenu();
  const { menuImage, getMenuImage } = useImages();

  useEffect(() => {
    if (!shopId) return;
    setShopById(shopId ?? "");
    getAllMenu(shopId!);
    getMenuImage(shopId!, "menu");
  }, [shopId]);

  const imageMap = new Map<string, string[]>();

  menuImage.forEach((img) => {
    const list = imageMap.get(img.menuId) ?? [];
    list.push(img.url);
    imageMap.set(img.menuId, list);
  });

  const menuWithImage: Menu[] = (menuItems ?? []).map((menu) => ({
    ...menu,
    price: menu.price,
    image: imageMap.get(menu.id) ?? [],
    amount: 1,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-2xl sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {selectedShop?.name}
              </h1>
              <p className="text-white/90 text-sm">
                🍽️ Premium Thai Kitchen ร้านอาหารไทยต้นตำรับ
              </p>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
            >
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuWithImage &&
            menuWithImage.map((menu, index) => (
              <ItemCard key={index} onAmountChange={() => {}} item={menu} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PublicMenu;
