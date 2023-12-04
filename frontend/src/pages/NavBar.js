import { Link } from "react-router-dom";

const Viewer = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/auth/login">Log in</Link></li>
      <li><Link to="/auth/signup">Sign up</Link></li>
      <li><Link to="/user">Users</Link></li>
    </ul>
  );
};

const Entering = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/auth/logout">Log out</Link></li>
      <li><Link to="/user">Users</Link></li>
    </ul>
  );
};

const NavBar = ({ user }) => {
  if (!user) return <Viewer />;
  return <Entering />;
};

export default NavBar;
