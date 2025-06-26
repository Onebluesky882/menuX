import { Link, Outlet } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import useShop from "@/hooks/useShop";
import MenuManagement from "./menu/MenuManagement";
import { menuApi } from "@/Api/menu.api";

type MenuProps = {
  available: boolean;
  name: string;
  price: string;
  image: string[];
  amount: number;
};
// get image url belong with menu Id

const ShopLayout = () => {
  const { selectedShop } = useShop();

  const shopName = selectedShop?.name;

  const [menus, setMenus] = useState([]);
  // useEffect(() => {
  //   const getShopMenu = async () => {
  //     const res = await menuApi.getAll(selectedShop?.id!);
  //     console.log(res.data);
  //     const items = res.data;
  //     setMenus(items);
  //   };
  //   getShopMenu();
  // }, []);

  console.log("shopName :", shopName);

  return (
    <div>
      <Outlet />
      <div>
        <div>
          <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-10 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-md md:text-2xl font-bold text-primary  text-center">
                {selectedShop ? `Shop : ${shopName}` : "need login!"}
              </h2>

              <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
                <Tabs defaultValue="menu" className="w-full">
                  {/*    // menu Tab */}
                  <ShopTitle />
                  <AddMenu />
                  <Menus
                    available={false}
                    name={""}
                    price={""}
                    image={[]}
                    amount={0}
                    shopId={selectedShop?.id!}
                  />
                  <Promotions />
                  <Orders />
                </Tabs>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
const ShopTitle = () => {
  return (
    <TabsList className="flex flex-wrap justify-center gap-3 mb-6">
      <TabsTrigger
        value="menu"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        🍽 Add Menu
      </TabsTrigger>
      <TabsTrigger
        value="shop-menu"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        ShopMenu
      </TabsTrigger>
      <TabsTrigger
        value="promotions"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        🧾 promotions
      </TabsTrigger>
      <TabsTrigger
        value="orders"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        🧾 Orders
      </TabsTrigger>
      <TabsTrigger
        value="staff"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        👥 Staff
      </TabsTrigger>
      <TabsTrigger
        value="settings"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        ⚙️ Settings
      </TabsTrigger>
    </TabsList>
  );
};

const AddMenu = () => {
  return (
    <TabsContent value="menu">
      <MenuManagement />
    </TabsContent>
  );
};

const Menus = ({
  image,
  name,
  price,
  shopId,
}: MenuProps & { shopId: string }) => {
  return (
    <TabsContent value="shop-menu">
      <Link to={`/menu/${shopId}`}>
        <u>live </u>
      </Link>
      <p>{}</p>
    </TabsContent>
  );
};
const Promotions = () => {
  return (
    <TabsContent value="promotions">
      <p className="text-gray-700">promotions</p>
    </TabsContent>
  );
};
const Orders = () => {
  return (
    <TabsContent value="orders">
      <p className="text-gray-700">📦 Order management is coming soon.</p>
    </TabsContent>
  );
};

export default ShopLayout;
