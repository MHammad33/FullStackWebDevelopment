import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const BlogDetail = () => {
  const { id: blogId } = useParams();

  const queryClient = useQueryClient();
  const blogs = queryClient.getQueryData(["blogs"]);
  const blog = blogs.find(blog => blog.id === blogId);

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
        <strong>Likes:</strong> {blog.likes} <button className="like-button">👍</button>
      </p>
      <p>{blog.content}</p>
      <p>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          Read full blog
        </a>
      </p>
      <div className="blog-actions">
        <button className="remove-button">🗑️ Remove</button>
      </div>
    </div>
  );
};
export default BlogDetail;
