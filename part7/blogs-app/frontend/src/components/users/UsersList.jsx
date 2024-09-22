import User from "./User";

const UsersList = () => {
  const users = [
    {
      id: 1,
      username: "fahad",
      name: "Fahad Afzal",
      blogs: [1, 2, 3]
    }
  ];

  return (
    <>
      <h2>Users</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default UsersList;
