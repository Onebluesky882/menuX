"use client";

import { FaShop } from "react-icons/fa6";
import { useUserStore } from "../hooks/useUser";
const Homepage = () => {
  const user = useUserStore(state => state.user);
  return (
    <div className="min-h-screen bg-gray-100 p-2 rounded-2xl  wrap-normal">
      {!user ? (
        <p>สวัสดีค่ะ</p>
      ) : (
        <h1 className="text-2xl font-bold mb-4">
          สวัสดีค่ะคุณ {user?.lineDisplayName}
        </h1>
      )}
      <div className="my-2">
        {/* section 1  */}
        <div className="h-20 border-2 my-2">section 1</div>
        {/* section 2  */}
        <SectionMenu />
        {/* section  */}
        <div className="h-20 border-2 my-2">section 1</div>
        {/* section 3  */}
        <SectionsEx />
      </div>
    </div>
  );
};

export default Homepage;

const SectionsEx = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-2 rounded-2xl ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Section 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">🎁 โปรโมชั่น</h2>
          <p className="text-sm text-gray-600">ส่วนลดพิเศษและดีลเด็ด</p>
        </div>

        {/* Section 2 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">🍽️ เมนูยอดนิยม</h2>
        </div>

        {/* Section 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">🛒 ตะกร้าของฉัน</h2>
          <p className="text-sm text-gray-600">ดูและแก้ไขรายการในตะกร้า</p>
        </div>

        {/* Section 4 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">📦 ออเดอร์ของฉัน</h2>
          <p className="text-sm text-gray-600">ติดตามสถานะการสั่งซื้อ</p>
        </div>

        {/* Section 5 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">🏆 สะสมแต้ม</h2>
          <p className="text-sm text-gray-600">ดูแต้มและแลกรางวัล</p>
        </div>
      </div>
    </div>
  );
};

const SectionMenu = () => {
  const items = [
    { id: 1, name: "Shop 1" },
    { id: 2, name: "Shop 2" },
    { id: 3, name: "Shop 3" },
    { id: 4, name: "Shop 4" },
    { id: 5, name: "Shop 5" },
    { id: 6, name: "Shop 6" },
  ];
  return (
    <div className="grid grid-cols-3   justify-center  border-2   overflow-x-auto  ">
      {items.map(item => (
        <MenuIcon key={item.id} />
      ))}
    </div>
  );
};

const MenuIcon = () => {
  return (
    <div className="col-span-1   p-2 flex flex-col  items-center     justify-center">
      <div className="border rounded-full h-20 w-20 flex  flex-col items-center justify-center">
        <FaShop size={20} className="" />
        <p className="text-[10px]">name</p>
      </div>
    </div>
  );
};
