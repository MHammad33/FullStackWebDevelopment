import { useState } from "react";

const Login = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		onLogin({ username, password });

		// Clear the form
		setUsername("");
		setPassword("");
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
