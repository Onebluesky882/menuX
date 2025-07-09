import React from "react";
import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";

export const PromoSection = () => {
  return (
    <div className="px-4 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">What People Say</h3>
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-sm rounded-xl">
          <div className="relative aspect-square bg-gradient-to-br from-indigo-200 to-purple-200 rounded-lg mb-3 flex items-center justify-center">
            <Play className="h-8 w-8 text-white" />
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              TikTok
            </div>
          </div>
          <p className="text-xs text-gray-600 font-medium">@foodielover23</p>
          <p className="text-xs text-gray-500">2.3M views</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 border-0 shadow-sm rounded-xl">
          <div className="relative aspect-square bg-gradient-to-br from-pink-200 to-rose-200 rounded-lg mb-3 flex items-center justify-center">
            <Play className="h-8 w-8 text-white" />
            <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
              IG
            </div>
          </div>
          <p className="text-xs text-gray-600 font-medium">@pizza_queen</p>
          <p className="text-xs text-gray-500">847K views</p>
        </Card>
      </div>
    </div>
  );
};
