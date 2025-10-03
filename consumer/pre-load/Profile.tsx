"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLineLogin } from "../hooks/useLineLogin";

// mock data แทน API จริง
const mockPoints = 120;
const mockOrderHistory = [
  { id: 1, name: "ผัดกะเพราไก่", date: "2025-09-20" },
  { id: 2, name: "ข้าวมันไก่", date: "2025-09-18" },
  { id: 3, name: "ส้มตำไทย", date: "2025-09-15" },
];
const mockCart = [
  { id: 1, name: "ชาเย็น", qty: 2 },
  { id: 2, name: "หมูทอดกระเทียม", qty: 1 },
];

export default function Profile() {
  const { user, login, logout } = useLineLogin();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      logout();
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center shadow-sm rounded-2xl  bg-gradient-to-br from-green-100 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="w-full max-w-md p-8     dark:bg-gray-800 ">
        {!user ? (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 dark:text-white">
              Login with LINE
            </h1>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* ส่วนโปรไฟล์ */}
            <img
              src={user.linePictureUrl}
              alt="profile"
              className="w-24 h-24 rounded-full shadow-lg border-4 border-green-400 mb-4"
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              สวัสดี, {user.lineDisplayName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
              คุณได้เข้าสู่ระบบด้วย LINE
            </p>

            {/* ระบบสะสมแต้ม */}
            <div className="w-full mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                🎁 คะแนนสะสม
              </h3>
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
                <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {mockPoints} แต้ม
                </span>
              </div>
            </div>

            {/* Order History */}
            <div className="w-full mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                🍽️ อาหารที่เคยสั่ง
              </h3>
              <ul className="space-y-2">
                {mockOrderHistory.map(order => (
                  <li
                    key={order.id}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between"
                  >
                    <span>{order.name}</span>
                    <span className="text-xs text-gray-500">{order.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Last Cart */}
            <div className="w-full mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                🛒 ตะกร้าล่าสุด
              </h3>
              <ul className="space-y-2">
                {mockCart.map(item => (
                  <li
                    key={item.id}
                    className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span className="font-semibold">x{item.qty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ปุ่ม Logout */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
            >
              {loading ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
