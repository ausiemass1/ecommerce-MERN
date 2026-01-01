import api from "../utils/api";
import { type Product } from "../types/Product";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const addToCart = async () => {
    try {
      await api.post(`/cart/add/${product._id}`);
      alert("Added to cart");
    } catch {
      alert("Please login first");
    }
  };

  return (
    <div className="card">
      <img src={product.images} />
      <p>{product.name}</p>
      <p>${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;




