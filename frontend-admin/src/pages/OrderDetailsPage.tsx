import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import M from "materialize-css";
import { fetchOrderById } from "../utils/orders.api";
import type { Order } from "../types/OrderTypes";

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) fetchOrderById(id).then(setOrder);
  }, [id]);

  useEffect(() => {
    M.AutoInit();
  }, []);

  if (!order) return null;

  return (
    <div className="container">
      <h4>Order #{order._id}</h4>

      <div className="row">
        <div className="col s12 m8">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Items</span>

              <ul className="collection">
                {order.items.map((item, index) => (
                  <li className="collection-item" key={index}>
                    {item.name} × {item.quantity}
                    <span className="secondary-content">
                      {/* TO DO  this should be the unit price , it needs to be fixed*/}
                      ${(order.amount_total / 100).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Summary</span>

              <p><strong>Name:</strong> {order.customerName}</p>
              <p><strong>Email:</strong> {order.customerEmail}</p>
              <p><strong>Status:</strong> {order.payment_status}</p>
              <p>
                <strong>Total:</strong>{" "}
                ${(order.amount_total / 100).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
