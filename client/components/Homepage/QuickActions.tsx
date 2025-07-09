import React from "react";
import { QrCode, Heart, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuickActionsProps {
  onQRScan: () => void;
  onQuickOrder: () => void;
  onRepeatOrder: () => void;
}

export const QuickActions = ({
  onQRScan,
  onQuickOrder,
  onRepeatOrder,
}: QuickActionsProps) => {
  return (
    <div className="px-4 mb-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-sm">
          <Button
            onClick={onQRScan}
            className="w-full h-20 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex flex-col items-center justify-center space-y-2"
          >
            <QrCode className="h-6 w-6" />
            <span className="text-sm font-medium">Scan QR to Order</span>
          </Button>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-sm">
          <Button
            onClick={onQuickOrder}
            className="w-full h-20 bg-green-500 hover:bg-green-600 text-white rounded-xl flex flex-col items-center justify-center space-y-2"
          >
            <Heart className="h-6 w-6" />
            <span className="text-sm font-medium">Favorite Menu</span>
          </Button>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-sm">
          <Button
            onClick={onRepeatOrder}
            className="w-full h-20 bg-purple-500 hover:bg-purple-600 text-white rounded-xl flex flex-col items-center justify-center space-y-2"
          >
            <Clock className="h-6 w-6" />
            <span className="text-sm font-medium">Repeat Last Order</span>
          </Button>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-100 border-0 shadow-sm">
          <Button className="w-full h-20 bg-amber-500 hover:bg-amber-600 text-white rounded-xl flex flex-col items-center justify-center space-y-2">
            <Calendar className="h-6 w-6" />
            <span className="text-sm font-medium">Table Reservation</span>
          </Button>
        </Card>
      </div>
    </div>
  );
};
