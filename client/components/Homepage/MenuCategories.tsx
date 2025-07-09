import React from "react";
import { Card } from "@/components/ui/card";

const categories = [
  { name: "Pizza", emoji: "🍕", color: "from-red-100 to-orange-100" },
  { name: "Burgers", emoji: "🍔", color: "from-yellow-100 to-amber-100" },
  { name: "Sushi", emoji: "🍣", color: "from-blue-100 to-cyan-100" },
  { name: "Desserts", emoji: "🍰", color: "from-pink-100 to-rose-100" },
  { name: "Drinks", emoji: "🥤", color: "from-green-100 to-emerald-100" },
  { name: "Salads", emoji: "🥗", color: "from-lime-100 to-green-100" },
];

export const MenuCategories = () => {
  return (
    <div className="px-4 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Browse Menu</h3>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category) => (
          <Card
            key={category.name}
            className={`p-4 bg-gradient-to-br ${category.color} border-0 shadow-sm rounded-xl cursor-pointer hover:scale-105 transition-transform`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{category.emoji}</div>
              <div className="text-sm font-medium text-gray-700">
                {category.name}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
