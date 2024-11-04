"use client";

import { addItem, CartItem, updateQuantity } from "@/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
const Add = ({ cartItem }: { cartItem: CartItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  var dispatch = useDispatch();
  // var cartItems = useAppSelector((state) => state.cart.items);
  const { toast } = useToast();
  if (!cartItem) {
    return <></>;
  }
  // // TEMPORARY
  // const stock = 4;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < cartItem.variations.stock) {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleAddItem = () => {
    let item = {
      ...cartItem,
      quantity: quantity,
    };
    dispatch(addItem(item));
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
              disabled={quantity === cartItem.variations.stock || cartItem.variations.stock === 0}
            >
              +
            </button>
          </div>
          {cartItem.variations.stock < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only{" "}
              <span className="text-orange-500">
                {cartItem.variations.stock} items
              </span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
        <button
          onClick={() => handleAddItem()}
          disabled={isLoading || cartItem.variations.stock === 0}
          className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-4 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-green-200 disabled:ring-0 disabled:text-white disabled:ring-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
