// import { Link, useNavigate } from "react-router-dom"
// import { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//
// const Signup = () => {
//   const [user, setUser] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const signUp = async () => {
//     try {
//       if (password !== confirmPassword) {
//         setError("Password and confirm password do not match");
//         return;
//       }
//       await createUserWithEmailAndPassword(getAuth(), email, password);
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };
//   return (
//     <>
//       <form>
//         <h2>Sign up</h2>
//         <input type="text" id="username" name="username" required placeholder="Your user name" value={user}
//                onChange={ e => setUser(e.target.value) }/>
//         <label htmlFor="username">Username</label>
//         <div className="username error"></div>
//         <input type="text" id="email" name="email" required placeholder="Your email address" value={email}
//                onChange={ e => setEmail(e.target.value) }/>
//         <label htmlFor="email">Email</label>
//         <div className="email error"></div>
//         <input type="password" id="password" name="password" required placeholder="Your password" value={password}
//                onChange={ e => setPassword(e.target.value) }/>
//         <label htmlFor="password">Password</label><br />
//         <input type="password" id="confirm-password" name="confirm-password" required
//                placeholder="Re-enter your password" value={confirmPassword}
//                onChange={ e => setConfirmPassword(e.target.value) }/>
//         <label htmlFor="confirm-password">Confirm Password</label>
//         <div className="signup error"></div>
//         <button onClick={signUp}>Sign up</button>
//       </form>
//       <Link to="/login">Already have an account? Log in here</Link>
//     </>
//   );
// };
//
// export default Signup;
