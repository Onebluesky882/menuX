import { axiosInstance } from ".";

export const shopApi = {
  getShopBtId: (id: string) => axiosInstance.get(`api/shops/${id}`),
};
