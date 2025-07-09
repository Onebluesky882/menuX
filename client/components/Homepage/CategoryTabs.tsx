import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, TrendingUp, Sparkles, Coffee } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Coffee },
  { id: "recommended", label: "Recommended", icon: Star },
  { id: "popular", label: "Popular", icon: TrendingUp },
  { id: "new", label: "New", icon: Sparkles },
];

export const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="px-4 mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-xl p-1">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center space-x-1 rounded-lg py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm"
              >
                <IconComponent className="h-4 w-4" />
                <span>{category.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            <div className="text-center py-8 text-gray-500">
              <category.icon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Items for {category.label} category will be displayed here</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
