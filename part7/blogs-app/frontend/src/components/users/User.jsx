const User = ({ user }) => {
  return (
    <>
      <tr key={user.id}>
        <td>{user.username}</td>
        <td>{user.blogs.length || 0}</td>
      </tr>
    </>
  );
};
export default User;
