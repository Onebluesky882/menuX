import React from "react";
import { Users, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const InviteFriends = () => {
  return (
    <div className="px-4 mb-6">
      <Card className="p-6 bg-gradient-to-r from-emerald-100 to-teal-100 border-0 shadow-sm rounded-2xl">
        <div className="flex items-center space-x-4">
          <div className="bg-emerald-500 rounded-full p-3">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">Invite Friends</h3>
            <p className="text-sm text-gray-600">
              You both get $5 off your next order
            </p>
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6">
            <Gift className="h-4 w-4 mr-2" />
            Invite
          </Button>
        </div>
      </Card>
    </div>
  );
};
