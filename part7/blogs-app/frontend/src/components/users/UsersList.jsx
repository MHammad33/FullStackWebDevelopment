import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";
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
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Typography variant="h4" component="h2" sx={{ padding: 2 }}>
        Users
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Blogs Created</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UsersList;
