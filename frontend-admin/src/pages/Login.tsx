import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { email, password }
      );

      if (res.data.role !== "admin") {
        throw new Error("You are not authorized to access the admin panel");
      }

      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container container">
      <form onSubmit={handleSubmit} className="admin-login-card">
        <h2>Admin Login</h2>
        <p className="admin-warning">Restricted access</p>

        {error && <div className="error-box">{error}</div>}

        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
