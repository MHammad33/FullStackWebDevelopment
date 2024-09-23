import { TextField, Button, Typography, Container, Box } from "@mui/material";
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
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Log in to application
      </Typography>

      <form onSubmit={handleLogin}>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Box mb={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={e => setUsername(e.target.value)}
            data-testid="test-username"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            data-testid="test-password"
            required
          />
        </Box>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
