import ShopPaymentForm from "@/pages/shop/[shopId]/ShopPaymentForm";
import { Route } from "react-router-dom";
import ProtectedRoute from "../middleware";
import Dashboard from "../pages/Dashboard";
import ShopLayout from "../pages/shop/[shopId]/ShopLayout";
import CreateNewShop from "../pages/shop/CreateShop";
import PublicMenu from "../pages/shop/PublicMenu";

export const ShopRoute = (
  <Route path="shops">
    {" "}
    <Route element={<ProtectedRoute />}>
      <Route path="create" element={<CreateNewShop />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path=":shopId" element={<ShopLayout />} />
      <Route path=":shopId/payment" element={<ShopPaymentForm />} />
    </Route>
  </Route>
);
export const MenuRoute = (
  <>
    <Route path="/menu/:shopId" element={<PublicMenu />} />
  </>
);
