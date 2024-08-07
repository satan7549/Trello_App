import express from "express";
import { registerUser, userLogin } from "../controllers/user.controller";
import passport from "passport";
import { IUserRequest } from "../middleware/user.auth";
import { IUser } from "../types/user";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", userLogin);

userRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRoutes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: IUserRequest, res) => {
    const user = req.user as IUser;
    const token = user.getjwtToken();

    // Ensure user is defined before calling sendToken
    if (user) {
      const userPayload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        googleId: user.googleId,
      };

      const userBase64 = Buffer.from(JSON.stringify(userPayload)).toString(
        "base64"
      );

      // sendToken(res, httpStatus.OK, user);
      res.redirect(
        `${process.env.CLIENT_URL}/auth/google/callback?token=${token}&user=${userBase64}`
      );
    } else {
      res.redirect("/login");
    }
  }
);

export default userRoutes;
