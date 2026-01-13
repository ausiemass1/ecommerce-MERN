import  { useEffect, useState } from 'react';
import { fetchAllUsers } from '../utils/users.api';
import type { User } from '../types/UserTypes';
import UsersTable from '../components/UsersTable';


const Users: React.FC = () => {
const [users, setUsers] = useState<User[]>([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const limit = 10;

const loadUsers = async () => {
    try {
        const res = await fetchAllUsers({page, limit});
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

    return (
        <div>
            <h1>Users</h1>
            {/* USERS TABLE */}
            <UsersTable users={users} onEdit={(user) => console.log(user)} onDelete={(user) => console.log(user)}/>
          
         
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

export default Users;