// import passport from "passport";
// import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
// import UserModel from "../models/user.model";
// import { IUser } from "../types/user";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: "http://localhost:8080/auth/google/callback",
//       passReqToCallback: true,
//     },

//     async (
//       accessToken: string,
//       refreshToken: string,
//       profile: Profile,
//       done: (error: any, user?: any, info?: any) => void
//     ) => {
//       try {
//         console.log(profile, "profile");
//         let user = await UserModel.findOne({ googleId: profile.id });
//         if (!user) {
//           user = await UserModel.create({
//             googleId: profile.id,
//             email: profile.emails?.[0]?.value || "",
//           });
//         }
//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
//   done(null, user.id);
// });

// passport.deserializeUser(
//   (id: string, done: (err: any, user?: IUser | null) => void) => {
//     UserModel.findById(id, (err: any, user: any) => {
//       done(err, user);
//     });
//   }
// );
