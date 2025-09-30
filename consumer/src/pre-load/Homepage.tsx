"use client";

import { FaShop } from "react-icons/fa6";
import { HeadCard } from "../components/homepage/header";
const Homepage = () => {
  return (
    <div className="min-h-screen   rounded-2xl  wrap-normal">
      <div className="my-2">
        {/* head */}
        <HeadCard />
        {/* section 1  */}
        <SectionShop />
        {/* section  */}
        <div className="h-20 border-2 my-2">section 1</div>
        {/* section 3  */}
      </div>
    </div>
  );
};

export default Homepage;

const SectionShop = () => {
  const items = [
    { id: 1, name: "ข้าวแกง" },
    { id: 2, name: "ตามสั่ง" },
  ];
  return (
    <div className="  ">
      <div className="grid grid-cols-2 rounded-sm my-2 border-0.5 border-gray-100 shadow-sm overflow-auto ">
        {items.map(item => (
          <MenuIcon key={item.id} name={item.name} />
        ))}
      </div>
    </div>
  );
};

const MenuIcon = ({ name }: any) => {
  return (
    <div className="col-span-1  p-2 flex flex-col  items-center     justify-center   shadow-sm  hover:shadow-l    transition cursor-pointer">
      <div className="border rounded-full h-20 w-20 flex  flex-col items-center justify-center">
        <FaShop size={20} className="" />
        <p className="text-[10px]">{name}</p>
      </div>
    </div>
  );
};
