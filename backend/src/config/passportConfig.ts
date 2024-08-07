import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import UserModel from "../models/user.model";
import { IUser } from "../types/user";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/user/google/callback",
      passReqToCallback: true,
    },

    async (
      req,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any, info?: any) => void
    ) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
          user = await UserModel.create({
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            profileImage: profile.photos?.[0].value || "",
            googleId: profile.id,
            email: profile.emails?.[0]?.value || "",
          });
        }
        done(null, user);
      } catch (err) {
        console.error("Error during authentication:", err);
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  // Ensure user.id is valid
  if (!user.id) {
    return done(new Error("User ID not found"));
  }
  done(null, user.id);
});

passport.deserializeUser(
  async (id: string, done: (err: any, user?: IUser | null) => void) => {
    try {
      const user = await UserModel.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
);
