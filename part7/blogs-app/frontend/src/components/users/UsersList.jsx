import { useQuery } from "@tanstack/react-query";
import User from "./User";
import { fetchAllUsers } from "./userRequests";

const UsersList = () => {
  const {
    data: users,
    isPending: usersLoading,
    isError: usersError
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    refetchOnWindowFocus: false
  });

  if (usersLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error fetching data</p>;

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
