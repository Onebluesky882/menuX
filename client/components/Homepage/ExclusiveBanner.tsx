import React from "react";
import { Sparkles, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ExclusiveBanner = () => {
  return (
    <div className="px-4 py-6">
      <Card className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium opacity-90">
                APP EXCLUSIVE
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-1">10% OFF</h2>
            <p className="text-sm opacity-90">
              Your first app order + free delivery
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-full p-3 mb-2">
              <Clock className="h-8 w-8" />
            </div>
            <p className="text-xs">Limited time</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
