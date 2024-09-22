import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <>
      <tr key={user.id}>
        <td>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        </td>
        <td>{user.blogs.length || 0}</td>
      </tr>
    </>
  );
};
export default User;
