import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);

	const handleUser = (user) => {
		setUser(user);
	};

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setUser(user);
			blogService.setToken(user.token);
		}

		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	return (
		<div>
			<h2>Blogs</h2>
			{user ? (
				blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
			) : (
				<Login handleUser={handleUser} />
			)}
		</div>
	);
};

export default App;
