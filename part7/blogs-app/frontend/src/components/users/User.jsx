import { TableRow, TableCell, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <TableRow key={user.id}>
      <TableCell>
        <Link to={`/users/${user.id}`}>
          <Typography variant="body1">{user.username}</Typography>
        </Link>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{user.blogs.length || 0}</Typography>
      </TableCell>
    </TableRow>
  );
};
export default User;
