"use client";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaShop } from "react-icons/fa6";
import { useUserStore } from "../hooks/useUser";

export const Header = () => {
  const user = useUserStore(state => state.user);

  return (
    <header className="   fixed  top-0 z-50  w-full   ">
      <div className="px-2 py-2 flex items-center justify-between bg-white  shadow-sm rounded-sm  ">
        <div className="flex flex-co items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
            <Link href={"/"}>
              <span className="text-white font-bold text-lg">F</span>{" "}
            </Link>
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">MenuX</h1>
            <p className="text-xs text-gray-500">Delivering happiness</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {user ? (
            <div>
              <Link href={"/profile"}>
                <Image
                  src={user.linePictureUrl}
                  height={45}
                  width={45}
                  alt={user.lineDisplayName}
                  className="rounded-full  "
                />
              </Link>
            </div>
          ) : (
            <Link href={"/profile"}>
              <User className="h-5 w-5 text-gray-600" />
            </Link>
          )}
        </div>
      </div>
      <TabMenuProfile user={user} />
    </header>
  );
};

const TabMenuProfile = ({ user }: any) => {
  return (
    <div className="   grid-cols-2 grid mx-2 bg-gray-50 p-2 ">
      <div className="flex  w-[50%] items-center   ">
        {user ? (
          <p className="text-sm font-bold m-0">คุณ {user.lineDisplayName}</p>
        ) : null}
      </div>
      <div className="col-span-1 flex gap-2  flex-row  items-center     justify-center">
        <div className="border rounded-full h-12 w-12 flex  flex-col items-center justify-center">
          <FaShop size={15} className="" />
          <p className="text-[10px]">name</p>
        </div>
        <div className="border rounded-full h-12 w-12 flex  flex-col items-center justify-center">
          <FaShop size={15} className="" />
          <p className="text-[10px]">name</p>
        </div>{" "}
        <div className="border rounded-full h-12 w-12 flex  flex-col items-center justify-center">
          <FaShop size={15} className="" />
          <p className="text-[10px]">name</p>
        </div>{" "}
        <div className="border rounded-full h-12 w-12 flex  flex-col items-center justify-center">
          <FaShop size={15} className="" />
          <p className="text-[10px]">name</p>
        </div>
      </div>
    </div>
  );
};
