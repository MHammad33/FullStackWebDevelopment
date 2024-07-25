import { useState } from "react";
import "./Blog.css";

const Blog = (props) => {
	const [blog, setBlog] = useState(props.blog);
	const [fullBlogVisible, setFullBlogVisible] = useState(false);

	const { onUpdateBlog } = props;

	const toggleVisibility = () => {
		setFullBlogVisible(!fullBlogVisible);
	};

	const handleLikes = () => {
		onUpdateBlog(blog.id, { likes: blog.likes + 1 });
		setBlog({ ...blog, likes: blog.likes + 1 });
	};

	return (
		<div className="blog-card">
			<div className="blog-header">
				<div className="blog-title-container">
					<h3 className="blog-title">{blog.title}</h3>
					<p className="blog-author">by {blog.author}</p>
				</div>
				<button
					className={`${
						fullBlogVisible ? "blog-hide-button" : "blog-view-button"
					}`}
					onClick={toggleVisibility}
				>
					{fullBlogVisible ? "Hide" : "View"}
				</button>
			</div>
			{fullBlogVisible && (
				<div className="blog-full">
					<p>
						<a href={blog.url}>Click here to see full blog</a>
					</p>
					<p>
						{blog.likes} likes{" "}
						<button onClick={handleLikes} className="like-button">
							Like
						</button>
					</p>
					<p>
						Added by <b>{blog?.user.username}</b>
					</p>
				</div>
			)}
		</div>
	);
};

export default Blog;
