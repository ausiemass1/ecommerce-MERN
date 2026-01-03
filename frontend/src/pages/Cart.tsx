import { useEffect, useState } from "react";
import api from "../utils/api";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const Cart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/cart")
      .then(res => setCart(res.data))
      .finally(() => setLoading(false));
  }, []);
  

  if (loading) {
    return (
      <div className="container center">
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container center">
        <h5>Your cart is empty 🛒</h5>
        <p>Add some products to get started.</p>
      </div>
    );
  }
  const handleCheckout = async () => {
    try {
      const res = await api.post("/checkout");
      console.log("Checkout response:", res.data);
      window.location.href = res.data.url;
    } catch (err: any) {
      console.error("Checkout error:", err.response?.data || err);
      alert("Checkout failed");
    }
  };
  

  return (
    <div className="container">
      <h4 className="center">Your Cart</h4>

      <div className="card">
        <div className="card-content">
          {cart.items.map(item => (
            <div
              key={item.productId}
              className="row valign-wrapper"
              style={{ marginBottom: "16px" }}
            >
             
              {/* Name */}
              <div className="col s5">
                <strong>{item.name}</strong>
                <p className="grey-text">
                  ${item.price.toFixed(2)} each
                </p>
              </div>

              {/* Quantity */}
              <div className="col s2 center">
                × {item.quantity}
              </div>

              {/* Subtotal */}
              <div className="col s2 right-align">
                <strong>
                  ${(item.price * item.quantity).toFixed(2)}
                </strong>
              </div>
            </div>
          ))}

          <div className="divider" style={{ margin: "20px 0" }} />

          <div className="row">
            <div className="col s6">
              <strong>Total items</strong>
            </div>
            <div className="col s6 right-align">
              {cart.totalQuantity}
            </div>
          </div>

          <div className="row">
            <div className="col s6">
              <strong>Total</strong>
            </div>
            <div className="col s6 right-align">
              <strong>${cart.totalPrice.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <div className="card-action right-align">
          <button className="btn teal" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
