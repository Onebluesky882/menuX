"use client";

import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLineLogin } from "../hooks/useLineLogin";
const MobileFooter = () => {
  const { user, login, logout } = useLineLogin();

  const router = useRouter();
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
        {user ? (
          <div>
            <Link href={"/profile"}>
              <Image
                src={user.linePictureUrl}
                height={25}
                width={25}
                alt={user.lineDisplayName}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <Link href={"/profile"}>
            <User className="h-5 w-5 text-gray-600" />
          </Link>
        )}

        <span className="text-xs">{user?.lineDisplayName ?? "Log-in"}</span>
      </button>
    </div>
  );
};

export default MobileFooter;
