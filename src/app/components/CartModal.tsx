"use client";

import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeItem } from "../features/cart/cartSlice";
import { useEffect } from "react";
import { RootState } from "../../store/cartStore";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { Separator } from "@/components/ui/separator";

interface ChildComponentProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal: React.FC<ChildComponentProps> = ({ isOpen, setIsOpen }) => {
  const t = new Date();
  console.log(t);
  useEffect(() => {
    console.log("CartModal re-rendered due to state or props change");
  });
  const cart = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="w-max">
      <Popover open={isOpen}>
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent
          onInteractOutside={() => setIsOpen(false)}
          align="end"
          sideOffset={20}
        >
          <div className="">
            {!cart.lineItems.length ? (
              <>
                <div className="">Cart is Empty</div>
              </>
            ) : (
              <>
                <h2 className="text-xl">Shopping Cart</h2>
                <div className="flex flex-col gap-8 my-2">
                  {cart.lineItems.map((item) => (
                    <>
                      <div className="flex gap-4" key={item._id}>
                        {item.image && (
                          <Image
                            src={item.image}
                            alt=""
                            width={72}
                            height={96}
                            className="object-cover rounded-md"
                          />
                        )}
                        <div className="flex flex-col justify-between w-full">
                          <div className="">
                            <div className="flex items-center justify-between gap-8">
                              <h3 className="font-semibold">{item.name}</h3>
                              <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                                {item.quantity > 1 && (
                                  <div className="text-xs text-green-500">
                                    {item.quantity} x{" "}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              available
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                              Qty {item.quantity}
                            </span>
                            <span
                              className="text-blue-500"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleRemove(item._id)}
                            >
                              Remove
                            </span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                    </>
                  ))}
                </div>
                <div className="my-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="">Total</span>
                    <span className="">5</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2 mb-4">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="flex justify-between text-sm">
                    <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                      View Cart
                    </button>
                    <button className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75">
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CartModal;
