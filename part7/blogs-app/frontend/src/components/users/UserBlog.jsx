import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

const UserBlog = ({ blog }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: 2,
        padding: 1,
        backgroundColor: "#f9f9f9",
        boxShadow: 2,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.02)"
        }
      }}
    >
      <IconButton>
        <ArticleIcon fontSize="large" />
      </IconButton>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.author ? `by ${blog.author}` : "Author unknown"}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default UserBlog;
