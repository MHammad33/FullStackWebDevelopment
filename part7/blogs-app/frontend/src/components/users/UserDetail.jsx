import { Box, Typography, List, ListItem, Paper } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UserBlog from "./UserBlog";

const UserDetail = () => {
  const { id: userId } = useParams();
  const queryClient = useQueryClient();
  const users = queryClient.getQueryData(["users"]);

  const user = users ? users.find(user => user.id === userId) : null;
  if (!user) return <p>User not found</p>;

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1">
          <strong>Username:</strong> {user.username}
        </Typography>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Added Blogs
        </Typography>
        <List>
          {user.blogs.map(blog => (
            <ListItem key={blog.id}>
              <UserBlog blog={blog} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};
export default UserDetail;
