import type { User } from "../types/UserTypes";


interface Props {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

const UsersTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
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
                            <button onClick={() => onEdit(user)}>Edit</button>
                            <button onClick={() => onDelete(user)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;