import { Link } from "react-router-dom";
import type { Order } from "../types/OrderTypes";

interface Props {
  orders: Order[];
}

const OrdersTable: React.FC<Props> = ({ orders }) => {
  return (
    <table className="highlight responsive-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Email</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {orders.map(order => (
          <tr key={order._id}>
            <td>{order._id.slice(-6)}</td>
            <td>{order.customerName}</td>
            <td>{order.customerEmail}</td>
            <td>${(order.amount_total / 100).toFixed(2)}</td>
            <td>
              <span
                className={`new badge ${
                  order.payment_status === "paid"
                    ? "green"
                    : "orange"
                }`}
              >
                {order.payment_status}
              </span>
            </td>
            <td>
              {new Date(order.createdAt).toLocaleDateString()}
            </td>
            <td>
              <Link
                to={`/admin/orders/${order._id}`}
                className="btn-small blue"
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
