const UserInfo = ({ user, onLogout }) => (
  <div>
    <p>
      {user.name} logged in <button onClick={onLogout}>Logout</button>
    </p>
  </div>
);

export default UserInfo;
