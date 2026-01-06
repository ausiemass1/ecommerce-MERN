import { useEffect, useState } from "react";
import M from "materialize-css";
import OrdersTable from "../components/OrdersTable";
import type { Order } from "../types/OrderTypes";
import axios from "axios";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async (): Promise<void> => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`
      );

      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        console.error("Unexpected orders response:", res.data);
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders(); 
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
