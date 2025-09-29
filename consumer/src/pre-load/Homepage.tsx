"use client";

import { FaShop } from "react-icons/fa6";
import { useUserStore } from "../hooks/useUser";
const Homepage = () => {
  const user = useUserStore(state => state.user);
  return (
    <div className="min-h-screen bg-gray-100 p-2 rounded-2xl  wrap-normal">
      <div className="my-2">
        {/* section 1  */}
        <div className="h-20 border-2 my-2">section 1</div>
        {/* section 2  */}
        <SectionMenu />
        {/* section  */}
        <div className="h-20 border-2 my-2">section 1</div>
        {/* section 3  */}
      </div>
    </div>
  );
};

export default Homepage;

const SectionMenu = () => {
  const items = [
    { id: 1, name: "Shop 1" },
    { id: 2, name: "Shop 2" },
    { id: 3, name: "Shop 3" },
    { id: 4, name: "Shop 4" },
    { id: 5, name: "Shop 5" },
    { id: 6, name: "Shop 6" },
  ];
  return (
    <div className="grid grid-cols-3   justify-center  border-2   overflow-x-auto  ">
      {items.map(item => (
        <MenuIcon key={item.id} />
      ))}
    </div>
  );
};

const MenuIcon = () => {
  return (
    <div className="col-span-1   p-2 flex flex-col  items-center     justify-center">
      <div className="border rounded-full h-20 w-20 flex  flex-col items-center justify-center">
        <FaShop size={20} className="" />
        <p className="text-[10px]">name</p>
      </div>
    </div>
  );
};
