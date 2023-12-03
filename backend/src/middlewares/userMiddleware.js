import "dotenv/config.js";
import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decodedToken) => {
      if (err) res.redirect(`/login`);
      else next();
    });
  } else {
    res.redirect(`/login`);
  }
};

export const checkUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
      res.locals.user = await User.findById(decodedToken.id);
    } else res.locals.user = null;
  } catch (err) {
    res.locals.user = null;
  }
  next();
};

const UserMiddleware = {
  requireAuth,
  checkUser
};

export default UserMiddleware;
