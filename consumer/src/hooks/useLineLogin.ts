"use client";
import liff from "@line/liff";
import { useEffect } from "react";
import { useUserStore } from "./useUser";
export const useLineLogin = () => {
  const { user, setUser, clearUserState } = useUserStore();
  const initLine = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_LIFF_ID) {
        throw new Error("NEXT_PUBLIC_LIFF_ID is not set");
      }

      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID });

      // ถ้ายังไม่ login → redirect ไป LINE Login
      if (liff.isLoggedIn()) {
        const fetchedProfile = await liff.getProfile();
        // ดึงข้อมูลโปรไฟล์
        setUser({
          id: fetchedProfile.userId,
          lineDisplayName: fetchedProfile.displayName,
          linePictureUrl: fetchedProfile.pictureUrl ?? "/avatar.png",
        });
      }
    } catch (err) {
      console.error("LINE LIFF login error:", err);
    }
  };

  const login = async () => {
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  };

  const logout = () => {
    liff.logout();
    clearUserState();
  };

  useEffect(() => {
    initLine();
  }, []);

  return { user, login, logout };
};
