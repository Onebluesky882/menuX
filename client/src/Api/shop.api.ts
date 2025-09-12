import type { ReceiveBank } from "@/type/qrcode.type";
import axiosInstance from ".";
export const shopAPI = {
  create: (data: any) => axiosInstance.post("api/shops", data),
  getAll: () => axiosInstance.get("api/shops"),
  getById: (id: string) => axiosInstance.get(`api/shops/${id}`),
  update: (id: string, data: any) => axiosInstance.put(`api/shops/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`api/shops/${id}`),
  getOwnerShop: () => axiosInstance.get("api/shops/getOwnerShop"),
  patchShopReceiveBank: (shopId: string, data: ReceiveBank) =>
    axiosInstance.patch(`api/shops/${shopId}`, data),
};
