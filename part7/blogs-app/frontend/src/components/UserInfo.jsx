import { Button, Typography, Box } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useUserValue } from "../reducers/UserContext";

const UserInfo = () => {
  const user = useUserValue();
  const { logout } = useAuth();

  if (!user) return;

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <Typography variant="body1" sx={{ mr: 2 }}>
        {user.name} logged in
      </Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};

export default UserInfo;
