import useAuth from "../hooks/useAuth";
import { useUserValue } from "../reducers/UserContext";

const UserInfo = () => {
  const user = useUserValue();
  const { logout } = useAuth();

  if (!user) return;

  return (
    <div>
      <p>
        {user.name} logged in <button onClick={logout}>Logout</button>
      </p>
    </div>
  );
};

export default UserInfo;
