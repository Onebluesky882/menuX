import { axiosInstance } from ".";

export const shopApi = {
  getAllShop: () => axiosInstance.get("/shops/consumer"),
  getMenuByShopId: (shopId: string) =>
    axiosInstance.get(`/menus`, { params: { shopId } }),
  getMenuWithOption: (shopId: string) =>
    axiosInstance.get(`menus/options/${shopId}`),
};
