import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types/Product";
import ProductTable from "../components/ProductsTable";
import ProductFormModal from "../components/ProductFormModal";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  

  const fetchProducts = async () => {
    const res = await axios.get(`https://mern-ecommerce.onrender.com/api/products`);
  
    if (Array.isArray(res.data)) {
      setProducts(res.data);
    } else if (Array.isArray(res.data.products)) {
      setProducts(res.data.products);
    } else {
      console.error("Unexpected products response:", res.data);
      setProducts([]);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await axios.delete(`/products/${id}`);
    fetchProducts();
  };

  const handleSave = async (product: Partial<Product>) => {
    if (product._id) {
      await axios.put(`/products/${product._id}`, product);
    } else {
      await axios.post("/products", product);
    }
    setSelectedProduct(null);
    fetchProducts();
  };

  return (
    <div className="container">
      <div className="row valign-wrapper">
        <h4 className="col s6">Products</h4>

        <button
          className="btn green col s6 right"
          onClick={() => setSelectedProduct({} as Product)}
        >
          + Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={setSelectedProduct}
        onDelete={handleDelete}
      />

      <ProductFormModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductsPage;
