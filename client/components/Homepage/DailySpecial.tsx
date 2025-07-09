import React from "react";
import { Star, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const DailySpecial = () => {
  return (
    <div className="px-4 mb-6">
      <Card className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-0 shadow-sm rounded-2xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-yellow-400 rounded-full p-2">
            <Star className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Today is Special</h3>
            <p className="text-sm text-gray-600">Chef is recommendation</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Bell className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🍕</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">Margherita Deluxe</h4>
            <p className="text-sm text-gray-600">
              Fresh mozzarella, basil, tomato
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-lg font-bold text-orange-600">$12.99</span>
              <span className="text-sm text-gray-500 line-through">$16.99</span>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                24% off
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
