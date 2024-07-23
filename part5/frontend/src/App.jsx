import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);

	const fetchBlogs = async () => {
		try {
			const blogs = await blogService.getAll();
			setBlogs(blogs);
		} catch (error) {
			console.error("Error fetching blogs...", error.message);
		}
	};

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setUser(user);
			blogService.setToken(user.token);
			fetchBlogs();
		}
	}, []);

	const handleLogin = async (credentials) => {
		try {
			// Login the user
			const user = await loginService.login(credentials);
			// Set the user and token in the blog service
			setUser(user);
			blogService.setToken(user.token);
			// Save the user in the local storage
			window.localStorage.setItem("loggedUser", JSON.stringify(user));
			// Fetch the blogs
			fetchBlogs();
		} catch (err) {
			console.error(err.message);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser");
		setUser(null);
	};

	return (
		<div>
			<h2>Blogs</h2>
			<div>
				{user ? (
					<div>
						<div>
							<p>
								{user?.name} Logged in{" "}
								<button onClick={handleLogout}>Logout</button>
							</p>
						</div>
						<hr />
						{blogs.map((blog) => (
							<Blog key={blog.id} blog={blog} />
						))}
					</div>
				) : (
					<Login onLogin={handleLogin} />
				)}
			</div>
		</div>
	);
};

export default App;
