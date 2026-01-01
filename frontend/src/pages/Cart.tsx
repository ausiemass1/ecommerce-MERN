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

  useEffect(() => {
    api.get("/cart").then(res => setCart(res.data));
  }, []);

  if (!cart) return <p>Loading...</p>;

  return (
    <div>
      <h3>Your Cart</h3>

      {cart.items.map(item => (
        <p key={item.productId}>
          {item.name} × {item.quantity}
        </p>
      ))}

      <h4>Total: ${cart.totalPrice}</h4>
    </div>
  );
};

export default Cart;
