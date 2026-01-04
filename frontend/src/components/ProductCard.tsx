import { type Product } from "../types/Product";
import api from "../utils/api"

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const addToCart = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      await api.post(`/cart/add/${product._id}`);
      M.toast({ html: "Added to cart 🛒", classes: "green" });
    } catch (err: any) {
      if (err.response?.status === 401) {
        M.toast({
          html: "Please log in to add items to your cart",
          classes: "red",
        });
      } else {
        M.toast({ html: "Something went wrong", classes: "red" });
      }
    }
  };

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/placeholder.png"; // optional fallback

  return (
    <div className="col s12 m6 l4">
      <div className="card product-card">

        <div className="card-image">
          <img src={imageUrl} alt={product.name} />
        </div>

        <div className="card-content product-card-content">
          <span className="card-title activator grey-text text-darken-4 product-title">
            {product.name}
            <i className="material-icons right">more_vert</i>
          </span>
        </div>

        <div className="card-action product-card-bottom">
          <a href="#!" onClick={addToCart}>
            Add to cart
          </a>

          <span className="green-text product-price">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {product.name}
            <i className="material-icons right">close</i>
          </span>
          <p>{product.description}</p>
        </div>

      </div>
    </div>
  );
};


export default ProductCard;



