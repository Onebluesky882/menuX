"use client";

import { FaShop } from "react-icons/fa6";
import { HeadHomePage } from "../components/Header";
const Homepage = () => {
  return (
    <div className="min-h-screen   rounded-2xl  wrap-normal">
      <div className="my-2">
        {/* head */}
        <HeadHomePage />
        {/* section 1  */}
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
    <div className="  ">
      <div>
        <h3>ร้านค้าเปิดให้บริการ</h3>
      </div>
      <div className="grid grid-cols-3 ">
        {items.map(item => (
          <MenuIcon key={item.id} />
        ))}
      </div>
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
