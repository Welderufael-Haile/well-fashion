"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders/user?userId=1")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">My Orders</h1>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border p-2">
              {order.name} - {order.quantity} pcs - ${order.total_price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
