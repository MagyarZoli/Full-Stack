import { Link, useNavigate } from "react-router-dom";

import {useUser} from "../hooks/useUser";

const Viewer = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/login">Log in</Link></li>
      <li><Link to="/signup">Sign up</Link></li>
    </ul>
  );
};

const Entering = ({ username }) => {
  const navigate = useNavigate();
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/logout">Log out</Link></li>
      <li>{username}</li>
      <li><Link to="/user">Users</Link></li>
    </ul>
  );
};

const NavBar = () => {
  const user = useUser();
  if (user) return <Entering username={user.username} />;
  return <Viewer />;
};

export default NavBar;
