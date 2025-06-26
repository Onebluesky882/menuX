import { Clock, Flame, Heart, Minus, Plus, Star } from "lucide-react";

type MenuCardProps = {
  menu: {
    id: string;
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
  onAmountChange?: (menuId: string, amount: number) => void;
};

const MenuCard: React.FC<MenuCardProps> = ({ menu, onAmountChange }) => {
  const price = parseInt(menu.price);
  const finalPrice = menu.discount
    ? Math.round(price * (1 - menu.discount / 100))
    : price;

  return (
    <div className="group relative">
      <div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden border transition-all ${
          !menu.available ? "opacity-60" : ""
        }`}
      >
        {/* Image */}
        <div className="relative h-56 bg-gradient-to-br from-orange-100 to-pink-100">
          <img
            src={menu.image[0]}
            alt={menu.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {menu.isPopular && (
              <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center gap-1.5">
                <Flame size={12} />
                HOT
              </span>
            )}
            {menu.discount && (
              <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                -{menu.discount}%
              </span>
            )}
            {!menu.available && (
              <span className="px-3 py-1.5 bg-gray-800/90 text-white text-xs font-semibold rounded-full">
                SOLD OUT
              </span>
            )}
          </div>

          <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Heart size={18} className="text-gray-600" />
          </button>

          <div className="absolute bottom-4 right-4">
            <div className="bg-white rounded-xl px-4 py-2 text-right">
              {menu.discount ? (
                <>
                  <div className="text-sm text-gray-500 line-through">
                    ฿{price}
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    ฿{finalPrice}
                  </div>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  ฿{price}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {menu.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {menu.description}
          </p>

          <div className="flex items-center gap-4 mb-4">
            {menu.rating && (
              <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-full">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">
                  {menu.rating}
                </span>
              </div>
            )}
            {menu.prepTime && (
              <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-full">
                <Clock size={12} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  {menu.prepTime}
                </span>
              </div>
            )}
            {menu.category && (
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {menu.category}
              </span>
            )}
          </div>

          {/* Amount Control */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
                onClick={() =>
                  onAmountChange?.(menu.id, Math.max(menu.amount - 1, 0))
                }
              >
                <Minus size={16} />
              </button>
              <div className="w-12 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <span className="font-bold text-orange-600 text-lg">
                  {menu.amount}
                </span>
              </div>
              <button
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center"
                onClick={() => onAmountChange?.(menu.id, menu.amount + 1)}
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="text-right bg-orange-50 px-3 py-2 rounded-lg">
              <p className="text-xs text-orange-600 font-medium">รวม</p>
              <p className="text-lg font-bold text-orange-600">
                ฿{finalPrice * menu.amount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
