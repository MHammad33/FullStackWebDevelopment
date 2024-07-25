import { useEffect, useRef, useState } from "react";
import Blog from "./components/blog/Blog";
import Login from "./components/login/Login";
import Notification from "./components/Notification";
import useAuth from "./hooks/useAuth";
import useBlog from "./hooks/useBlog";
import BlogForm from "./components/blogForm/BlogForm";
import eventEmitter from "./utils/utils";
import Togglable from "./components/Togglable";

const App = () => {
	const { user, login, logout } = useAuth();
	const { blogs, addBlog, noteFormRef, update, remove } = useBlog();
	const [message, setMessage] = useState(null);

	console.log("App :: ", message);

	useEffect(() => {
		const handleMessage = (msg, duration = 3000) => {
			setMessage(msg);
			setTimeout(() => {
				setMessage(null);
			}, duration);
		};

		eventEmitter.on("showMessage", handleMessage);

		return () => {
			eventEmitter.off("showMessage", handleMessage);
		};
	});

	return (
		<div>
			{message && <Notification message={message} />}
			<h2>Blogs</h2>
			<div>
				{user ? (
					<div>
						<div>
							<p>
								{user?.name} Logged in <button onClick={logout}>Logout</button>
							</p>
						</div>
						<h3>Create new blog</h3>
						<Togglable buttonLabel="New Blog" ref={noteFormRef}>
							<BlogForm onAddBlog={addBlog} />
						</Togglable>

						<hr />
						<div className="blog-container">
							{blogs.map((blog) => (
								<Blog
									key={blog.id}
									blog={blog}
									onUpdateBlog={update}
									onDeleteBlog={remove}
								/>
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
