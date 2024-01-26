import * as dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import passportJWT from "passport-jwt";
import { db } from "./db.js";

const { SECRET } = process.env;

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET as string,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload: any, done: passportJWT.VerifiedCallback) => {
      try {
        const user = await db.one(
          "SELECT * FROM users WHERE id=$1",
          payload.id
        );
        console.log(user);
        return user ? done(null, user) : done(new Error("User not found"));
      } catch (error) {
        done(error);
      }
    }
  )
);
