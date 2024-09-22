import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useBlog from "../hooks/useBlog";
import { useUserValue } from "../reducers/UserContext";

const BlogDetail = () => {
  const [comment, setComment] = useState("");

  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const { updateBlogMutation, deleteBlogMuatation } = useBlog();
  const currentUser = useUserValue();

  const queryClient = useQueryClient();
  const blogs = queryClient.getQueryData(["blogs"]);
  const blog = blogs.find(blog => blog.id === blogId);

  console.log("blog", blog);

  const handleAddComment = async e => {
    e.preventDefault();
  };

  if (!blog) {
    return <>Not Found</>;
  }

  return (
    <div className="blog-detail">
      <h2>{blog.title}</h2>
      <p>
        <strong>Author:</strong> {blog.author}
      </p>
      <p>
        <strong>Likes:</strong> {blog.likes}{" "}
        <button
          onClick={() =>
            updateBlogMutation.mutate({
              id: blog.id,
              updatedBlog: {
                likes: blog.likes + 1
              }
            })
          }
          className="like-button"
        >
          👍
        </button>
      </p>
      <p>{blog.content}</p>
      <p>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          Read full blog
        </a>
      </p>
      <div className="blog-actions">
        {currentUser?.username === blog.user.username && (
          <button
            className="remove-button"
            onClick={() => {
              const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
              if (confirm) {
                deleteBlogMuatation.mutate(blog.id);
                navigate("/");
              }
            }}
          >
            🗑️ Remove
          </button>
        )}
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}

        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};
export default BlogDetail;
