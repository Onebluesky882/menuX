"use client";

import Link from "next/link";
import { FaShop } from "react-icons/fa6";
import { HeadCard } from "../components/homepage/header";
const Homepage = () => {
  return (
    <div className=" ">
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
    { id: 1, name: "shop", path: "/shop" },
    {
      id: 2,
      name: "menu",
      path: "/menus/70eace24-3038-4c89-b66e-6c5af038eb0b",
    },
    { id: 3, name: "order", path: "/order" },
  ];
  return (
    <div className="  ">
      <div className="grid grid-cols-2 rounded-sm my-2 border-0.5 border-gray-100 shadow-sm overflow-auto ">
        {items.map(item => (
          <MenuIcon key={item.id} name={item.name} path={item.path} />
        ))}
      </div>
    </div>
  );
};

const MenuIcon = ({ name, path }: any) => {
  return (
    <div className="col-span-1  p-2 flex flex-col  items-center     justify-center   shadow-sm  hover:shadow-l    transition cursor-pointer">
      <div className="border rounded-full h-20 w-20 flex  flex-col items-center justify-center">
        <Link href={path}>
          <FaShop size={20} className="" />
          <p className="text-[10px]">{name}</p>
        </Link>
      </div>
    </div>
  );
};
