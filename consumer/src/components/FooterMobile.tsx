"use client";

import { ModeToggle } from "./ToggleMode";

const MobileFooter = () => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white shadow-t border-t flex justify-around items-center py-3 z-50">
      <button className="flex flex-col items-center text-gray-600 hover:text-green-500">
        <span className="text-xl">🏠</span>
        <span className="text-xs">Home</span>
      </button>{" "}
      <button className="flex flex-col items-center text-gray-600 hover:text-green-500">
        <span className="text-xl">🏠</span>
        <span className="text-xs">Shop</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-green-500">
        <span className="text-xl">👤</span>
        <span className="text-xs">Order</span>
      </button>{" "}
      <button className="flex flex-col items-center text-gray-600 hover:text-green-500">
        <span className="text-xs">Order</span>
      </button>
      <div className="bg-black rounded-2xl">
        <ModeToggle />
      </div>
    </div>
  );
};

export default MobileFooter;
