import React, { useState, useEffect } from "react";
import { Timer, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export const FlashDealBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 35,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 mb-6">
      <Card className="p-6 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-5 w-5" />
              <span className="text-sm font-medium opacity-90">FLASH DEAL</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">Free Delivery</h2>
            <p className="text-sm opacity-90">On orders above $25</p>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1 mb-2">
              <Timer className="h-4 w-4" />
              <span className="text-xs">Ends in</span>
            </div>
            <div className="flex space-x-1">
              <div className="bg-white/20 rounded-lg px-2 py-1">
                <span className="text-lg font-bold">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </span>
                <div className="text-xs opacity-75">H</div>
              </div>
              <div className="bg-white/20 rounded-lg px-2 py-1">
                <span className="text-lg font-bold">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </span>
                <div className="text-xs opacity-75">M</div>
              </div>
              <div className="bg-white/20 rounded-lg px-2 py-1">
                <span className="text-lg font-bold">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </span>
                <div className="text-xs opacity-75">S</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
