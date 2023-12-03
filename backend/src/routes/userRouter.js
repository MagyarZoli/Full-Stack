import express from "express";
import cookieParser from "cookie-parser";

import UserService from "../services/userService.js";
import { requireAuth } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.use(requireAuth);

router.route("/")
  .get(UserService.findUsers)
  .post(UserService.createUser);

router.route("/:id")
  .get(UserService.findUserById)
  .put(UserService.findUserByIdAndUpdate)
  .delete(UserService.findUserByIdAndDelete);

export default router;
