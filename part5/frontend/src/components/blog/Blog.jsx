import "./Blog.css";

const Blog = ({ blog }) => (
	<div className="blog-card">
		<div className="blog-title-container">
			<h3 className="blog-title">{blog.title}</h3>
		</div>
		<p className="blog-author">by {blog.author}</p>
	</div>
);

export default Blog;
