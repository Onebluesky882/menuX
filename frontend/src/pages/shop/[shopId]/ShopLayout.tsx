import { Link, Outlet, useParams } from "react-router-dom";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import useShop from "@/hooks/useShop";
import MenuManagement from "./menu/MenuManagement";
import KitchenOrderPanel, {
  type Order,
} from "@/components/menu/KitchenOrderPanel";
import { ShopTabsLayout } from "@/components/shops/ShopTabLayout";
import { menuApi } from "@/Api/menu.api";
import { se } from "date-fns/locale";

type MenuProps = {
  available: boolean;
  name: string;
  price: string;
  image: string[];
  amount: number;
};

type OrdersProps = {
  mockOrders?: Order[];
};

type Shop = {
  name: string;
  id: string;
};
// get image url belong with menu Id

const ShopLayout = () => {
  const [menus, setMenus] = useState([]);

  const { selectedShop } = useShop();

  useEffect(() => {
    const getShopMenu = async () => {
      const res = await menuApi.getAll(selectedShop?.id!);
      console.log(res.data);
      const items = res.data;
      setMenus(items);
    };
    getShopMenu();
  }, []);

  const mockOrders = [
    {
      available: true,
      name: "กะเพราไก่ไข่ดาว",
      price: "45",
      image: ["https://example.com/img1.jpg"],
      amount: 2,
      category: "อาหารจานเดียว",
      description: "เผ็ดนิดๆ ใส่ใบกะเพราแท้",
      isSpicy: true,
      isPopular: true,
    },
    {
      available: true,
      name: "ต้มยำกุ้ง",
      price: "60",
      image: ["https://example.com/img2.jpg"],
      amount: 1,
      category: "ซุป",
      prepTime: "10 นาที",
    },
  ];

  return (
    <div>
      <Outlet />
      <div>
        <div>
          <div className="min-h-screen  py-10 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-md md:text-2xl font-bold text-primary  text-center">
                {selectedShop ? `Shop : ${selectedShop.name}` : "need login!"}
              </h2>

              <div className=" bg-amber-50  rounded-2xl shadow-lg p-6 animate-fade-in">
                <Tabs defaultValue="menu" className="   w-full">
                  {" "}
                  <ShopTabsLayout />
                  <AddMenu />
                  <Menus
                    available={false}
                    name={""}
                    price={""}
                    image={[]}
                    amount={0}
                    shopId={selectedShop?.id ?? ""}
                  />
                  <Orders mockOrders={mockOrders} />
                </Tabs>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

const AddMenu = () => {
  return (
    <TabsContent value="menu" className=" ">
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
        <u>live menu</u>
      </Link>
    </TabsContent>
  );
};

const Orders = ({ mockOrders }: OrdersProps) => {
  return (
    <TabsContent value="orders">
      {mockOrders &&
        mockOrders.map((item) => <KitchenOrderPanel order={item} />)}
    </TabsContent>
  );
};

export default ShopLayout;
