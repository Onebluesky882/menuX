import axiosInstance from ".";

export const uploadImageApi = {
  create: (data: any) => axiosInstance.post(`api/r2`, data),
  getAll: (shopId: string) => axiosInstance.get(`api/r2/?shopId=${shopId}`),
  getById: (id: string) => axiosInstance.get(`api/r2/${id}`),
  update: (id: string, data: any) => axiosInstance.put(`api/r2/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`api/r2/${id}`),
};
