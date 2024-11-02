"use client";

import { addItem, CartItem } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import { Variation } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
const Add = ({ variant }: { variant: Variation }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  var dispatch = useAppDispatch();
  var cartItems = useAppSelector((state) => state.cart.lineItems);
  const { toast } = useToast();
  if (!variant) {
    return <></>;
  }
  // // TEMPORARY
  // const stock = 4;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < variant.stock) {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleAddItem = (id: string, quantity: number) => {
    const newItem: CartItem = {
      _id: id,
      name: "Item Name",
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",
      quantity,
    };
    console.log(newItem);
    dispatch(addItem(newItem));
    toast({
      title: "Item added to cart",
      description: "We've added the item to your cart.",
      variant: "success",
    });
  };
  const addItems = () => {
    // mock interval 500ms to show loading
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-bold text-lg">เลือก จำนวน</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === variant.stock}
            >
              +
            </button>
          </div>
          {variant.stock < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only{" "}
              <span className="text-orange-500">{variant.stock} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
        <button
          onClick={() => handleAddItem("1", 1)}
          disabled={isLoading}
          className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-4 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-green-200 disabled:ring-0 disabled:text-white disabled:ring-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
