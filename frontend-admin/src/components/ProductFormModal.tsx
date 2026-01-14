import { useEffect, useRef, useState } from "react";
import M from "materialize-css";
import type { ProductFormData } from "../types/ProductFormData";

interface Props {
  product: ProductFormData | null;
  onSave: (product: ProductFormData) => void;
  onClose: () => void;
}

const emptyForm: ProductFormData = {
  name: "",
  price: 0,
};

const ProductFormModal: React.FC<Props> = ({
  product,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<M.Modal | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!instanceRef.current) {
      instanceRef.current = M.Modal.init(modalRef.current, {
        onCloseEnd: () => {
          setForm(emptyForm);
          onClose();
        },
      });
    }
  }, []);

  useEffect(() => {
    if (!instanceRef.current) return;

    if (product) {
      setForm({
        _id: product._id,
        name: product.name ?? "",
        description: product.description ?? "",
        price: product.price ?? 0,
        imageFile: product.imageFile,
      });
      instanceRef.current.open();
    } else {
      instanceRef.current.close();
    }
  }, [product]);

  const closeModal = () => {
    instanceRef.current?.close();
  };



  return (
    <div ref={modalRef} id="product-modal" className="modal">
      <div className="modal-content">
        <h5>{form._id ? "Edit Product" : "Add Product"}</h5>

        <div className="input-field">
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <label className="active">Name</label>
        </div>

        <div className="input-field">
          <textarea
            className="materialize-textarea"
            value={form.description ?? ""}
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
              setForm({
                ...form,
                price: Number(e.target.value),
              })
            }
          />
          <label className="active">Price</label>
        </div>

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
            <input
              className="file-path validate"
              placeholder="Upload product image"
            />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn-flat" onClick={closeModal}>
          Cancel
        </button>

        <button
          className="btn green"
          onClick={() => {
            onSave(form);
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProductFormModal;
