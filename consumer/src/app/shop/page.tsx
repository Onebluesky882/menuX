"use client";
import { useState } from "react";
import useCart, { Menu } from "../../hooks/useCart";

type CategoriesProps = {
  categories: Category[];
  onClick: (id: number) => void;
};
type MenuProps = {
  menus: Menu[];
  onClick: (id: number) => void;
};

type Category = {
  id: number;
  name: string;
};

type CartItem = Menu & { amount: number };

const page = () => {
  // mock category และเมนู
  const categories = [
    { id: 1, name: "🍚 อาหารจานเดียว" },
    { id: 2, name: "🍲 ต้ม/แกง" },
    { id: 3, name: "🥤 เครื่องดื่ม" },
    { id: 4, name: "🍰 ของหวาน" },
  ];
  const menuItems = [
    // 🍚 อาหารจานเดียว
    { id: 1, name: "ข้าวกะเพราไก่ไข่ดาว", price: 55, categoryId: 1 },
    { id: 2, name: "ข้าวมันไก่", price: 50, categoryId: 1 },
    { id: 3, name: "ข้าวผัดกุ้ง", price: 60, categoryId: 1 },
    { id: 4, name: "ราดหน้า", price: 65, categoryId: 1 },
    { id: 5, name: "ผัดซีอิ๊วหมู", price: 55, categoryId: 1 },

    // 🍲 ต้ม/แกง
    { id: 6, name: "แกงเขียวหวานไก่", price: 70, categoryId: 2 },
    { id: 7, name: "ต้มยำกุ้ง", price: 85, categoryId: 2 },
    { id: 8, name: "แกงส้มชะอมกุ้ง", price: 80, categoryId: 2 },
    { id: 9, name: "ต้มจืดเต้าหู้หมูสับ", price: 65, categoryId: 2 },

    // 🥤 เครื่องดื่ม
    { id: 10, name: "ชาเย็น", price: 25, categoryId: 3 },
    { id: 11, name: "กาแฟเย็น", price: 30, categoryId: 3 },
    { id: 12, name: "น้ำอัดลม", price: 20, categoryId: 3 },
    { id: 13, name: "น้ำเปล่า", price: 10, categoryId: 3 },
    { id: 14, name: "น้ำมะนาวโซดา", price: 35, categoryId: 3 },

    // 🍰 ของหวาน
    { id: 15, name: "บัวลอยไข่หวาน", price: 35, categoryId: 4 },
    { id: 16, name: "ลอดช่องน้ำกะทิ", price: 30, categoryId: 4 },
    { id: 17, name: "ข้าวเหนียวมะม่วง", price: 65, categoryId: 4 },
    { id: 18, name: "ไอศกรีมกะทิ", price: 25, categoryId: 4 },
  ];
  const [selectCat, setSelectCat] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);

  const { addCart } = useCart();
  // กรองเมนูตาม category ที่เลือก
  const groupedCat = menuItems.filter(item => item.categoryId === selectCat);

  const handlePickMenu = (id: number) => {
    // safety check if not found id with menu
    const menu = groupedCat.find(item => item.id === id);
    if (!menu) return;
    setCart(prev => addCart(prev, menu));
  };

  console.log("selectMenu", cart);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      {/* Header ร้าน */}
      <ShopSections />

      <div className="grid grid-cols-8 gap-4">
        {/*  Sidebar Category */}
        <Categories categories={categories} onClick={id => setSelectCat(id)} />
        {/* Section Menu */}
        <MenuCard menus={groupedCat as []} onClick={handlePickMenu} />
      </div>
      <div>
        <CartCard cart={cart} />
      </div>
    </div>
  );
};
export default page;

const Categories = ({ categories, onClick }: CategoriesProps) => {
  return (
    <div className="col-span-2 bg-white rounded-xl shadow p-4 space-y-2">
      <h2 className="text-lg font-semibold mb-3">หมวดหมู่</h2>
      {categories.map(cat => (
        <button
          onClick={() => onClick(cat.id!)}
          key={cat.id}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-100 transition"
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

const MenuCard = ({ menus, onClick }: MenuProps) => {
  return (
    <div className="col-span-6 bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">เมนูอาหาร</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menus.map((item: any) => (
          <div
            key={item.id}
            onClick={() => onClick(item.id)}
            className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
          >
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.price} บาท</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShopSections = () => {
  return (
    <div className="bg-white border rounded-xl shadow-md p-6 mb-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        🏪 {`shop name`}
      </h1>
      <p className="text-sm text-gray-500 text-center mt-1">
        อร่อย สะอาด รวดเร็ว
      </p>
    </div>
  );
};

const CartCard = ({ cart }: { cart: CartItem[] }) => {
  const total = cart.reduce((sum, item) => sum + item.amount, 0);
  return <div>item :{total}</div>;
};
