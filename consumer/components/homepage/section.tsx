import Link from "next/link";
import { FaShop } from "react-icons/fa6";
import { Shop } from "../../types/shop";

type SectionShopProps = {
  shops: Shop[];
};

export const SectionShop = ({ shops }: SectionShopProps) => {
  return (
    <div className="">
      <h2 className="pl-5 text-gray-500 text-[10px]">🟢 Online</h2>
      <div className="  rounded-sm my-2 border-0.5 border-gray-100 shadow-sm overflow-auto ">
        {shops?.map(item => (
          <ShopCard key={item.id} id={item.id} name={item.name} />
        ))}
      </div>
    </div>
  );
};

type shopCardProps = {
  id: string;
  name: string;
};

export const ShopCard = ({ id, name }: shopCardProps) => {
  return (
    <div className="col-span-1 p-2 flex flex-col items-center hover:shadow transition cursor-pointer">
      <Link href={`/menus/${id}`} className="flex flex-col items-center  ">
        <div className="border rounded-full shadow-sm h-20 w-20 flex items-center justify-center">
          <FaShop size={32} className="text-gray-700" />
        </div>
        <h1 className="mt-2 text-sm text-center">{name}</h1>
      </Link>
    </div>
  );
};
