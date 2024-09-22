import "./navbar.css";
import { Link } from "react-router-dom";
import { useUserValue } from "../../reducers/UserContext";

const Navbar = () => {
  const currentUser = useUserValue();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {!currentUser && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
