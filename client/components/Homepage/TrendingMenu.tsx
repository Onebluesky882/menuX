import React from "react";
import { TrendingUp, Clock, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const trendingItems = [
  {
    id: 1,
    name: "Spicy Buffalo Wings",
    emoji: "🍗",
    price: "$14.99",
    ordersLastHour: "1.2k",
    badge: "People's Pick",
    discount: null,
    image: "from-orange-200 to-red-200",
  },
  {
    id: 2,
    name: "Classic Cheeseburger",
    emoji: "🍔",
    price: "$12.99",
    ordersLastHour: "890",
    badge: "Staff Pick",
    discount: null,
    image: "from-yellow-200 to-amber-200",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    emoji: "🍕",
    price: "$16.99",
    ordersLastHour: "756",
    badge: null,
    discount: "15% off",
    image: "from-red-200 to-pink-200",
  },
];

export const TrendingMenu = () => {
  return (
    <div className="px-4 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-xl">🔥</span>
        <h3 className="text-lg font-bold text-gray-800">Trending Now</h3>
        <TrendingUp className="h-5 w-5 text-red-500" />
      </div>

      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {trendingItems.map((item) => (
          <Card
            key={item.id}
            className="min-w-[280px] p-4 bg-white border-0 shadow-sm rounded-2xl cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className={`w-14 h-14 bg-gradient-to-br ${item.image} rounded-xl flex items-center justify-center`}
              >
                <span className="text-2xl">{item.emoji}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm">
                  {item.name}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-lg font-bold text-orange-600">
                    {item.price}
                  </span>
                  {item.discount && (
                    <Badge className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      {item.discount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{item.ordersLastHour} ordered this hour</span>
              </div>
              {item.badge && (
                <Badge className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>{item.badge}</span>
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
