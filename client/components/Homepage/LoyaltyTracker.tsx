import React from "react";
import { Trophy, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LoyaltyTrackerProps {
  points: number;
  nextReward: number;
}

export const LoyaltyTracker = ({ points, nextReward }: LoyaltyTrackerProps) => {
  const progress = (points / nextReward) * 100;
  const pointsToNext = nextReward - points;

  return (
    <div className="px-4 mb-6">
      <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-sm rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500 rounded-full p-2">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Loyalty Points</h3>
              <p className="text-sm text-gray-600">
                Earn rewards with every order
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{points}</div>
            <div className="text-xs text-gray-500">points</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress to next reward</span>
            <span className="text-purple-600 font-medium">
              {pointsToNext} points to go
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>Next reward: Free pizza at {nextReward} points!</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
