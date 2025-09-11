import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  basePath: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
});
