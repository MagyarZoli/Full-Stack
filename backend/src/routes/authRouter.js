import express from "express";
import cookieParser from "cookie-parser";

import UserController from "../controllers/userController.js";
import oauth2Router from "./oauth2Router.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.use("/auth", oauth2Router);
router.use("/user", userRouter);

router.route("/signup")
  .get((req, res) => res.render("signup"))
  .post(UserController.signup);

router.route("/login")
  .get((req, res) => res.render("login"))
  .post(UserController.login);

router.route("/logout")
  .get(UserController.logout);

export default router;
