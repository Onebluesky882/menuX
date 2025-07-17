import { axiosInstance } from ".";

export const ordersApi = {
  create: (payload: any) => axiosInstance.post("/orders", payload),
  getOrderById: (orderId: string) =>
    axiosInstance.get(`order-items/${orderId}`),
};
