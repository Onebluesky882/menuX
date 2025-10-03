"use client";

import { useUserStore } from "../../hooks/useUser";
import UserCard from "./UserCard";

export const HeadCard = () => {
  const user = useUserStore(state => state.user);

  return (
    <div className="   ">
      <UserCard user={user} />
    </div>
  );
};
