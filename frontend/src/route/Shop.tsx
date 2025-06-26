import { Route } from "react-router-dom";
import TableLayout from "../pages/shop/TableLayout";
import DashBoard from "../pages/shop/[shopId]/dashboard/DashBoard";
import OrderStatus from "../pages/shop/[shopId]/orders/OrderStatus";
import StaffManagement from "../pages/shop/[shopId]/staff/StaffManagement";
import Cctv from "../pages/shop/[shopId]/cctv/Cctv";
import CreateCategory from "@/pages/shop/[shopId]/CreateCategory";
import CreateNewShop from "@/pages/shop/CreateShop";
import Dashboard from "@/pages/Dashboard";
import ShopLayout from "@/pages/shop/[shopId]/ShopLayout";
import PublicMenu from "@/pages/shop/PublicMenu";

export const ShopRoute = (
  <>
    <Route path="shops">
      <Route path="create" element={<CreateNewShop />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="add-category" element={<CreateCategory />} />
      <Route path=":shopId" element={<ShopLayout />}>
        <Route path="tables" element={<TableLayout />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="orders" element={<OrderStatus />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="cctv" element={<Cctv />} />
      </Route>
    </Route>
  </>
);
export const MenuRoute = (
  <>
    <Route path="/menu/:shopId" element={<PublicMenu />} />

    <Route path="order" element={<CreateNewShop />} />
  </>
);
