import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products`);

        // ✅ normalize response
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Unexpected products response:", res.data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [API_BASE]);

  return (
    <div className="container">
      <h4 className="center">Products</h4>

      <div className="row">
        {products.length === 0 ? (
          <p className="center grey-text">No products found</p>
        ) : (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
