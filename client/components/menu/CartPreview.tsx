import { CartItem, OrderPayload } from "@/app/types/menuOrder.type";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { FaCartShopping } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { Button } from "../ui/button";

type CartIconPreviewProps = {
  getTotalOrderItems: () => number;
  setPreviewCart: () => void;
};

type CartPreviewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  totalOrdersPrice: () => number;
  handleStoreOrders: (orders: OrderPayload) => void;
  shopId: string;
};

export const CartPreview = ({
  cart,
  open,
  onOpenChange,
  totalOrdersPrice,
  handleStoreOrders,
  shopId,
}: CartPreviewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-50 fixed bottom-0 left-0 right-0 max-h-[70vh] w-full rounded-t-2xl bg-white p-6 shadow-xl border-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <DialogTitle className="text-xl font-bold text-gray-800">
            🛒 ตะกร้าสินค้า
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <IoCloseCircle size={36} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 overflow-y-auto max-h-[40vh] pr-2">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">ไม่มีสินค้าในตะกร้า</p>
          ) : (
            cart.map((menu, index) => (
              <div
                key={index}
                className="bg-gray-50 border rounded-xl p-4 shadow-sm"
              >
                <div className="text-base font-medium text-gray-700">
                  {index + 1}. {menu.menuName}
                </div>
                <div className="text-sm text-gray-600">
                  {menu.selectedOption.label} x {menu.quantity}
                </div>
                <div className="text-sm text-green-600 font-semibold">
                  {menu.totalPrice.toLocaleString()} บาท
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary & Action */}
        <div className="flex justify-between items-center mt-6 text-lg font-semibold">
          <span className="text-gray-700">รวมทั้งหมด:</span>
          <span className="text-green-600">
            {totalOrdersPrice().toLocaleString()} บาท
          </span>
        </div>

        <Button
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white text-lg py-5 rounded-xl transition-all"
          disabled={cart.length === 0}
          onClick={() => {
            const payload = {
              shopId: shopId,
              items: cart.map((menu) => ({
                menuId: menu.menuId,
                quantity: menu.quantity,
                priceEach: menu.basePrice,
                totalPrice: menu.totalPrice,
              })),
            };
            handleStoreOrders(payload);
          }}
        >
          ดำเนินการสั่งซื้อ
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export const CartIconPreview = ({
  getTotalOrderItems,
  setPreviewCart,
}: CartIconPreviewProps) => {
  return (
    <div className="relative flex justify-end p-2  ">
      <div
        onClick={() => setPreviewCart()}
        className="   bg-amber-200   flex justify-center flex-col px-10 py-6 rounded-full "
      >
        <span className="font-extrabold text-2xl  text-center ">
          {getTotalOrderItems()}
        </span>
        <FaCartShopping size={32} />
      </div>
    </div>
  );
};
