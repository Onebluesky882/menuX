// orders/

import api from ".";

export const orderApi = {
  create: (data: any) => api.post("/orders", data),
  getOrderPending: (data: any) => api.get("/orders/status?=pending"),
};
