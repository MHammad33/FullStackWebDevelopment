import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../queries";

const Login = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginMessage, setLoginMessage] = useState(null);

	const [login, { data, loading, error }] = useMutation(LOGIN_USER);

	if (!props.show) {
		return null;
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const result = await login({ variables: { username, password } });
			localStorage.setItem("booksLibrary-user-token", result.data.login.value);
			setLoginMessage("Login successful!");
			window.location.reload();
		} catch (e) {
			setLoginMessage("Login failed. Please try again.");
			console.error("Login failed:", e);
		}
	};

	return (
		<div>
			{loginMessage && <p>{loginMessage}</p>}
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Login</button>
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error.message}</p>}
			</form>
		</div>
	);
};

export default Login;
