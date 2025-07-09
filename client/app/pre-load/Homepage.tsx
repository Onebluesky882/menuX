"use client";
import React, { useState } from "react";
import { ExclusiveBanner } from "@/components/Homepage/ExclusiveBanner";
import { FlashDealBanner } from "@/components/Homepage/FlashDealBanner";
import { QuickActions } from "@/components/Homepage/QuickActions";
import { TrendingMenu } from "@/components/Homepage/TrendingMenu";
import { NewDealsSection } from "@/components/Homepage/NewDealsSection";
import { CategoryTabs } from "@/components/Homepage/CategoryTabs";
import { DailySpecial } from "@/components/Homepage/DailySpecial";
import { LoyaltyTracker } from "@/components/Homepage/LoyaltyTracker";
import { MenuCategories } from "@/components/Homepage/MenuCategories";
import { PromoSection } from "@/components/Homepage/PromoSection";
import { InviteFriends } from "@/components/Homepage/InviteFriends";
import { QRFlyer } from "@/components/Homepage/QrFlyer";
import { toast } from "sonner";
const Homepage = () => {
  const [showQRFlyer, setShowQRFlyer] = useState(false);

  const handleQRScan = () => {
    toast("Opening camera to scan QR code...");
  };

  const handleQuickOrder = () => {
    toast("Loading your favorite items...");
  };

  const handleRepeatOrder = () => {
    toast("Adding your last order to cart...");
  };
  return (
    <>
      <main className=" bg-gradient-to-br from-orange-50 to-pink-50  border-1 border-gray-150 shadow-sm rounded-sm ">
        <div className="sm:w-120 md:w-220">
          {/* Exclusive App Banner */}
          <ExclusiveBanner />

          {/* Flash Deal Banner with Timer */}
          <FlashDealBanner />

          {/* Quick Actions */}
          <QuickActions
            onQRScan={handleQRScan}
            onQuickOrder={handleQuickOrder}
            onRepeatOrder={handleRepeatOrder}
          />

          {/* Trending Menu Section */}
          <TrendingMenu />

          {/* New & Big Deal Menus */}
          <NewDealsSection />

          {/* Category Tabs */}
          <CategoryTabs />

          {/* Daily Special */}
          <DailySpecial />

          {/* Loyalty Tracker */}
          <LoyaltyTracker points={1240} nextReward={1500} />

          {/* Menu Categories */}
          <MenuCategories />

          {/* Promo Section */}
          <PromoSection />

          {/* Invite Friends */}
          <InviteFriends />

          {/* QR Flyer Modal */}
          {showQRFlyer && <QRFlyer onClose={() => setShowQRFlyer(false)} />}
        </div>
      </main>
      <div>sidebar</div>
    </>
  );
};

export default Homepage;
