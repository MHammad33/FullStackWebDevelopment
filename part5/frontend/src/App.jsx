import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import Notification from "./components/Notification";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState("null");

	const fetchBlogs = async () => {
		try {
			setErrorMessage("Fetching blogs...");
			const blogs = await blogService.getAll();
			setTimeout(() => {
				setErrorMessage(null);
			}, 500);
			setBlogs(blogs);
		} catch (error) {
			console.error("Error fetching blogs...", error.message);
		}
	};

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			// Give a notification and remove it after 3 seconds
			setErrorMessage("User already logged in");
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);

			// Set the user and token in the blog service
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
			// Give a notification and remove it after 3 seconds
			setErrorMessage("Logged in successfully");
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);
			// Fetch the blogs
			fetchBlogs();
		} catch (err) {
			// Give a notification and remove it after 3 seconds
			setErrorMessage("Invalid credentials");
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);
			console.error(err.message);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser");
		setUser(null);

		// Give a notification and remove it after 3 seconds
		setErrorMessage("Logged out successfully");
		setTimeout(() => {
			setErrorMessage(null);
		}, 3000);
	};

	return (
		<div>
			{errorMessage && <Notification message={errorMessage} />}
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
