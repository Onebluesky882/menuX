"use client";
import liff from "@line/liff";
import { useEffect, useState } from "react";

export const useLineLogin = () => {
  const [profile, setProfile] = useState<any>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(() => {
    const initLineLiff = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_LIFF_ID) {
          throw new Error("NEXT_PUBLIC_LIFF_ID is not set");
        }

        await liff.init({
          liffId: process.env.NEXT_PUBLIC_LIFF_ID,
        });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const fetchedProfile = await liff.getProfile();
        const token = await liff.getIDToken();

        setProfile(fetchedProfile);
        setIdToken(token);
      } catch (err) {
        console.error("LINE LIFF error:", err);
        throw err;
      }
    };

    initLineLiff();
  }, []);
  const logout = () => {
    liff.logout();
    setProfile(null);
    setIdToken(null);
  };

  return { profile, idToken, logout };
};
