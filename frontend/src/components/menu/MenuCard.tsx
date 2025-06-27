import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Flame, Star } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useEffect, useState } from "react";
import type { Menu } from "frontend/types/menu.types";

// ---------------------------------------------
// Type declarations
// ---------------------------------------------
export type ItemCardProps = {
  id: string;
  available: boolean;
  name: string;
  price: string;
  image: string[];
  amount: number;
  description?: string;
  category?: string;
  rating?: number; // 0 – 5
  prepTime?: string;
  isSpicy?: boolean;
  isPopular?: boolean;
  discount?: number; // percentage, e.g. 15 means 15% off
};

export type ItemCardComponentProps = {
  item: ItemCardProps;
  onAmountChange?: (itemId: string, amount: number) => void;
};

export default function ItemCard({
  item,
  onAmountChange,
}: ItemCardComponentProps) {
  const {
    id,
    available,
    name,
    price,
    image,
    amount: propAmount,
    prepTime,
  } = item;

  // send to db with status pending

  const [amount, setAmount] = useState(propAmount);

  useEffect(() => {
    setAmount(propAmount);
  }, [propAmount]);

  const update = (newAmount: number) => {
    if (newAmount < 0) return;
    setAmount(newAmount);
    onAmountChange?.(id, newAmount);

    console.log("🧾 Updating amount", {
      itemId: id,
      from: amount,
      to: newAmount,
    });
  };

  const handleIncrement = () => update(amount + 1);
  const handleDecrement = () => update(amount - 1);

  const isSoldOut = !available;

  return (
    <motion.div whileTap={{ scale: 0.97 }} className="w-full">
      <Card
        className={clsx(
          "rounded-2xl shadow-md overflow-hidden transition-colors",
          isSoldOut && "opacity-50 grayscale"
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full">
          <img
            src={image[0]}
            alt={name}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content */}
        <CardContent className="flex flex-col gap-2 p-2 md:p-4 ">
          <div className="flex flex-col  items-center gap-1   justify-center text-center">
            <h3 className="font-semibold text-base md:text-lg line-clamp-1 flex-1">
              {name}
            </h3>
            <p>ราคา {price}</p>
          </div>

          {/* Price & controls */}
          <div className="mt-auto flex items-center justify-center ">
            {/* Amount controls */}
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="outline"
                onClick={handleDecrement}
                disabled={amount === 0 || isSoldOut}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full"
              >
                <Minus size={16} />
              </Button>
              <span className="w-6 text-center text-sm md:text-base select-none">
                {amount}
              </span>
              <Button
                size="icon"
                onClick={handleIncrement}
                disabled={isSoldOut}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Prep time */}
          {prepTime && (
            <span className="text-[10px] md:text-xs text-gray-500 mt-1">
              ⏱️ {prepTime}
            </span>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
