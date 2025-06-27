export type Order = {
  available: boolean;
  name: string;
  price: string;
  image: string[];
  amount: number;
  description?: string;
  category?: string;
  rating?: number;
  prepTime?: string;
  isSpicy?: boolean;
  isPopular?: boolean;
  discount?: number;
};

type KitchenOrderPanelProps = {
  order: Order;
};

const KitchenOrderPanel = ({ order }: KitchenOrderPanelProps) => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white border rounded-xl shadow-md p-4 flex gap-4">
        <img
          src={order.image[0]}
          alt={order.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-between w-full">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold">{order.name}</h3>
              <span className="text-sm text-gray-500">×{order.amount}</span>
            </div>
            {order.category && (
              <div className="text-xs text-gray-400 mt-1">
                หมวด: {order.category}
              </div>
            )}
            {order.description && (
              <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                {order.description}
              </p>
            )}
          </div>

          <div className="flex justify-between items-end mt-3">
            <span className="text-orange-600 font-semibold">
              ฿{parseInt(order.price) * order.amount}
            </span>
            <button className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition">
              เริ่มทำ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenOrderPanel;
