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
  // const EMPTY_USER: UserFormData = {
  //   name: "",
  //   email: "",
  //   role: "user",   
  // }

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
// HANDLE ADD AND EDIT  USER 
  const handleSaveUser = async (user: UserFormData) => {
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  
    try {
      if (user._id) {
        // UPDATE
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${user._id}`,
          payload
        );
      } else {
        // CREATE
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/users`,
          payload
        );
      }
  
      setSelectedUser(null);
      await loadUsers();
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
        <h4 className="col s6">Users</h4>

        {/* <button
          className="btn green col s4 right"
          onClick={() => setSelectedUser(EMPTY_USER)}
        >
          + Add user
        </button> */}
      </div>
      
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
