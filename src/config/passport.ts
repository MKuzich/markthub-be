import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import User from "../models/User";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const params = {
  secretOrKey: ACCESS_TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  })
);
