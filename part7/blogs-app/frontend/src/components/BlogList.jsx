import BlogForm from "./blogForm/BlogForm";
import Blog from "./blog/Blog";
import Togglable from "./Togglable";

const BlogList = ({ blogs, update, remove, currentUser, noteFormRef }) => (
  <>
    <Togglable buttonLabel="New Blog" ref={noteFormRef}>
      <BlogForm noteFormRef={noteFormRef} />
    </Togglable>

    <div className="blog-container">
      {blogs
        ?.sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            onUpdateBlog={update}
            onDeleteBlog={remove}
            currentUser={currentUser}
          />
        ))}
    </div>
  </>
);

export default BlogList;
