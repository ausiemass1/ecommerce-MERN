import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { type Product } from "../types/Product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    axios
      .get<Product[]>(`${API_BASE}/api/products`)
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="container">
      <h4 className="center">Products</h4>
      <div className="row">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
