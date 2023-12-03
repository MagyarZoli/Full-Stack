import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";

import { createToken } from "../controllers/userController.js";

const router = express.Router();

const DAY = 24 * 60 * 60;

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.get(
  "/google",
  passport.authenticate("google", {scope: ["profile"]})
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {failureRedirect: "/login"}),
  (req, res) => {
    const token = createToken(req.user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 3 * DAY });
    res.redirect("/");
  }
);

router.get(
  "/github",
  passport.authenticate("github", {scope: ["user:email"]})
);

router.get(
  "/github/redirect",
  passport.authenticate("github", {failureRedirect: "/login"}),
  (req, res) => {
    const token = createToken(req.user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 3 * DAY });
    res.redirect("/");
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook")
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {failureRedirect: "/login"}),
  (req, res) => {
    const token = createToken(req.user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 3 * DAY });
    res.redirect("/");
  }
);

// function passportToken(req, res) {
//   const token = createToken(req.user._id);
//   res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 3 * DAY });
//   res.redirect("/");
// }

export default router;
