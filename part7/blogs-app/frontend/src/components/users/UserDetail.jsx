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
    <div>
      <h2>{user.name}</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <UserBlog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};
export default UserDetail;
