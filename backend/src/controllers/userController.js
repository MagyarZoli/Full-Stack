import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

const DAY = 24 * 60 * 60;

dotenv.config();

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    return res.status(201).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 3 * DAY });
    res.status(200).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

export const createToken = id => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: 3 * DAY });
};

const handleErrors = (err) => {
  let errors = {username: "", email: "", password: "", login: ""};
  if (err.message === "Incorrect email") errors.login = "That email is not registered";
  if (err.message === "Incorrect password") errors.login = "That email or password is incorrect";
  if (err.code === 11000) errors.email = "That email is already registered";
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const UserController = {
  signup,
  login,
  logout,
  createToken
};

export default UserController;
