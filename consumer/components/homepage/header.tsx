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
    <div className=" relative p-[2px] rounded-lg shadow-sm bg-gradient-to-tr from-green-400 to-blue-500">
      <div className="rounded-lg bg-white py-2 px-2  ">
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
              <div>
                <TabMenuProfile user={user} />
              </div>
            </div>
          </>
        ) : (
          <Link href={"/profile"}>
            <div className="flex flex-row justify-between ">
              <div className="mx-2 w-full flex-1  gap-4 flex-row flex items-center   rounded-sm   ">
                <User
                  size={45}
                  className=" text-gray-500 border rounded-full"
                />
              </div>
              <div>
                <TabMenuProfile user={user} />
              </div>
            </div>
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
          <p className="text-[10px]">เมนู</p>
        </div>
        <div className="border rounded-full h-12 w-12 flex  flex-col items-center justify-center">
          <FaShop size={15} className="" />
          <p className="text-[10px]">ร้าน</p>
        </div>{" "}
        <div className="border rounded-full h-12 w-12 flex  flex-col items-center justify-center">
          <FaShop size={15} className="" />
          <p className="text-[10px]">บันทึก</p>
        </div>{" "}
        <div className="border rounded-full h-12 w-12 flex  flex-col items-center justify-center">
          <FaShop size={15} className="" />
          <p className="text-[10px]">รายการ</p>
        </div>
      </div>
    </div>
  );
};
