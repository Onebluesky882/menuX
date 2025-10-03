import { AiFillAliwangwang } from "react-icons/ai";

type CategoriesProps = {
  categories: { id: number; name: string }[];
  onClick: (id: number) => void;
};

export const Categories = ({ categories, onClick }: CategoriesProps) => {
  return (
    <div className="sm:w-[25%] bg-white rounded-lg shadow p-4 space-y-2">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">📂 หมวดหมู่</h2>
      <div className="space-y-2">
        {categories.map(cat => (
          <button
            onClick={() => onClick(cat.id)}
            key={cat.id}
            className="w-full text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-green-100 transition text-gray-700 font-medium"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

type Menu = {
  id: string;
  name: string;
  price: number;
  categoryId?: number;
  amount?: number;
};

type MenuProps = {
  menus: Menu[];
  onClick: (id: string) => void;
};

export const MenuCard = ({ menus, onClick }: MenuProps) => {
  return (
    <div className="sm:w-[75%] bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">🍴 เมนูอาหาร</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menus.map(item => (
          <div
            key={item.id}
            onClick={() => onClick(item.id)}
            className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.price} บาท</p>
            </div>
            <span className="text-green-500 font-semibold">+</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ShopSections = () => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-green-50 border rounded-xl shadow p-6 mb-4 flex flex-row justify-between items-center">
      <div className="border rounded-full p-2 bg-white shadow-sm">
        <AiFillAliwangwang color="#22c55e" size={24} />
      </div>
      <div className="">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          🏪 นิวข้าวแกง
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          อร่อย สะอาด รวดเร็ว พร้อมเสิร์ฟ
        </p>
      </div>
      <div className="border rounded-full p-2 bg-white shadow-sm">
        <AiFillAliwangwang color="#22c55e" size={24} />
      </div>
    </div>
  );
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

export const CartCard = ({ cart }: { cart: CartItem[] }) => {
  const totalQty = cart.reduce((sum, item) => sum + item.amount, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.amount * item.price,
    0
  );

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="font-semibold text-lg text-gray-700 mb-2">🛒 ตะกร้า</h2>
      {cart.length === 0 ? (
        <p className="text-sm text-gray-400">ยังไม่มีสินค้าในตะกร้า</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-100 mb-3">
            {cart.map(item => (
              <li
                key={item.id}
                className="flex justify-between py-2 text-gray-700"
              >
                <span>
                  {item.name} × {item.amount}
                </span>
                <span>{item.amount * item.price}฿</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>รวมทั้งหมด:</span>
            <span>{totalPrice}฿</span>
          </div>
        </>
      )}
    </div>
  );
};
