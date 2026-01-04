import { useEffect, useState } from "react";
import M from "materialize-css";
import type { Product } from "../types/Product";

interface Props {
  product: Product | null;
  onSave: (product: Partial<Product>) => void;
  onClose: () => void;
}

const ProductFormModal: React.FC<Props> = ({ product, onSave, onClose }) => {
  const [form, setForm] = useState<Partial<Product>>({});

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
            value={form.name || ""}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <label className="active">Name</label>
        </div>

        <div className="input-field">
          <textarea
            className="materialize-textarea"
            value={form.description || ""}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <label className="active">Description</label>
        </div>

        <div className="input-field">
          <input
            type="number"
            value={form.price || ""}
            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
          />
          <label className="active">Price</label>
        </div>

        <div className="input-field">
          <input
            placeholder="Comma separated image URLs"
            value={form.images?.join(",") || ""}
            onChange={e =>
              setForm({
                ...form,
                images: e.target.value.split(",").map(i => i.trim()),
              })
            }
          />
          <label className="active">Images</label>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn-flat" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn green"
          onClick={() => onSave(form)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProductFormModal;
