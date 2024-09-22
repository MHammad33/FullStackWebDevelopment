import "./Login.css";
import { useState } from "react";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useAuth();

  const handleLogin = e => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    login({ username, password });
  };

  return (
    <div className="login-container">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            data-testid="test-username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            data-testid="test-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;
