import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import { useToken } from "../hooks/useToken";

const Signup = () => {
  const [, setToken] = useToken();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const navigate = useNavigate();

  const signUp = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("The passwords don\'t match");
    } else {
      const response = await axios.post(`/signup`, {
        username,
        email,
        password,
      });
      const { token } = response.data;
      setToken(token);
      navigate("/login");
    }
  };

  return (
    <>
      <form>
        <h2>Sign up</h2>
        <input type="text" id="username" name="username" required placeholder="Your user name" value={username}
               onChange={e => setUsername(e.target.value)}/>
        <label htmlFor="username">Username</label>
        <div className="username error"></div>
        <input type="text" id="email" name="email" required placeholder="Your email address" value={email}
               onChange={e => setEmail(e.target.value)}/>
        <label htmlFor="email">Email</label>
        <div className="email error"></div>
        <input type={shouldShowPassword ? "text" : "password"} id="password" name="password" required
               placeholder="Your password" value={password}
               onChange={e => setPassword(e.target.value)}/>
        <label htmlFor="password">Password</label><br/>
        <input type={shouldShowPassword ? "text" : "password"} id="confirm-password" name="confirm-password" required
               placeholder="Re-enter your password" value={confirmPassword}
               onChange={e => setConfirmPassword(e.target.value)}/>
        <label htmlFor="confirm-password">Confirm Password</label>
        {error && <div className="signup error">{error}</div>}<br />
        <button onClick={() => setShouldShowPassword(!shouldShowPassword)}>Show Password</button><br />
        <button onClick={signUp}>Sign up</button>
      </form>
      <Link to="/login">Already have an account? Log in</Link>
    </>
  );
};

export default Signup;
