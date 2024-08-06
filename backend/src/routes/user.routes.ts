import express from "express";
import { registerUser, userLogin } from "../controllers/user.controller";
import passport from "passport";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", userLogin);

// userRoutes.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// userRoutes.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // Successful authentication
//     res.redirect("/tasks");
//   }
// );

export default userRoutes;
