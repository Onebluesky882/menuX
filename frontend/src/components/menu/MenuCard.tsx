import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

export type ItemCardProps = {
  id: string;
  name: string;
  price: number;
  amount: number;
  available: boolean;
  image: string[];
  prepTime?: string;
};

export type ItemCardComponentProps = {
  item: ItemCardProps;
  onAmountChange?: (itemId: string, amount: number) => void;
};

export default function ItemCard({
  item,
  onAmountChange,
}: ItemCardComponentProps) {
  const { id, name, price, amount, available, image, prepTime } = item;
  const isSoldOut = !available;

  const handleIncrement = () => {
    onAmountChange?.(id, amount + 1);
  };

  const handleDecrement = () => {
    if (amount > 0) {
      onAmountChange?.(id, amount - 1);
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
      className="w-full"
    >
      <Card
        className={clsx(
          "group relative rounded-3xl overflow-hidden transition-all duration-300",
          "bg-gradient-to-br from-white to-gray-50/50",
          "border-0 shadow-lg hover:shadow-2xl hover:shadow-gray-200/40",
          "backdrop-blur-sm",
          isSoldOut && "opacity-60 grayscale"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-gray-100/30 pointer-events-none" />

        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={image[0]}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                สินค้าหมด
              </span>
            </div>
          )}
        </div>

        <CardContent className="relative p-4 md:p-6 space-y-4">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg md:text-xl text-gray-900 line-clamp-1 tracking-tight">
              {name}
            </h3>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ฿{Number(price) * amount}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 bg-gray-50/80 backdrop-blur-sm rounded-full p-2 border border-gray-200/50">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDecrement}
                disabled={amount === 0 || isSoldOut}
                className={clsx(
                  "w-10 h-10 rounded-full transition-all duration-200",
                  "hover:bg-red-50 hover:text-red-600 hover:scale-105",
                  "active:scale-95",
                  "disabled:opacity-40 disabled:hover:scale-100"
                )}
              >
                <Minus size={18} strokeWidth={2.5} />
              </Button>

              <div className="min-w-[3rem] text-center">
                <span className="text-lg md:text-xl font-semibold text-gray-900 tabular-nums">
                  {amount}
                </span>
              </div>

              <Button
                size="icon"
                onClick={handleIncrement}
                disabled={isSoldOut}
                className={clsx(
                  "w-10 h-10 rounded-full transition-all duration-200",
                  "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
                  "text-white shadow-lg hover:shadow-xl hover:shadow-green-200/50",
                  "hover:scale-105 active:scale-95",
                  "disabled:opacity-40 disabled:hover:scale-100"
                )}
              >
                <Plus size={18} strokeWidth={2.5} />
              </Button>
            </div>
          </div>

          {prepTime && (
            <div className="flex items-center justify-center pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                <span className="text-blue-600">⏱️</span>
                <span className="text-xs md:text-sm font-medium text-blue-700">
                  {prepTime}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
