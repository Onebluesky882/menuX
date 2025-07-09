import React from "react";
import { Sparkles, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const newDeals = [
  {
    id: 1,
    name: "Truffle Mac & Cheese",
    emoji: "🧀",
    price: "$18.99",
    originalPrice: "$24.99",
    savings: "Save 40%",
    tag: "NEW",
    description: "Creamy truffle-infused comfort food",
    image: "from-yellow-200 to-orange-200",
  },
  {
    id: 2,
    name: "Dragon Roll Combo",
    emoji: "🍣",
    price: "$22.99",
    originalPrice: "$35.99",
    savings: "Save 36%",
    tag: "BIG DEAL",
    description: "8 pieces + miso soup + salad",
    image: "from-blue-200 to-cyan-200",
  },
  {
    id: 3,
    name: "BBQ Pulled Pork Sandwich",
    emoji: "🥪",
    price: "$13.99",
    originalPrice: null,
    savings: null,
    tag: "NEW",
    description: "Slow-cooked with signature sauce",
    image: "from-amber-200 to-orange-200",
  },
];

export const NewDealsSection = () => {
  return (
    <div className="px-4 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-xl">💥</span>
        <h3 className="text-lg font-bold text-gray-800">Must-Try New Menus</h3>
        <Sparkles className="h-5 w-5 text-orange-500" />
      </div>

      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {newDeals.map((item) => (
          <Card
            key={item.id}
            className="min-w-[300px] p-4 bg-gradient-to-br from-white to-orange-50 border-0 shadow-sm rounded-2xl cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="flex justify-between items-start mb-3">
              <Badge
                className={`text-xs px-2 py-1 rounded-full ${
                  item.tag === "NEW"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.tag}
              </Badge>
              {item.savings && (
                <Badge className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                  <Tag className="h-3 w-3" />
                  <span>{item.savings}</span>
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${item.image} rounded-xl flex items-center justify-center`}
              >
                <span className="text-3xl">{item.emoji}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-orange-600">
                {item.price}
              </span>
              {item.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {item.originalPrice}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
