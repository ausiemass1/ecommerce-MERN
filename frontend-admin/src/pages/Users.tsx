import { useEffect, useState } from "react";
import axios from "axios";
import { fetchAllUsers } from "../utils/users.api";
import type { User } from "../types/UserTypes";
import UsersTable from "../components/UsersTable";
import UserFormModal from "../components/UserFormModal";
import type { UserFormData } from "../types/UserFormData";


const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserFormData | null>(null);
  const limit = 10;
  const EMPTY_USER: UserFormData = {
    name: "",
    email: "",
    role: "user",   
  }

  const loadUsers = async () => {
    try {
      const res = await fetchAllUsers({ page, limit });
      setUsers(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch (err) {
      console.error("Failed to load users:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  const handleSaveUser = async (user: UserFormData) => {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("role", user.role);
    const id = user._id;
    if (!id) {
      // ADD NEW USER
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, user);
        await loadUsers(); // refresh table
      } catch (err) {
        console.error("Add user failed:", err);
        alert("Failed to add user");
      }
      return;
    }
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${user._id}`, user);
      await loadUsers(); // refresh table
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save user");
    }
  };

  //    DELETE USER

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${id}`);
      await loadUsers(); // refresh table
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="row admin-layout">
    <div className="col s12 m9 l10">
      {/* ADD PRODUCT BUTTON */}
      <div className="row valign-wrapper">
        <h4 className="col s6">Products</h4>

        <button
          className="btn green col s6 right"
          onClick={() => setSelectedUser(EMPTY_USER)}
        >
          + Add Product
        </button>
      </div>
      <h1>Users</h1>
      {/* USERS TABLE */}
      <UsersTable
        users={users}
        onEdit={setSelectedUser}
        onDelete={handleDelete}
      />

<UserFormModal
  user={selectedUser}
  onSave={handleSaveUser}
  onDelete={handleDelete}
  onClose={() => setSelectedUser(null)}
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
    </div>
  );
};

export default Users;
