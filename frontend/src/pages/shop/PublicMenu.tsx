import React, { useEffect, useState } from "react";
import { ShoppingCart, Filter } from "lucide-react";
import useMenu from "@/hooks/useMenu";
import useShop from "@/hooks/useShop";
import { useParams } from "react-router-dom";
import useImages from "@/hooks/useImage";

// Types
type MenuProps = {
  available: boolean;
  name: string;
  price: string;
  image: string[];
  amount: number;
  description?: string;
  category?: string;
  rating?: number;
  prepTime?: string;
  isSpicy?: boolean;
  isPopular?: boolean;
  discount?: number;
};

// Sample menu data
const sampleMenus: MenuProps[] = [
  {
    available: true,
    name: "ผัดไทยกุ้งสด Premium",
    price: "280",
    image: [
      "https://images.unsplash.com/photo-1559847844-d418898e3957?w=500&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop&auto=format",
    ],
    amount: 0,
    description:
      "ผัดไทยกุ้งสดใหญ่พิเศษ รสชาติต้นตำรับชาววัง เส้นเหนียวนุ่ม หอมกลิ่นใบกะเพรา พร้อมไข่ดาวกรอบ",
    category: "อาหารจานหลัก",
    rating: 4.9,
    prepTime: "12 นาที",
    isSpicy: true,
    isPopular: true,
    discount: 15,
  },
];

// Public Menu Component
const PublicMenu = () => {
  const { shopId } = useParams<{ shopId: string }>();

  const [menus, setMenus] = useState<MenuProps[]>(sampleMenus);
  const [showFilters, setShowFilters] = useState(false);
  const { menuImage, getMenuImage } = useImages();
  //   const [currentAmount, setCurrentAmount] = useState(menus.amount);
  //   const [imageLoaded, setImageLoaded] = useState(false);
  //   const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { selectedShop, setShopById } = useShop();

  const { getAllMenu, menus: menuItems } = useMenu();

  // get Image.menuId

  useEffect(() => {
    if (!shopId) return;
    setShopById(shopId ?? "");
    getAllMenu(shopId!);
    getMenuImage(shopId!, "menu");
  }, [shopId]);

  const imageMap = new Map<string, string>(
    menuImage.map((img) => [img.id, img.url])
  );

  const menuWithImage: MenuProps[] = (menuItems ?? []).map((menu) => ({
    ...menu,
    price: menu.price,
    image: [imageMap.get(menu.id) ?? ""],
    amount: 1,
  }));

  console.log("menuWithImage", menuWithImage);
  const totalItems = menus.reduce((sum, menu) => sum + menu.amount, 0);
  const totalPrice = menus.reduce((sum, menu) => {
    const price = menu.discount
      ? Math.round(parseInt(menu.price) * (1 - menu.discount / 100))
      : parseInt(menu.price);
    return sum + price * menu.amount;
  }, 0);

  //   const handleAmountChange = (newAmount: number) => {
  //     if (newAmount >= 0) {
  //       setCurrentAmount(newAmount);
  //       onAmountChange(menu.id, newAmount);
  //     }
  //   };

  //   const nextImage = () => {
  //     setCurrentImageIndex((prev) => (prev + 1) % menu.image.length);
  //   };

  //   const prevImage = () => {
  //     setCurrentImageIndex(
  //       (prev) => (prev - 1 + menu.image.length) % menu.image.length
  //     );
  //   };

  //   const goToImage = (index: number) => {
  //     setCurrentImageIndex(index);
  //   };

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

      {/* Menu Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* {filteredMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              onAmountChange={handleAmountChange}
            />
          ))} */}
        </div>
      </div>

      {/* Floating Order Summary */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-30">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-4 shadow-2xl backdrop-blur-lg">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <ShoppingCart size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-90">
                      {totalItems} รายการในตะกร้า
                    </p>
                    <p className="text-2xl font-bold">
                      ฿{totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  สั่งอาหาร
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicMenu;
