"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useLineLogin } from "../hooks/useLineLogin";
const LineIntegrate = () => {
  const { profile, idToken, logout } = useLineLogin();
  if (!profile) {
    return <p className="text-white">กำลังโหลดข้อมูล หรือรอ login...</p>;
  }

  const logoutUser = () => {
    logout();
    redirect("/");
  };

  console.log("profle", profile);
  return (
    <div className="bg-blue-300 min-h-screen flex flex-col items-center justify-center p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Hello, {profile?.displayName}</h1>
      <p>uuid : {profile?.userId}</p>
      {profile?.pictureUrl && (
        <Image
          src={profile.pictureUrl}
          width={300}
          height={300}
          alt="user Picture"
          className="rounded-full shadow-lg"
        />
      )}
      <p>{idToken}</p>

      <Button variant="destructive" onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );
};

export default LineIntegrate;

// ref https://developers.line.biz/en/reference/messaging-api

// .....................
// client add channel
// user subscription channel
// frontend get data from Line  send data to backend to store user done !
// upload image r3
// shop create menu
// scan qr code to shop
