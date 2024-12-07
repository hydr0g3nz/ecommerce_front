import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Timer, Hourglass, Check, X, Loader2 , AlertCircle } from "lucide-react";
import type { Order } from "./OrderList";
import { ProductCache } from "@/types/product";
import Image from "next/image";
interface OrderDetailsProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

const statusIcons = {
  "pre-order": Timer,
  "in-transit": Hourglass,
  confirmed: Check,
  cancelled: X,
  processing: Loader2,
  pending: AlertCircle,
};

const statusColors = {
  "pre-order": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "in-transit":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  confirmed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  processing: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  pending: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
};

export default function OrderDetails({
  order,
  open,
  onClose,
}: OrderDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductCache[] | null>(null);
  useEffect(() => {
    fetchProducts();
  }, []);
  if (!order) return null;
  const StatusIcon = statusIcons[order.status];
  const getImageUrlFromProduct = (id: string) => {
    const product = products?.find((p) => p.id === id);
    if (product) {
      return (
        <div className="w-20 h-20">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${product.image1}`}
            alt=""
            width={0}
            height={0}
            sizes="100%"
            className="rounded-md"
            quality={100}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      );
    }
    return null;
  };
  const fetchProducts = async () => {
    try {
      // Build the URL with category filter if present
      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {loading ? (
        <DialogContent>
          <Loader2 className="animate-spin" />
        </DialogContent>
      ) : (
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details #{order.id}</DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Order Status
                </h3>
                <Badge
                  variant="secondary"
                  className={`mt-1 ${statusColors[order.status]}`}
                >
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {order.status}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Order Date
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Shipping Address
              </h3>
              <div className="mt-1 text-sm text-gray-900">
                <p>{order.shipping_address.street}</p>
                <p>
                  {order.shipping_address.city}, {order.shipping_address.state}{" "}
                  {order.shipping_address.zip}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Order Items</h3>
              <div className="mt-1 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <div key={item.sku} className="flex justify-between py-4">
                    {getImageUrlFromProduct(item.product_id)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        SKU: {item.sku}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ฿{item.price.toLocaleString()}
                      </p>
                      {item.sale > 0 && (
                        <p className="text-sm text-green-600">
                          -฿{item.sale.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <h3 className="text-base font-medium text-gray-900">Total</h3>
                <p className="text-base font-medium text-gray-900">
                  ฿{order.total_price.toLocaleString()}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Paid via {order.payment_method}
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {order.status !== "confirmed" && order.status !== "cancelled" && (
                <Button variant="destructive">Cancel Order</Button>
              )}
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
