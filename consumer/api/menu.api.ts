import { axiosInstance } from ".";

export const menuApi = {
  getMenuByShopId: (shopId: string) =>
    axiosInstance.get(`api/menus/${shopId}`, { params: { shopId } }),
  getAllMenu: (shopId: string) => axiosInstance.get(`api/menus/${shopId}`),
};
