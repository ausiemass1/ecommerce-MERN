import { useEffect, useState } from "react";
import M from "materialize-css";
import OrdersTable from "../components/OrdersTable";
import type { Order } from "../types/OrderTypes";
import { fetchOrders } from "../utils/orders.api";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    orderId: "",
    email: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const limit = 10;

  const { orderId, email, status, startDate, endDate } = filters;

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetchOrders({
          page,
          limit,
          orderId,
          email,
          status,
          startDate,
          endDate,
        });

        setOrders(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (error) {
        console.error("Failed to load orders:", error);
        setOrders([]);
      }
    };

    loadOrders();
  }, [page, limit, orderId, email, status, startDate, endDate]);

  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className="">
      <div className="row">
        <div className="col s12 m3">
          <br />
          <br />
          <br />
          <input
            type="text"
            placeholder="Order ID"
            value={filters.orderId}
            onChange={(e) =>
              setFilters({ ...filters, orderId: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Customer Email"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
          </select>

          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />

          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
        </div>
        <div className="col s12 m9">
          <h4 className="mb-3">Orders</h4>

          <div className="card">
            <div className="card-content">
              <OrdersTable orders={orders} />
            </div>

            {/* PAGINATION */}
            <div className="card-action center-align">
              <ul className="pagination">
                <li className={page === 1 ? "disabled" : "waves-effect"}>
                  <button
                    className="btn-flat"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  >
                    ← Prev
                  </button>
                </li>

                <li className="active">
                  <span className="btn-flat">
                    Page {page} of {totalPages}
                  </span>
                </li>

                <li
                  className={page === totalPages ? "disabled" : "waves-effect"}
                >
                  <button
                    className="btn-flat"
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  >
                    Next →
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
