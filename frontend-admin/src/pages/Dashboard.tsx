// pages/Dashboard.tsx
import AdminSidebar from "../components/AdminSidebar";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  return (
    <div className="row admin-dashboard">
      
      {/* LEFT SIDEBAR */}
      <div className="col s12 m3 l2">
        <AdminSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="col s12 m9 l10">
        
        {/* STATS */}
        <div className="row">
          <div className="col s12 m4">
            <StatsCard title="Total Orders" value={124} />
          </div>
          <div className="col s12 m4">
            <StatsCard title="Products" value={58} />
          </div>
          <div className="col s12 m4">
            <StatsCard title="Revenue" value="$12,450" />
          </div>
        </div>

        {/* TABLE */}
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
                <tr>
                  <td>#1234</td>
                  <td>john@email.com</td>
                  <td>Paid</td>
                  <td>$120</td>
                </tr>
                <tr>
                  <td>#1235</td>
                  <td>admin@email.com</td>
                  <td>Pending</td>
                  <td>$75</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
