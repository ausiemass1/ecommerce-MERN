import { useEffect, useRef, useState } from "react";
import M from "materialize-css";
import type { UserFormData } from "../types/UserFormData";

interface Props {
  user: UserFormData | null;
  onSave: (user: UserFormData) => void;
  onDelete: (userId: string) => void;
  onClose: () => void;
}

const emptyForm: UserFormData = {
  name: "",
  email: "",
  role: "user",
};

const UserFormModal: React.FC<Props> = ({
  user,
  onSave,
  onDelete,
  onClose,
}) => {
  const [form, setForm] = useState<UserFormData>(emptyForm);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<M.Modal | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!instanceRef.current) {
      instanceRef.current = M.Modal.init(modalRef.current, {
        onCloseEnd: () => {
          setForm(emptyForm); // reset safely
          onClose();          // tell parent
        },
      });
    }

    if (user) {
      setForm({
        _id: user._id,
        name: user.name ?? "",
        email: user.email ?? "",
        role: user.role ?? "user",
      });

      instanceRef.current.open();
    }
  }, [user, onClose]);

  const closeModal = () => {
    instanceRef.current?.close();
  };

  return (
    <div ref={modalRef} id="user-modal" className="modal">
      <div className="modal-content">
        <h5>{form._id ? "Edit User" : "Add User"}</h5>

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
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <label className="active">Email</label>
        </div>

        <div className="input-field">
          <select
            className="browser-default"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value as "user" | "admin",
              })
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="modal-footer">
        {form._id && (
          <button
            className="btn-flat red-text left"
            onClick={() => {
              onDelete(form._id!);
              closeModal();
            }}
          >
            Delete
          </button>
        )}

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

export default UserFormModal;
