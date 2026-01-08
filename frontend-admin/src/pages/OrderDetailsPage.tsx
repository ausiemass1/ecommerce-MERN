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
        {/* ================= ITEMS ================= */}
        <div className="col s12 m8">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Items</span>

              <ul className="collection">
                {order.items.map((item, index) => (
                
                  <li
                    className="collection-item" key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span className="teal-text">
                      ${(item.unit_price / 100).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= SUMMARY + SHIPPING ================= */}
        <div className="col s12 m4">
          {/* -------- ORDER SUMMARY -------- */}
          <div className="card">
            <div className="card-content">
              <span className="card-title">Order Summary</span>

              <p>
                <strong>Name:</strong> {order.customerName}
              </p>
              <p>
                <strong>Email:</strong> {order.customerEmail}
              </p>
              <p>
                <strong>Status:</strong> {order.payment_status}
              </p>
              <p>
                <strong>Total:</strong> ${(order.amount_total / 100).toFixed(2)}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* -------- SHIPPING ADDRESS -------- */}
          {order.shipping?.address && (
            <div className="card">
              <div className="card-content">
                <span className="card-title">Shipping Address</span>

                {order.shipping.name && (
                  <p>
                    <strong>{order.shipping.name}</strong>
                  </p>
                )}

                <p>{order.shipping.address.line1}</p>

                {order.shipping.address.line2 && (
                  <p>{order.shipping.address.line2}</p>
                )}

                <p>
                  {order.shipping.address.city}, {order.shipping.address.state}{" "}
                  {order.shipping.address.postal_code}
                </p>

                <p>{order.shipping.address.country}</p>

                {order.shipping.phone && (
                  <p>
                    <strong>Phone:</strong> {order.shipping.phone}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
