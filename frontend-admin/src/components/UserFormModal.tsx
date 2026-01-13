import { useEffect, useState } from "react";
import M from "materialize-css";
import type { UserFormData } from "../types/UserFormData";

interface Props {
  user: UserFormData | null;
  onSave: (user: UserFormData) => void;
  onDelete: (userId: string) => void;
  onClose: () => void;
}

const UserFormModal: React.FC<Props> = ({
  user,
  onSave,
  onDelete,
  onClose,
}) => {
  const [form, setForm] = useState<UserFormData>({
    name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    const elem = document.getElementById("user-modal");
    const instance = M.Modal.init(elem!);

    if (user) {
      setForm(user);
      instance.open();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div id="user-modal" className="modal">
      <div className="modal-content">
        <h5>{form._id ? "Edit User" : "Add User"}</h5>

        {/* NAME */}
        <div className="input-field">
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <label className="active">Name</label>
        </div>

        {/* EMAIL */}
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

        {/* ROLE */}
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
          <label className="active">Role</label>
        </div>
      </div>

      <div className="modal-footer">
        {/* DELETE (only when editing) */}
        {form._id && (
          <button
            className="btn-flat red-text left"
            onClick={() => onDelete(form._id!)}
          >
            Delete
          </button>
        )}

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

export default UserFormModal;
