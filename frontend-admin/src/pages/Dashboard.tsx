import { useEffect, useState } from "react";
//import AdminSidebar from "../components/AdminSidebar";
import StatsCard from "../components/StatsCard";
import { fetchOrders } from "../utils/orders.api";
import { fetchProducts } from "../utils/products.api";
import type { Order } from "../types/OrderTypes";

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch orders (latest 5)
        const ordersRes = await fetchOrders({
          page: 1,
          limit: 5,
        });

        // Fetch products (we only need total count)
        const productsRes = await fetchProducts({
          page: 1,
          limit: 1,
        });

        setTotalOrders(ordersRes.pagination.totalItems);
        setTotalProducts(productsRes.pagination.totalItems);
        setRecentOrders(ordersRes.data);

        // Calculate revenue
        const revenue = ordersRes.data.reduce(
          (sum, order) => sum + ((order.amount_total / 100 )|| 0),
          0
        );

        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <div className="center-align">Loading dashboard...</div>;
  }

  return (
    <div className="row admin-dashboard">
    
      {/* MAIN CONTENT */}
      <div className="col s12 m9 l10">
        {/* STATS */}
        <div className="row">
          <div className="col s12 m4">
            <StatsCard title="Total Orders" value={totalOrders} />
          </div>
          <div className="col s12 m4">
            <StatsCard title="Products" value={totalProducts} />
          </div>
          <div className="col s12 m4">
            <StatsCard
              title="Revenue"
              value={`$${totalRevenue.toFixed(2)}`}
            />
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="card">
          <div className="card-content">
            <span className="card-title">Recent Orders</span>

            <table className="highlight responsive-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.customerEmail || "N/A"}</td>
                    <td>{order.payment_status}</td>
                    <td>${(order.amount_total / 100).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
