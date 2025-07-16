import { axiosInstance } from ".";

export const ordersApi = {
  create: (payload: any) => axiosInstance.post("/orders", payload),
};
