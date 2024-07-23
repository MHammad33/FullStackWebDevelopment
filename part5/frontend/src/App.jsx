import { useState } from "react";
import Blog from "./components/blog/Blog";
import Login from "./components/login/Login";
import Notification from "./components/Notification";
import useAuth from "./hooks/useAuth";
import useBlog from "./hooks/useBlog";
import BlogForm from "./components/blogForm/BlogForm";

const App = () => {
	const { user, errorMessage, login, logout } = useAuth();
	const { blogs, addBlog } = useBlog();
	const [showForm, setShowForm] = useState(false);

	return (
		<div>
			{errorMessage && <Notification message={errorMessage} />}
			<h2>Blogs</h2>
			<div>
				{user ? (
					<div>
						<div>
							<p>
								{user?.name} Logged in <button onClick={logout}>Logout</button>
							</p>
						</div>
						<button onClick={() => setShowForm(!showForm)}>
							{showForm ? "Cancel" : "Add New Blog"}
						</button>
						{showForm && (
							<BlogForm
								onAddBlog={addBlog}
								closeForm={() => setShowForm(false)}
							/>
						)}
						<hr />
						<div className="blog-container">
							{blogs.map((blog) => (
								<Blog key={blog.id} blog={blog} />
							))}
						</div>
					</div>
				) : (
					<Login onLogin={login} />
				)}
			</div>
		</div>
	);
};

export default App;
