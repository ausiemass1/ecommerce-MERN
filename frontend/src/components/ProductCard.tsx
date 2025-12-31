//import Products from "../pages/Products";
import  { type Product } from "../types/Product";

interface Props {
  product: Product;
}


const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="col s12 m4">
<div className="card">
    <div className="card-image waves-effect waves-block waves-light">
      <img className="activator" src={product.images}/>
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">{product.name}<i className="material-icons right">more_vert</i></span>
      <p><a href="#">Add to cart</a></p>
    </div>
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">{product.name}<i className="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>
      </div>
    );
  };
  

export default ProductCard;
