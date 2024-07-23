import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = ({ handleUser }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			handleUser(user);
			blogService.setToken(user.token);
			window.localStorage.setItem("loggedUser", JSON.stringify(user));

			// Reset fields.
			setUsername("");
			setPassword("");
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	);
};
export default Login;
