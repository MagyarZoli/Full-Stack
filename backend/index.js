import "dotenv/config";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";

import "./src/config/passportConfig.js";
import connectToDatabase from "./src/config/mongoConfig.js";
import authRouter from "./src/routes/authRouter.js";
import { checkUser } from "./src/middlewares/userMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase()
  .then(() => console.log(`Connected to MongoDB`))
  .catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({ secret: process.env.COOKIE_SESSION_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(checkUser);
app.use(authRouter);

app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("home"));

app.listen(PORT, () => console.log(`The server is running at http://localhost:${PORT}`));

export default app;
