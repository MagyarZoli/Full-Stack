import { useNavigate } from 'react-router-dom';

import { useToken } from "../hooks/useToken";

const Logout = () => {
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  const logOut = () => {
    setToken("");
    navigate("/");
  }
};