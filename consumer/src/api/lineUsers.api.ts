import { axiosInstance } from ".";

export const api = {
  getLineUserById: async (id: string) => {
    return await axiosInstance.get(`/auth/${id}`);
  },
  createLineUser: async (user: {
    userId: string;
    displayName: string;
    pictureUrl: string;
  }) => {
    return await axiosInstance.post("api/", user);
  },
};
