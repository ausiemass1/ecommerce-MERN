import type { User } from "../types/UserTypes";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UsersTable = ({ users, onEdit, onDelete }: Props) => {
  if (!Array.isArray(users)) {
    return <p className="red-text">Users data is invalid</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>

            <td>
              <button className="btn-small blue" onClick={() => onEdit(user)}>
                Edit
              </button>

              <button
                className="btn-small red ml-2"
                onClick={() => onDelete(user._id)}
                style={{ marginLeft: "8px" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
