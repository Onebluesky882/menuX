"use client";

import { ModeToggle } from "../../components/ToggleMode";
import LineIntegrate from "../../pre-load/Profile";

const Page = () => {
  return (
    <div className="  bg-gradient-to-b from-green-50 to-white p-4">
      <div className="ิ">
        <LineIntegrate />
      </div>
      {/* Grid Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Section 1: โปรโมชั่น */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">🎁 โปรโมชั่น</h2>
            <p className="text-sm text-gray-500">
              ส่วนลดพิเศษและดีลเด็ดที่คุณไม่ควรพลาด
            </p>
          </div>
        </div>

        {/* Section 2: เมนูยอดนิยม */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">🍽️ เมนูยอดนิยม</h2>
            <p className="text-sm text-gray-500">
              เมนูที่ลูกค้าชื่นชอบและสั่งบ่อย
            </p>
          </div>
        </div>

        {/* Section 3: ตะกร้าของฉัน */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">🛒 ตะกร้าของฉัน</h2>
            <p className="text-sm text-gray-500">ดูและแก้ไขรายการในตะกร้า</p>
          </div>
        </div>

        {/* Section 4: ออเดอร์ของฉัน */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">📦 ออเดอร์ของฉัน</h2>
            <p className="text-sm text-gray-500">ติดตามสถานะการสั่งซื้อ</p>
          </div>
        </div>

        {/* Section 5: สะสมแต้ม */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">🏆 สะสมแต้ม</h2>
            <p className="text-sm text-gray-500">ดูแต้มและแลกรางวัล</p>
          </div>
        </div>
        <div className="bg-black rounded-2xl">
          <ModeToggle />
        </div>
      </div>
      {/* Profile Section */}
    </div>
  );
};

export default Page;
