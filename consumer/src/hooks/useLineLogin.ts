"use client";
import liff from "@line/liff";
import { useEffect, useState } from "react";
import { LineUser } from "../types/lineUser";
import { useUserStore } from "./useUser";
export const useLineLogin = () => {
  const [profile, setProfile] = useState<LineUser | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  const { user, setUser, clearUserState } = useUserStore();
  const initLine = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_LIFF_ID) {
        throw new Error("NEXT_PUBLIC_LIFF_ID is not set");
      }

      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID });

      // ถ้ายังไม่ login → redirect ไป LINE Login
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      // ดึงข้อมูลโปรไฟล์
      const fetchedProfile = await liff.getProfile();
      const token = liff.getIDToken();

      setProfile(fetchedProfile as any);
      setIdToken(token);

      setUser({
        id: fetchedProfile.userId,
        lineDisplayName: fetchedProfile.displayName,
        linePictureUrl: fetchedProfile.pictureUrl ?? "/avatar.png",
      });
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
    setProfile(null);
    setIdToken(null);
    clearUserState();
  };

  useEffect(() => {
    initLine();
  }, []);

  return { user, idToken, login, logout };
};
