"use client";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaShop } from "react-icons/fa6";
import { useUserStore } from "../hooks/useUser";

export const HeadHomePage = () => {
  const user = useUserStore(state => state.user);

  return (
    <div className="   ">
      <UserCard user={user} />
    </div>
  );
};

const TabMenuProfile = ({ user }: any) => {
  return (
    <div className="  grid mx-2   p-2   ">
      <div className="flex  items-center   ">
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

const UserCard = ({ user }: any) => {
  return (
    <div className=" relative p-[2px] rounded-lg bg-gradient-to-tr from-green-400 to-blue-500">
      <div className="rounded-lg bg-white py-2 px-2 grid-cols-2 grid ">
        {user ? (
          <>
            <div className="flex ">
              <Link href={"/profile"} className="   flex   ">
                <Image
                  src={user.linePictureUrl}
                  height={55}
                  width={55}
                  alt={user.lineDisplayName}
                  className="rounded-full self-center "
                />
              </Link>
              <div className="ml-5 self-center">
                <h1 className="font-extrabold">MenuX</h1>
                <p className=" text-gray-500  text-sm "></p>
                <p className="  text-gray-500  text-[10px] self-baseline-last">
                  {user.lineDisplayName}
                </p>
              </div>
            </div>

            <div>
              <TabMenuProfile />
            </div>
          </>
        ) : (
          <Link href={"/profile"}>
            <User className="h-2 w-5 text-gray-600" />
          </Link>
        )}
      </div>
    </div>
  );
};
