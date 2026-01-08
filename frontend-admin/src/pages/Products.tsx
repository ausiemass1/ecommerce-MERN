import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types/Product";
import ProductTable from "../components/ProductsTable";
import ProductFormModal from "../components/ProductFormModal";
import type { ProductFormData } from "../types/ProductFormData";
import { fetchProducts } from "../utils/products.api";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetchProducts(page, limit);
        setProducts(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        console.error("Failed to load orders:", err);
        setProducts([]);
      }
    };

    loadOrders();
  }, [page]);

  useEffect(() => {
    M.AutoInit();
  }, []);
  // const fetchProducts = async (page: number, limit: number) => {
  //   const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);

  //   if (Array.isArray(res.data)) {
  //     setProducts(res.data);
  //   } else if (Array.isArray(res.data.products)) {
  //     setProducts(res.data.products);
  //   } else {
  //     console.error("Unexpected products response:", res.data);
  //     setProducts([]);
  //   }
  // };

  useEffect(() => {
    fetchProducts();
  }, []);

  //PRODUCT DELETE HANDLER
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/products/${id}`
      );

      fetchProducts(); // refresh table
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product");
    }
  };

  const handleSave = async (product: ProductFormData) => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("price", String(product.price));
    formData.append("description", product.description || "");

    if (product.imageFile) {
      formData.append("image", product.imageFile);
    }

    try {
      if (product._id) {
        // ✅ UPDATE
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/products/${
            product._id
          }`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // ✅ CREATE
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/products`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save product");
    }
  };

  return (
    <div className="container">
      {/* ADD PRODUCT BUTTON */}
      <div className="row valign-wrapper">
        <h4 className="col s6">Products</h4>

        <button
          className="btn green col s6 right"
          onClick={() => setSelectedProduct({} as Product)}
        >
          + Add Product
        </button>
      </div>

      {/* PRODUCT TABLE */}
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

      {/* PAGINATION */}
      <div className="card-action center-align">
        <ul className="pagination">
          <li className={page === 1 ? "disabled" : "waves-effect"}>
            <button
              className="btn-flat"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              ← Prev
            </button>
          </li>

          <li className="active">
            <span className="btn-flat">
              Page {page} of {totalPages}
            </span>
          </li>

          <li className={page === totalPages ? "disabled" : "waves-effect"}>
            <button
              className="btn-flat"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next →
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Products;
