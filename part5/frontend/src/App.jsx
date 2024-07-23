import Blog from "./components/blog/Blog";
import Login from "./components/login/Login";
import Notification from "./components/Notification";
import { useAuth } from "./hooks/useAuth";

const App = () => {
	const { user, blogs, loading, errorMessage, handleLogin, handleLogout } =
		useAuth();

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
						{loading ? (
							<p>Loading blogs...</p>
						) : (
							<div className="blog-container">
								{blogs.map((blog) => (
									<Blog key={blog.id} blog={blog} />
								))}
							</div>
						)}
					</div>
				) : (
					<Login onLogin={handleLogin} />
				)}
			</div>
		</div>
	);
};

export default App;
