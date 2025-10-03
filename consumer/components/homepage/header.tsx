"use client";

import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaShop } from "react-icons/fa6";
import { useUserStore } from "../../hooks/useUser";
import { LineUser } from "../../types/lineUser";

type UserCardProps = {
  user: LineUser | null;
};

export const HeadCard = () => {
  const user = useUserStore(state => state.user);
  console.log("user", user);
  return (
    <div className="   ">
      <UserCard user={user} />
    </div>
  );
};

// ------------------- sub-component. -------------------

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className=" relative p-[2px] rounded-lg bg-gradient-to-tr from-green-400 to-blue-500">
      <div className="rounded-lg bg-white py-2 px-2 grid-cols-2 grid ">
        {user ? (
          <>
            <div className="flex ">
              <Link href={"/"} className="   flex   ">
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

                <p className="  text-gray-500  text-[10px] self-baseline-last">
                  {user.lineDisplayName}
                </p>
              </div>
            </div>

            <div>
              <TabMenuProfile user={user} />
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

const TabMenuProfile = ({ user }: UserCardProps) => {
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
