import React from "react";
import { X, QrCode, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QRFlyerProps {
  onClose: () => void;
}

export const QRFlyer = ({ onClose }: QRFlyerProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">QR Flyer Preview</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-pink-500 text-white p-6 rounded-xl text-center">
          <div className="bg-white p-4 rounded-lg mb-4 inline-block">
            <QrCode className="h-20 w-20 text-gray-800" />
          </div>
          <h2 className="text-xl font-bold mb-2">Scan to Order</h2>
          <p className="text-sm opacity-90 mb-4">
            Get 10% off your first app order!
          </p>
          <div className="text-xs opacity-80">
            Download FoodieApp • Fast & Easy Ordering
          </div>
        </div>

        <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
          <Download className="h-4 w-4 mr-2" />
          Download Flyer
        </Button>
      </Card>
    </div>
  );
};
