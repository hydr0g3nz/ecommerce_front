import { useState } from "react";
import { AlertCircle, Check, Hourglass, Timer, X, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderDetail from "@/components/OrderDetails";
interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
  if (!order) {
    return null;
  }
  return <OrderDetail order={order} open={true} onClose={onClose} />;
};
export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface OrderItem {
  product_id: string;
  sku: string;
  quantity: number;
  price: number;
  sale: number;
}

export interface Order {
  id: string;
  user_id: string;
  date: string;
  status: "pre-order" | "in-transit" | "confirmed" | "cancelled" | "processing" | "pending";
  shipping_address: ShippingAddress;
  items: OrderItem[];
  total_price: number;
  payment_method: string;
}

interface OrderListProps {
  orders: Order[];
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
  "pending": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  processing: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

export default function OrderList({ orders }: OrderListProps) {
  const [filter, setFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("this-week");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleOrderClick = (order: Order) => {
    setIsOpen(true);
    setSelectedOrder(order);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };
  const filteredOrders = orders.filter(
    (order) => filter === "all" || order.status === filter
  );

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                My orders
              </h2>

              <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:space-y-0">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="min-w-[8rem]">
                    <SelectValue placeholder="All orders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All orders</SelectItem>
                    <SelectItem value="pre-order">Pre-order</SelectItem>
                    <SelectItem value="in-transit">In transit</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>

                <span className="inline-block text-gray-500 dark:text-gray-400">
                  from
                </span>

                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">this week</SelectItem>
                    <SelectItem value="this-month">this month</SelectItem>
                    <SelectItem value="last-3-months">last 3 months</SelectItem>
                    <SelectItem value="last-6-months">last 6 months</SelectItem>
                    <SelectItem value="this-year">this year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status];
                  return (
                    <div
                      key={order.id}
                      className="flex flex-wrap items-center gap-y-4 py-6"
                    >
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Order ID:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          <a href="#" className="hover:underline">
                            #{order.id}
                          </a>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Date:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {new Date(order.date).toLocaleDateString()}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Total Price:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          ฿{order.total_price.toLocaleString()}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        <dd className="mt-1.5">
                          <Badge
                            variant="secondary"
                            className={statusColors[order.status]}
                          >
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {order.status}
                          </Badge>
                        </dd>
                      </dl>

                      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                        {order.status !== "confirmed" &&
                          order.status !== "cancelled" && (
                            <Button variant="destructive" size="sm">
                              Cancel order
                            </Button>
                          )}
                        {(order.status === "confirmed" ||
                          order.status === "cancelled") && (
                          <Button size="sm">Order again</Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOrderClick(order)}
                        >
                          View details
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <OrderDetailModal order={selectedOrder} onClose={handleClose} />
    </>
  );
}
