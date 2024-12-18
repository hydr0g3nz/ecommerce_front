"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeItem,
  selectCartItems,
  selectCartTotals,
  CartItem,
  clearCart,
} from "@/features/cart/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Variation } from "@/types/product";
import {
  useOrderProcessing,
  OrderRequest,
  OrderItem,
  Address,
} from "@/hooks/useOrder";
import { Item } from "@radix-ui/react-navigation-menu";
import { redirect, useRouter } from "next/navigation";
import OrderProcessingDialog from "@/components/OrderProcessingAlertDialog";
import { set } from "react-hook-form";
import { ProcessStatus } from "@/components/OrderProcessingAlertDialog";
import { useAuth } from "@/hooks/useAuth";
import { time } from "console";
export default function ShoppingCartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { price: totalPrice, discount: totalDiscount } =
    useSelector(selectCartTotals);
  const { submitOrder, isLoading } = useOrderProcessing();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [status, setStatus] = React.useState<ProcessStatus>("processing");
  const { role, loading } = useAuth(true);
  useEffect(() => {
    if (!role) router.push("/login?redirect=/cart");
  }, [role]);
  const handleQuantityChange = (
    productId: string,
    sku: string,
    newQuantity: number
  ) => {
    dispatch(
      updateQuantity({ product_id: productId, sku, quantity: newQuantity })
    );
  };
  const router = useRouter();
  const PriceDisplay = ({ variant }: { variant: Variation }) => {
    let salePercent = variant.sale;
    if (!salePercent) {
      salePercent = 0;
    }
    const isSale = salePercent != 0;
    const price = Math.floor(
      variant.price - variant.price * (salePercent / 100)
    );
    const percent = Math.floor(salePercent); // Since salePercent is already a percentage
    return !isSale ? (
      <h2 className="font-medium text-2xl">฿{Math.floor(variant.price)}</h2>
    ) : (
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold">฿{price}</h2>
        <h3 className="text-lg text-gray-500 line-through">
          ฿{Math.floor(variant.price)}
        </h3>
        <h3 className="text-lg text-green-800 font-bold">ส่วนลด {percent}%</h3>
      </div>
    );
  };
  const handleRemoveItem = (productId: string, sku: string) => {
    dispatch(removeItem({ product_id: productId, sku }));
  };
  const handleCheckout = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      router.push("/login");
      return;
    }

    const orderData: OrderRequest = {
      user_id: userId,
      shipping_address: {
        street: "xxxx",
        city: "xxxx",
        state: "xxx",
        zip: "xxxx",
      },
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        sku: item.variations.sku,
        quantity: item.quantity,
        price: item.variations.price,
        sale: item.variations.sale,
      })),
      payment_method: "cash",
      status: "created",
    };

    setOpen(true);
    setMsg("กำลังส่งออเดอร์ของคุณ");
    setStatus("processing");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const orderResponse = await submitOrder(orderData);

    if (orderResponse) {
      let timer = 3;
      setOpen(true);
      setMsg("ส่งออเดอร์สําเร็จ");
      setStatus("success");
      dispatch(clearCart());

      // Start countdown timer
      const countdownInterval = setInterval(() => {
        timer--;
        setMsg(`กำลังกลับไปหน้าหลัก ใน ${timer} วินาที`);

        if (timer <= 0) {
          clearInterval(countdownInterval);
          router.push("/products");
        }
      }, 1000);

      // Cleanup interval if component unmounts
      return () => clearInterval(countdownInterval);
    } else {
      setOpen(true);
      setStatus("error");
      setMsg("ส่งออเดอร์ไม่สําเร็จ");
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item: CartItem) => (
              <Card
                key={`${item.product_id}-${item.variations.sku}`}
                className="overflow-hidden"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${item.image}`}
                        alt={item.name}
                        width={0}
                        height={0}
                        sizes="100%"
                        style={{ width: "100%", height: "auto" }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          <p className="text-sm text-gray-500">
                            Size: {item.variations.size}, Color:{" "}
                            {item.variations.color}
                          </p>
                        </div>
                        {/* <p className="font-semibold">
                          ฿
                          {(
                            item.variations.price *
                            (1 - (item.variations.sale / 100 || 0))
                          ).toFixed(2)}
                        </p> */}
                        <PriceDisplay variant={item.variations} />
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleRemoveItem(
                                item.product_id,
                                item.variations.sku
                              )
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(
                                item.product_id,
                                item.variations.sku,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.product_id,
                                item.variations.sku,
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-16 h-8 text-center"
                            min={1}
                            max={item.variations.stock}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(
                                item.product_id,
                                item.variations.sku,
                                item.quantity + 1
                              )
                            }
                            disabled={item.quantity >= item.variations.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Original Price</span>
                  <span>฿{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Savings</span>
                  <span>-฿{totalDiscount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>฿{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <Link href="/products">
                    <Button variant="link" className="text-blue-600">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Voucher Input */}
                <div className="pt-4 border-t">
                  <p className="text-sm mb-2">
                    Do you have a voucher or gift card?
                  </p>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="flex-1" />
                    <Button variant="outline">Apply Code</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <OrderProcessingDialog
        isOpen={open}
        status={status}
        title="Processing Order"
        message={msg}
        onOpenChange={() => setOpen(false)}
      />
    </div>
  );
}
