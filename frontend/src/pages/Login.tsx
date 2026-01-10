import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
          email,
          password,
        }
      );

    //   // localStorage.setItem("token", res.data.token);
    //   // navigate("/products");

    //   const { token, role } = res.data;

    //   // Store token
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("role", role); 

    //   // 🔀 Role-based redirect
    //   if (role === "admin") {
    //     window.location.href =
    //       import.meta.env.VITE_ADMIN_URL + "/admin";
    //   } else {
    //     navigate("/");
    //         // Force UI refresh
    // // window.location.reload();


    localStorage.setItem("token", res.data.token);

    // Navigate first
    navigate("/");

    // Force UI refresh
    window.location.reload();
    //   }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
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

        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
