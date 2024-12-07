"use client";
import { useEffect, useState } from "react";
import OrderList, { Order } from "@/components/OrderList";
import { useAuth } from "@/hooks/useAuth";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accessToken, loading: authLoading } = useAuth(true);
  useEffect(() => {
    if (authLoading) {
      return;
    }
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Get from auth context
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data: Order[] = await res.json();
        setOrders(
          data.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
        setOrders(data);
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [authLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return orders ? (
    <>
      <OrderList orders={orders} />
    </>
  ) : (
    <div>No orders found</div>
  );
}
