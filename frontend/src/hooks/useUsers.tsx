import { userApi } from "@/Api/user.api";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

const useUsers = () => {
  const { setUser } = useUserStore.getState();
  const { fetchProfile } = useUserStore();

  const profile = useUserStore((state) => state.user);

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await userApi.login({ email, password });
    try {
      if (response.data.status === "success") {
        window.location.href = "/dashboard";
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logoutUser = async () => {
    await userApi.logout();
    localStorage.removeItem("auth_token");
    setUser(null);

    const channel = new BroadcastChannel("user-session");
    channel.postMessage({ type: "SET_USER", user: null });
  };
  return { logoutUser, profile, login };
};
export default useUsers;
