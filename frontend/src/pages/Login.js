import { Link, useNavigate} from "react-router-dom"
import { useState } from "react";
import axios from "axios";

import { useToken } from "../hooks/useToken";

const Login = () => {
  const [, setToken] = useToken();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const navigate = useNavigate();

  const logIn = async () => {
    const response = await axios.post(`/login`, {
      email,
      password,
    });
    const { token } = response.data;
    setToken(token);
    navigate("/");
  };

  return (
    <>
      <form>
        <h2>Log in</h2>
        <input type="text" id="email" name="email" placeholder="Your email address" value={email}
               onChange={ e => setEmail(e.target.value) }/>
        <label htmlFor="email">Email</label><br/>
        <input type={shouldShowPassword ? "text" : "password"} id="password" name="password" placeholder="Your password" value={password}
               onChange={ e => setPassword(e.target.value) }/>
        <label htmlFor="password">Password</label><br/>
        {error && <p className="login error">{error}</p>}
        <button onClick={() => setShouldShowPassword(!shouldShowPassword)}>Show Password</button><br />
        <button onClick={logIn}>Log in</button>
      </form>
      <Link to="/signup">Don't have an account? Sign up</Link>
      {/*<OAuth2 />*/}
    </>
  );
};

const OAuth2 = () => {
  return (
    <main>
      <Link to="/auth/google">Google+</Link>
      <Link to="/auth/github">GitHub</Link>
      <Link to="/auth/facebook">Facebook</Link>
    </main>
  );
};

export default Login;
