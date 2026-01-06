import { useEffect, useState } from "react";
import M from "materialize-css";
import OrdersTable from "../components/OrdersTable";
import type { Order } from "../types/OrderTypes";
import { fetchOrders } from "../utils/orders.api";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className="container">
      <h4 className="mb-3">Orders</h4>

      <div className="card">
        <div className="card-content">
          <OrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
