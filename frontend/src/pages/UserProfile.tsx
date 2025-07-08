import AccountSettingsCard from "@/components/profile/AccountSettingsCard";
import DangerZoneCard from "@/components/profile/DangerZoneCard";
import PreferencesCard from "@/components/profile/PreferencesCard";
import ProfileForm from "@/components/profile/ProfileForm";
import { useUserStore } from "@/stores/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const profile = useUserStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (profile === null) return navigate("/");
  }, [profile]);

  return (
    <div className="min-h-screen py-6 px-2 flex flex-col items-center bg-gradient-to-tr from-[#f1f0fb] via-white to-[#ede9fe] dark:bg-gradient-to-br dark:from-[#1A1F2C] dark:via-[#222236] dark:to-[#2D223F] transition-colors">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#6E59A5] dark:text-white text-center mb-2">
          Profile Settings
        </h1>
        {/* Personal Info Card */}
        <ProfileForm />
        {/* Divider */}
        <div className="h-0.5 bg-gradient-to-r from-[#9b87f5]/20 via-[#E5DEFF]/40 to-[#8E9196]/10 rounded my-2" />
        <AccountSettingsCard />
        <div className="h-0.5 bg-gradient-to-r from-[#E5DEFF]/20 via-[#9b87f5]/30 to-[#8E9196]/5 rounded my-2" />
        <PreferencesCard />
        <div className="h-0.5 bg-gradient-to-r from-[#E5DEFF]/20 via-[#d946ef]/20 to-[#F97316]/5 rounded my-2" />
        <DangerZoneCard />
      </div>
    </div>
  );
};
export default UserProfile;
