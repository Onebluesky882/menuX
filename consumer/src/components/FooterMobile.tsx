"use client";

Image;
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { GiRank3 } from "react-icons/gi";
import { MdHistory } from "react-icons/md";
import { useLineLogin } from "../hooks/useLineLogin";
const MobileFooter = () => {
  const { user } = useLineLogin();

  const router = useRouter();
  return (
    <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white shadow-t border-t flex justify-around items-center py-3 z-50">
      <Link
        href={"/"}
        className="flex flex-col items-center text-gray-600 hover:text-green-500"
      >
        <AiOutlineHome color="#383838" />
        <span className="text-xs font-semibold">Home</span>
      </Link>{" "}
      <Link
        href={"/popular"}
        className="flex flex-col items-center text-gray-600 hover:text-green-500"
      >
        <GiRank3 color="#383838" />
        <span className="text-xs font-semibold">Popular</span>
      </Link>
      <Link
        href={"/order"}
        className="flex flex-col items-center text-gray-600 hover:text-green-500"
      >
        <MdHistory />
        <span className="text-xs font-semibold">Order</span>
      </Link>
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

        <span className="text-xs font-semibold">
          {user?.lineDisplayName ?? "Log-in"}
        </span>
      </button>
    </div>
  );
};

export default MobileFooter;
