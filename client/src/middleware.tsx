import { Navigate, Outlet } from "react-router-dom";
import { authClient } from "./lib/auth-client";

const ProtectedRoute = () => {
  const { data: session } = authClient.useSession();

  if (!session) {
    return <Navigate to="/" replace />; // redirect if not logged in
  }

  return <Outlet />;
};
export default ProtectedRoute;
