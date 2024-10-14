import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../queries";

const Login = ({ show }) => {
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});
	const [login, { data, loading, error: loginError }] = useMutation(LOGIN_USER);

	if (!show) {
		return null;
	}

	const handleChange = useCallback((e) => {
		const { name, value } = e.target;
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[name]: value,
		}));
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		await attemptLogin();
	};

	const attemptLogin = async () => {
		try {
			const result = await login({ variables: { ...credentials } });
			storeUserToken(result.data.login.value);
			reloadPage();
		} catch (error) {
			handleError(error);
		}
	};

	const storeUserToken = (token) => {
		localStorage.setItem("booksLibrary-user-token", token);
	};

	const reloadPage = () => {
		window.location.reload();
	};

	const handleError = (error) => {
		console.error("Login failed:", error);
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username</label>
					<input
						type="text"
						name="username"
						value={credentials.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type="password"
						name="password"
						value={credentials.password}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
			{loginError && (
				<p style={{ color: "red" }}>Error: {loginError.message}</p>
			)}
		</div>
	);
};

export default Login;
