import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20" ;
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";

import UserModel from "../models/UserModel.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await UserModel.findOne({ googleId: profile.id });
        if (currentUser) {
          return done(null, currentUser);
        } else {
          const newUser = await new UserModel({
            googleId: profile.id,
            username: profile.displayName,
            email: `google_${profile.id}@example.com`,
            password: `${process.env.STRATEGY_PASSWORD}_${profile.id}`
          }).save();
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, null);
      }
    })
);

passport.use(
  new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await UserModel.findOne({ githubId: profile.id });
        if (currentUser) {
          return done(null, currentUser);
        } else {
          const newUser = await new UserModel({
            githubId: profile.id,
            username: profile.username,
            email: `github_${profile.id}@example.com`,
            password: `${process.env.STRATEGY_PASSWORD}_${profile.id}`
          }).save();
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, null);
      }
    })
);

passport.use(
  new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await UserModel.findOne({ facebookId: profile.id });
        if (currentUser) {
          return done(null, currentUser);
        } else {
          const newUser = await new UserModel({
            facebookId: profile.id,
            username: profile.displayName,
            email: `facebook_${profile.id}@example.com`,
            password: `${process.env.STRATEGY_PASSWORD}_${profile.id}`
          }).save();
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, null);
      }
    })
);

export default passport;
