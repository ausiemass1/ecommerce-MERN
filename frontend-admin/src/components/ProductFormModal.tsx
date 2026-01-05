import { useEffect, useState } from "react";
import M from "materialize-css";
import type { ProductFormData } from "../types/ProductFormData";

interface Props {
  product: ProductFormData | null;
  onSave: (product: ProductFormData) => void;
  onClose: () => void;
}

const ProductFormModal: React.FC<Props> = ({ product, onSave, onClose }) => {
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    const elem = document.getElementById("product-modal");
    M.Modal.init(elem!);

    if (product) {
      setForm(product);
      M.Modal.getInstance(elem!)?.open();
    }
  }, [product]);

  if (!product) return null;

  return (
    <div id="product-modal" className="modal">
      <div className="modal-content">
        <h5>{form._id ? "Edit Product" : "Add Product"}</h5>

        <div className="input-field">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <label className="active">Name</label>
        </div>

        <div className="input-field">
          <textarea
            className="materialize-textarea"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <label className="active">Description</label>
        </div>

        <div className="input-field">
          <input
            type="number"
            step="0.01" 
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />
          <label className="active">Price</label>
        </div>

        {/* ✅ Image upload */}
        <div className="file-field input-field">
          <div className="btn">
            <span>Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  imageFile: e.target.files?.[0],
                })
              }
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" placeholder="Upload product image" />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn-flat" onClick={onClose}>
          Cancel
        </button>
        <button className="btn green" onClick={() => onSave(form)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProductFormModal;
