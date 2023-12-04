// import { Link, useNavigate } from "react-router-dom"
// import { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const logIn = async () => {
//     try {
//       await signInWithEmailAndPassword(getAuth(), email, password);
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };
//   return (
//     <>
//       <form>
//         <h2>Log in</h2>
//         <input type="text" id="email" name="email" placeholder="Your email address" value={email}
//                onChange={ e => setEmail(e.target.value) }/>
//         <label htmlFor="email">Email</label><br/>
//         <input type="password" id="password" name="password" placeholder="Your password" value={password}
//                onChange={ e => setPassword(e.target.value) }/>
//         <label htmlFor="password">Password</label><br/>
//         {error && <p className="login error">{error}</p>}
//         <button onClick={logIn}>Log in</button>
//       </form>
//       <Link to="/signup">Don't have an account? Create one here</Link>
//       <OAuth2 />
//     </>
//   );
// };
//
// const OAuth2 = () => {
//   return (
//     <main>
//       <Link to="/auth/google">Google+</Link>
//       <Link to="/auth/github">GitHub</Link>
//       <Link to="/auth/facebook">Facebook</Link>
//     </main>
//   );
// };
//
// export default Login;
